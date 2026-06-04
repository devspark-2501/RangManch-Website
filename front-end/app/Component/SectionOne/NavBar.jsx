"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Exhibitions", href: "/exhibitions" },
    // { name: "Vendors", href: "/vendors" },
    { name: "Gallery", href: "/gallery" },
    // { name: "Testimonials", href: "/testimonials" },
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

        {/* Desktop CTA */}
        <Link
          href="/sign_up"
          className="hidden lg:flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg"
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
          menuOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-5 py-3">
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

          {/* Mobile CTA */}
          <Link
            href="/sign_up"
            onClick={() => setMenuOpen(false)}
            className="mt-4 text-center px-5 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600"
          >
            Book a Stall →
          </Link>
        </ul>
      </div>
    </header>
  );
}