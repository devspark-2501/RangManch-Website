import {
  FaUsers,
  FaBullhorn,
  FaStore,
  FaChartLine,
  FaTshirt,
  FaGem,
  FaGift,
  FaHome,
} from "react-icons/fa";

import {
  GiLipstick,
  GiAmpleDress,
  GiNecklace,
  GiCupcake,
} from "react-icons/gi";

import { HiArrowRight } from "react-icons/hi";

export default function SectionTwo() {
  const benefits = [
    {
      icon: <FaUsers />,
      title: "Premium Audience",
      desc: "Direct access to high-income families in premium societies.",
    },
    {
      icon: <FaBullhorn />,
      title: "Maximum Visibility",
      desc: "Pre & post-event promotion across multiple platforms.",
    },
    {
      icon: <FaStore />,
      title: "Curated Experience",
      desc: "Well-organized events with quality vendors and strong footfall.",
    },
    {
      icon: <FaChartLine />,
      title: "Better Sales",
      desc: "Right audience, right platform, better business outcomes.",
    },
  ];

  const categories = [
    {
      icon: <GiAmpleDress />,
      name: "Fashion",
    },
    {
      icon: <GiNecklace />,
      name: "Jewellery",
    },
    {
      icon: <FaGem />,
      name: "Accessories",
    },
    {
      icon: <FaHome />,
      name: "Home Decor",
    },
    {
      icon: <FaGift />,
      name: "Gifting",
    },
    {
      icon: <GiLipstick />,
      name: "Beauty",
    },
    {
      icon: <FaTshirt />,
      name: "Kids Wear",
    },
    {
      icon: <GiCupcake />,
      name: "Food & More",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* WHY EXHIBIT */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">
            Why Exhibit With Rang Manch?
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-3"></div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-[#fdf9f7] rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full bg-white border border-pink-100 shadow-sm flex items-center justify-center text-4xl text-pink-500 mx-auto mb-5">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg text-[#1e2a55] mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* TOP CATEGORIES */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">
            Top Categories
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
          {categories.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#fdf9f7] flex items-center justify-center text-3xl text-[#b38b59] group-hover:scale-110 group-hover:bg-pink-50 transition-all duration-300">
                {item.icon}
              </div>

              <p className="mt-3 text-sm font-medium text-gray-700 text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-20">
          <button className="inline-flex items-center gap-2 border border-pink-300 px-8 py-3 rounded-xl text-pink-600 font-medium hover:bg-pink-50 transition">
            Explore All Categories
            <HiArrowRight />
          </button>
        </div>

        {/* GALLERY */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">
            Glimpses From Our Exhibitions
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">

          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="group overflow-hidden rounded-2xl"
            >
              <img
                src={`/gallery${item}.jpg`}
                alt={`Gallery ${item}`}
                className="w-full h-[220px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}

        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition">
            View Full Gallery
            <HiArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
}