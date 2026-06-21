import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";
import Exhibition from "@/models/Exhibition";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ── Validate required fields ─────────────────────────────────────────
    if (!body.exhibitionId) {
      return Response.json(
        { success: false, message: "Please select an exhibition." },
        { status: 400 }
      );
    }
    if (!body.transactionId?.trim()) {
      return Response.json(
        { success: false, message: "Transaction ID (UTR Number) is required." },
        { status: 400 }
      );
    }
    if (!body.paymentScreenshot) {
      return Response.json(
        { success: false, message: "Payment screenshot is required." },
        { status: 400 }
      );
    }

    // ── Fetch exhibition from DB — never trust frontend pricing ──────────
    const exhibition = await Exhibition.findById(body.exhibitionId).lean();
    if (!exhibition) {
      return Response.json(
        { success: false, message: "Exhibition not found." },
        { status: 404 }
      );
    }
    if (exhibition.status !== "open") {
      return Response.json(
        { success: false, message: "This exhibition is not open for bookings." },
        { status: 400 }
      );
    }

    // ── Sanitize extraTableCount ─────────────────────────────────────────
    const rawCount        = Number(body.extraTableCount);
    const extraTableCount =
      Number.isFinite(rawCount) && rawCount >= 0 ? Math.floor(rawCount) : 0;

    // ── Server-side pricing calculation ──────────────────────────────────
    const entryCost      = exhibition.entryCost      ?? 0;
    const extraTableCost = exhibition.extraTableCost ?? 0;
    const totalAmount    = entryCost + extraTableCost * extraTableCount;

    // ── Create Booking ───────────────────────────────────────────────────
    const booking = await Booking.create({
      vendorName:         body.vendorName,
      businessName:       body.businessName,
      mobile:             body.mobile,
      email:              body.email,
      category:           body.category,
      products:           body.products   ?? "",
      social:             body.social     ?? "",
      terms:              body.terms      ?? false,
      status:             "Pending Payment Verification",
      exhibitionId:       exhibition._id,
      exhibitionTitle:    exhibition.title,
      exhibitionDate:     exhibition.date     ?? "",
      exhibitionLocation: exhibition.location ?? "",
      entryCost,
      extraTableCost,
      extraTableCount,
      totalAmount,
    });

    // ── Create Payment linked to Booking ─────────────────────────────────
    const payment = await Payment.create({
      bookingId:         booking._id,
      exhibitionId:      exhibition._id,
      vendorName:        body.vendorName,
      email:             body.email,
      mobile:            body.mobile,
      amount:            totalAmount,
      transactionId:     body.transactionId.trim(),
      paymentScreenshot: body.paymentScreenshot,
      paymentStatus:     "Pending Verification",
    });

    return Response.json(
      { success: true, booking, payment },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/book-stall error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}