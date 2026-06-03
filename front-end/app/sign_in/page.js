"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf9f7] px-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-4xl">
            <FaUserCircle />
          </div>

          <h1 className="text-3xl font-bold text-[#1e2a55] mt-4">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to your account
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-[#1e2a55]">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[#1e2a55]">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-pink-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}