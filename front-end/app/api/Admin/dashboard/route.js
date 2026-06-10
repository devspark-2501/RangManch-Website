// app/api/Admin/dashboard/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Booking from "@/models/Booking";
import Exhibition from "@/models/Exhibition";
import { getEffectiveStatus } from "@/lib/exhibitionStatus";

export async function GET() {
  try {
    await connectDB();

    const [totalUsers, totalBookings, exhibitions] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Exhibition.find({}, { gallery: 1, status: 1, createdAt: 1, _id: 0 }).lean(),
    ]);

    // Apply effective status before counting
    const totalExhibitions   = exhibitions.length;
    const totalGalleryImages = exhibitions.reduce(
      (sum, ex) => sum + (ex.gallery?.length ?? 0),
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