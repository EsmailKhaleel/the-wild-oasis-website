import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getReservationsByGuestId } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Your Reservations",
  description: "View and manage your reservations.",
};

export default async function Page() {
  const { user } = await auth();
  const reservations = await getReservationsByGuestId(user._id);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {reservations.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-6">
          {reservations.map((booking) => (
            <ReservationCard booking={booking} key={booking._id} />
          ))}
        </ul>
      )}
    </div>
  );
}
