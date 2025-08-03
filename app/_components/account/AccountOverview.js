import { auth } from "@/app/_lib/auth";
import { getGuestBookings } from "@/app/_lib/data-service";
import {
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  CalendarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import Image from "next/image";

export default async function AccountOverview() {
  const { user } = await auth();
  const userBookings = await getGuestBookings(user._id);
  const memberSince = new Date(user.createdAt).getFullYear();
  const guestTotalPaid = userBookings.reduce((total, booking) => {
    if (booking.status === "checked-in" || booking.status === "checked-out") {
      return total + booking.totalPrice;
    }
    return total;
  }, 0);

  const stats = [
    {
      icon: CalendarIcon,
      label: "Total Bookings",
      value: userBookings.length,
    },
    {
      icon: StarIcon,
      label: "Member Since",
      value: memberSince,
    },
    {
      icon: AdjustmentsHorizontalIcon,
      label: "Total Nights",
      value: userBookings.reduce((total, booking) => {
        if (
          booking.status === "checked-in" ||
          booking.status === "checked-out"
        ) {
          return total + booking.numNights;
        }
        return total;
      }, 0),
    },
    {
      icon: BanknotesIcon,
      label: "Total Paid",
      value: `$ ${guestTotalPaid.toFixed(2)}`,
    },
  ];

  return (
    <div className="pb-16">
      <div className="flex items-center mb-8">
        {user.image ? (
          <Image
            src={user.image}
            width={80}
            height={80}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0) || "G"}
          </div>
        )}
        <div className="ml-6">
          <h1 className="text-xl lg:text-3xl font-bold text-primary-50">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-primary-200 mt-1">
            Ready for your next mountain adventure?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-primary-950 to-primary-900 rounded-xl p-2 lg:p-6 border border-primary-900"
          >
            <div className="flex flex-col lg:grid lg:grid-cols-[auto_1fr] lg:items-start gap-2 lg:gap-x-4">
              <div className="flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-accent-600 to-accent-500 rounded-lg">
                <stat.icon className="w-4 h-4 lg:w-6 lg:h-6 text-primary-50" />
              </div>

              <div className="flex flex-col lg:justify-center">
                <div className="flex items-center gap-2 lg:block">
                  <h3 className="text-md lg:text-lg font-semibold text-primary-50">
                    {stat.value}
                  </h3>
                </div>
                <p className="text-sm text-primary-500 mt-1 lg:mt-0">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
