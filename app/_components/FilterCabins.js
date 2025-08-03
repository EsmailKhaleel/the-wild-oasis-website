"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterCabins() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = (filter) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      newSearchParams.delete("capacity");
    } else {
      newSearchParams.set("capacity", filter);
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const currentFilter = searchParams.get("capacity") ?? "all";

  return (
    <>
      <Button
        filter="all"
        currentFilter={currentFilter}
        handleFilter={handleFilterChange}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        currentFilter={currentFilter}
        handleFilter={handleFilterChange}
      >
        1-3 Guests
      </Button>
      <Button
        filter="medium"
        currentFilter={currentFilter}
        handleFilter={handleFilterChange}
      >
        4-6 Guests
      </Button>
      <Button
        filter="large"
        currentFilter={currentFilter}
        handleFilter={handleFilterChange}
      >
        More than 6
      </Button>
    </>
  );
}

const Button = ({ filter, currentFilter, handleFilter, children }) => {
  return (
    <button
      className={`text-primary-100 p-2 sm:py-1 rounded hover:bg-primary-900 transition-all cursor-pointer border border-primary-900 text-sm sm:text-base text-nowrap ${
        currentFilter === filter ? "bg-primary-900" : "bg-primary-950"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
};
