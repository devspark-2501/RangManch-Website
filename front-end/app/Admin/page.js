"use client";

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

const stats = [
  { label: "Total Exhibitions", value: "0", icon: FaCalendarAlt, color: "text-pink-500", bg: "bg-pink-50" },
  { label: "Total Bookings", value: "0", icon: FaClipboardList, color: "text-violet-500", bg: "bg-violet-50" },
  { label: "Total Users", value: "0", icon: FaUsers, color: "text-teal-500", bg: "bg-teal-50" },
  { label: "Gallery Images", value: "0", icon: FaImages, color: "text-orange-400", bg: "bg-orange-50" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6 sticky top-0 h-screen">

        {/* Brand */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            R
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1e2a55] leading-tight">Rang Manch</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#1e2a55] font-medium text-sm hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 group"
            >
              <Icon className="text-gray-400 group-hover:text-pink-500 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-100 pt-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 font-medium text-sm hover:bg-red-50 transition-all duration-200">
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
          <p className="text-gray-400 mt-1 text-sm">Manage exhibitions, bookings, gallery and users.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center mb-4`}>
                <Icon />
              </div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
              <p className="text-4xl font-bold text-[#1e2a55] mt-1">{value}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}