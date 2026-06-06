"use client";

import { useState, useEffect, useMemo } from "react";
import {
  FaUsers,
  FaUserShield,
  FaCalendarAlt,
  FaSearch,
  FaUserCircle,
  FaBoxOpen,
} from "react-icons/fa";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/Admin/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
    );
  }, [search, users]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const latestUser = useMemo(() => {
    if (!users.length) return null;
    return [...users].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  }, [users]);

  const adminCount = users.filter((u) => u.role === "admin").length;

  const avatarColors = [
    "bg-pink-500", "bg-purple-500", "bg-blue-500",
    "bg-teal-500", "bg-orange-500", "bg-rose-500",
  ];
  const getColor = (name = "") => {
    const idx = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[idx];
  };

  return (
    <div className="min-h-screen bg-[#fdf9f7] p-6 md:p-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e2a55]">
          Users Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage all registered users of Rang Manch Exhibition Platform.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <FaUsers className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <p className="text-4xl font-bold text-[#1e2a55] leading-tight">
              {loading ? "—" : users.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0">
            <FaUserShield className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Admins</p>
            <p className="text-4xl font-bold text-[#1e2a55] leading-tight">
              {loading ? "—" : adminCount}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center flex-shrink-0">
            <FaCalendarAlt className="text-white text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Latest Registered</p>
            <p className="text-base font-bold text-[#1e2a55] leading-tight mt-0.5">
              {loading ? "—" : latestUser ? latestUser.name || "—" : "—"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {loading ? "" : latestUser ? formatDate(latestUser.createdAt) : ""}
            </p>
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-5 mb-6 flex items-center gap-4">
        <FaSearch className="text-gray-400 text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by name or email..."
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

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden">

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading users...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 text-red-400">
            <p className="font-semibold">Failed to load users</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <FaBoxOpen className="text-5xl mb-4 text-pink-200" />
            <p className="font-semibold text-lg text-gray-500">
              {search ? "No users match your search." : "No Users Found"}
            </p>
            <p className="text-sm mt-1">
              {search
                ? "Try a different keyword."
                : "Registered users will appear here."}
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
                    User
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    Email
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    Role
                  </th>
                  <th className="text-left px-5 py-4 font-semibold text-[#1e2a55] whitespace-nowrap">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr
                    key={user._id}
                    className={`border-b border-gray-50 hover:bg-pink-50/40 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    {/* Avatar + Name */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${getColor(user.name)}`}
                        >
                          {user.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle />}
                        </div>
                        <span className="font-semibold text-[#1e2a55]">
                          {user.name || "—"}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                      <a
                        href={`mailto:${user.email}`}
                        className="hover:text-pink-600 transition"
                      >
                        {user.email || "—"}
                      </a>
                    </td>

                    {/* Role Badge */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-pink-50 bg-gray-50/50 text-xs text-gray-400">
              Showing {filtered.length} of {users.length} user{users.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}