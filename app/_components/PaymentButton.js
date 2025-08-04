"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentButton({ bookingId, totalAmount, className = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      router.push(`/checkout?bookingId=${bookingId}&totalAmount=${totalAmount}`);
    } catch (error) {
      console.error('Error initiating payment:', error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={`bg-accent-500 text-primary-800 px-6 py-3 font-semibold hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-100"></div>
          <span className="ml-2">Processing...</span>
        </div>
      ) : (
        `Confirm Reservation $${totalAmount}`
      )}
    </button>
  );
} 