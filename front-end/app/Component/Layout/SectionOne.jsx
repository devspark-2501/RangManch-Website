import Image from "next/image";

export default function SectionOne() {
  return (
    <section className="bg-[#fdf9f7] min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <p className="uppercase tracking-[3px] text-sm font-semibold text-pink-600 mb-4">
              Premium Lifestyle
            </p>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-[#1f2d5c]">
              Exhibitions
            </h1>

            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
              That Connect
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mb-8">
              Rang Manch Exhibition brings together premium brands and
              quality shoppers at curated events in the finest societies.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="px-7 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg">
                Upcoming Exhibitions
              </button>

              <button className="px-7 py-4 rounded-xl border border-pink-300 text-pink-600 font-semibold hover:bg-pink-50 transition-all duration-300">
                Book a Stall
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t pt-8">

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Premium Audience
                </h3>
                <p className="text-sm text-gray-500">
                  High footfall from premium societies
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Curated Vendors
                </h3>
                <p className="text-sm text-gray-500">
                  Quality brands across categories
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Great Exposure
                </h3>
                <p className="text-sm text-gray-500">
                  Marketing & promotion for every vendor
                </p>
              </div>

            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            <Image
              src="/hero.png"
              alt="RangManch Exhibition"
              width={650}
              height={650}
              priority
              className="w-full max-w-[650px] h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}