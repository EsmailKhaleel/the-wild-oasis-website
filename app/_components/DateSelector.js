"use client";
import { differenceInDays, isPast, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useReservationStore from "../_zustand/ReservationStore";
import { useState } from "react";
import useWindowWidth from "../_hooks/useIsMobile";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((booking) =>
      isWithinInterval(booking.startDate, {
        start: range?.from,
        end: range?.to,
      })
    )
  );
}

function DateSelector({ cabin, bookedDates, settings }) {
  const [error, setError] = useState(null);
  const range = useReservationStore((state) => state.range);
  const setRange = useReservationStore((state) => state.setRange);
  const resetRange = useReservationStore((state) => state.resetRange);

  const width = useWindowWidth();
  const isMobile = width < 768;

  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayedRange?.to, displayedRange?.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;
  function handleSetRange(newRange) {
    if (!newRange?.from || !newRange?.to) {
      setError(null);
      setRange(newRange);
      return;
    }

    const nights = differenceInDays(newRange.to, newRange.from);

    if (nights < minBookingLength) {
      setError(
        `Minimum booking length is ${minBookingLength} nights. You selected ${nights} nights.`
      );
      setRange({ from: newRange.from }); // Keep only start date
      return;
    }

    if (nights > maxBookingLength) {
      setError(
        `Maximum booking length is ${maxBookingLength} nights. You selected ${nights} nights.`
      );
      setRange({ from: newRange.from }); // Keep only start date
      return;
    }

    setError(null);
    setRange(newRange);
  }
  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        mode="range"
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 1, 0)}
        captionLayout="dropdown"
        numberOfMonths={isMobile ? 1 : 2}
        className="pt-12 mb-2 place-self-center"
        classNames={{
          months: "gap-6",
          month: "text-xs",
          caption: "text-sm font-semibold",
          caption_label: "text-xs",
          nav_button: "w-6 h-6",
          table: "text-xs",
          head_row: "text-xs",
          head_cell: "text-xs font-medium",
          row: "text-xs",
          cell: "text-xs p-0.5",
          day: "text-xs w-7 h-7",
          weekday: "text-xs font-medium",
        }}
        modifiersClassNames={{
          selected: "bg-accent-500 text-white font-bold",
          range_start: "bg-accent-700 text-white font-bold rounded-l-full",
          range_end: "bg-accent-700 text-white font-bold rounded-r-full",
          range_middle: "bg-accent-200 text-primary-900 opacity-90",
        }}
        styles={{
          months: {
            display: "flex",
            flexDirection: "row",
          },
        }}
        selected={displayedRange}
        onSelect={handleSetRange}
        disabled={(currentDate) => {
          return (
            isPast(currentDate) ||
            bookedDates.some((booking) =>
              isWithinInterval(currentDate, {
                start: new Date(booking.startDate),
                end: new Date(booking.endDate),
              })
            )
          );
        }}
      />
      {error && (
        <div className=" text-red-700 px-4 py-3 rounded relative mb-4">
          <p>{error}</p>
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8 bg-accent-500 text-primary-800 lg:h-[72px] flex-wrap">
        <div className="flex items-baseline gap-2 lg:gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-md lg:text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-md lg:text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-2 lg:px-3 lg:py-2 text-md lg:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-md lg:text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-md lg:text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 lg:px-4 p-2 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
