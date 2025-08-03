import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import CabinsList from "@/app/_components/CabinsList";
import FilterCabins from "@/app/_components/FilterCabins";
import ReservationReminder from "@/app/_components/ReservationReminder";

// Make Incremental Static Regeneration (ISR) every 6 hours
export const revalidate = 21600; // 6 hours in seconds
// Notice after using searchParams, the revalidate is no longer needed
// Because the page will be re-rendered on every request with the latest data
// And it is no longer static

export const metadata = {
  title: "Cabins",
  description:
    "Explore our cozy cabins nestled in the heart of nature, perfect for a peaceful retreat.",
};

export default async function Page({ searchParams }) {
  const { capacity = "all" } = await searchParams;

  return (
    <>
      <h1 className="text-xl md:text-3xl lg:text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-md lg:text-lg mb-10 leading-7 text-justify break-words">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex flex-wrap justify-center sm:justify-end items-center gap-1 lg:gap-3 mb-10 border-b border-primary-800 pb-5">
        <FilterCabins />
      </div>

      <Suspense key={capacity} fallback={<Spinner />}>
        <CabinsList filter={capacity} />
        <ReservationReminder />
      </Suspense>
    </>
  );
}
