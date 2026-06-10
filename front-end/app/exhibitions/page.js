// app/exhibitions/page.js
import Link from "next/link";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import Exhibition from "@/models/Exhibition";
import { connectDB } from "@/lib/mongodb";
import { applyEffectiveStatus } from "@/lib/exhibitionStatus";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const fallbackExhibitions = [
  {
    _id: "1",
    title: "Rang Manch Summer Exhibition 2026",
    location: "Kedia Kothi, Sirsi Road, Jaipur",
    date: "31 May 2026",
    time: "11:00 AM - 8:00 PM",
    image: "/exhibition1.jpeg",
    status: "expired",
    createdAt: new Date(0).toISOString(),
  },
  {
    _id: "2",
    title: "Rang Manch Summer Exhibition 2026",
    location: "SDC The Destination Gandhi Path West, Vaishali Nagar, Jaipur",
    date: "7 June 2026",
    time: "2:00 PM - 9:00 PM",
    image: "/exhibition2.jpeg",
    status: "coming-soon",
    createdAt: new Date(0).toISOString(),
  },
];

export default async function Exhibitions() {
  let displayExhibitions = fallbackExhibitions;

  try {
    await connectDB();

    console.log("=== [Exhibitions Page] DB connected ===");

    const exhibitions = await Exhibition.find({})
      .sort({ createdAt: -1 })
      .lean();

    console.log(`=== [Exhibitions Page] Raw count from DB: ${exhibitions.length} ===`);

    if (exhibitions.length > 0) {
      console.log("=== [Exhibitions Page] First doc sample:", JSON.stringify(exhibitions[0], null, 2));

      const serialized = exhibitions.map((item) => ({
        ...item,
        _id:       item._id.toString(),
        createdAt: item.createdAt ? item.createdAt.toString() : null,
        updatedAt: item.updatedAt ? item.updatedAt.toString() : null,
      }));

      // Apply auto-expiry: any "open" exhibition older than 7 days becomes "expired"
      displayExhibitions = applyEffectiveStatus(serialized);

      console.log(`=== [Exhibitions Page] Displaying ${displayExhibitions.length} exhibitions (auto-expiry applied) ===`);
    } else {
      console.log("=== [Exhibitions Page] No MongoDB exhibitions found — using fallback ===");
    }
  } catch (error) {
    console.error("=== [Exhibitions Page] ERROR fetching exhibitions:", error);
  }

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

          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {displayExhibitions.map((item) => (
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
                    <FaMapMarkerAlt className="text-pink-500 mt-1" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-pink-500" />
                    <span>{item.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaClock className="text-pink-500" />
                    <span>{item.time}</span>
                  </div>

                </div>

                {/* Buttons */}

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
      </div>
    </section>
  );
}