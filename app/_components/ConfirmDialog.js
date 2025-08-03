"use client";
import SpinnerMini from "./SpinnerMini";

export default function ConfirmDialog({ message, onConfirm, onCancel, pending }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm bg-black/40">
      <div className="bg-primary-50 rounded-lg shadow-lg w-full max-w-md p-6 sm:p-6 space-y-6">
        <p className="text-primary-900 text-lg">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-300 text-primary-950 hover:bg-gray-400"
            onClick={onCancel}
            disabled={pending}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-accent-600 text-primary-900 font-semibold hover:bg-accent-700 flex items-center justify-center min-w-[90px]"
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? <SpinnerMini /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
