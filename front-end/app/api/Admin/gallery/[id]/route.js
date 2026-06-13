import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const gallery = await Gallery.findById(params.id).lean();
    if (!gallery) {
      return Response.json({ message: "Gallery not found" }, { status: 404 });
    }
    return Response.json({
      ...gallery,
      _id: gallery._id.toString(),
      createdAt: gallery.createdAt?.toString() ?? null,
      updatedAt: gallery.updatedAt?.toString() ?? null,
    });
  } catch (err) {
    console.error("GET /api/Admin/gallery/[id] error:", err);
    return Response.json({ message: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
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

    const updated = await Gallery.findByIdAndUpdate(
      params.id,
      { title, images },
      { new: true }
    );
    if (!updated) {
      return Response.json({ message: "Gallery not found" }, { status: 404 });
    }
    return Response.json({ message: "Gallery updated successfully", gallery: updated });
  } catch (err) {
    console.error("PUT /api/Admin/gallery/[id] error:", err);
    return Response.json({ message: "Failed to update gallery" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const deleted = await Gallery.findByIdAndDelete(params.id);
    if (!deleted) {
      return Response.json({ message: "Gallery not found" }, { status: 404 });
    }
    return Response.json({ message: "Gallery deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/Admin/gallery/[id] error:", err);
    return Response.json({ message: "Failed to delete gallery" }, { status: 500 });
  }
}