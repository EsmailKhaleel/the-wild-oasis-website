import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";
import { useFormStatus } from "react-dom";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <Button />
    </form>
  );
}

export default SignOutButton;

function Button() {
  const { pending } = useFormStatus();
  return (
    <button className="py-2 px-3 lg:py-3 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
      {pending ? (
        <SpinnerMini />
      ) : (
        <>
          <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600" />
          <span className="hidden lg:block">Sign out</span>
        </>
      )}
    </button>
  );
}
