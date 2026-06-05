import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const booking = await Booking.create({
      vendorName: body.vendorName,
      businessName: body.businessName,
      mobile: body.mobile,
      email: body.email,
      category: body.category,
      products: body.products,
      social: body.social,
      extraTable: body.extraTable,
      terms: body.terms,
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