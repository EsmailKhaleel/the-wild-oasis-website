import { UsersIcon, MapPinIcon, StarIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function StatsSection() {
  const stats = [
    {
      icon: UsersIcon,
      number: "10,000+",
      label: "Happy Guests",
      description: "Satisfied customers from around the world"
    },
    {
      icon: MapPinIcon,
      number: "16",
      label: "Luxury Cabins",
      description: "Beautifully designed mountain retreats"
    },
    {
      icon: StarIcon,
      number: "4.9",
      label: "Average Rating",
      description: "Consistently excellent guest reviews"
    },
    {
      icon: HeartIcon,
      number: "95%",
      label: "Return Rate",
      description: "Guests who choose to visit again"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary-950 to-primary-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-primary-50 font-bold mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            Our commitment to excellence has made us a favorite destination for nature lovers worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-primary-950 rounded-xl border border-primary-800/50 hover:border-primary-700 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-accent-400" />
              </div>
              
              <div className="text-3xl font-bold text-primary-50 mb-2">
                {stat.number}
              </div>
              
              <h3 className="text-lg font-semibold text-primary-100 mb-2">
                {stat.label}
              </h3>
              
              <p className="text-sm text-primary-300">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 