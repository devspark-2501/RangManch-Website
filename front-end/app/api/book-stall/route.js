import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // Validate exhibition fields
    if (!body.exhibitionId) {
      return Response.json(
        { success: false, message: "Please select an exhibition." },
        { status: 400 }
      );
    }
    if (!body.exhibitionTitle) {
      return Response.json(
        { success: false, message: "Exhibition title is missing." },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      vendorName:      body.vendorName,
      businessName:    body.businessName,
      mobile:          body.mobile,
      email:           body.email,
      category:        body.category,
      products:        body.products,
      social:          body.social,
      terms:           body.terms,
      exhibitionId:    body.exhibitionId,
      exhibitionTitle: body.exhibitionTitle,
      entryCost:       body.entryCost       ?? 0,
      extraTableCost:  body.extraTableCost  ?? 0,
      extraTableCount: body.extraTableCount ?? 0,
      totalAmount:     body.totalAmount     ?? 0,
    });

    return Response.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}