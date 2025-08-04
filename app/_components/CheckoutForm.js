"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

function PaymentForm({ bookingId, totalAmount, onPaymentSuccess, user }) {
  const stripe = useStripe();
  const elements = useElements();
  console.log(user);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/success?bookingId=${bookingId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment succeeded - call the callback
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentIntent);
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
    defaultValues: {
      billingDetails: {
        name: user?.fullName || user?.name || "",
        email: user?.email || "",
        phone: user?.phoneNumber || "", 
        address: {
          line1: user?.address || "",
          city: "", 
          state: "",
          postal_code: "",
          country: user?.nationality === "Egypt" ? "EG" : "US", 
        },
      },
    },
  };

  return (
    <div className="w-full mx-auto p-6 bg-primary-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary-100">Complete Payment</h2>
      <div className="mb-4 p-4 bg-primary-950 rounded-lg border border-accent-500/20">
        <p className="text-sm text-primary-300">Total Amount:</p>
        <p className="text-xl font-semibold text-accent-400">${totalAmount}</p>
      </div>
      
      <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement options={paymentElementOptions} />
        <button 
          disabled={isLoading || !stripe || !elements} 
          id="submit"
          className="bg-accent-600 text-primary-700 py-3 px-4 hover:bg-accent-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-100"></div>
                <span className="ml-2">Processing...</span>
              </div>
            ) : (
              "Pay now"
            )}
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="p-3 bg-red-500/10 text-red-400 rounded-lg text-sm border border-red-500/20">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default function CheckoutForm({ clientSecret, bookingId, totalAmount, onPaymentSuccess, user }) {

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#f59e0b', // accent-500
      colorBackground: '#1f2937', // primary-800
      colorText: '#f9fafb', // primary-100
      colorDanger: '#ef4444', // red-500
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Tab': {
        border: '1px solid #374151',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
      },
      '.Tab:hover': {
        color: '#f59e0b',
        border: '1px solid #f59e0b',
      },
      '.Tab--selected': {
        border: '1px solid #f59e0b',
        color: '#f59e0b',
      },
      '.Input': {
        border: '1px solid #374151',
        backgroundColor: '#374151',
        color: '#f9fafb',
      },
      '.Input:focus': {
        border: '1px solid #f59e0b',
        boxShadow: '0 0 0 1px #f59e0b',
      },
      '.Label': {
        color: '#d1d5db',
      },
    },
  };
  
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm 
        bookingId={bookingId} 
        totalAmount={totalAmount} 
        onPaymentSuccess={onPaymentSuccess}
        user={user}
      />
    </Elements>
  )
} 