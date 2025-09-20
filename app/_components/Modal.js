import { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef(function Modal({ children }, ref) {
  const modalRef = useRef(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        show: () => {
          modalRef.current.showModal();
        },
        close: () => {
          modalRef.current.close();
        },
      };
    },
    []
  );

  return (
    <dialog
      ref={modalRef}
      id="modal"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        const dialog = modalRef.current;
        // Get dialog's bounding box
        const rect = dialog.getBoundingClientRect();
        // Check if click is outside the dialog box
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          ref.current.close();
        }
      }}
      className="origin-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-8 w-[90%] sm:w-[700px] bg-primary-900 text-primary-50 shadow-xl flex flex-col items-center justify-center overflow-hidden"
    >
      {children}
      {/* Close button */}
      <form method="dialog" className="mt-4 self-end">
        <button className="px-4 py-2 rounded bg-accent-500 hover:bg-accent-600 transition">
          Close
        </button>
      </form>
    </dialog>
  );
});

export default Modal;
