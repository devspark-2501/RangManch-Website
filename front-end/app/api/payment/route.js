import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import Booking from "@/models/Booking";

// GET — return all payments (admin use)
export async function GET() {
  try {
    await connectDB();
    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .lean();

    const serialized = payments.map((p) => ({
      ...p,
      _id:       p._id.toString(),
      bookingId: p.bookingId?.toString()   ?? null,
      exhibitionId: p.exhibitionId?.toString() ?? null,
      createdAt: p.createdAt?.toString()   ?? null,
      updatedAt: p.updatedAt?.toString()   ?? null,
    }));

    return Response.json(serialized);
  } catch (error) {
    console.error("GET /api/payment error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PATCH — approve or reject a payment
// Body: { paymentId, action: "approve" | "reject" }
export async function PATCH(req) {
  try {
    await connectDB();

    const { paymentId, action } = await req.json();

    if (!paymentId || !action) {
      return Response.json(
        { success: false, message: "paymentId and action are required." },
        { status: 400 }
      );
    }
    if (!["approve", "reject"].includes(action)) {
      return Response.json(
        { success: false, message: "action must be 'approve' or 'reject'." },
        { status: 400 }
      );
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return Response.json(
        { success: false, message: "Payment not found." },
        { status: 404 }
      );
    }

    if (action === "approve") {
      payment.paymentStatus = "Paid";
      await payment.save();
      await Booking.findByIdAndUpdate(payment.bookingId, {
        status: "Confirmed",
      });
    } else {
      payment.paymentStatus = "Rejected";
      await payment.save();
      await Booking.findByIdAndUpdate(payment.bookingId, {
        status: "Payment Rejected",
      });
    }

    return Response.json({ success: true, payment });
  } catch (error) {
    console.error("PATCH /api/payment error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}