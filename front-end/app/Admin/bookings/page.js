"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaUsers,
  FaSearch,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaStore,
  FaTag,
  FaBoxOpen,
  FaRupeeSign,
  FaCheckCircle,
  FaReceipt,
} from "react-icons/fa";

function BookingStatusBadge({ status }) {
  const map = {
    "Confirmed":  "bg-green-100 text-green-700",
    "Pending":    "bg-yellow-100 text-yellow-700",
    "Cancelled":  "bg-red-100 text-red-600",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status ?? "Pending"}
    </span>
  );
}

function PaymentStatusBadge({ status }) {
  const map = {
    "Paid":     "bg-green-100 text-green-700",
    "Created":  "bg-yellow-100 text-yellow-700",
    "Failed":   "bg-red-100 text-red-600",
    "Refunded": "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status ?? "—"}
    </span>
  );
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [search,   setSearch]   = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [bRes, pRes] = await Promise.all([
          fetch("/api/Admin/bookings"),
          fetch("/api/payment"),
        ]);
        if (!bRes.ok) throw new Error("Failed to fetch bookings");
        if (!pRes.ok) throw new Error("Failed to fetch payments");
        const [bData, pData] = await Promise.all([bRes.json(), pRes.json()]);
        setBookings(bData);
        setPayments(pData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // Merge: one row per booking, payment attached
  const rows = useMemo(() => {
    return bookings.map((b) => {
      const payment = payments.find(
        (p) => p.bookingId === b._id || p.bookingId?.toString() === b._id?.toString()
      ) ?? null;
      return { ...b, payment };
    });
  }, [bookings, payments]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.vendorName?.toLowerCase().includes(q)       ||
        r.businessName?.toLowerCase().includes(q)     ||
        r.email?.toLowerCase().includes(q)            ||
        r.exhibitionTitle?.toLowerCase().includes(q)
    );
  }, [search, rows]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const totalRevenue = useMemo(() =>
    payments
      .filter((p) => p.paymentStatus === "Paid")
      .reduce((sum, p) => sum + (p.amount ?? 0), 0),
    [payments]
  );

  const confirmedCount = useMemo(() =>
    bookings.filter((b) => b.status === "Confirmed").length,
    [bookings]
  );

  // ═══════════════════════════════════════════════════════════════════════
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

      {/* Stats */}
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center flex-shrink-0">
            <FaCheckCircle className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Confirmed</p>
            <p className="text-4xl font-bold text-[#1e2a55] leading-tight">
              {loading ? "—" : confirmedCount}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
            <FaRupeeSign className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Revenue Collected</p>
            <p className="text-2xl font-bold text-[#1e2a55] leading-tight">
              {loading ? "—" : `₹${totalRevenue.toLocaleString("en-IN")}`}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-5 mb-6 flex items-center gap-4">
        <FaSearch className="text-gray-400 text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by vendor, business, email or exhibition..."
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

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading bookings...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 text-red-400">
            <p className="font-semibold">Failed to load bookings</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FaBoxOpen className="text-5xl mb-4 text-pink-200" />
            <p className="font-semibold text-lg text-gray-500">
              {search ? "No bookings match your search." : "No Bookings Found"}
            </p>
            <p className="text-sm mt-1">
              {search ? "Try a different keyword." : "Booking requests will appear here once vendors submit."}
            </p>
          </div>
        )}

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
                    <span className="flex items-center gap-2"><FaCalendarAlt className="text-pink-400" /> Exhibition</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaRupeeSign className="text-pink-400" /> Amount</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaReceipt className="text-pink-400" /> Razorpay Order</span>
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    Payment Status
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    Booking Status
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    <span className="flex items-center gap-2"><FaCalendarAlt className="text-pink-400" /> Submitted</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={row._id}
                    className={`border-b border-gray-50 hover:bg-pink-50/40 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                      {row.vendorName || "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      {row.businessName || "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      <a href={`tel:${row.mobile}`} className="hover:text-pink-600 transition">
                        {row.mobile || "—"}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                      <a href={`mailto:${row.email}`} className="hover:text-pink-600 transition">
                        {row.email || "—"}
                      </a>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                        {row.category || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-[#1e2a55] font-medium text-xs">
                        {row.exhibitionTitle || "—"}
                      </div>
                      {row.exhibitionDate && (
                        <div className="text-gray-400 text-xs">{row.exhibitionDate}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-bold text-[#1e2a55] flex items-center gap-0.5">
                        <FaRupeeSign className="text-xs text-pink-500" />
                        {(row.payment?.amount ?? row.totalAmount)?.toLocaleString("en-IN") ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-gray-500 text-xs font-mono">
                        {row.payment?.razorpayOrderId
                          ? row.payment.razorpayOrderId.slice(0, 16) + "…"
                          : "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <PaymentStatusBadge status={row.payment?.paymentStatus} />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <BookingStatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(row.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-5 py-3 border-t border-pink-50 bg-gray-50/50 text-xs text-gray-400">
              Showing {filtered.length} of {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}