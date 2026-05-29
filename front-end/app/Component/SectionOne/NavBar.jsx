"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Exhibitions", href: "#" },
    { name: "Vendors", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/rm_logo.png"
            alt="RangManch Logo"
            width={120}
            height={60}
            priority
            className="w-auto h-12 md:h-14"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-gray-700">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={`hover:text-pink-600 transition-all duration-300 ${
                  link.name === "Home"
                    ? "text-pink-600 border-b-2 border-pink-600 pb-1"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <Link
          href="#"
          className="hidden lg:flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300"
        >
          Book a Stall →
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-5 py-3">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 border-b border-gray-100 text-gray-700 hover:text-pink-600"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <Link
            href="#"
            className="mt-4 text-center px-5 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600"
          >
            Book a Stall →
          </Link>
        </ul>
      </div>
    </header>
  );
}