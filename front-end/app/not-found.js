import { HiArrowRight } from "react-icons/hi";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#fdf9f7] flex items-center justify-center px-5">

      <div className="max-w-3xl w-full text-center">

        {/* 404 TEXT */}
        <h1 className="text-[90px] md:text-[140px] font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent leading-none">
          404
        </h1>

        {/* CARD */}
        <div className="bg-white rounded-3xl p-10 shadow-sm mt-6">

          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2a55] mb-4">
            Oops! Page Not Found
          </h2>

          <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
            Looks like this page wandered off from the exhibition.  
            Don’t worry — there’s still a lot to explore at Rang Manch!
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition"
            >
              Go to Homepage <HiArrowRight />
            </a>

            <a
              href="/events"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-pink-300 text-pink-600 font-medium hover:bg-pink-50 transition"
            >
              Explore Exhibitions
            </a>

          </div>
        </div>

        {/* EXTRA DECOR (optional vibe) */}
        <p className="mt-6 text-xs text-gray-400">
          Error Code: RM-404
        </p>
        

      </div>
    </section>
  );
}