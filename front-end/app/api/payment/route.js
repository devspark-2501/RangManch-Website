import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

// GET — return all payments (admin use). Read-only: payment status is now
// set exclusively by /api/razorpay/verify-payment (and, in future, by a
// Razorpay webhook for async events like refunds/failures). This route no
// longer accepts writes.
export async function GET() {
  try {
    await connectDB();
    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .lean();

    const serialized = payments.map((p) => ({
      ...p,
      _id:          p._id.toString(),
      bookingId:    p.bookingId?.toString()    ?? null,
      exhibitionId: p.exhibitionId?.toString() ?? null,
      createdAt:    p.createdAt?.toString()    ?? null,
      updatedAt:    p.updatedAt?.toString()    ?? null,
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