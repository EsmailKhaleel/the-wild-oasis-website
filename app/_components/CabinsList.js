import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export default async function CabinsList({ filter = "all" }) {
  const cabins = await getCabins();

  let filteredCabins = cabins;

  switch (filter) {
    case "small":
      filteredCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
      break;
    case "medium":
      filteredCabins = cabins.filter(
        (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 6
      );
      break;
    case "large":
      filteredCabins = cabins.filter((cabin) => cabin.maxCapacity > 6);
      break;
    default:
      filteredCabins = cabins;
  }

  if (!cabins || cabins.length === 0) {
    return (
      <p className="text-primary-200 text-center">
        No cabins available at the moment.
      </p>
    );
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin._id} />
      ))}
    </div>
  );
}
