import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";
import Gallery from "@/models/Gallery";
import { getEffectiveStatus } from "@/lib/exhibitionStatus";

export const dynamic = "force-dynamic";

export default async function ExhibitionDetails({ params }) {
  await connectDB();

  // ── Fetch exhibition ──────────────────────────────────────────────────
  let exhibition;
  try {
    exhibition = await Exhibition.findById(params.id).lean();
  } catch {
    notFound();
  }

  if (!exhibition) notFound();

  // ── Fetch linked gallery ──────────────────────────────────────────────
  let gallery = null;
  try {
    gallery = await Gallery.findOne({ exhibitionId: params.id }).lean();
  } catch {
    gallery = null;
  }

  // ── Serialize ─────────────────────────────────────────────────────────
  const event = {
    ...exhibition,
    _id:       exhibition._id.toString(),
    createdAt: exhibition.createdAt?.toString() ?? null,
    updatedAt: exhibition.updatedAt?.toString() ?? null,
  };

  // Apply effective status (auto-expiry logic)
  const effectiveStatus = getEffectiveStatus(event);

  const galleryImages = gallery?.images ?? [];

  return (
    <section className="min-h-screen bg-[#fdf9f7] py-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* ── Banner Image ────────────────────────────────────────────── */}
        {event.image && (
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* ── Exhibition Details Card ──────────────────────────────────── */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg">

          <h1 className="text-4xl font-bold text-[#1e2a55]">
            {event.title}
          </h1>

          <div className="mt-6 space-y-2 text-gray-600">
            {event.location && (
              <p><strong>Location:</strong> {event.location}</p>
            )}
            {event.date && (
              <p><strong>Date:</strong> {event.date}</p>
            )}
            {event.time && (
              <p><strong>Time:</strong> {event.time}</p>
            )}
          </div>

          {event.description && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-[#1e2a55] mb-4">
                About This Exhibition
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

        </div>

        {/* ── Stall Booking CTA ────────────────────────────────────────── */}
        {effectiveStatus === "open" && (
          <div className="mt-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Book Your Stall
              </h2>
              <p className="text-white/80 mt-1">
                Reserve your space at this exhibition and showcase your products.
              </p>
            </div>
            <Link
              href={`/Book-Stall?event=${event._id}`}
              className="flex-shrink-0 px-8 py-3 rounded-xl bg-white text-pink-600 font-bold text-base hover:scale-[1.03] transition shadow-md"
            >
              Book Stall →
            </Link>
          </div>
        )}

        {effectiveStatus === "coming-soon" && (
          <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-3xl p-8 text-center shadow-sm">
            <p className="text-yellow-700 font-semibold text-lg">
              Registrations opening soon
            </p>
            <p className="text-yellow-600 text-sm mt-1">
              Check back once this exhibition is open for stall bookings.
            </p>
          </div>
        )}

        {/* ── Gallery Section ──────────────────────────────────────────── */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#1e2a55] mb-8">
            Event Gallery
          </h2>

          {galleryImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-pink-200 text-gray-400">
              <svg
                className="w-16 h-16 text-pink-200 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-500">
                No gallery available yet
              </p>
              <p className="text-sm mt-1">Check back after the exhibition.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryImages.map((img, index) => (
                <div key={index} className="overflow-hidden rounded-2xl shadow-md">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}