import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Exhibition from "@/models/Exhibition";

// Statuses that count toward a category's capacity.
const CAPACITY_STATUSES = ["Pending Payment Verification", "Confirmed"];

// GET /api/exhibitions/[id]/category-slots
// Returns how many bookings currently count toward capacity, per category,
// for the given exhibition. Shape: { "Clothing": 1, "Jewellery": 3 }
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params;

    const exhibition = await Exhibition.findById(id).lean();
    if (!exhibition) {
      return Response.json(
        { message: "Exhibition not found" },
        { status: 404 }
      );
    }

    const bookings = await Booking.find(
      {
        exhibitionId: id,
        status: { $in: CAPACITY_STATUSES },
      },
      { category: 1, _id: 0 }
    ).lean();

    const counts = {};
    for (const booking of bookings) {
      counts[booking.category] = (counts[booking.category] ?? 0) + 1;
    }

    return Response.json(counts, { status: 200 });
  } catch (error) {
    console.error("GET /api/exhibitions/[id]/category-slots error:", error);
    return Response.json(
      { message: "Failed to fetch category slot counts" },
      { status: 500 }
    );
  }
}