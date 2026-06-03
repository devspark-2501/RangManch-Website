"use client";

import Link from "next/link";
import { useState } from "react";
import { FaStore } from "react-icons/fa";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    // next-auth signIn() here later

    alert("Logged In");
  };

  return (
    <div className="min-h-screen bg-[#fdf9f7] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-pink-500 to-purple-600 p-10 text-white">

          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl mb-6">
            <FaStore />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Welcome Back
          </h1>

          <p className="leading-relaxed text-white/90">
            Sign in to manage your bookings, stalls, exhibitions and vendor
            profile.
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-12">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1e2a55]">
              Vendor Login
            </h2>

            <p className="text-gray-500 mt-2">
              Access your vendor dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-medium text-[#1e2a55]">
                Email Address
              </label>

              <input
                type="email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#1e2a55]">
                Password
              </label>

              <input
                type="password"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="Enter password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500">
            New Vendor?{" "}
            <Link
              href="/sign_up"
              className="text-pink-600 font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}