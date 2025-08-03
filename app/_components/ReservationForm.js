"use client";
import Image from "next/image";
import useReservationStore from "../_zustand/ReservationStore";
import { differenceInDays } from "date-fns";
import { createReservationAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { maxCapacity, discount, regularPrice } = cabin;
  const range = useReservationStore((state) => state.range);
  const resetRange = useReservationStore((state) => state.resetRange);
  const numNights = differenceInDays(range?.to, range?.from);
  const cabinPrice = numNights * (regularPrice - discount);
  const bookingData = {
    cabinId: cabin._id,
    startDate: range.from,
    endDate: range.to,
    numNights,
    cabinPrice,
  };
  // Pass the booking data to the action
  const createReservationActionWithBookingData = createReservationAction.bind(
    null,
    bookingData
  );
  return (
    <div className="w-full h-full flex flex-col justify-between">
<div className="bg-primary-800 text-primary-300 px-4 sm:px-16 py-4 flex flex-row justify-between items-start gap-2 sm:gap-4">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <div className="relative w-8 h-8">
            <Image
              fill
              sizes="(max-width: 32px) 32px, (max-width: 64px) 64px, 128px"
              referrerPolicy="no-referrer"
              className="rounded-full w-full h-full object-cover"
              src={user.image}
              alt={user.name}
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationActionWithBookingData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-8 px-4 sm:px-16 text-base sm:text-lg flex flex-col gap-5"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="block">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="block">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm resize-none"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <SubmitButton label="Reserve now" />
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
