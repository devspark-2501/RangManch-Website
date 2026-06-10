import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Booking from "@/models/Booking";
import Exhibition from "@/models/Exhibition";

export async function GET() {
  try {
    await connectDB();

    const [totalUsers, totalBookings, totalExhibitions, exhibitions] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Exhibition.countDocuments(),
      Exhibition.find({}, { gallery: 1, _id: 0 }).lean(),
    ]);

    const totalGalleryImages = exhibitions.reduce(
      (sum, ex) => sum + (ex.gallery?.length || 0),
      0
    );

    return Response.json({
      totalUsers,
      totalBookings,
      totalExhibitions,
      totalGalleryImages,
    });
  } catch (error) {
    console.error("[Dashboard API Error]", error);
    return Response.json(
      { message: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}