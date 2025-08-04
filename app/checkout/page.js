import CheckoutWrapper from '../_components/CheckoutWrapper'
import { stripe } from '../_lib/stripe'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Trust from '@/public/trust.png';
import { auth } from '../_lib/auth';

export default async function CheckoutPage({ searchParams }) {
  const { bookingId, totalAmount } = await searchParams;
  const { user } = await auth();
  console.log(user)

  if (!bookingId || !totalAmount) {
    redirect('/');
  }

  // Convert total amount to cents
  const amountInCents = Math.round(parseFloat(totalAmount) * 100);

  // Create PaymentIntent as soon as the page loads
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    metadata: {
      bookingId: bookingId,
    },
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="text-center mb-8">
        <h1 className="text-xl md:text-3xl lg:text-4xl mb-5 text-accent-400 font-medium">Complete Your Booking</h1>
        <p className="text-primary-200 text-md lg:text-lg mb-10 leading-7 text-justify break-words">
          Secure payment powered by Stripe. Your booking will be confirmed once payment is completed.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center w-full">

      <div className="text-center flex-shrink-0 relative md:w-[400px] w-[200px] h-[200px] md:h-[400px]">
      <Image
            src={Trust}
            alt="Trusted Platform"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            className="mx-auto mb-2"
          />
        </div>

        <div className="flex-grow md:px-10">
          <CheckoutWrapper
            clientSecret={clientSecret}
            bookingId={bookingId}
            totalAmount={totalAmount}
            user={user}
          />
        </div>
      </div>
    </div>
  )
} 