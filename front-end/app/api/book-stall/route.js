import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const booking = await Booking.create({
      vendorName: data.vendorName,
      businessName: data.businessName,
      mobile: data.mobile,
      email: data.email,
      category: data.category,
      products: data.products,
      social: data.social,
      extraTable: data.extraTable,
      terms: data.terms,
    });

    return Response.json(
      {
        success: true,
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}