import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";
import Link from "next/link";

// Make Incremental Static Regeneration (ISR) every 24 hours
export const revalidate = 86400; // 24 hours in seconds

export const metadata = {
  title: "About",
  description:
    "Learn more about The Wild Oasis, our mission, and the team behind the serene escape into nature's beauty.",
};

export default async function page() {
  const cabins = await getCabins();
  const numOfCabins = cabins?.length;

  return (
    <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12 md:gap-y-16 lg:grid-cols-5 lg:gap-x-24 lg:gap-y-32 lg:text-lg items-center">
      {/* 1st column */}
      <div className="lg:col-span-3">
        <h1 className="text-xl lg:text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-4 lg:space-y-8 text-primary-100 text-justify text-lg lg:text-xl">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {numOfCabins} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>
      {/* 2nd column */}
      <div className="lg:col-span-2">
        <Image
          src={image1}
          placeholder="blur"
          quality={100}
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>
      {/* 3rd column */}
      <div className="lg:col-span-2">
        <Image
          src={image2}
          placeholder="blur"
          quality={100}
          alt="Family that manages The Wild Oasis"
        />
      </div>
      {/* 4th column */}
      <div className="lg:col-span-3">
        <h1 className="text-xl lg:text-4xl mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-4 lg:space-y-8 text-primary-100 text-justify text-lg lg:text-xl">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-4 py-3 lg:px-8 lg:py-5 text-primary-800 text-md lg:text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
      {/* 5th column */}
    </div>
  );
}
