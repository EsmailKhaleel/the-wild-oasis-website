import {
  HomeModernIcon,
  GlobeAltIcon,
  SparklesIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Luxury Cabins",
    description:
      "Beautifully designed cabins with modern amenities and stunning architecture that seamlessly blends with nature.",
    icon: HomeModernIcon,
  },
  {
    title: "Mountain Views",
    description:
      "Breathtaking panoramic views of nature from every cabin, offering the perfect backdrop for your mountain escape.",
    icon: GlobeAltIcon,
  },
  {
    title: "Full Service",
    description:
      "24/7 concierge and housekeeping services ensuring your stay is nothing short of exceptional and worry-free.",
    icon: SparklesIcon,
  },
  {
    title: "Private Experience",
    description:
      "Secluded locations for ultimate privacy, allowing you to disconnect and reconnect with nature and loved ones.",
    icon: ShieldCheckIcon,
  },
];
export default function FeaturesSection() {

  return (
    <section className="py-24 bg-gradient-to-b from-primary-950 to-primary-900 mt-[750px] sm:mt-[700px]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-5xl text-primary-50 font-bold">
            Experience Luxury in Nature
          </h2>
          <p className="text-xl text-primary-200/90 max-w-3xl mx-auto">
            Every detail has been carefully crafted to provide you with an
            unforgettable mountain experience. From the moment you arrive,
            you&apos;ll feel the perfect balance of luxury and wilderness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 bg-primary-950 backdrop-blur-sm rounded-2xl border border-primary-800/50 hover:border-primary-700 transition-all duration-300"
            >
              <div className="w-14 h-14 mb-6 rounded-xl bg-gradient-to-br from-accent-800 to-accent-700 flex items-center justify-center transition-all">
                <feature.icon className="w-7 h-7 text-primary-50" />
              </div>

              <h3 className="text-xl text-primary-50 font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-primary-200/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 space-y-6">
          <p className="text-lg text-primary-200">
            Ready to experience the perfect blend of luxury and nature?
          </p>
          <button className="group inline-flex items-center px-6 py-3 bg-accent-500 text-primary-800 font-semibold rounded-lg hover:bg-accent-600 transition-all">
            Discover Our Cabins
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
