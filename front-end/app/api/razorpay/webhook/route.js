import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";

// Statuses that count toward a category's capacity — kept in sync with
// create-order and verify-payment.
const CAPACITY_STATUSES = ["Pending", "Confirmed"];

// Razorpay requires the raw, unparsed request body to compute the
// webhook signature. Next.js App Router route handlers can read the
// raw text directly off the Request object, so no special config is
// needed here (unlike the old Pages Router bodyParser:false pattern).
export async function POST(req) {
  let rawBody;
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error("Webhook: failed to read raw body", err);
    return Response.json({ success: false, message: "Invalid body" }, { status: 400 });
  }

  // ── Verify webhook signature ──────────────────────────────────────────
  const signature = req.headers.get("x-razorpay-signature");
  const secret     = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    console.error("Webhook: RAZORPAY_WEBHOOK_SECRET is not set");
    return Response.json({ success: false, message: "Server misconfigured" }, { status: 500 });
  }
  if (!signature) {
    return Response.json({ success: false, message: "Missing signature" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  // Constant-time comparison to avoid timing attacks on signature check.
  const signaturesMatch =
    expectedSignature.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));

  if (!signaturesMatch) {
    console.warn("Webhook: signature mismatch — rejecting");
    return Response.json({ success: false, message: "Invalid signature" }, { status: 400 });
  }

  // ── Parse payload (safe now that signature is verified) ──────────────
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (err) {
    console.error("Webhook: failed to parse JSON", err);
    return Response.json({ success: false, message: "Invalid JSON" }, { status: 400 });
  }

  const event = payload.event;

  try {
    await connectDB();

    switch (event) {
      case "payment.captured":
        await handlePaymentCaptured(payload);
        break;

      case "payment.failed":
        await handlePaymentFailed(payload);
        break;

      case "refund.processed":
        await handleRefundProcessed(payload);
        break;

      default:
        // Unhandled event types are acknowledged, not errors — Razorpay
        // sends many event types; we only act on the three we care about.
        console.log(`Webhook: ignoring unhandled event "${event}"`);
    }

    // Razorpay requires a 2xx response within a few seconds, or it will
    // retry (with backoff) for up to ~24 hours. Always return 200 once
    // we've successfully processed (or intentionally ignored) the event.
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`Webhook: error handling "${event}"`, error);
    // Returning 500 tells Razorpay to retry — appropriate for transient
    // DB errors, but be aware it will also retry on bugs, so logs matter.
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ── payment.captured ──────────────────────────────────────────────────
// This is the webhook's equivalent of verify-payment's success path.
// It must independently re-derive booking details from order notes
// (set in create-order) since the webhook has no access to the
// vendor's form data — only what was stored on the Razorpay order.
async function handlePaymentCaptured(payload) {
  const paymentEntity = payload.payload?.payment?.entity;
  if (!paymentEntity) {
    console.warn("Webhook: payment.captured missing payment entity");
    return;
  }

  const razorpayPaymentId = paymentEntity.id;
  const razorpayOrderId   = paymentEntity.order_id;
  const amountInPaise     = paymentEntity.amount;

  if (!razorpayOrderId) {
    console.warn("Webhook: payment.captured missing order_id");
    return;
  }

  // ── Idempotency check #1: has this order already been handled? ───────
  // verify-payment (client-driven) may have already created the Payment
  // + Booking for this order. If so, just sync status fields and return.
  const existing = await Payment.findOne({ razorpayOrderId });
  if (existing) {
    if (existing.paymentStatus !== "Paid") {
      existing.paymentStatus     = "Paid";
      existing.razorpayPaymentId = razorpayPaymentId;
      await existing.save();
    }
    if (existing.bookingId) {
      await Booking.findByIdAndUpdate(existing.bookingId, { status: "Confirmed" });
    }
    return;
  }

  // ── Booking does not exist yet — webhook arrived first. Reconstruct
  // booking details from the order notes set in create-order. ─────────
  const notes = paymentEntity.notes ?? {};
  const { exhibitionId, category, vendorName, businessName, mobile, email, products, social } = notes;

  if (!exhibitionId || !category) {
    // Order wasn't created by our create-order route (or notes were
    // stripped) — nothing reliable to build a booking from.
    console.warn("Webhook: payment.captured order has insufficient notes to build a booking", { razorpayOrderId });
    return;
  }

  const exhibition = await Exhibition.findById(exhibitionId).lean();
  if (!exhibition) {
    console.warn("Webhook: exhibition not found for captured payment", { exhibitionId, razorpayOrderId });
    return;
  }

  const categoryDef = (exhibition.categoryLimits ?? []).find((c) => c.category === category);
  if (!categoryDef) {
    console.warn("Webhook: category not valid for exhibition", { category, exhibitionId });
    return;
  }

  // Recompute amount server-side from the exhibition record — never
  // trust the payload's amount as the source of truth for pricing,
  // only use it to sanity-check against what Razorpay actually charged.
  const extraTableCount = Number(notes.extraTableCount) || 0;
  const entryCost        = exhibition.entryCost      ?? 0;
  const extraTableCost   = exhibition.extraTableCost ?? 0;
  const totalAmount      = entryCost + extraTableCost * extraTableCount;

  if (totalAmount * 100 !== amountInPaise) {
    console.warn("Webhook: captured amount does not match expected amount — flagging, not auto-confirming", {
      razorpayOrderId, expectedPaise: totalAmount * 100, capturedPaise: amountInPaise,
    });
    // Amount mismatch is a red flag (tampering or stale pricing). Record
    // the payment as Paid for visibility, but skip booking creation so
    // a human can review it rather than silently confirming a stall.
    await createPaymentRecordOnly({
      razorpayOrderId, razorpayPaymentId, exhibitionId, vendorName, email, mobile,
      amount: amountInPaise / 100, status: "Paid",
    });
    return;
  }

  // ── Idempotency check #2: capacity, re-checked at webhook time too ───
  const existingCount = await Booking.countDocuments({
    exhibitionId: exhibition._id,
    category,
    status: { $in: CAPACITY_STATUSES },
  });
  if (existingCount >= categoryDef.maxSlots) {
    console.warn("Webhook: category filled before webhook could create booking — needs manual refund", {
      razorpayOrderId, razorpayPaymentId, category, exhibitionId,
    });
    await createPaymentRecordOnly({
      razorpayOrderId, razorpayPaymentId, exhibitionId, vendorName, email, mobile,
      amount: totalAmount, status: "Paid",
    });
    return;
  }

  // ── Create Booking + Payment together ─────────────────────────────────
  // Wrapped so a duplicate-key error on Payment (from a concurrent
  // verify-payment insert) doesn't leave an orphan Booking behind.
  let booking;
  try {
    booking = await Booking.create({
      vendorName:         vendorName      ?? "",
      businessName:       businessName    ?? "",
      mobile:             mobile          ?? "",
      email:              email           ?? "",
      category,
      products:           products ?? "",
      social:             social   ?? "",
      terms:              true, // webhook path implies payment succeeded; terms were already accepted client-side at order creation
      status:             "Confirmed",
      exhibitionId:       exhibition._id,
      exhibitionTitle:    exhibition.title,
      exhibitionDate:     exhibition.date     ?? "",
      exhibitionLocation: exhibition.location ?? "",
      entryCost,
      extraTableCost,
      extraTableCount,
      totalAmount,
    });

    await Payment.create({
      bookingId:         booking._id,
      exhibitionId:      exhibition._id,
      vendorName:        vendorName ?? "",
      email:             email      ?? "",
      mobile:            mobile     ?? "",
      amount:            totalAmount,
      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus:     "Paid",
    });
  } catch (err) {
    // E11000 duplicate key on razorpayOrderId means verify-payment won
    // the race and already created everything. Roll back our orphan
    // booking (if it was created) and exit quietly — not an error.
    if (err.code === 11000) {
      if (booking) {
        await Booking.findByIdAndDelete(booking._id);
      }
      console.log("Webhook: payment already processed by verify-payment, skipping duplicate", { razorpayOrderId });
      return;
    }
    throw err;
  }
}

// Helper for "record the payment but don't create a booking" cases
// (amount mismatch / capacity race lost). Also idempotent on orderId.
async function createPaymentRecordOnly({ razorpayOrderId, razorpayPaymentId, exhibitionId, vendorName, email, mobile, amount, status }) {
  try {
    await Payment.create({
      bookingId:     null,
      exhibitionId,
      vendorName:    vendorName ?? "",
      email:         email      ?? "",
      mobile:        mobile     ?? "",
      amount,
      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus: status,
    });
  } catch (err) {
    if (err.code === 11000) return; // already recorded — fine
    throw err;
  }
}

// ── payment.failed ────────────────────────────────────────────────────
async function handlePaymentFailed(payload) {
  const paymentEntity = payload.payload?.payment?.entity;
  if (!paymentEntity) return;

  const razorpayOrderId   = paymentEntity.order_id;
  const razorpayPaymentId = paymentEntity.id;
  if (!razorpayOrderId) return;

  const existing = await Payment.findOne({ razorpayOrderId });
  if (existing) {
    // Don't downgrade a payment that's already Paid (a failed webhook
    // for an old retry attempt should never overwrite a later success).
    if (existing.paymentStatus === "Paid") return;
    existing.paymentStatus     = "Failed";
    existing.razorpayPaymentId = razorpayPaymentId;
    await existing.save();
    return;
  }

  // No Payment record exists yet (order created, checkout abandoned or
  // failed before verify-payment ran) — record the failure for visibility.
  const notes = paymentEntity.notes ?? {};
  if (!notes.exhibitionId) return; // not one of ours, nothing to log meaningfully

  await createPaymentRecordOnly({
    razorpayOrderId,
    razorpayPaymentId,
    exhibitionId: notes.exhibitionId,
    vendorName:   notes.vendorName,
    email:        notes.email,
    mobile:       notes.mobile,
    amount:       (paymentEntity.amount ?? 0) / 100,
    status:       "Failed",
  });
}

// ── refund.processed ──────────────────────────────────────────────────
async function handleRefundProcessed(payload) {
  const refundEntity = payload.payload?.refund?.entity;
  if (!refundEntity) return;

  const razorpayPaymentId = refundEntity.payment_id;
  if (!razorpayPaymentId) return;

  const payment = await Payment.findOne({ razorpayPaymentId });
  if (!payment) {
    console.warn("Webhook: refund.processed for unknown paymentId", { razorpayPaymentId });
    return;
  }

  if (payment.paymentStatus === "Refunded") return; // already handled

  payment.paymentStatus = "Refunded";
  await payment.save();

  if (payment.bookingId) {
    await Booking.findByIdAndUpdate(payment.bookingId, { status: "Cancelled" });
  }
}