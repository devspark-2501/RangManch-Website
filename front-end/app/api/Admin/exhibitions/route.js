// app/api/exhibitions/route.js
import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";
import { applyEffectiveStatus } from "@/lib/exhibitionStatus";

export async function GET() {
  await connectDB();

  const exhibitions = await Exhibition.find()
    .sort({ createdAt: -1 })
    .lean();

  // Serialize _id, apply auto-expiry logic
  const serialized = exhibitions.map((ex) => ({
    ...ex,
    _id:       ex._id.toString(),
    createdAt: ex.createdAt?.toString() ?? null,
    updatedAt: ex.updatedAt?.toString() ?? null,
  }));

  return Response.json(applyEffectiveStatus(serialized));
}

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const exhibition = await Exhibition.create(body);

  return Response.json(exhibition, { status: 201 });
}