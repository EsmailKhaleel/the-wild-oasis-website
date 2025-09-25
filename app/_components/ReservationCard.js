import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import PaymentButton from "./PaymentButton";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

async function ReservationCard({ booking }) {
  const {
    _id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    isPaid,
    created_at,
    cabinId: { name, image },
  } = booking;

  const isPastBooking =
    isPast(new Date(startDate)) && isPast(new Date(endDate));
  const isRunning = isPast(new Date(startDate)) && !isPast(new Date(endDate));
  const isUnpaid = !isPaid && status === "unconfirmed";
  console.log("Booking status:", status, "isPaid:", isPaid);

  return (
    <div className="flex flex-col lg:flex-row border border-primary-800 rounded overflow-hidden">
      {/* Image */}
      <div className="relative h-48 w-full lg:h-auto lg:w-32 flex-shrink-0">
        <Image
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, 100px"
          alt={`Cabin ${name}`}
          className="object-cover"
        />
      </div>

      {/* Main content */}
      <div className="flex-grow px-4 py-3 flex flex-col gap-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`${
                isPastBooking
                  ? "bg-accent-800 text-accent-200"
                  : isRunning
                  ? "bg-yellow-800 text-yellow-200"
                  : "bg-green-800 text-green-200"
              } h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm`}
            >
              {isPastBooking ? "past" : isRunning ? "running" : "upcoming"}
            </span>
            {isUnpaid && !isPastBooking && (
              <span className="bg-red-800 text-red-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                unpaid
              </span>
            )}
            {isUnpaid && isPastBooking && (
              <span className="bg-pink-900 text-primary-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                paid cash
              </span>
            )}
            {isPaid && (
              <span className="bg-primary-800 text-primary-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
                paid
              </span>
            )}
          </div>
        </div>

        {/* Dates */}
        <p className="text-base text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        {/* Price and guests */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-primary-300 mt-auto">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <span>&bull;</span>
          <p className="text-base">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="text-sm text-primary-400 ml-auto">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>

        {/* Payment button for unpaid reservations */}
        {isUnpaid && !isPastBooking && (
          <div className="mt-3">
            <PaymentButton
              bookingId={_id}
              totalAmount={totalPrice}
              className="w-full sm:w-auto"
            />
          </div>
        )}

                {/* Action buttons on mobile (below content) */}
        {!isPastBooking && (
          <div className="flex lg:hidden gap-2 border-t border-primary-800 pt-3 mt-3">
            <Link
              href={`/account/reservations/edit/${_id}`}
              className="flex items-center gap-2 uppercase text-xs font-bold text-primary-300 hover:bg-accent-600 px-3 py-2 rounded-sm transition-colors hover:text-primary-900 border border-primary-700"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800" />
              <span>Edit</span>
            </Link>
            {isPaid ? (
              <div className="text-xs text-red-400 flex items-center px-3">
                Paid reservations can only be cancelled at the hotel
              </div>
            ) : (
              <DeleteReservation bookingId={_id} />
            )}
          </div>
        )}
      </div>

      {/* Action buttons on desktop */}
      {!isPastBooking && (
        <div className="hidden lg:flex flex-col border-l border-primary-800 w-[180px]">
          <Link
            href={`/account/reservations/edit/${_id}`}
            className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 py-4 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Edit</span>
          </Link>
          {isPaid ? (
            <div className="text-xs text-red-400 flex items-center justify-start p-4 text-start">
              Paid reservations can only be cancelled at the hotel
            </div>
          ) : (
            <DeleteReservation bookingId={_id} />
          )}
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
