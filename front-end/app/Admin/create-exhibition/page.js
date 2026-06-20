"use client";

import { useState } from "react";
import {
  FaImage,
  FaImages,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaAlignLeft,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";

export default function CreateExhibition() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title:          "",
    location:       "",
    date:           "",
    time:           "",
    description:    "",
    status:         "coming-soon",
    image:          "",
    gallery:        [],
    entryCost:      "",
    extraTableCost: "",
  });

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload  = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCoverImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await convertToBase64(file);
    setForm((prev) => ({ ...prev, image: base64 }));
  };

  const handleGalleryImages = async (e) => {
    const files  = Array.from(e.target.files);
    const images = [];
    for (const file of files) {
      const base64 = await convertToBase64(file);
      images.push(base64);
    }
    setForm((prev) => ({ ...prev, gallery: images }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/exhibitions", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          ...form,
          entryCost:      Number(form.entryCost)      || 0,
          extraTableCost: Number(form.extraTableCost) || 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message); return; }
      alert("Exhibition Created Successfully");
      setForm({
        title: "", location: "", date: "", time: "",
        description: "", status: "coming-soon",
        image: "", gallery: [], entryCost: "", extraTableCost: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "open",        label: "Booking Open",    color: "text-green-600 bg-green-50 border-green-200" },
    { value: "coming-soon", label: "Coming Soon",     color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
    { value: "expired",     label: "Event Completed", color: "text-red-500 bg-red-50 border-red-200" },
  ];

  return (
    <section className="min-h-screen bg-[#fdf9f7] py-12">
      <div className="max-w-5xl mx-auto px-5">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e2a55]">
            Create Exhibition
          </h1>
          <p className="text-gray-500 mt-1">
            Add a new exhibition that will appear on the website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Section 1: Basic Info */}
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 md:p-8">
            <h2 className="text-base font-semibold text-[#1e2a55] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Basic Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                  Exhibition Title *
                </label>
                <div className="relative">
                  <MdOutlineTitle className="absolute left-4 top-3.5 text-gray-400 text-lg" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rang Manch Summer Exhibition 2026"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                  Location *
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kedia Kothi, Sirsi Road, Jaipur"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                    Date *
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 7 June 2026"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                    Time *
                  </label>
                  <div className="relative">
                    <FaClock className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2:00 PM - 9:00 PM"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                  Description
                </label>
                <div className="relative">
                  <FaAlignLeft className="absolute left-4 top-3.5 text-gray-400" />
                  <textarea
                    rows="4"
                    placeholder="Write a short description about this exhibition..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm resize-none focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Status */}
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 md:p-8">
            <h2 className="text-base font-semibold text-[#1e2a55] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Exhibition Status
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {statusOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    form.status === opt.value
                      ? opt.color + " border-current"
                      : "border-gray-100 hover:border-pink-200 bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    checked={form.status === opt.value}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="hidden"
                  />
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      form.status === opt.value ? "border-current" : "border-gray-300"
                    }`}
                  >
                    {form.status === opt.value && (
                      <span className="w-2 h-2 rounded-full bg-current block" />
                    )}
                  </span>
                  <span className="text-sm font-semibold">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Stall Pricing */}
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 md:p-8">
            <h2 className="text-base font-semibold text-[#1e2a55] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Stall Pricing
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                  Entry Cost (₹) *
                </label>
                <div className="relative">
                  <FaRupeeSign className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                  <input
                    type="number"
                    min="0"
                    required
                    placeholder="e.g. 2500"
                    value={form.entryCost}
                    onChange={(e) => setForm({ ...form, entryCost: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-semibold text-[#1e2a55]">
                  Extra Table Cost (₹)
                </label>
                <div className="relative">
                  <FaRupeeSign className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 500"
                    value={form.extraTableCost}
                    onChange={(e) => setForm({ ...form, extraTableCost: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section 4: Images */}
          <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 md:p-8">
            <h2 className="text-base font-semibold text-[#1e2a55] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">4</span>
              Images
            </h2>

            <div className="space-y-6">

              {/* Cover Image */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#1e2a55]">
                  Cover Image
                </label>
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-pink-200 rounded-xl py-8 cursor-pointer hover:border-pink-400 hover:bg-pink-50/40 transition group">
                  <FaImage className="text-3xl text-pink-300 group-hover:text-pink-500 transition mb-2" />
                  <span className="text-sm text-gray-500 group-hover:text-pink-600 transition font-medium">
                    Click to upload cover image
                  </span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImage}
                    className="hidden"
                  />
                </label>
                {form.image && (
                  <div className="mt-4 relative inline-block">
                    <img
                      src={form.image}
                      alt="Cover Preview"
                      className="h-44 w-auto rounded-xl object-cover shadow-md border border-pink-100"
                    />
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <FaCheckCircle className="text-xs" /> Uploaded
                    </span>
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-[#1e2a55]">
                  Gallery Images
                </label>
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-purple-200 rounded-xl py-8 cursor-pointer hover:border-purple-400 hover:bg-purple-50/40 transition group">
                  <FaImages className="text-3xl text-purple-300 group-hover:text-purple-500 transition mb-2" />
                  <span className="text-sm text-gray-500 group-hover:text-purple-600 transition font-medium">
                    Click to upload gallery images
                  </span>
                  <span className="text-xs text-gray-400 mt-1">Select multiple files</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryImages}
                    className="hidden"
                  />
                </label>

                {form.gallery.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                    {form.gallery.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt=""
                          className="h-24 w-full object-cover rounded-xl shadow-sm border border-purple-100"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {form.gallery.length > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    {form.gallery.length} image{form.gallery.length !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-semibold text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.01] transition disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-pink-200"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Creating Exhibition...
              </span>
            ) : (
              "Create Exhibition"
            )}
          </button>

        </form>
      </div>
    </section>
  );
}