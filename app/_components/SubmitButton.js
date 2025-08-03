"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button className="bg-accent-500 px-4 py-2 lg:px-8 lg:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? <SpinnerMini /> : label}
    </button>
  );
}

export default SubmitButton;
