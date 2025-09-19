import Link from "next/link";

export default function AboutPreviewSection() {
  return (
    <section className="py-20 bg-primary-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl text-primary-50 font-bold">
              A Story of Nature and Luxury
            </h2>
            <p className="text-lg text-primary-200 leading-relaxed">
              Founded in 2010, The Wild Oasis was born from a simple vision: to create a place where 
              luxury meets nature in perfect harmony. Our founders, avid nature lovers and hospitality 
              experts, wanted to offer guests an experience that goes beyond traditional accommodation.
            </p>
            <p className="text-lg text-primary-200 leading-relaxed">
              Today, we continue to uphold our commitment to sustainable luxury, ensuring that every 
              guest leaves with memories that last a lifetime while preserving the natural beauty that 
              makes our location so special.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/about"
                className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all text-center"
              >
                Learn Our Story
              </Link>
              <Link
                href="/cabins"
                className="border-2 border-primary-300 px-8 py-4 text-primary-300 font-semibold hover:bg-primary-300/10 transition-all text-center"
              >
                View Cabins
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-accent-400 to-accent-600 h-64 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg lg:text-xl">Mountain Views</span>
                </div>
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 h-48 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg lg:text-xl">Luxury Design</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-primary-700 to-primary-900 h-48 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg lg:text-xl">Nature Trails</span>
                </div>
                <div className="bg-gradient-to-br from-accent-500 to-accent-700 h-64 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg lg:text-xl">Premium Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 