import { FaUsers, FaStore, FaHeart } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

export default function About() {
  return (
    <section className="bg-[#fdf9f7]">

      {/* HERO */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20 text-center px-5">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Bringing Communities & Brands Together
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base opacity-90">
          Rang Manch is redefining local shopping experiences through curated
          exhibitions inside premium residential societies.
        </p>

        <button className="mt-6 inline-flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-xl font-medium hover:scale-105 transition">
          Explore Exhibitions <HiArrowRight />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">

        {/* MAIN CONTENT */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          {/* TEXT */}
          <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55]">
              About Rang Manch
            </h2>

            <p>
              <span className="font-semibold text-[#1e2a55]">
                Rang Manch
              </span>{" "}
              is a community-driven exhibition platform dedicated to bringing
              local businesses, emerging brands, artisans, and entrepreneurs
              closer to their customers.
            </p>

            <p>
              We organize curated exhibitions every weekend in residential
              societies across Jaipur, creating vibrant shopping experiences.
            </p>

            <p>
              From fashion, jewelry, home décor to food and handcrafted
              creations — Rang Manch offers a diverse marketplace.
            </p>

            <p>
              We create experiences where businesses grow and communities connect.
            </p>
          </div>

          {/* IMAGE GRID ✅ FIXED */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/gallery1.jpeg"
              alt="Exhibition 1"
              className="rounded-2xl h-40 w-full object-cover hover:scale-105 transition"
            />
            <img
              src="/gallery2.jpeg"
              alt="Exhibition 2"
              className="rounded-2xl h-60 w-full object-cover hover:scale-105 transition"
            />
            <img
              src="/gallery3.jpeg"
              alt="Exhibition 3"
              className="rounded-2xl h-60 w-full object-cover hover:scale-105 transition"
            />
            <img
              src="/gallery4.jpeg"
              alt="Exhibition 4"
              className="rounded-2xl h-40 w-full object-cover hover:scale-105 transition"
            />
          </div>

        </div>

        {/* VALUE CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">

          <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-xl transition">
            <div className="text-pink-500 text-4xl mb-4 flex justify-center">
              <FaUsers />
            </div>
            <h3 className="font-semibold text-lg text-[#1e2a55] mb-2">
              Community First
            </h3>
            <p className="text-gray-600 text-sm">
              We bring people together through engaging local experiences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-xl transition">
            <div className="text-pink-500 text-4xl mb-4 flex justify-center">
              <FaStore />
            </div>
            <h3 className="font-semibold text-lg text-[#1e2a55] mb-2">
              Empowering Brands
            </h3>
            <p className="text-gray-600 text-sm">
              Helping businesses grow with the right audience.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-xl transition">
            <div className="text-pink-500 text-4xl mb-4 flex justify-center">
              <FaHeart />
            </div>
            <h3 className="font-semibold text-lg text-[#1e2a55] mb-2">
              Memorable Experiences
            </h3>
            <p className="text-gray-600 text-sm">
              Vibrant exhibitions that people love to visit.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl text-white p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Be a Part of Rang Manch
          </h2>
          <p className="opacity-90 mb-6 text-sm md:text-base">
            Discover, shop, and connect every weekend.
          </p>

          <button className="bg-white text-pink-600 px-8 py-3 rounded-xl font-medium hover:scale-105 transition">
            Join Now
          </button>
        </div>

      </div>
    </section>
  );
}