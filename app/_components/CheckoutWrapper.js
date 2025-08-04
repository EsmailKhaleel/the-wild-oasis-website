"use client";

import { useRouter } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

export default function CheckoutWrapper({ clientSecret, bookingId, totalAmount, user }) {
    const router = useRouter();

    const handlePaymentSuccess = (paymentIntent) => {
        console.log('Payment successful for booking:', bookingId);
        console.log('Payment Intent:', paymentIntent);
    };

    return (
        <CheckoutForm
            clientSecret={clientSecret}
            bookingId={bookingId}
            totalAmount={totalAmount}
            onPaymentSuccess={handlePaymentSuccess}
            user={user}
        />
    );
} 