import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";

export async function GET() {
  try {
    await connectDB();

    const exhibitions = await Exhibition.find({})
      .sort({ createdAt: -1 });

    return Response.json(exhibitions);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}