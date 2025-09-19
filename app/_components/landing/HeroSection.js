import Image from "next/image";
import Link from "next/link";
import BG from "@/public/bg.png";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <section className="absolute inset-0 h-screen flex items-center justify-center overflow-hidden">
      {/* black overlay */}
      <div className="absolute z-10 inset-0 bg-black/40" ></div>

      
      <div className="absolute z-0 inset-0 p-2 sm:rounded-xl">
        <Image
          src={BG}
          quality={100}
          placeholder="blur"
          fill
          alt="Mountains and forests with two cabins"
          className="object-cover object-center brightness-[0.85] scale-105"
          priority
        />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl text-primary-50 mb-6 tracking-tight font-bold leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
            Paradise
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
          Experience luxury and tranquility in our mountain retreat. Where
          nature meets comfort in perfect harmony.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/cabins"
            className="group bg-accent-500 px-8 py-4 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform flex items-center"
          >
            Explore Our Luxury Cabins
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/about"
            className="group border-2 border-primary-200 px-8 py-4 text-primary-100 text-lg font-semibold hover:bg-primary-200/10 transition-all duration-300 rounded-lg backdrop-blur-sm"
          >
            Learn Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
