"use client";

import { useState, useEffect } from "react";
import {
  FaUsers,
  FaStore,
  FaImages,
  FaCalendarCheck,
} from "react-icons/fa";

export default function AdminDashboard() {
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
      icon: <FaCalendarCheck className="text-white text-2xl" />,
      gradient: "from-pink-500 to-purple-600",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
    {
      label: "Total Bookings",
      value: stats?.totalBookings,
      icon: <FaStore className="text-white text-2xl" />,
      gradient: "from-yellow-400 to-orange-500",
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      label: "Total Users",
      value: stats?.totalUsers,
      icon: <FaUsers className="text-white text-2xl" />,
      gradient: "from-blue-500 to-indigo-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Gallery Images",
      value: stats?.totalGalleryImages,
      icon: <FaImages className="text-white text-2xl" />,
      gradient: "from-green-400 to-teal-500",
      bg: "bg-green-50",
      text: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdf9f7] p-6 md:p-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e2a55]">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's a live overview of Rang Manch.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-5 py-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 flex items-center gap-5"
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center flex-shrink-0`}
            >
              {card.icon}
            </div>

            {/* Value */}
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>

              {loading ? (
                <div className="mt-1 h-8 w-16 rounded-lg bg-gray-100 animate-pulse" />
              ) : (
                <p className="text-4xl font-bold text-[#1e2a55] leading-tight">
                  {card.value ?? "—"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}