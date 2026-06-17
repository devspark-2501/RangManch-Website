"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Exhibitions", href: "/exhibitions" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/rm_logo.png"
            alt="Rang Manch Logo"
            width={120}
            height={60}
            priority
            className="w-auto h-12 md:h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-pink-600 transition-all duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop — Logged In */}
        {session ? (
          <div className="hidden lg:flex items-center gap-4">

            <Link
              href="/Admin"
              className="px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600"
            >
              Dashboard
            </Link>

            <div className="flex items-center gap-3 bg-[#fdf9f7] px-4 py-2 rounded-xl border">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                  {session.user?.name?.charAt(0)}
                </div>
              )}
              <div className="leading-tight">
                <p className="font-semibold text-sm text-[#1e2a55]">
                  {session.user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {session.user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            href="/sign_up"
            className="hidden lg:flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Book a Stall →
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-black" />
          <span className="w-6 h-0.5 bg-black" />
          <span className="w-6 h-0.5 bg-black" />
        </button>

      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[700px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-5 py-3">

          {session && (
            <div className="flex items-center gap-3 py-4 border-b">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                  {session.user?.name?.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-[#1e2a55]">{session.user?.name}</p>
                <p className="text-sm text-gray-500">{session.user?.email}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 border-b border-gray-100 text-gray-700 hover:text-pink-600"
              >
                {link.name}
              </Link>
            </li>
          ))}

          {session ? (
            <>
              <Link
                href="/Admin"
                onClick={() => setMenuOpen(false)}
                className="mt-4 text-center px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut()}
                className="mt-3 px-5 py-3 rounded-xl border border-red-200 text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/sign_up"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600"
            >
              Book a Stall →
            </Link>
          )}

        </ul>
      </div>
    </header>
  );
}