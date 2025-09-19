import { auth } from "../_lib/auth";
import Image from "next/image";
import NavLink from "./NavLink";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="text-lg sm:text-xl">
      <ul className="flex items-start flex-col gap-2 sm:gap-4 sm:flex-row xl:gap-16">
        <li>
          <NavLink href="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink href="/cabins">
            Cabins
          </NavLink>
        </li>
        <li>
          <NavLink href="/about">
            About
          </NavLink>
        </li>
        <li>
          {session?.user ? (
            <NavLink href="/account" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image
                  fill
                  sizes="(max-width: 32px) 32px, (max-width: 64px) 64px, 128px"
                  referrerPolicy="no-referrer"
                  className="rounded-full w-full h-full object-cover"
                  src={session.user.image}
                  alt={session.user.name}
                />
              </div>
              {session.user.name}
            </NavLink>
          ) : (
            <NavLink href="/account">
              Guest area
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
