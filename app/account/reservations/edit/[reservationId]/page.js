import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservationAction } from "@/app/_lib/actions";
import { getBookingById } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { reservationId } = await params;
  const reservation = await getBookingById(reservationId);
  const { cabinId, created_at, numGuests, isPaid } = reservation;
  const { maxCapacity } = cabinId;

  
  return (
    <div>
      <h2 className="font-semibold text-xl md:text-2xl text-accent-400 mb-7">
        Reservation created at {new Date(created_at).toLocaleString()} - Edit
        {` ${cabinId.name}`} reservation
      </h2>

      <form
        action={updateReservationAction}
        className="bg-primary-900 py-4 px-4 md:py-8 md:px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <input
            type="text"
            name="reservationId"
            id="reservationId"
            defaultValue={reservationId}
            className="hidden"
            readOnly
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="numGuests" className="block">How many guests? {isPaid && "(Cannot be changed after payment)"}</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            required
            defaultValue={String(numGuests)}
            disabled={isPaid}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => (i + 1).toString()).map((x) => (
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
            defaultValue={reservation.observations}
            rows={4}
            placeholder="Any special requests or notes for your stay?"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton label="Update reservation" />
        </div>
      </form>
    </div>
  );
}

