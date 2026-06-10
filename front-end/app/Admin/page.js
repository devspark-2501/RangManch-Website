"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaImages,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const navItems = [
  { href: "/Admin/create-exhibition", icon: FaCalendarAlt, label: "Exhibitions" },
  { href: "/Admin/gallery", icon: FaImages, label: "Gallery" },
  { href: "/Admin/bookings", icon: FaClipboardList, label: "Bookings" },
  { href: "/Admin/users", icon: FaUsers, label: "Users" },
];

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchStats();
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

  return (
    <div className="min-h-screen bg-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col p-6 sticky top-0 h-screen border-r border-gray-100">

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
      <main className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Overview</p>
          <h2 className="text-4xl font-bold text-[#1e2a55]">Admin Dashboard</h2>
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
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
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

      </main>
    </div>
  );
}