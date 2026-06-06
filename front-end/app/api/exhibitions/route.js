import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";

export async function GET() {
  try {
    await connectDB();

    const exhibitions =
      await Exhibition.find().sort({
        createdAt: -1,
      });

    return Response.json(exhibitions);
  } catch (error) {
    return Response.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const exhibition =
      await Exhibition.create(body);

    return Response.json(exhibition);
  } catch (error) {
    return Response.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}