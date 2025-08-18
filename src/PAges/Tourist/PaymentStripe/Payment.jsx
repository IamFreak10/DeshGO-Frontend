import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ScaleLoader } from 'react-spinners';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiosSecure();
  const { user } = UseAuth();

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    isLoading,
    isPending,
    data: bookingInfo = {},
  } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${id}`);
      return res.data;
    },
  });

  if (isLoading || isPending) {
    return <ScaleLoader height={61} radius={9} width={21} />;
  }

  let price = bookingInfo.price;
  if (price < 80) {
    price = 80; // Minimum price set to 80
  }

  const amountInCents = price * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return;
    }

    // Step 1: Validate card and create payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setLoading(false);
      return;
    } else {
      setError('');
      
    }

    // Step 2: Create payment intent on backend
    let res;
    try {
      res = await axiosInstance.post('/create-payment-intent', {
        amountInCents,
        id,
      });
    } catch (err) {
      setError('Failed to create payment intent. Please try again.');
      setLoading(false);
      return;
    }

    const clientSecret = res.data.clientSecret;

    // Step 3: Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      setError('');

      if (result.paymentIntent.status === 'succeeded') {
        // Payment succeeded: do post-payment actions here
   

        // Example: send payment info to backend
        const paymentData = {
          id, // booking or parcel id
          email: user.email,
          amount: price,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
          paid_at: new Date(),
        };

        try {
          const paymentRes = await axiosSecure.post('/payments', paymentData);
          if (paymentRes.data.insertedId) {
            await axiosSecure.patch(`/bookings/${id}`, {
              bookingStatus: 'In Review',
              paymentStatus: 'Paid',
            });

            Swal.fire(
              'Payment Successful!',
              'Your payment was processed.',
              'success'
            ).then(() => {
              navigate('/dashboard/my-bookings'); // redirect user after success
            });
          }
        } catch (err) {
          setError(
            'Payment succeeded but failed to save record. Contact support.'
          );
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        💳 Pay For Parcel
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
          <CardElement className="bg-transparent focus:outline-none text-base text-gray-800 dark:text-white" />
        </div>

        <div>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full text-black btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Pay $${price}`}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Payment;
