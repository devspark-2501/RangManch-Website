// app/api/Admin/bookings/route.js
//
// FIX: export const dynamic = "force-dynamic" added.
// Without this, Next.js App Router treats GET routes as statically cacheable
// and Vercel's CDN serves the build-time snapshot indefinitely — even after
// new bookings are saved to MongoDB. Development mode never caches, which is
// exactly why localhost always showed fresh data while production did not.

export const dynamic   = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .lean();

    // Serialize ObjectIds so the response is valid JSON on all runtimes
    const serialized = bookings.map((b) => ({
      ...b,
      _id:          b._id.toString(),
      exhibitionId: b.exhibitionId?.toString() ?? null,
      createdAt:    b.createdAt?.toString()    ?? null,
      updatedAt:    b.updatedAt?.toString()    ?? null,
    }));

    return Response.json(serialized);
  } catch (error) {
    console.error("GET /api/Admin/bookings error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}