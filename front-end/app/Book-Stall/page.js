"use client";

import { useState } from "react";
import {
  FaStore,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaCheckCircle,
} from "react-icons/fa";

export default function BookStall() {
  const [form, setForm] = useState({
    vendorName: "",
    businessName: "",
    mobile: "",
    email: "",
    category: "",
    products: "",
    social: "",
    extraTable: "No",
    terms: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    alert("Booking request submitted!");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fdf9f7] via-pink-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-5">

        {/* Hero */}
        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-600 font-medium mb-6">
            <FaStore />
            Vendor Registration
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#1e2a55]">
            Book Your Stall
          </h1>

          <p className="max-w-3xl mx-auto mt-5 text-gray-600 text-lg leading-relaxed">
            Reserve your space at the upcoming Rang Manch Exhibition and
            showcase your products to thousands of premium shoppers.
          </p>

          <div className="w-28 h-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-6"></div>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">

              <h3 className="text-2xl font-bold text-[#1e2a55] mb-6">
                Why Exhibit With Us?
              </h3>

              <div className="space-y-5">

                <div className="flex gap-3">
                  <FaCheckCircle className="text-pink-500 mt-1" />
                  <p className="text-gray-600">
                    Reach premium families and high-value customers.
                  </p>
                </div>

                <div className="flex gap-3">
                  <FaCheckCircle className="text-pink-500 mt-1" />
                  <p className="text-gray-600">
                    Strong promotion before and after every event.
                  </p>
                </div>

                <div className="flex gap-3">
                  <FaCheckCircle className="text-pink-500 mt-1" />
                  <p className="text-gray-600">
                    Quality footfall and serious buyers.
                  </p>
                </div>

                <div className="flex gap-3">
                  <FaCheckCircle className="text-pink-500 mt-1" />
                  <p className="text-gray-600">
                    Build brand awareness and generate sales.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-[32px] shadow-2xl border border-pink-100 p-8 md:p-10">

              <form onSubmit={handleSubmit}>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="font-semibold text-[#1e2a55] block mb-2">
                      Vendor Name *
                    </label>

                    <input
                      type="text"
                      required
                      className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1e2a55] block mb-2">
                      Business Name *
                    </label>

                    <input
                      type="text"
                      required
                      className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#1e2a55] block mb-2">
                      Mobile Number *
                    </label>

                    <div className="relative">
                      <FaPhone className="absolute left-4 top-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-[#1e2a55] block mb-2">
                      Email Address *
                    </label>

                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                </div>

                <div className="mt-6">
                  <label className="font-semibold text-[#1e2a55] block mb-2">
                    Product Category *
                  </label>

                  <select
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-500"
                  >
                    <option>Select Category</option>
                    <option>Clothing</option>
                    <option>Jewellery</option>
                    <option>Home Decor</option>
                    <option>Food & Beverages</option>
                    <option>Handicrafts</option>
                    <option>Cosmetics</option>
                    <option>Kids Products</option>
                    <option>Accessories</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mt-6">
                  <label className="font-semibold text-[#1e2a55] block mb-2">
                    What Products Will You Showcase?
                  </label>

                  <textarea
                    rows="5"
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 resize-none focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="mt-6">
                  <label className="font-semibold text-[#1e2a55] block mb-2">
                    Instagram / Facebook Page
                  </label>

                  <div className="relative">
                    <FaInstagram className="absolute left-4 top-5 text-gray-400" />
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label className="font-semibold text-[#1e2a55] block mb-4">
                    Extra Table Required?
                  </label>

                  <div className="grid grid-cols-2 gap-4">

                    <label className="border rounded-2xl p-5 cursor-pointer hover:border-pink-500">
                      <input type="radio" name="table" className="mr-2" />
                      Yes
                    </label>

                    <label className="border rounded-2xl p-5 cursor-pointer hover:border-pink-500">
                      <input type="radio" name="table" className="mr-2" defaultChecked />
                      No
                    </label>

                  </div>
                </div>

                <div className="mt-8">
                  <label className="flex gap-3">
                    <input type="checkbox" required />
                    <span className="text-gray-700">
                      I agree to the exhibition terms and conditions.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.01] transition"
                >
                  Reserve My Stall
                </button>

              </form>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
