import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const gallery = await Gallery.findById(params.id)
      .populate("exhibitionId", "title location date")
      .lean();

    if (!gallery) {
      return Response.json({ message: "Gallery not found" }, { status: 404 });
    }

    return Response.json({
      ...gallery,
      _id: gallery._id.toString(),
      exhibitionId: gallery.exhibitionId
        ? { ...gallery.exhibitionId, _id: gallery.exhibitionId._id?.toString() }
        : null,
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

    const updated = await Gallery.findByIdAndUpdate(
      params.id,
      { exhibitionId, title, images },
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