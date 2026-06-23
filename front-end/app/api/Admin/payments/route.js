// app/api/Admin/payments/route.js
//
// FIX: export const dynamic = "force-dynamic" added.
// This aggregation pipeline produces the analytics dashboard data.
// Without force-dynamic Vercel caches it at build time and the revenue
// figures, counts, and per-exhibition breakdown never update in production.

export const dynamic    = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

// Ensure Booking and Exhibition models are registered for $lookup
import "@/models/Booking";
import "@/models/Exhibition";

export async function GET() {
  try {
    await connectDB();

    // Single aggregation: join Payment → Booking → Exhibition,
    // then branch into three facets in one DB round trip.
    const [result] = await Payment.aggregate([
      {
        $lookup: {
          from:         "bookings",
          localField:   "bookingId",
          foreignField: "_id",
          as:           "booking",
        },
      },
      { $unwind: { path: "$booking", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from:         "exhibitions",
          localField:   "exhibitionId",
          foreignField: "_id",
          as:           "exhibition",
        },
      },
      { $unwind: { path: "$exhibition", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id:               1,
          vendorName:        1,
          email:             1,
          mobile:            1,
          amount:            1,
          razorpayOrderId:   1,
          razorpayPaymentId: 1,
          paymentStatus:     1,
          createdAt:         1,
          exhibitionId:      1,
          exhibitionTitle:   { $ifNull: ["$exhibition.title", "Unknown Exhibition"] },
          businessName:      "$booking.businessName",
          category:          "$booking.category",
          bookingStatus:     "$booking.status",
        },
      },
      {
        $facet: {
          // ── Dashboard summary cards ───────────────────────────────────
          summary: [
            {
              $group: {
                _id:                null,
                totalPayments:      { $sum: 1 },
                totalRevenue: {
                  $sum: {
                    $cond: [{ $eq: ["$paymentStatus", "Paid"] }, "$amount", 0],
                  },
                },
                successfulPayments: {
                  $sum: { $cond: [{ $eq: ["$paymentStatus", "Paid"] },    1, 0] },
                },
                failedPayments: {
                  $sum: { $cond: [{ $eq: ["$paymentStatus", "Failed"] },   1, 0] },
                },
                refundedPayments: {
                  $sum: { $cond: [{ $eq: ["$paymentStatus", "Refunded"] }, 1, 0] },
                },
              },
            },
            { $project: { _id: 0 } },
          ],

          // ── Revenue per exhibition (Paid only) ───────────────────────
          revenueByExhibition: [
            { $match: { paymentStatus: "Paid" } },
            {
              $group: {
                _id:            "$exhibitionId",
                exhibitionTitle: { $first: "$exhibitionTitle" },
                revenue:        { $sum: "$amount" },
                paymentCount:   { $sum: 1 },
              },
            },
            { $sort: { revenue: -1 } },
            {
              $project: {
                _id:            0,
                exhibitionId:   { $toString: "$_id" },
                exhibitionTitle: 1,
                revenue:        1,
                paymentCount:   1,
              },
            },
          ],

          // ── Flat list for the searchable table ───────────────────────
          payments: [
            { $sort: { createdAt: -1 } },
            {
              $project: {
                _id:               { $toString: "$_id" },
                vendorName:        1,
                email:             1,
                mobile:            1,
                businessName:      1,
                category:          1,
                exhibitionId:      { $toString: "$exhibitionId" },
                exhibitionTitle:   1,
                amount:            1,
                razorpayOrderId:   1,
                razorpayPaymentId: 1,
                paymentStatus:     1,
                bookingStatus:     1,
                createdAt:         { $dateToString: { date: "$createdAt" } },
              },
            },
          ],
        },
      },
    ]);

    const summary = result.summary[0] ?? {
      totalPayments:      0,
      totalRevenue:       0,
      successfulPayments: 0,
      failedPayments:     0,
      refundedPayments:   0,
    };

    return Response.json({
      summary,
      revenueByExhibition: result.revenueByExhibition,
      payments:            result.payments,
    });
  } catch (error) {
    console.error("GET /api/Admin/payments error:", error);
    return Response.json(
      { message: "Failed to fetch payment data" },
      { status: 500 }
    );
  }
}