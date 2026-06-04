import { notFound } from "next/navigation";

export default function ExhibitionDetails({ params }) {
  const exhibitions = {
    1: {
      title: "Rang Manch Summer Exhibition 2026",
      location: "Kedia Kothi, Sirsi Road, Jaipur",
      date: "31 May 2026",
      time: "11:00 AM - 8:00 PM",
      image: "/exhibition1.jpeg",

      description:
        "A premium lifestyle and fashion exhibition featuring top brands, jewellery, fashion designers, home decor collections and food stalls.",

      gallery: [
        "/gallery1.jpeg",
        "/gallery2.jpeg",
        "/gallery3.jpeg",
        "/gallery4.jpeg",
        "/gallery5.jpeg",
        "/gallery6.jpeg",
        "/gallery7.jpeg",
        "/gallery8.jpeg",
        "/gallery9.jpeg",
      ],
    },
  };

  const event = exhibitions[params.id];

  if (!event) {
    notFound();
  }

  return (
    <section className="min-h-screen bg-[#fdf9f7] py-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* Banner */}
        <div className="overflow-hidden rounded-3xl shadow-lg">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg">

          <h1 className="text-4xl font-bold text-[#1e2a55]">
            {event.title}
          </h1>

          <div className="mt-6 space-y-2 text-gray-600">
            <p>
              <strong>Location:</strong> {event.location}
            </p>

            <p>
              <strong>Date:</strong> {event.date}
            </p>

            <p>
              <strong>Time:</strong> {event.time}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#1e2a55] mb-4">
              About This Exhibition
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>

        </div>

        {/* Gallery */}
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

      </div>
    </section>
  );
}