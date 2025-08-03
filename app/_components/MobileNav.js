'use client';

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useCallback } from "react";
import { useClickOutside } from "../_hooks/useClickOutside";

export default function MobileNav({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside([menuRef, buttonRef], handleClose);

  return (
    <div className="sm:hidden relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-primary-100 hover:text-accent-400 transition-colors"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`z-30 absolute right-0 top-full mt-3 w-72 bg-primary-900 rounded-lg shadow-lg overflow-visible transition-all duration-200 transform origin-top ${
            isOpen 
            ? 'opacity-100 scale-y-100 translate-y-0' 
            : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="absolute -top-2 right-4 w-4 h-4 bg-primary-900 transform rotate-45"></div>
        
        <div className="relative py-4 px-5 bg-primary-900 rounded-lg">
          {children}
        </div>

      </div>
    </div>
  );
}
