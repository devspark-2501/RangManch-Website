import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import Exhibition from "@/models/Exhibition";

export async function GET() {
  try {
    await connectDB();

    const galleries = await Gallery.find()
      .populate("exhibitionId", "title location date")
      .sort({ createdAt: -1 })
      .lean();

    const serialized = galleries.map((g) => ({
      ...g,
      _id: g._id.toString(),
      exhibitionId: g.exhibitionId
        ? {
            ...g.exhibitionId,
            _id: g.exhibitionId._id?.toString(),
          }
        : null,
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
    const { exhibitionId, title, images } = body;

    if (!exhibitionId) {
      return Response.json({ message: "Please select an exhibition." }, { status: 400 });
    }
    if (!title) {
      return Response.json({ message: "Gallery title is required." }, { status: 400 });
    }
    if (!images || images.length === 0) {
      return Response.json({ message: "Please upload at least one image." }, { status: 400 });
    }

    const gallery = await Gallery.create({ exhibitionId, title, images });

    return Response.json(
      { message: "Gallery created successfully", gallery },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/Admin/gallery error:", err);
    return Response.json({ message: "Failed to create gallery" }, { status: 500 });
  }
}