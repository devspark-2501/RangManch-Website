import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";

// ── GET: list all exhibitions ──────────────────────────────────────────
// NOTE: inferred — the original app/api/exhibitions/route.js was not
// provided, so this GET handler is written to match the shape consumed
// by app/exhibitions/page.js and app/Book-Stall/page.js (a plain array
// of exhibition objects). If your real GET handler differs, replace
// this block with your existing implementation and keep the POST below.
export async function GET() {
  try {
    await connectDB();

    const exhibitions = await Exhibition.find({})
      .sort({ createdAt: -1 })
      .lean();

    const serialized = exhibitions.map((item) => ({
      ...item,
      _id:       item._id.toString(),
      createdAt: item.createdAt?.toString() ?? null,
      updatedAt: item.updatedAt?.toString() ?? null,
    }));

    return Response.json(serialized, { status: 200 });
  } catch (error) {
    console.error("GET /api/exhibitions error:", error);
    return Response.json(
      { message: "Failed to fetch exhibitions" },
      { status: 500 }
    );
  }
}

// ── POST: create a new exhibition ──────────────────────────────────────
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ── Validate required base fields ──────────────────────────────────
    if (!body.title?.trim()) {
      return Response.json(
        { success: false, message: "Exhibition title is required." },
        { status: 400 }
      );
    }
    if (!body.location?.trim()) {
      return Response.json(
        { success: false, message: "Location is required." },
        { status: 400 }
      );
    }
    if (!body.date?.trim()) {
      return Response.json(
        { success: false, message: "Date is required." },
        { status: 400 }
      );
    }
    if (!body.time?.trim()) {
      return Response.json(
        { success: false, message: "Time is required." },
        { status: 400 }
      );
    }

    // ── Validate categoryLimits ─────────────────────────────────────────
    const rawCategories = Array.isArray(body.categoryLimits)
      ? body.categoryLimits
      : [];

    const categoryLimits = rawCategories.map((c) => ({
      category: typeof c.category === "string" ? c.category.trim() : "",
      maxSlots: Number(c.maxSlots),
    }));

    const hasEmptyName = categoryLimits.some((c) => c.category === "");
    if (hasEmptyName) {
      return Response.json(
        { success: false, message: "Category name cannot be empty." },
        { status: 400 }
      );
    }

    const hasInvalidSlots = categoryLimits.some(
      (c) => !Number.isFinite(c.maxSlots) || c.maxSlots <= 0
    );
    if (hasInvalidSlots) {
      return Response.json(
        { success: false, message: "Max slots must be greater than zero for every category." },
        { status: 400 }
      );
    }

    // Guard against duplicate category names within the same exhibition
    const lowerNames = categoryLimits.map((c) => c.category.toLowerCase());
    const hasDuplicates = lowerNames.some(
      (name, idx) => lowerNames.indexOf(name) !== idx
    );
    if (hasDuplicates) {
      return Response.json(
        { success: false, message: "Category names must be unique within an exhibition." },
        { status: 400 }
      );
    }

    const exhibition = await Exhibition.create({
      title:          body.title.trim(),
      location:       body.location.trim(),
      date:           body.date.trim(),
      time:           body.time.trim(),
      description:    body.description ?? "",
      status:         body.status ?? "coming-soon",
      image:          body.image ?? "",
      gallery:        Array.isArray(body.gallery) ? body.gallery : [],
      entryCost:      Number(body.entryCost)      || 0,
      extraTableCost: Number(body.extraTableCost) || 0,
      categoryLimits,
    });

    return Response.json({ success: true, exhibition }, { status: 201 });
  } catch (error) {
    console.error("POST /api/exhibitions error:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}