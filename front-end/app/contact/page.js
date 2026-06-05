import { FaPhoneAlt, FaEnvelope, FaInstagram } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

export default function Contact() {
  return (
    <section className="bg-[#fdf9f7] min-h-screen">

      {/* HERO */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20 text-center px-5">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Get in Touch With Us
        </h1>
        <p className="max-w-2xl mx-auto text-sm md:text-base opacity-90">
          Have questions or want to exhibit with Rang Manch? We’d love to hear from you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">

        {/* CONTACT CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">

          {/* PHONE */}
          <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-xl transition">
            <div className="text-pink-500 text-3xl mb-4 flex justify-center">
              <FaPhoneAlt />
            </div>
            <h3 className="font-semibold text-lg text-[#1e2a55] mb-2">
              Call Us
            </h3>
            <p className="text-gray-600 text-sm">
              +91 8078681321
            </p>
          </div>

          {/* EMAIL */}
          <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-xl transition">
            <div className="text-pink-500 text-3xl mb-4 flex justify-center">
              <FaEnvelope />
            </div>
            <h3 className="font-semibold text-lg text-[#1e2a55] mb-2">
              Email Us
            </h3>
            <p className="text-gray-600 text-sm break-all">
              rangmunchexhibition@gmail.com
            </p>
          </div>

          {/* INSTAGRAM */}
          <div className="bg-white p-8 rounded-3xl text-center shadow-sm hover:shadow-xl transition">
            <div className="text-pink-500 text-3xl mb-4 flex justify-center">
              <FaInstagram />
            </div>
            <h3 className="font-semibold text-lg text-[#1e2a55] mb-2">
              Instagram
            </h3>
            <p className="text-gray-600 text-sm">
              @rangmanch.exhibition
            </p>
          </div>

        </div>

        {/* CONTACT FORM */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] mb-4">
              Let’s Connect
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Whether you're a brand looking to showcase your products or someone
              curious about our exhibitions, drop us a message and we’ll get back to you soon.
            </p>
          </div>

          {/* FORM */}
          <form className="bg-white p-8 rounded-3xl shadow-sm space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:scale-105 transition"
            >
              Send Message <HiArrowRight />
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}