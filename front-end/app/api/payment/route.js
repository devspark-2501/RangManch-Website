// app/api/payment/route.js
//
// FIX: export const dynamic = "force-dynamic" added.
// Same static-cache issue as /api/Admin/bookings — Vercel would freeze
// the payment list at deploy time without this directive.

export const dynamic    = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

// GET — returns all payments as a flat array.
// Read-only: payment status is set exclusively by
// /api/razorpay/verify-payment (and future Razorpay webhooks).
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