export default function SectionTwo() {
  const benefits = [
    {
      icon: "👥",
      title: "Premium Audience",
      desc: "Direct access to high income families in premium societies.",
    },
    {
      icon: "📢",
      title: "Maximum Visibility",
      desc: "Pre & post event promotion across multiple platforms.",
    },
    {
      icon: "🏪",
      title: "Curated Experience",
      desc: "Well-organized events with quality vendors and footfall.",
    },
    {
      icon: "📈",
      title: "Better Sales",
      desc: "Right audience, right platform, better business.",
    },
  ];

  const categories = [
    "👗 Fashion",
    "💎 Jewellery",
    "👜 Accessories",
    "🏠 Home Decor",
    "🎁 Gifting",
    "💄 Beauty",
    "👕 Kids Wear",
    "🍰 Food & More",
  ];

  const gallery = [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* WHY EXHIBIT */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">
            Why Exhibit With Rang Manch?
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-[#fdf9f7] p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-white border flex items-center justify-center text-4xl mb-5">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg text-[#1e2a55] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* TOP CATEGORIES */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">
            Top Categories
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-10">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#fdf9f7] flex items-center justify-center text-3xl mb-3 hover:scale-110 transition">
                {category.split(" ")[0]}
              </div>

              <p className="text-sm font-medium text-gray-700">
                {category.substring(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-20">
          <button className="border border-pink-300 text-pink-600 px-8 py-3 rounded-xl font-medium hover:bg-pink-50 transition">
            Explore All Categories →
          </button>
        </div>

        {/* GALLERY */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">
            Glimpses From Our Exhibitions
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {gallery.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl shadow-md group"
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:scale-105 transition">
            View Full Gallery →
          </button>
        </div>
      </div>
    </section>
  );
}