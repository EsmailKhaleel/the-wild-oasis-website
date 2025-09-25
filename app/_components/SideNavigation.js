"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const currentPath = usePathname();
  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 lg:gap-2 h-full text-sm lg:text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-2 px-3 lg:py-3 lg:px-5 ${
                currentPath === link.href && "bg-primary-900 text-primary-100"
              } hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden lg:block">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="lg:mt-[40vh]">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
