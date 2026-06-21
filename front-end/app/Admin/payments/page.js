"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  FaImages,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaRupeeSign,
  FaReceipt,
  FaCheckCircle,
  FaExclamationCircle,
  FaUndo,
  FaSearch,
  FaDownload,
  FaCreditCard,
} from "react-icons/fa";

const navItems = [
  { href: "/Admin/create-exhibition", icon: FaCalendarAlt,    label: "Exhibitions" },
  { href: "/Admin/gallery",           icon: FaImages,         label: "Gallery" },
  { href: "/Admin/bookings",          icon: FaClipboardList,  label: "Bookings" },
  { href: "/Admin/payments",          icon: FaCreditCard,     label: "Payments" },
  { href: "/Admin/users",             icon: FaUsers,          label: "Users" },
];

const STATUS_STYLES = {
  Paid:     "bg-green-50 text-green-600 border-green-200",
  Created:  "bg-yellow-50 text-yellow-700 border-yellow-200",
  Failed:   "bg-red-50 text-red-500 border-red-200",
  Refunded: "bg-blue-50 text-blue-600 border-blue-200",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border ${
        STATUS_STYLES[status] ?? "bg-gray-50 text-gray-500 border-gray-200"
      }`}
    >
      {status ?? "—"}
    </span>
  );
}

export default function AdminPayments() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Filters ────────────────────────────────────────────────────────────
  const [search, setSearch]               = useState("");
  const [exhibitionFilter, setExhibitionFilter] = useState("");
  const [statusFilter, setStatusFilter]    = useState("");
  const [vendorFilter, setVendorFilter]    = useState("");
  const [dateFrom, setDateFrom]            = useState("");
  const [dateTo, setDateTo]                = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/Admin/payments", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch payment data");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const payments = data?.payments ?? [];
  const revenueByExhibition = data?.revenueByExhibition ?? [];
  const summary = data?.summary ?? {};

  // ── Distinct exhibitions for the filter dropdown ─────────────────────
  const exhibitionOptions = useMemo(() => {
    const seen = new Map();
    payments.forEach((p) => {
      if (p.exhibitionId && !seen.has(p.exhibitionId)) {
        seen.set(p.exhibitionId, p.exhibitionTitle);
      }
    });
    return Array.from(seen, ([id, title]) => ({ id, title }));
  }, [payments]);

  // ── Apply filters + search ───────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const vq = vendorFilter.toLowerCase().trim();
    const fromTime = dateFrom ? new Date(dateFrom).getTime() : null;
    const toTime   = dateTo   ? new Date(dateTo).getTime() + 86400000 - 1 : null; // inclusive end of day

    return payments.filter((p) => {
      if (exhibitionFilter && p.exhibitionId !== exhibitionFilter) return false;
      if (statusFilter && p.paymentStatus !== statusFilter) return false;
      if (vq && !p.vendorName?.toLowerCase().includes(vq)) return false;

      if (fromTime || toTime) {
        const created = p.createdAt ? new Date(p.createdAt).getTime() : null;
        if (created === null) return false;
        if (fromTime && created < fromTime) return false;
        if (toTime && created > toTime) return false;
      }

      if (q) {
        const haystack = [
          p.vendorName, p.email, p.mobile, p.razorpayOrderId, p.razorpayPaymentId,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [payments, search, exhibitionFilter, statusFilter, vendorFilter, dateFrom, dateTo]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const clearFilters = () => {
    setSearch("");
    setExhibitionFilter("");
    setStatusFilter("");
    setVendorFilter("");
    setDateFrom("");
    setDateTo("");
  };

  const hasActiveFilters =
    search || exhibitionFilter || statusFilter || vendorFilter || dateFrom || dateTo;

  // ── CSV export ────────────────────────────────────────────────────────
  const exportCSV = () => {
    const headers = [
      "Vendor Name", "Email", "Mobile", "Business Name", "Category",
      "Exhibition", "Amount", "Razorpay Order ID", "Razorpay Payment ID",
      "Payment Status", "Booking Status", "Created Date",
    ];

    const escapeCSV = (val) => {
      const str = val === null || val === undefined ? "" : String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = filtered.map((p) => [
      p.vendorName, p.email, p.mobile, p.businessName, p.category,
      p.exhibitionTitle, p.amount, p.razorpayOrderId, p.razorpayPaymentId,
      p.paymentStatus, p.bookingStatus, formatDate(p.createdAt),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rangmanch-payments-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const cards = [
    {
      label: "Total Revenue",
      value: loading ? null : `₹${(summary.totalRevenue ?? 0).toLocaleString("en-IN")}`,
      icon: FaRupeeSign,
      color: "text-pink-500",
      bg: "bg-pink-50",
      border: "border-pink-100",
    },
    {
      label: "Total Payments",
      value: loading ? null : summary.totalPayments ?? 0,
      icon: FaReceipt,
      color: "text-violet-500",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      label: "Successful Payments",
      value: loading ? null : summary.successfulPayments ?? 0,
      icon: FaCheckCircle,
      color: "text-teal-500",
      bg: "bg-teal-50",
      border: "border-teal-100",
    },
    {
      label: "Failed Payments",
      value: loading ? null : summary.failedPayments ?? 0,
      icon: FaExclamationCircle,
      color: "text-red-400",
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      label: "Refunded Payments",
      value: loading ? null : summary.refundedPayments ?? 0,
      icon: FaUndo,
      color: "text-orange-400",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-white flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen z-30
          w-64 bg-white flex flex-col p-6 border-r border-gray-100
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/rm_logo.png"
            alt="Rang Manch Logo"
            className="w-9 h-9 object-contain"
          />
          <div>
            <h1 className="text-lg font-bold text-[#1e2a55] leading-tight">Rang Manch</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Admin Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = label === "Payments";
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-pink-50 text-pink-600"
                    : "text-gray-500 hover:bg-pink-50 hover:text-pink-600"
                }`}
              >
                <Icon className={isActive ? "text-pink-500" : "group-hover:text-pink-500 transition-colors"} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 pt-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 font-medium text-sm hover:bg-red-50 hover:text-red-500 transition-all duration-200">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto min-w-0">

        {/* Mobile top bar */}
        <div className="flex items-center gap-4 mb-6 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200"
            aria-label="Open menu"
          >
            <FaBars className="text-xl" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/rm_logo.png" alt="Rang Manch Logo" className="w-7 h-7 object-contain" />
            <span className="text-base font-bold text-[#1e2a55]">Rang Manch</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Overview</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e2a55]">Payments</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Track Razorpay transactions, revenue and refunds across all exhibitions.
            </p>
          </div>

          <button
            onClick={exportCSV}
            disabled={loading || filtered.length === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
          >
            <FaDownload className="text-xs" />
            Export CSV
          </button>
        </div>

        <div className="mb-8 h-px bg-gradient-to-r from-pink-200 via-violet-200 to-transparent" />

        {/* Error */}
        {error && (
          <div className="mb-6 px-5 py-4 rounded-2xl bg-red-50 border border-red-200 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-5 mb-10">
          {cards.map(({ label, value, icon: Icon, color, bg, border }) => (
            <div
              key={label}
              className={`bg-white rounded-2xl border ${border} p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default`}
            >
              <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center mb-5 text-base`}>
                <Icon />
              </div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>

              {loading ? (
                <div className="mt-2 h-9 w-20 rounded-lg bg-gray-100 animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-[#1e2a55] mt-1">
                  {value ?? "—"}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Revenue By Exhibition */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-[#1e2a55] mb-4">Revenue By Exhibition</h3>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 h-24 animate-pulse" />
              ))}
            </div>
          ) : revenueByExhibition.length === 0 ? (
            <div className="bg-white rounded-2xl border border-pink-100 p-8 text-center text-gray-400 text-sm">
              No revenue recorded yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {revenueByExhibition.map((ex) => (
                <div
                  key={ex.exhibitionId}
                  className="bg-white rounded-2xl border border-pink-100 p-6 hover:shadow-md transition-all duration-200"
                >
                  <p className="text-sm font-semibold text-[#1e2a55] truncate mb-3">
                    {ex.exhibitionTitle}
                  </p>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold text-pink-600 flex items-center gap-0.5">
                      <FaRupeeSign className="text-base" />
                      {ex.revenue.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {ex.paymentCount} payment{ex.paymentCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-pink-100 p-5 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <FaSearch className="text-gray-400 text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by vendor, email, mobile, Razorpay order or payment ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
            />
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-pink-500 font-semibold hover:text-pink-700 flex-shrink-0 whitespace-nowrap"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-gray-50">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                Exhibition
              </label>
              <select
                value={exhibitionFilter}
                onChange={(e) => setExhibitionFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-500 bg-white"
              >
                <option value="">All Exhibitions</option>
                {exhibitionOptions.map((ex) => (
                  <option key={ex.id} value={ex.id}>{ex.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                Payment Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-500 bg-white"
              >
                <option value="">All Statuses</option>
                <option value="Created">Created</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                Vendor Name
              </label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={vendorFilter}
                onChange={(e) => setVendorFilter(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                Date Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-2 py-2.5 text-xs focus:outline-none focus:border-pink-500"
                />
                <span className="text-gray-300 text-xs">–</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-2 py-2.5 text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden">

          {loading && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
              <p className="text-sm">Loading payments...</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <FaReceipt className="text-5xl mb-4 text-pink-200" />
              <p className="font-semibold text-lg text-gray-500">
                {hasActiveFilters ? "No payments match your filters." : "No Payments Found"}
              </p>
              <p className="text-sm mt-1">
                {hasActiveFilters ? "Try adjusting your search or filters." : "Payments will appear here once vendors check out."}
              </p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-pink-100">
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Vendor Name</th>
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Email</th>
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Mobile</th>
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Exhibition</th>
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Amount</th>
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Razorpay Order ID</th>
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Razorpay Payment ID</th>
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Payment Status</th>
                    <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr
                      key={p._id}
                      className={`border-b border-gray-50 hover:bg-pink-50/40 transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                        {p.vendorName || "—"}
                      </td>
                      <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                        <a href={`mailto:${p.email}`} className="hover:text-pink-600 transition">
                          {p.email || "—"}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                        <a href={`tel:${p.mobile}`} className="hover:text-pink-600 transition">
                          {p.mobile || "—"}
                        </a>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-[#1e2a55] font-medium text-xs">
                          {p.exhibitionTitle || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-bold text-[#1e2a55] flex items-center gap-0.5">
                          <FaRupeeSign className="text-xs text-pink-500" />
                          {p.amount?.toLocaleString("en-IN") ?? "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-gray-500 text-xs font-mono">
                          {p.razorpayOrderId || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="text-gray-500 text-xs font-mono">
                          {p.razorpayPaymentId || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <StatusBadge status={p.paymentStatus} />
                      </td>
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(p.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="px-5 py-3 border-t border-pink-50 bg-gray-50/50 text-xs text-gray-400">
                Showing {filtered.length} of {payments.length} payment{payments.length !== 1 ? "s" : ""}
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}