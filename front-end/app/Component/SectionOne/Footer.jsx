import Image from "next/image";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { HiArrowRight } from "react-icons/hi";

export default function Footer() {
  return (
    <footer>

      {/* CTA SECTION */}
      <section className="bg-white py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-5">

          <div className="bg-white rounded-2xl shadow-md p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">

            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">

              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                🏪
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1e2a55]">
                  Ready to showcase your brand?
                </h3>

                <p className="text-gray-600 mt-2">
                  Book your stall today and be a part of our next successful
                  exhibition.
                </p>
              </div>

            </div>

            <div className="flex flex-col gap-3 w-full lg:w-auto">

              <button className="px-8 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center gap-2 hover:scale-105 transition">
                Book Your Stall Now
                <HiArrowRight />
              </button>

              <button className="flex items-center justify-center gap-2 text-green-600 font-medium">
                <FaWhatsapp />
                Chat on WhatsApp
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* MAIN FOOTER */}
      <section className="bg-[#10243d] text-white">
        <div className="max-w-7xl mx-auto px-5 py-14">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* LOGO */}
            <div>
              <Image
                src="/rm_logo.png"
                alt="Rang Manch"
                width={140}
                height={70}
                className="mb-4"
              />

              <p className="text-gray-300 text-sm leading-relaxed">
                Connecting premium brands with premium audiences through
                curated exhibitions.
              </p>

              <div className="flex gap-3 mt-5">

                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#10243d] transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#10243d] transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center hover:bg-white hover:text-[#10243d] transition"
                >
                  <FaYoutube />
                </a>

              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="font-semibold text-lg mb-5">
                Quick Links
              </h3>

              <ul className="space-y-3 text-gray-300 text-sm">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Exhibitions</a></li>
                <li><a href="#">Vendors</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            {/* INFORMATION */}
            <div>
              <h3 className="font-semibold text-lg mb-5">
                Information
              </h3>

              <ul className="space-y-3 text-gray-300 text-sm">
                <li><a href="#">Vendor Registration</a></li>
                <li><a href="#">Stall Details</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="font-semibold text-lg mb-5">
                Contact Us
              </h3>

              <ul className="space-y-4 text-sm text-gray-300">

                <li className="flex gap-3">
                  <FaMapMarkerAlt className="mt-1 text-pink-400" />
                  <span>Jaipur, Rajasthan, India</span>
                </li>

                <li className="flex gap-3">
                  <FaPhoneAlt className="mt-1 text-pink-400" />
                  <span>+91 98765 43210</span>
                </li>

                <li className="flex gap-3">
                  <FaEnvelope className="mt-1 text-pink-400" />
                  <span>info@rangmanchexhibition.com</span>
                </li>

                <li>
                  <button className="mt-2 px-4 py-2 bg-green-600 rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
                    <FaWhatsapp />
                    WhatsApp Us
                  </button>
                </li>

              </ul>
            </div>

            {/* NEWSLETTER */}
            <div>
              <h3 className="font-semibold text-lg mb-5">
                Newsletter
              </h3>

              <p className="text-sm text-gray-300 mb-4">
                Stay updated with our latest exhibitions.
              </p>

              <div className="flex overflow-hidden rounded-lg bg-white">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 text-gray-700 outline-none"
                />

                <button className="px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                  <HiArrowRight />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
          © 2026 Rang Manch Exhibition. All Rights Reserved.
        </div>

      </section>

    </footer>
  );
}