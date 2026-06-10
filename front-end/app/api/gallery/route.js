// app/api/gallery/route.js
import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";
import { applyEffectiveStatus } from "@/lib/exhibitionStatus";

export async function GET() {
  await connectDB();

  const exhibitions = await Exhibition.find()
    .sort({ createdAt: -1 })
    .lean();

  const serialized = exhibitions.map((ex) => ({
    ...ex,
    _id:       ex._id.toString(),
    createdAt: ex.createdAt?.toString() ?? null,
    updatedAt: ex.updatedAt?.toString() ?? null,
  }));

  return Response.json(applyEffectiveStatus(serialized));
}