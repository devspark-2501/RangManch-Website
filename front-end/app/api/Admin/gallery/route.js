import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await connectDB();
    const galleries = await Gallery.find().sort({ createdAt: -1 }).lean();
    const serialized = galleries.map((g) => ({
      ...g,
      _id: g._id.toString(),
      createdAt: g.createdAt?.toString() ?? null,
      updatedAt: g.updatedAt?.toString() ?? null,
    }));
    return Response.json(serialized);
  } catch (err) {
    console.error("GET /api/Admin/gallery error:", err);
    return Response.json({ message: "Failed to fetch galleries" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, images } = body;

    if (!title || !images || images.length === 0) {
      return Response.json(
        { message: "Title and at least one image are required." },
        { status: 400 }
      );
    }

    const gallery = await Gallery.create({ title, images });
    return Response.json(
      { message: "Gallery created successfully", gallery },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/Admin/gallery error:", err);
    return Response.json({ message: "Failed to create gallery" }, { status: 500 });
  }
}