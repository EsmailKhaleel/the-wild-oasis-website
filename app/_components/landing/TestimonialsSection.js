import { StarIcon } from "@heroicons/react/24/solid";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      content: "The Wild Oasis exceeded all expectations. The cabins are beautifully designed and the mountain views are absolutely breathtaking. Perfect for a peaceful retreat.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Executive",
      content: "I've stayed at many luxury resorts, but this place is truly special. The attention to detail and personalized service made our stay unforgettable.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Photographer",
      content: "As a photographer, I'm always looking for beautiful locations. The Wild Oasis provided the perfect backdrop for stunning nature photography.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary-950 to-primary-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl text-primary-50 font-bold">
            What Our Guests Say
          </h2>
          <p className="text-xl text-primary-200/90 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our guests have to say about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col group p-8 bg-primary-900/50 backdrop-blur-sm rounded-2xl border border-primary-800/50 hover:border-primary-700 transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400/90 group-hover:text-yellow-400 transition-colors" />
                ))}
              </div>
              
              <p className="text-primary-200/90 mb-8 italic leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-primary-950 font-semibold text-lg ring-2 ring-accent-400/20">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-primary-50">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-primary-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 