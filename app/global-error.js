'use client';

import "@/app/_styles/globals.css";
import { Varela_Round } from "next/font/google";

const varelaRound = Varela_Round({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-varela-round",
  weight: "400",
});

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className={`${varelaRound.className} flex min-h-screen items-center justify-center bg-primary-950 text-primary-100 antialiased`}>
        <main className='flex justify-center items-center flex-col gap-6'>
          <h1 className='text-3xl font-semibold'>Something went terribly wrong!</h1>
          <p className='text-lg'>{error.message}</p>
          <button 
            onClick={() => reset()} 
            className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg hover:bg-accent-600 transition-all'
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
