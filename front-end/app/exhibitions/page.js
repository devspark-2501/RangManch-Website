import Link from "next/link";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaImages } from "react-icons/fa";
import Exhibition from "@/models/Exhibition";
import { connectDB } from "@/lib/mongodb";
import { applyEffectiveStatus } from "@/lib/exhibitionStatus";

// export const metadata = {
//   title: "RangManch | Exhibitions"
// };

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Exhibitions() {
  await connectDB();

  const raw = await Exhibition.find({}).sort({ createdAt: -1 }).lean();

  const exhibitions = applyEffectiveStatus(
    raw.map((item) => ({
      ...item,
      _id:       item._id.toString(),
      createdAt: item.createdAt?.toString() ?? null,
      updatedAt: item.updatedAt?.toString() ?? null,
    }))
  );

  return (
    <section className="min-h-screen bg-[#fdf9f7] py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e2a55]">
            Our Exhibitions
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore current, upcoming and past exhibitions hosted by Rang Manch.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4" />
        </div>

        {/* Empty state */}
        {exhibitions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <FaImages className="text-6xl text-pink-200 mb-5" />
            <p className="text-2xl font-semibold text-gray-500">
              No Exhibitions Available
            </p>
            <p className="text-sm mt-2 text-gray-400">
              New exhibitions will appear here once created by admin.
            </p>
          </div>
        )}

        {/* Cards */}
        {exhibitions.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {exhibitions.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />

                  {item.status === "open" && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full">
                      Booking Open
                    </div>
                  )}
                  {item.status === "coming-soon" && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-semibold px-4 py-2 rounded-full">
                      Coming Soon
                    </div>
                  )}
                  {item.status === "expired" && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-full">
                      Event Completed
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#1e2a55] mb-5">
                    {item.title}
                  </h2>

                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-pink-500 mt-1 flex-shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-pink-500 flex-shrink-0" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaClock className="text-pink-500 flex-shrink-0" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  {item.status === "open" && (
                    <Link
                      href={`/exhibitions/${item._id}`}
                      className="mt-6 block text-center py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600"
                    >
                      Explore More
                    </Link>
                  )}
                  {item.status === "coming-soon" && (
                    <button className="mt-6 w-full py-3 rounded-xl border border-pink-300 text-pink-600 font-semibold hover:bg-pink-50 transition">
                      Coming Soon
                    </button>
                  )}
                  {item.status === "expired" && (
                    <Link
                      href={`/exhibitions/${item._id}`}
                      className="mt-6 block text-center py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                    >
                      View Gallery
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}