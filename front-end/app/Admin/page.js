"use client";

import Link from "next/link";
import {
FaImages,
FaCalendarAlt,
FaClipboardList,
FaUsers,
FaSignOutAlt,
} from "react-icons/fa";

export default function AdminPage() {
return ( <div className="min-h-screen bg-[#fdf9f7] flex">

  {/* Sidebar */}
  <aside className="w-72 bg-white shadow-xl p-6">

    <h1 className="text-2xl font-bold text-[#1e2a55] mb-10">
      Rang Manch Admin
    </h1>

    <div className="space-y-3">

      <Link
        href="/Admin/create-exhibition"
        className="flex items-center gap-3 p-4 rounded-xl hover:bg-pink-50 text-[#1e2a55] font-medium"
      >
        <FaCalendarAlt />
        Exhibitions
      </Link>

      <Link
        href="/Admin/gallery"
        className="flex items-center gap-3 p-4 rounded-xl hover:bg-pink-50 text-[#1e2a55] font-medium"
      >
        <FaImages />
        Gallery
      </Link>

      <Link
        href="/Admin/bookings"
        className="flex items-center gap-3 p-4 rounded-xl hover:bg-pink-50 text-[#1e2a55] font-medium"
      >
        <FaClipboardList />
        Bookings
      </Link>

      <Link
        href="/Admin/users"
        className="flex items-center gap-3 p-4 rounded-xl hover:bg-pink-50 text-[#1e2a55] font-medium"
      >
        <FaUsers />
        Users
      </Link>

      <button
        className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-red-50 text-red-600 font-medium"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  </aside>

  {/* Main */}
  <main className="flex-1 p-10">

    <h2 className="text-4xl font-bold text-[#1e2a55]">
      Admin Dashboard
    </h2>

    <p className="text-gray-500 mt-2">
      Manage exhibitions, bookings, gallery and users.
    </p>

    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Total Exhibitions
        </h3>

        <p className="text-4xl font-bold text-[#1e2a55] mt-3">
          0
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Total Bookings
        </h3>

        <p className="text-4xl font-bold text-[#1e2a55] mt-3">
          0
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Total Users
        </h3>

        <p className="text-4xl font-bold text-[#1e2a55] mt-3">
          0
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">
        <h3 className="text-gray-500">
          Gallery Images
        </h3>

        <p className="text-4xl font-bold text-[#1e2a55] mt-3">
          0
        </p>
      </div>

    </div>

  </main>
</div>


);
}
