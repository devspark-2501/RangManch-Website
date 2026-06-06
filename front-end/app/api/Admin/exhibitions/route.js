import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";

export async function GET() {
  await connectDB();

  const exhibitions =
    await Exhibition.find().sort({
      createdAt: -1,
    });

  return Response.json(exhibitions);
}