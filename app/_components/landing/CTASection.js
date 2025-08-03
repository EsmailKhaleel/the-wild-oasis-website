import Link from "next/link";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-primary-950 to-primary-900 relative overflow-hidden">

      
      <div className="max-w-5xl mx-auto text-center px-4 relative z-10">
        <div className="inline-flex items-center px-4 py-2 bg-accent-500/20 backdrop-blur-sm rounded-full text-accent-300 font-semibold text-sm mb-8">
          <SparklesIcon className="w-4 h-4 mr-2" />
          Limited Time Offer
        </div>
        
        <h2 className="text-5xl md:text-6xl text-primary-50 font-bold mb-8 leading-tight">
          Ready for Your Mountain{" "}
          <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
            Getaway?
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-primary-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          Book your stay now and experience the perfect blend of luxury and nature. 
          Create memories that will last a lifetime in our pristine mountain retreat.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link
            href="/cabins"
            className="group bg-accent-500 px-10 py-5 text-primary-800 font-bold text-lg hover:bg-accent-600 transition-all duration-300 rounded-xl shadow-2xl transform flex items-center"
          >
            View Available Cabins
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/about"
            className="group border-2 border-primary-300 px-10 py-5 text-primary-100 font-semibold text-lg hover:bg-primary-300/10 transition-all duration-300 rounded-xl backdrop-blur-sm"
          >
            Learn More About Us
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-primary-300">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-400 mb-2">4.9/5</div>
            <div className="text-sm">Guest Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-400 mb-2">16</div>
            <div className="text-sm">Luxury Cabins</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-400 mb-2">24/7</div>
            <div className="text-sm">Concierge Service</div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
