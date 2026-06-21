"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaImages,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCreditCard,
  FaRupeeSign,
} from "react-icons/fa";

const navItems = [
  { href: "/Admin/create-exhibition", icon: FaCalendarAlt,   label: "Exhibitions" },
  { href: "/Admin/gallery",           icon: FaImages,        label: "Gallery" },
  { href: "/Admin/bookings",          icon: FaClipboardList, label: "Bookings" },
  { href: "/Admin/payments",          icon: FaCreditCard,    label: "Payments" },
  { href: "/Admin/users",             icon: FaUsers,         label: "Users" },
];

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { exhibitionTitle, revenue, paymentCount } = payload[0].payload;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-pink-100 px-4 py-3 text-sm">
      <p className="font-semibold text-[#1e2a55] mb-1">{exhibitionTitle}</p>
      <p className="text-pink-600 font-bold flex items-center gap-0.5">
        <FaRupeeSign className="text-xs" />
        {revenue.toLocaleString("en-IN")}
      </p>
      <p className="text-gray-400 text-xs mt-0.5">
        {paymentCount} payment{paymentCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revenueLoading, setRevenueLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revenueError, setRevenueError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/Admin/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRevenue = async () => {
      try {
        setRevenueLoading(true);
        const res = await fetch("/api/Admin/payments", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch revenue data");
        const data = await res.json();
        setRevenueData(data);
      } catch (err) {
        console.error(err);
        setRevenueError(err.message);
      } finally {
        setRevenueLoading(false);
      }
    };

    fetchStats();
    fetchRevenue();
  }, []);

  const cards = [
    {
      label: "Total Exhibitions",
      value: stats?.totalExhibitions,
      icon: FaCalendarAlt,
      color: "text-pink-500",
      bg: "bg-pink-50",
      border: "border-pink-100",
    },
    {
      label: "Total Bookings",
      value: stats?.totalBookings,
      icon: FaClipboardList,
      color: "text-violet-500",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers,
      icon: FaUsers,
      color: "text-teal-500",
      bg: "bg-teal-50",
      border: "border-teal-100",
    },
    {
      label: "Gallery Images",
      value: stats?.totalGalleryImages,
      icon: FaImages,
      color: "text-orange-400",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  const totalRevenue = revenueData?.summary?.totalRevenue ?? 0;
  const revenueByExhibition = revenueData?.revenueByExhibition ?? [];

  // Truncate long titles for the X-axis so bars don't get crushed
  const chartData = revenueByExhibition.map((ex) => ({
    ...ex,
    shortTitle:
      ex.exhibitionTitle.length > 14
        ? ex.exhibitionTitle.slice(0, 14) + "…"
        : ex.exhibitionTitle,
  }));

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
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 font-medium text-sm hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 group"
            >
              <Icon className="group-hover:text-pink-500 transition-colors" />
              {label}
            </Link>
          ))}
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
        <div className="mb-8 lg:mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Overview</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e2a55]">Admin Dashboard</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Manage exhibitions, bookings, gallery and users.
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-pink-200 via-violet-200 to-transparent" />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-5 py-4 rounded-2xl bg-red-50 border border-red-200 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
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
                <div className="mt-2 h-9 w-16 rounded-lg bg-gray-100 animate-pulse" />
              ) : (
                <p className="text-4xl font-bold text-[#1e2a55] mt-1">
                  {value ?? "—"}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ── Lifetime Revenue Section ──────────────────────────────────── */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-[#1e2a55] mb-4">Lifetime Revenue</h3>

          {revenueError && (
            <div className="mb-6 px-5 py-4 rounded-2xl bg-red-50 border border-red-200 text-red-500 text-sm font-medium">
              {revenueError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Big total revenue card */}
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 flex flex-col justify-center lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center mb-5 text-base">
                <FaRupeeSign />
              </div>
              <p className="text-xs text-white/70 font-medium uppercase tracking-wide">
                Total Revenue (All Time)
              </p>

              {revenueLoading ? (
                <div className="mt-2 h-10 w-32 rounded-lg bg-white/20 animate-pulse" />
              ) : (
                <p className="text-4xl font-bold text-white mt-1 flex items-center gap-1">
                  <FaRupeeSign className="text-2xl" />
                  {totalRevenue.toLocaleString("en-IN")}
                </p>
              )}

              {!revenueLoading && (
                <p className="text-white/60 text-xs mt-3">
                  {revenueData?.summary?.successfulPayments ?? 0} successful payment
                  {(revenueData?.summary?.successfulPayments ?? 0) !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* Bar chart: revenue by exhibition */}
            <div className="bg-white rounded-2xl border border-pink-100 p-6 lg:col-span-2">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-4">
                Revenue By Exhibition
              </p>

              {revenueLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
                </div>
              ) : chartData.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                  No revenue recorded yet.
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3e8f5" vertical={false} />
                      <XAxis
                        dataKey="shortTitle"
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        axisLine={{ stroke: "#f3e8f5" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(val) => `₹${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fdf2f8" }} />
                      <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="#ec4899" maxBarSize={48} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}