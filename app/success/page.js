import { redirect } from 'next/navigation'
import { stripe } from '../_lib/stripe'
import Link from 'next/link'
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

const STATUS_CONTENT_MAP = {
  succeeded: {
    text: "Payment Successful!",
    subtitle: "Your booking has been confirmed and you're all set for your stay.",
    icon: CheckCircleIcon,
    iconColor: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  processing: {
    text: "Payment Processing",
    subtitle: "Your payment is being processed. You will receive a confirmation shortly.",
    icon: ClockIcon,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20"
  },
  requires_payment_method: {
    text: "Payment Failed",
    subtitle: "Your payment was not successful. Please try again.",
    icon: XCircleIcon,
    iconColor: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20"
  },
  default: {
    text: "Something went wrong",
    subtitle: "Please try again or contact support if the problem persists.",
    icon: XCircleIcon,
    iconColor: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20"
  }
};

export default async function SuccessPage({ searchParams }) {
  const { payment_intent: paymentIntentId, bookingId } = await searchParams;

  if (!paymentIntentId) redirect('/');

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (!paymentIntent) redirect('/');

  const { status } = paymentIntent;
  const statusContent = STATUS_CONTENT_MAP[status] || STATUS_CONTENT_MAP.default;
  const IconComponent = statusContent.icon;

  return (
    <div className=" bg-primary-950 py-12">
      <div className="max-w-2xl flex flex-col items-center mx-auto">
          <h1 className="text-xl md:text-3xl lg:text-4xl mb-5 text-accent-400 font-medium">
            {statusContent.text}
          </h1>
          
          <div className={`mx-auto w-24 h-24 ${statusContent.bgColor} ${statusContent.borderColor} border-2 rounded-full flex items-center justify-center mb-8`}>
            <IconComponent className={`w-12 h-12 ${statusContent.iconColor}`} />
          </div>
          
          <p className="text-primary-200 text-md lg:text-lg mb-10 leading-7 text-justify break-words">
            {statusContent.subtitle}
          </p>

          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-block bg-accent-500 px-6 py-3 text-primary-800 text-md font-semibold hover:bg-accent-600 transition-all"
            >
              Back to Home
            </Link>
            
            {bookingId && (
              <Link 
                href="/account/reservations" 
                className="inline-block bg-primary-700 px-6 py-3 text-primary-200 text-md font-semibold hover:bg-primary-600 transition-all ml-4"
              >
                View My Bookings
              </Link>
            )}
        </div>
      </div>
    </div>
  );
} 