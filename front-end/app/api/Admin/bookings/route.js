import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 });

    return Response.json(bookings);
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}