import Header from "@/app/_components/Header";
import Logo from "./_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";
import { Varela_Round } from "next/font/google";

const varelaRound = Varela_Round({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-varela-round",
  weight: "400",
});

export const metadata = {
  title: {
    default: "The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description:
    "A serene escape into nature's beauty, where tranquility meets adventure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${varelaRound.className} relative flex flex-col bg-primary-950 text-primary-100 antialiased min-h-screen select-none`}
      >
        <Header />
          <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">{children}</main>
      </body>
    </html>
  );
}
