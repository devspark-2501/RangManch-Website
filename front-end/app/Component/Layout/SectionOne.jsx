import Image from "next/image";

export default function Home() {
  return (
    <section className="bg-[#fdf9f7] min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <p className="uppercase tracking-[4px] text-sm font-semibold text-pink-600 mb-4">
              Premium Lifestyle
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#1e2a55]">
              Exhibitions
            </h1>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              That Connect
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
              Rang Manch Exhibition brings together premium brands and quality
              shoppers at curated events in the finest societies.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-7 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:scale-105 transition">
                Upcoming Exhibitions
              </button>

              <button className="px-7 py-4 rounded-xl border border-pink-300 text-pink-600 font-semibold hover:bg-pink-50 transition">
                Book a Stall
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Premium Audience
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  High footfall from premium societies
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Curated Vendors
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Quality brands across categories
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Great Exposure
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Marketing & promotion for every vendor
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT DESIGN */}
          <div className="relative flex justify-center items-center min-h-[550px]">

            {/* Background Glow */}
            <div className="absolute w-[450px] h-[450px] rounded-full bg-pink-200 blur-3xl opacity-40"></div>

            <div className="absolute top-10 right-10 w-[220px] h-[220px] rounded-full bg-orange-200 blur-3xl opacity-40"></div>

            <div className="absolute bottom-10 left-10 w-[220px] h-[220px] rounded-full bg-purple-200 blur-3xl opacity-40"></div>

            {/* Main Circle */}
            <div className="relative w-[380px] h-[380px] rounded-full bg-white shadow-2xl border border-pink-100 flex items-center justify-center">

              <Image
                src="/rm_logo.png"
                alt="RangManch"
                width={180}
                height={180}
                className="object-contain"
              />

              {/* Floating Card 1 */}
              <div className="absolute -top-8 -left-12 bg-white rounded-2xl shadow-lg p-4 w-40">
                <div className="text-3xl mb-2">🛍️</div>
                <h4 className="font-semibold text-sm">
                  Fashion & Lifestyle
                </h4>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute top-10 -right-14 bg-white rounded-2xl shadow-lg p-4 w-40">
                <div className="text-3xl mb-2">💍</div>
                <h4 className="font-semibold text-sm">
                  Jewellery Brands
                </h4>
              </div>

              {/* Floating Card 3 */}
              <div className="absolute bottom-10 -left-14 bg-white rounded-2xl shadow-lg p-4 w-40">
                <div className="text-3xl mb-2">🏡</div>
                <h4 className="font-semibold text-sm">
                  Home Decor
                </h4>
              </div>

              {/* Floating Card 4 */}
              <div className="absolute -bottom-8 right-0 bg-white rounded-2xl shadow-lg p-4 w-40">
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="font-semibold text-sm">
                  Live Events
                </h4>
              </div>

            </div>

            {/* Stats */}
            <div className="absolute top-0 left-0 bg-white px-5 py-3 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-600">50+</h3>
              <p className="text-xs text-gray-500">Exhibitions</p>
            </div>

            <div className="absolute bottom-0 right-0 bg-white px-5 py-3 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-purple-600">10K+</h3>
              <p className="text-xs text-gray-500">Visitors</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}