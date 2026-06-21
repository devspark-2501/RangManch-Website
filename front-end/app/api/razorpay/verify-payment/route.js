import crypto from "crypto";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";

// Statuses that count toward a category's capacity
const CAPACITY_STATUSES = ["Pending", "Confirmed"];

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      // Vendor info
      vendorName,
      businessName,
      mobile,
      email,
      category,
      products,
      social,
      terms,
      extraTableCount,
      // Exhibition
      exhibitionId,
    } = body;

    // ── Validate required fields ─────────────────────────────────────────
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return Response.json(
        { success: false, message: "Missing Razorpay payment fields." },
        { status: 400 }
      );
    }
    if (!exhibitionId) {
      return Response.json(
        { success: false, message: "Exhibition ID is required." },
        { status: 400 }
      );
    }
    if (!category?.trim()) {
      return Response.json(
        { success: false, message: "Category is required." },
        { status: 400 }
      );
    }

    // ── Verify Razorpay signature ─────────────────────────────────────────
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return Response.json(
        { success: false, message: "Payment verification failed. Invalid signature." },
        { status: 400 }
      );
    }

    // ── Fetch exhibition ─────────────────────────────────────────────────
    const exhibition = await Exhibition.findById(exhibitionId).lean();
    if (!exhibition) {
      return Response.json(
        { success: false, message: "Exhibition not found." },
        { status: 404 }
      );
    }

    // ── Validate category ────────────────────────────────────────────────
    const categoryDef = (exhibition.categoryLimits ?? []).find(
      (c) => c.category === category
    );
    if (!categoryDef) {
      return Response.json(
        { success: false, message: "Category is not valid for this exhibition." },
        { status: 400 }
      );
    }

    // ── Final capacity check before creating booking ──────────────────────
    const existingCount = await Booking.countDocuments({
      exhibitionId: exhibition._id,
      category,
      status: { $in: CAPACITY_STATUSES },
    });
    if (existingCount >= categoryDef.maxSlots) {
      // Payment went through but category just filled up — flag for refund
      return Response.json(
        {
          success: false,
          message:
            "This category just became full. Please contact us for a refund. Reference: " +
            razorpayPaymentId,
        },
        { status: 400 }
      );
    }

    // ── Server-side pricing (recalculate — never trust frontend) ─────────
    const rawCount       = Number(extraTableCount);
    const safeCount      = Number.isFinite(rawCount) && rawCount >= 0 ? Math.floor(rawCount) : 0;
    const entryCost      = exhibition.entryCost      ?? 0;
    const extraTableCost = exhibition.extraTableCost ?? 0;
    const totalAmount    = entryCost + extraTableCost * safeCount;

    // ── Create Booking ────────────────────────────────────────────────────
    const booking = await Booking.create({
      vendorName,
      businessName,
      mobile,
      email,
      category,
      products:           products   ?? "",
      social:             social     ?? "",
      terms:              terms      ?? false,
      status:             "Confirmed",
      exhibitionId:       exhibition._id,
      exhibitionTitle:    exhibition.title,
      exhibitionDate:     exhibition.date     ?? "",
      exhibitionLocation: exhibition.location ?? "",
      entryCost,
      extraTableCost,
      extraTableCount:    safeCount,
      totalAmount,
    });

    // ── Create Payment record ─────────────────────────────────────────────
    const payment = await Payment.create({
      bookingId:         booking._id,
      exhibitionId:      exhibition._id,
      vendorName,
      email,
      mobile,
      amount:            totalAmount,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      paymentStatus:     "Paid",
    });

    return Response.json(
      { success: true, booking, payment },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/razorpay/verify-payment error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}