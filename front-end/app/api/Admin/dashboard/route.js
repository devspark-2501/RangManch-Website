// app/api/Admin/dashboard/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Booking from "@/models/Booking";
import Exhibition from "@/models/Exhibition";
import Gallery from "@/models/Gallery";
import { getEffectiveStatus } from "@/lib/exhibitionStatus";

export async function GET() {
  try {
    await connectDB();

    const [totalUsers, totalBookings, exhibitions, galleries] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Exhibition.find({}, { status: 1, createdAt: 1, _id: 0 }).lean(),
      Gallery.find({}, { images: 1, _id: 0 }).lean(),
    ]);

    // Apply effective status before counting
    const totalExhibitions = exhibitions.length;

    // Gallery images live in the Gallery collection, not on the Exhibition
    // document — sum images.length across every gallery document instead
    // of reading a nonexistent ex.gallery field off Exhibition.
    const totalGalleryImages = galleries.reduce(
      (sum, g) => sum + (g.images?.length ?? 0),
      0
    );

    // Breakdown using effective (auto-expiry aware) status
    const statusCounts = exhibitions.reduce(
      (acc, ex) => {
        const status = getEffectiveStatus(ex);
        acc[status] = (acc[status] ?? 0) + 1;
        return acc;
      },
      {}
    );

    return Response.json({
      totalUsers,
      totalBookings,
      totalExhibitions,
      totalGalleryImages,
      statusCounts, // { open: n, "coming-soon": n, expired: n }
    });
  } catch (error) {
    console.error("[Dashboard API Error]", error);
    return Response.json(
      { message: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}