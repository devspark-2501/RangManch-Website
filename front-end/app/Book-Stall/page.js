"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  FaStore,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaCheckCircle,
  FaTimes,
  FaRupeeSign,
  FaChevronDown,
} from "react-icons/fa";
import { getEffectiveStatus } from "@/lib/exhibitionStatus";

function BookStallContent() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get("event"); // ?event=<exhibitionId>

  // ── Exhibition state ─────────────────────────────────────────────────
  const [openExhibitions, setOpenExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [loadingExhibitions, setLoadingExhibitions] = useState(true);

  // ── Form state ───────────────────────────────────────────────────────
  const [form, setForm] = useState({
    vendorName:   "",
    businessName: "",
    mobile:       "",
    email:        "",
    category:     "",
    products:     "",
    social:       "",
    extraTableCount: 0,
    terms:        false,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading]         = useState(false);

  // ── Derived pricing ──────────────────────────────────────────────────
  const entryCost      = selectedExhibition?.entryCost     ?? 0;
  const extraTableCost = selectedExhibition?.extraTableCost ?? 0;
  const totalAmount    = entryCost + (form.extraTableCount * extraTableCost);

  // ── Fetch open exhibitions on mount ──────────────────────────────────
  useEffect(() => {
    const fetchExhibitions = async () => {
      setLoadingExhibitions(true);
      try {
        const res  = await fetch("/api/exhibitions", { cache: "no-store" });
        const data = await res.json();

        // Only exhibitions whose EFFECTIVE status is "open" — never trust
        // the raw DB "status" field directly, since it goes stale once an
        // exhibition's createdAt passes the expiry window.
        const open = (Array.isArray(data) ? data : []).filter(
          (ex) => getEffectiveStatus(ex) === "open"
        );
        setOpenExhibitions(open);

        // If ?event= param present, pre-select that exhibition —
        // but only if it's still effectively open.
        if (eventParam) {
          const match = open.find((ex) => ex._id === eventParam);
          if (match) setSelectedExhibition(match);
        }
      } catch (err) {
        console.error("Failed to fetch exhibitions:", err);
      } finally {
        setLoadingExhibitions(false);
      }
    };
    fetchExhibitions();
  }, [eventParam]);

  // ── Safety net: if the currently selected exhibition ever stops being
  // effectively open (e.g. it expires while the user is mid-form), clear
  // the selection automatically rather than let a stale booking proceed.
  useEffect(() => {
    if (selectedExhibition && getEffectiveStatus(selectedExhibition) !== "open") {
      setSelectedExhibition(null);
      setForm((prev) => ({ ...prev, extraTableCount: 0 }));
    }
  }, [selectedExhibition]);

  // ── Handlers ─────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleExhibitionSelect = (e) => {
    const id  = e.target.value;
    const exh = openExhibitions.find((ex) => ex._id === id) ?? null;
    setSelectedExhibition(exh);
    // Reset extra tables when exhibition changes
    setForm((prev) => ({ ...prev, extraTableCount: 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedExhibition) {
      alert("Please select an exhibition first.");
      return;
    }

    // Final guard: re-check effective status right before submitting,
    // in case time passed between selection and submit.
    if (getEffectiveStatus(selectedExhibition) !== "open") {
      alert("This exhibition is no longer open for booking. Please select another.");
      setSelectedExhibition(null);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/book-stall", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          exhibitionId:    selectedExhibition._id,
          exhibitionTitle: selectedExhibition.title,
          entryCost,
          extraTableCost,
          extraTableCount: Number(form.extraTableCount),
          totalAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setShowSuccess(true);
      setForm({
        vendorName: "", businessName: "", mobile: "", email: "",
        category: "", products: "", social: "", extraTableCount: 0, terms: false,
      });
      setSelectedExhibition(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeSuccess = () => setShowSuccess(false);

  // ═══════════════════════════════════════════════════════════════════════
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
          <div className="w-28 h-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left: Why Exhibit ──────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-[#1e2a55] mb-6">
                Why Exhibit With Us?
              </h3>
              <div className="space-y-5">
                {[
                  "Reach premium families and high-value customers.",
                  "Strong promotion before and after every event.",
                  "Quality footfall and serious buyers.",
                  "Build brand awareness and generate sales.",
                ].map((point) => (
                  <div key={point} className="flex gap-3">
                    <FaCheckCircle className="text-pink-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Form ────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* ── Exhibition Selector ─────────────────────────────────── */}
            <div className="bg-white rounded-[32px] shadow-2xl border border-pink-100 p-8 md:p-10">
              <h2 className="text-base font-semibold text-[#1e2a55] mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Select Exhibition
              </h2>

              {loadingExhibitions ? (
                <div className="flex items-center gap-3 text-gray-400 text-sm py-3">
                  <div className="w-4 h-4 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
                  Loading open exhibitions...
                </div>
              ) : openExhibitions.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-yellow-700 text-sm font-medium">
                  No exhibitions are currently open for booking. Check back soon.
                </div>
              ) : (
                <div className="relative">
                  <FaChevronDown className="absolute right-4 top-4 text-gray-400 text-xs pointer-events-none" />
                  <select
                    value={selectedExhibition?._id ?? ""}
                    onChange={handleExhibitionSelect}
                    className="w-full appearance-none border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-500 bg-white pr-10 text-gray-700"
                  >
                    <option value="">— Select an Exhibition —</option>
                    {openExhibitions.map((ex) => (
                      <option key={ex._id} value={ex._id}>
                        {ex.title} {ex.date ? `(${ex.date})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* ── Pricing Card (visible once exhibition selected) ──────── */}
            {selectedExhibition && (
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-[32px] border border-pink-100 shadow-md p-8">
                <h2 className="text-base font-semibold text-[#1e2a55] mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Stall Pricing
                </h2>

                {/* Selected exhibition summary */}
                <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-pink-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
                    Selected Exhibition
                  </p>
                  <p className="text-[#1e2a55] font-bold text-lg">
                    {selectedExhibition.title}
                  </p>
                  {selectedExhibition.date && (
                    <p className="text-gray-500 text-sm mt-0.5">
                      {selectedExhibition.date}
                      {selectedExhibition.location ? ` · ${selectedExhibition.location}` : ""}
                    </p>
                  )}
                </div>

                {/* Cost breakdown */}
                <div className="space-y-3">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stall Entry Cost</span>
                    <span className="font-semibold text-[#1e2a55] flex items-center gap-1">
                      <FaRupeeSign className="text-xs" />
                      {entryCost.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Extra Table Cost (per table)</span>
                    <span className="font-semibold text-[#1e2a55] flex items-center gap-1">
                      <FaRupeeSign className="text-xs" />
                      {extraTableCost.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Extra table count input */}
                  <div className="pt-2">
                    <label className="block text-sm font-semibold text-[#1e2a55] mb-2">
                      Number of Extra Tables
                    </label>
                    <input
                      type="number"
                      name="extraTableCount"
                      min="0"
                      value={form.extraTableCount}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition"
                    />
                  </div>

                  <div className="border-t border-pink-200 pt-4 mt-2 flex items-center justify-between">
                    <span className="font-bold text-[#1e2a55]">Total Amount Payable</span>
                    <span className="text-2xl font-bold text-pink-600 flex items-center gap-1">
                      <FaRupeeSign className="text-base" />
                      {totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                </div>
              </div>
            )}

            {/* ── Vendor Details Form ──────────────────────────────────── */}
            <div className="bg-white rounded-[32px] shadow-2xl border border-pink-100 p-8 md:p-10">
              <h2 className="text-base font-semibold text-[#1e2a55] mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs flex items-center justify-center font-bold">
                  {selectedExhibition ? "3" : "2"}
                </span>
                Vendor Details
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-semibold text-[#1e2a55] block mb-2">
                      Vendor Name *
                    </label>
                    <input
                      type="text"
                      name="vendorName"
                      value={form.vendorName}
                      onChange={handleChange}
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
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
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
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
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
                        name="email"
                        value={form.email}
                        onChange={handleChange}
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
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-pink-500"
                  >
                    <option value="">Select Category</option>
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
                    name="products"
                    value={form.products}
                    onChange={handleChange}
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
                      name="social"
                      value={form.social}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  <label className="flex gap-3 cursor-pointer items-start">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={form.terms}
                      onChange={handleChange}
                      required
                      className="mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      I agree to the exhibition{" "}
                      <a
                        href="/read-more"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 underline hover:text-purple-600 transition font-medium"
                      >
                        terms and conditions
                      </a>
                      .
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !selectedExhibition}
                  className="w-full mt-8 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.01] transition disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? "Submitting..." : "Reserve My Stall"}
                </button>

                {!selectedExhibition && !loadingExhibitions && openExhibitions.length > 0 && (
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Please select an exhibition above to continue.
                  </p>
                )}

              </form>
            </div>

          </div>
        </div>
      </div>

      {/* ── Backdrop ─────────────────────────────────────────────────── */}
      {showSuccess && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeSuccess}
        />
      )}

      {/* ── Success Panel ────────────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm z-50 bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          showSuccess ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ touchAction: "pan-y" }}
      >
        <div className="h-2 w-full bg-gradient-to-r from-pink-500 to-purple-600" />

        <div className="flex justify-end px-6 pt-5">
          <button
            onClick={closeSuccess}
            className="text-gray-400 hover:text-gray-600 transition p-1"
            aria-label="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 px-8 pb-12 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-6 shadow-lg">
            <FaCheckCircle className="text-4xl text-pink-500" />
          </div>

          <h2 className="text-2xl font-bold text-[#1e2a55] mb-3 leading-snug">
            Thank you for your interest in Rang Manch!
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Your stall booking request has been submitted successfully. Our team
            will get in touch with you shortly to confirm availability and share
            payment details.
          </p>

          <div className="w-full bg-pink-50 rounded-2xl p-5 space-y-3 text-left">
            <a
              href="tel:+918078681321"
              className="flex items-center gap-3 text-[#1e2a55] font-medium hover:text-pink-600 transition"
            >
              <span className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0">
                <FaPhone className="text-pink-500 text-sm" />
              </span>
              +91 8078681321
            </a>

            <a
              href="mailto:rangmanchexhibition@gmail.com"
              className="flex items-center gap-3 text-[#1e2a55] font-medium hover:text-pink-600 transition break-all"
            >
              <span className="w-9 h-9 rounded-full bg-white shadow flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="text-pink-500 text-sm" />
              </span>
              rangmanchexhibition@gmail.com
            </a>
          </div>

          <button
            onClick={closeSuccess}
            className="mt-8 w-full py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.01] transition"
          >
            Done
          </button>

          <p className="mt-4 text-xs text-gray-400">
            Swipe right or tap ✕ to close
          </p>
        </div>
      </div>
    </section>
  );
}

export default function BookStall() {
  return (
    <Suspense fallback={null}>
      <BookStallContent />
    </Suspense>
  );
}