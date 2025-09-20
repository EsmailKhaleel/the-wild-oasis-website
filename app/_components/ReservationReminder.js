"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import useReservationStore from "@/app/_zustand/ReservationStore";

function ReservationReminder() {
  const range = useReservationStore((state) => state.range);
  const resetRange = useReservationStore((state) => state.resetRange);

  if (!range.from || !range.to) return null;

  return (
    <div
      className="
        fixed bottom-6 left-1/2 -translate-x-1/2
        w-[95%] sm:w-[90%] max-w-xl
        py-4 px-6 sm:py-5 sm:px-8 rounded-full
        bg-accent-500 text-primary-800 font-medium sm:font-semibold
        shadow-xl shadow-slate-900
        flex flex-row gap-4 sm:gap-8 items-center
      "
    >
      <div className="flex-grow">
        <p className="text-sm sm:text-base">
          <span>👋</span> Don&apos;t forget to reserve your dates{" "}
          from {format(new Date(range.from), "MMM dd yyyy")} to{" "}
          {format(new Date(range.to), "MMM dd yyyy")}
        </p>
      </div>
      <button
        onClick={resetRange}
        className="rounded-full p-1 hover:bg-accent-600 transition-all shrink-0"
      >
        <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}

export default ReservationReminder;
