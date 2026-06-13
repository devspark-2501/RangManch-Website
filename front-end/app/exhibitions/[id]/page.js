import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Exhibition from "@/models/Exhibition";

export default async function ExhibitionDetails({ params }) {
  await connectDB();

  // Fetch exhibition by _id from MongoDB
  let exhibition;
  try {
    exhibition = await Exhibition.findById(params.id).lean();
  } catch {
    // Invalid ObjectId format → treat as not found
    notFound();
  }

  if (!exhibition) {
    notFound();
  }

  // Serialize for rendering
  const event = {
    ...exhibition,
    _id: exhibition._id.toString(),
    createdAt: exhibition.createdAt?.toString() ?? null,
    updatedAt: exhibition.updatedAt?.toString() ?? null,
  };

  return (
    <section className="min-h-screen bg-[#fdf9f7] py-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* Banner */}
        {event.image && (
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg">

          <h1 className="text-4xl font-bold text-[#1e2a55]">
            {event.title}
          </h1>

          <div className="mt-6 space-y-2 text-gray-600">
            {event.location && (
              <p>
                <strong>Location:</strong> {event.location}
              </p>
            )}
            {event.date && (
              <p>
                <strong>Date:</strong> {event.date}
              </p>
            )}
            {event.time && (
              <p>
                <strong>Time:</strong> {event.time}
              </p>
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

        {/* Gallery — from gallery field on Exhibition (legacy support) */}
        {event.gallery && event.gallery.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[#1e2a55] mb-8">
              Event Gallery
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.gallery.map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl shadow-md"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}