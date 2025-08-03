import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookingsDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookingsDatesByCabinId(cabin._id),
    getSettings(),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[680px_1fr] border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        bookedDates={bookedDates}
        settings={settings}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
