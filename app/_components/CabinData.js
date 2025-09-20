import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "@/app/_components/TextExpander";

export default function CabinData({ cabin }) {
  const { _id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-8 md:gap-0 mb-4 md:mb-24">
      <div className="relative w-full h-[400px] md:h-[600px]">
        <Image
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>

      <div className="flex flex-col border border-primary-800 py-3 px-4 md:px-10 md:my-4" >
        <h3 className="text-accent-100 font-black text-3xl text-wrap md:text-7xl mb-5 md:translate-x-[-254px] bg-primary-950 px-3 md:p-6 pb-1 md:w-[140%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
