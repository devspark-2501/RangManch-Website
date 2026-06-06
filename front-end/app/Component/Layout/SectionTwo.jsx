import {
  FaUsers,
  FaBullhorn,
  FaStore,
  FaChartLine,
  FaTshirt,
  FaGem,
  FaGift,
  FaHome,
  FaStar,
} from "react-icons/fa";

import {
  GiLipstick,
  GiAmpleDress,
  GiNecklace,
  GiCupcake,
} from "react-icons/gi";

import { HiArrowRight } from "react-icons/hi";

const reviews = [
  { name: "Tanushi Mathur", role: "Fashion Vendor", text: "Rang Manch gave my boutique the perfect platform. The footfall was incredible and sales were amazing!", stars: 5 },
  { name: "Priya Sharma", role: "Jewellery Designer", text: "Extremely well-organized event. The audience was premium and genuinely interested in buying.", stars: 5 },
  { name: "Anita Verma", role: "Home Decor Seller", text: "Best exhibition I have participated in. The promotion before the event brought real customers.", stars: 5 },
  { name: "Rekha Gupta", role: "Visitor", text: "Loved every stall! Such a beautiful collection of products under one roof. Will come again!", stars: 5 },
  { name: "Meena Joshi", role: "Cosmetics Brand", text: "The organizers were very supportive. Our brand got amazing visibility at Rang Manch.", stars: 5 },
  { name: "Sonal Agarwal", role: "Kids Wear Vendor", text: "Sold out almost everything! The crowd quality at Rang Manch is unmatched in Jaipur.", stars: 5 },
  { name: "Divya Rathore", role: "Accessories Seller", text: "Perfect platform for small businesses to grow. Highly recommended for every vendor.", stars: 5 },
  { name: "Kavita Singh", role: "Visitor", text: "Such a lovely experience! Found so many unique handmade products. Truly curated.", stars: 5 },
  { name: "Sunita Yadav", role: "Food Stall Owner", text: "Great response from visitors. Our stall had a queue throughout the day. Fantastic event!", stars: 5 },
  { name: "Pooja Mehta", role: "Gifting Brand", text: "Rang Manch connects the right buyers with the right sellers. My sales doubled this season.", stars: 5 },
  { name: "Nisha Tiwari", role: "Clothing Vendor", text: "A warm and well-managed event. The branding and promotion were top-notch throughout.", stars: 5 },
  { name: "Ritu Bansal", role: "Visitor", text: "Came with friends and spent hours exploring. Every stall had something special to offer.", stars: 5 },
];

export default function SectionTwo() {
  const benefits = [
    { icon: <FaUsers />, title: "Premium Audience", desc: "Direct access to high-income families in premium societies." },
    { icon: <FaBullhorn />, title: "Maximum Visibility", desc: "Pre & post-event promotion across multiple platforms." },
    { icon: <FaStore />, title: "Curated Experience", desc: "Well-organized events with quality vendors and strong footfall." },
    { icon: <FaChartLine />, title: "Better Sales", desc: "Right audience, right platform, better business outcomes." },
  ];

  const categories = [
    { icon: <GiAmpleDress />, name: "Fashion" },
    { icon: <GiNecklace />, name: "Jewellery" },
    { icon: <FaGem />, name: "Accessories" },
    { icon: <FaHome />, name: "Home Decor" },
    { icon: <FaGift />, name: "Gifting" },
    { icon: <GiLipstick />, name: "Beauty" },
    { icon: <FaTshirt />, name: "Kids Wear" },
    { icon: <GiCupcake />, name: "Food & More" },
  ];

  // Duplicate reviews for seamless infinite loop
  const allReviews = [...reviews, ...reviews];

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
            <div key={index} className="bg-[#fdf9f7] rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-white border border-pink-100 shadow-sm flex items-center justify-center text-4xl text-pink-500 mx-auto mb-5">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg text-[#1e2a55] mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* TOP CATEGORIES */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">Top Categories</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 mb-12">
          {categories.map((item, index) => (
            <div key={index} className="group flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#fdf9f7] flex items-center justify-center text-3xl text-[#b38b59] group-hover:scale-110 group-hover:bg-pink-50 transition-all duration-300">
                {item.icon}
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700 text-center">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-20">
          <button className="inline-flex items-center gap-2 border border-pink-300 px-8 py-3 rounded-xl text-pink-600 font-medium hover:bg-pink-50 transition">
            Explore All Categories
            <HiArrowRight />
          </button>
        </div>

        {/* ── REVIEWS TICKER ── */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">
            What People Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Marquee track */}
        <div className="relative overflow-hidden mb-20">
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent" />

          <div className="flex gap-5 w-max animate-marquee">
            {allReviews.map((review, i) => (
              <div
                key={i}
                className="w-72 flex-shrink-0 bg-[#fdf9f7] border border-pink-100 rounded-2xl p-6 shadow-sm"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <FaStar key={s} className="text-yellow-400 text-sm" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1e2a55] leading-tight">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GALLERY */}
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] uppercase">
            Glimpses From Our Exhibitions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          {[5, 2, 7, 3, 9].map((item) => (
            <div key={item} className="group overflow-hidden rounded-2xl">
              <img
                src={`/gallery${item}.jpeg`}
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

      {/* Marquee keyframe */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}