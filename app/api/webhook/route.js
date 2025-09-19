import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../_lib/stripe'
import { axiosInstance } from '@/app/_lib/data-service'
export async function POST(req) {
  let event

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      (await headers()).get('stripe-signature'),
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    const errorMessage = err.message
    // On error, log and return the error message.
    if (err) console.log(err)
    console.log(`Error message: ${errorMessage}`)
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  console.log(`Received webhook event: ${event.type}`)

  const permittedEvents = [
    'payment_intent.succeeded', 
    'payment_intent.payment_failed',
    'charge.succeeded',
    'charge.updated'
  ]

  if (permittedEvents.includes(event.type)) {
    let data

    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          data = event.data.object
          console.log(`Payment succeeded: ${data.id}`)
          console.log(`Payment metadata:`, data.metadata)
          
          // Update booking status in backend
          if (data.metadata?.bookingId) {
            console.log(`Calling updateBookingPaymentStatus for booking: ${data.metadata.bookingId}`)
            await updateBookingPaymentStatus(data.metadata.bookingId, 'paid', data.id)
          } else {
            console.log('No bookingId found in metadata')
          }
          break
          
        case 'payment_intent.payment_failed':
          data = event.data.object
          console.log(`Payment failed: ${data.id}`)
          
          // Update booking status in backend
          if (data.metadata?.bookingId) {
            await updateBookingPaymentStatus(data.metadata.bookingId, 'failed', data.id)
          }
          break

        case 'charge.succeeded':
          data = event.data.object
          console.log(`Charge succeeded: ${data.id}`)
          console.log(`Charge metadata:`, data.metadata)
          
          // Update booking status in backend
          if (data.metadata?.bookingId) {
            console.log(`Calling updateBookingPaymentStatus for booking: ${data.metadata.bookingId}`)
            await updateBookingPaymentStatus(data.metadata.bookingId, 'paid', data.payment_intent)
          } else {
            console.log('No bookingId found in charge metadata')
          }
          break

        case 'charge.updated':
          data = event.data.object
          console.log(`Charge updated: ${data.id}`)
          
          // Only update if the charge is successful
          if (data.status === 'succeeded' && data.metadata?.bookingId) {
            await updateBookingPaymentStatus(data.metadata.bookingId, 'paid', data.payment_intent)
          }
          break
          
        default:
          console.log(`Unhandled event type: ${event.type}`)
      }
    } catch (error) {
      console.log('Error in webhook handler:', error)
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 }
      )
    }
  } else {
    console.log(`Event type ${event.type} not in permitted events`)
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 })
}

// Function to update booking payment status in backend
async function updateBookingPaymentStatus(bookingId, status, paymentIntentId) {
  try {
    const requestBody = {
      isPaid: status === 'paid',
      paymentIntentId: paymentIntentId,
      status: status === 'paid' ? 'confirmed' : 'unconfirmed',
    };

    const response = await axiosInstance.patch(
      `/bookings/${bookingId}/payment-status`,
      requestBody
    );

    console.log(`Response: ${response}`);
  } catch (error) {
    console.error('Error updating booking payment status:', error);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Message:', error.message);
    }
  }
}
