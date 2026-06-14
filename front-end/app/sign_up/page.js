"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaStore, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Account Created Successfully");
      window.location.href = "/Book-Stall";
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf9f7] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-pink-500 to-purple-600 p-10 text-white">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl mb-6">
            <FaStore />
          </div>

          <h1 className="text-4xl font-bold mb-4">Become a Vendor</h1>

          <p className="text-white/90 leading-relaxed">
            Join Rang Manch and showcase your products in premium exhibitions attended by thousands of shoppers.
          </p>

          <div className="mt-8 space-y-3">
            <p>✓ Premium Audience</p>
            <p>✓ Better Visibility</p>
            <p>✓ Quality Leads</p>
            <p>✓ Higher Sales Potential</p>
          </div>
        </div>

        <div className="p-8 md:p-12">

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1e2a55]">Create Account</h2>
            <p className="text-gray-500 mt-2">Start booking your exhibition stalls.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-medium text-[#1e2a55]">
                Full Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#1e2a55]">
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-[#1e2a55]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create password"
                  className="w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
            >
              {loading ? "Creating Account..." : "Create Vendor Account"}
            </button>

          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t"></div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/Book-Stall" })}
            className="w-full py-3 border rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link href="/sign_in" className="text-pink-600 font-semibold">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}