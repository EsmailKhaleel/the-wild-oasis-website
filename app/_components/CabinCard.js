"use client";
import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import { useRef } from "react";

function CabinCard({ cabin }) {
  const { _id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const ref = useRef(null);

  return (
    <div className="overflow-hidden rounded-md border sm:border-none border-primary-800 bg-primary-950 flex flex-col sm:flex-row">
<Modal ref={ref}>
  <div className="relative w-full max-w-3xl aspect-[4/3]">
    <Image
      src={image}
      fill
      quality={100}
      alt={`Cabin ${name}`}
      className="object-cover rounded-md"
      sizes="100vw"
    />
  </div>
</Modal>

      <div
        onClick={() => ref.current.show()}
        className="relative w-full sm:w-[160px] lg:w-[200px] aspect-[4/3] sm:aspect-auto flex-shrink-0"
      >
        <Image
          src={image}
          fill
          placeholder="blur"
          blurDataURL={image}
          quality={100}
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-800"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (min-width: 1025px) 25vw"
        />
      </div>

      <div className="flex-grow p-5 pl-0">
        <div className=" border-primary-800 border border-l-0">
          <div className="pt-5 pb-4 px-7 bg-primary-950">
            <h3 className="text-accent-500 font-semibold text-xl lg:text-2xl mb-3">
              Cabin {name}
            </h3>

            <div className="flex gap-3 items-center mb-2">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <p className="text-lg text-primary-200">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </p>
            </div>

            <p className="flex gap-3 justify-end items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-lg md:text-2xl lg:text-3xl font-[350]">
                    ${regularPrice - discount}
                  </span>
                  <span className="line-through font-semibold text-primary-600">
                    ${regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-lg md:text-2xl lg:text-3xl font-[350]">
                  ${regularPrice}
                </span>
              )}
              <span className="text-primary-200">/ night</span>
            </p>
          </div>

          <div className="bg-primary-950 border-t border-t-primary-800 text-right">
            <Link
              href={`/cabins/${_id}`}
              className="border-l border-primary-800 py-3 px-5 lg:py-4 lg:px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
            >
              Details & reservation &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
