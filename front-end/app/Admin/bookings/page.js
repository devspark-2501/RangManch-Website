"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaUsers,
  FaSearch,
  FaTable,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaStore,
  FaTag,
  FaInstagram,
  FaBoxOpen,
} from "react-icons/fa";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/Admin/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return bookings;
    return bookings.filter(
      (b) =>
        b.vendorName?.toLowerCase().includes(q) ||
        b.businessName?.toLowerCase().includes(q) ||
        b.email?.toLowerCase().includes(q)
    );
  }, [search, bookings]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#fdf9f7] p-6 md:p-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e2a55]">
          Stall Bookings
        </h1>
        <p className="text-gray-500 mt-1">
          All vendor booking requests from Rang Manch exhibitions.
        </p>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <FaUsers className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
            <p className="text-4xl font-bold text-[#1e2a55] leading-tight">
              {loading ? "—" : bookings.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
            <FaTable className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Extra Tables Requested</p>
            <p className="text-4xl font-bold text-[#1e2a55] leading-tight">
              {loading ? "—" : bookings.filter((b) => b.extraTable === "Yes").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center flex-shrink-0">
            <FaCalendarAlt className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Latest Booking</p>
            <p className="text-lg font-bold text-[#1e2a55] leading-tight">
              {loading || bookings.length === 0 ? "—" : formatDate(bookings[0]?.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-5 mb-6 flex items-center gap-4">
        <FaSearch className="text-gray-400 text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by vendor name, business name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-xs text-pink-500 font-semibold hover:text-pink-700 flex-shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading bookings...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 text-red-400">
            <p className="font-semibold">Failed to load bookings</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FaBoxOpen className="text-5xl mb-4 text-pink-200" />
            <p className="font-semibold text-lg text-gray-500">
              {search ? "No bookings match your search." : "No Bookings Found"}
            </p>
            <p className="text-sm mt-1">
              {search
                ? "Try a different keyword."
                : "Booking requests will appear here once vendors submit."}
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100">
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaStore className="text-pink-400" /> Vendor</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaStore className="text-pink-400" /> Business</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaPhone className="text-pink-400" /> Mobile</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaEnvelope className="text-pink-400" /> Email</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaTag className="text-pink-400" /> Category</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaInstagram className="text-pink-400" /> Social</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaTable className="text-pink-400" /> Extra Table</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaCalendarAlt className="text-pink-400" /> Submitted</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking, i) => (
                  <tr
                    key={booking._id}
                    className={`border-b border-gray-50 hover:bg-pink-50/40 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                      {booking.vendorName || "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      {booking.businessName || "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      <a
                        href={`tel:${booking.mobile}`}
                        className="hover:text-pink-600 transition"
                      >
                        {booking.mobile || "—"}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      <a
                        href={`mailto:${booking.email}`}
                        className="hover:text-pink-600 transition"
                      >
                        {booking.email || "—"}
                      </a>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                        {booking.category || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      {booking.social || "—"}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.extraTable === "Yes"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.extraTable || "No"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(booking.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer row count */}
            <div className="px-5 py-3 border-t border-pink-50 bg-gray-50/50 text-xs text-gray-400">
              Showing {filtered.length} of {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}