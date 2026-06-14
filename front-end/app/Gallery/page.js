"use client";

import { useState, useEffect, useCallback } from "react";

import {
  FaImages,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export const metadata = {
  title: "RangManch | Gallery"
};

export default function GalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0 });

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await fetch("/api/Admin/gallery", { cache: "no-store" });
        const data = await res.json();
        setGalleries(Array.isArray(data) ? data.filter((g) => g.images?.length > 0) : []);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  // ── Lightbox helpers ─────────────────────────────────────────────────
  const openLightbox = (images, index) => {
    setLightbox({ open: true, images, index });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, images: [], index: 0 });
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() => {
    setLightbox((lb) => ({
      ...lb,
      index: (lb.index - 1 + lb.images.length) % lb.images.length,
    }));
  }, []);

  const next = useCallback(() => {
    setLightbox((lb) => ({
      ...lb,
      index: (lb.index + 1) % lb.images.length,
    }));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox.open, closeLightbox, prev, next]);

  // ═══════════════════════════════════════════════════════════════════════
  return (
    <section className="min-h-screen bg-[#fdf9f7] py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-600 font-medium mb-6 text-sm">
            <FaImages />
            Photo Gallery
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e2a55]">
            Our Exhibition Gallery
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Relive the moments from our past and ongoing Rang Manch exhibitions.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mt-5" />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Loading gallery...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && galleries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <FaImages className="text-6xl text-pink-200 mb-5" />
            <p className="text-xl font-semibold text-gray-500">No Gallery Images Available Yet</p>
            <p className="text-sm mt-2">Check back after upcoming exhibitions.</p>
          </div>
        )}

        {/* Gallery Sections */}
        {!loading && galleries.length > 0 && (
          <div className="space-y-20">
            {galleries.map((gallery) => (
              <div key={gallery._id}>

                {/* Section header */}
                <div className="mb-7">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55]">
                    {gallery.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-400 font-medium">
                      {gallery.images.length} photo{gallery.images.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mt-4" />
                </div>

                {/* Masonry grid */}
                <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                  {gallery.images.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(gallery.images, idx)}
                      className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-md border border-pink-50"
                    >
                      <img
                        src={img}
                        alt={`${gallery.title} - ${idx + 1}`}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end p-3">
                        <span className="text-white text-xs font-medium">
                          {idx + 1} / {gallery.images.length}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
          >
            <FaTimes />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {lightbox.index + 1} / {lightbox.images.length}
          </div>

          {/* Prev */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Image */}
          <img
            src={lightbox.images[lightbox.index]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl shadow-2xl select-none"
          />

          {/* Next */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Thumbnail strip */}
          {lightbox.images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2 pb-1">
              {lightbox.images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lb) => ({ ...lb, index: i }));
                  }}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                    i === lightbox.index
                      ? "border-pink-400 opacity-100"
                      : "border-transparent opacity-50 hover:opacity-75"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}