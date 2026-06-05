import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <section className="bg-[#fdf9f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 lg:py-20">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT SIDE */}
          <div className="text-center lg:text-left">

            <p className="uppercase tracking-[3px] text-xs sm:text-sm font-semibold text-pink-600 mb-4">
              Premium Lifestyle
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-[#1e2a55]">
              Exhibitions
            </h1>

            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              That Connect
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Rang Manch Exhibition brings together premium brands and quality
              shoppers at curated events in the finest societies.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">

            <Link href="/exhibitions">
                <button className="px-6 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:scale-105 transition-all duration-300">
                  Upcoming Exhibitions
                </button>
            </Link>

            <Link href="/Book-Stall">
              <button className="px-6 py-4 rounded-xl border border-pink-300 text-pink-600 font-semibold hover:bg-pink-50 transition-all duration-300">
                Book a Stall
              </button>
            </Link>

            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-200 pt-8">

              <div>
                <h3 className="font-semibold text-gray-900">
                  Premium Audience
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  High footfall from premium societies
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Curated Vendors
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Quality brands across categories
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Great Exposure
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Marketing & promotion for every vendor
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex justify-center items-center min-h-[350px] sm:min-h-[450px] lg:min-h-[550px]">

            {/* Glow Effects */}
            <div className="absolute w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] rounded-full bg-pink-200 blur-3xl opacity-40"></div>

            <div className="absolute top-10 right-5 sm:right-10 w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] bg-orange-200 rounded-full blur-3xl opacity-40"></div>

            <div className="absolute bottom-10 left-5 sm:left-10 w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] bg-purple-200 rounded-full blur-3xl opacity-40"></div>

            {/* Main Circle */}
            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] rounded-full bg-white border border-pink-100 shadow-2xl flex items-center justify-center">

              <Image
                src="/rm_logo.png"
                alt="Rang Manch"
                width={180}
                height={180}
                className="w-28 sm:w-36 lg:w-44 h-auto"
              />

              {/* Floating Cards Desktop Only */}
              <div className="hidden md:block absolute -top-6 -left-12 bg-white p-4 rounded-2xl shadow-lg w-40">
                <div className="text-3xl mb-2">🛍️</div>
                <h4 className="font-semibold text-sm">
                  Fashion & Lifestyle
                </h4>
              </div>

              <div className="hidden md:block absolute top-8 -right-14 bg-white p-4 rounded-2xl shadow-lg w-40">
                <div className="text-3xl mb-2">💍</div>
                <h4 className="font-semibold text-sm">
                  Jewellery Brands
                </h4>
              </div>

              <div className="hidden md:block absolute bottom-10 -left-14 bg-white p-4 rounded-2xl shadow-lg w-40">
                <div className="text-3xl mb-2">🏡</div>
                <h4 className="font-semibold text-sm">
                  Home Decor
                </h4>
              </div>

              <div className="hidden md:block absolute -bottom-6 right-0 bg-white p-4 rounded-2xl shadow-lg w-40">
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="font-semibold text-sm">
                  Live Events
                </h4>
              </div>

            </div>

            {/* Stats Card 1 */}
            <div className="absolute top-0 left-0 sm:top-5 sm:left-5 bg-white px-4 py-3 rounded-xl shadow-lg">
              <h3 className="text-lg sm:text-2xl font-bold text-pink-600">
                50+
              </h3>
              <p className="text-xs text-gray-500">
                Exhibitions
              </p>
            </div>

            {/* Stats Card 2 */}
            <div className="absolute bottom-0 right-0 sm:bottom-5 sm:right-5 bg-white px-4 py-3 rounded-xl shadow-lg">
              <h3 className="text-lg sm:text-2xl font-bold text-purple-600">
                10K+
              </h3>
              <p className="text-xs text-gray-500">
                Visitors
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}