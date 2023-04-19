import { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Loader from '@/components/Loader';
import CheckoutForm from '@/components/CheckoutForm';

const CheckoutCart = dynamic(() => import('@/components/CheckoutCart'), { ssr: false });
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");


export default function Checkout() {
  const [buyingIntent, setBuyingIntent] = useState({});

  useEffect(() => {
    async function getBuyingIntent() {
      const url = 'https://api.stripe.com/v1/payment_intents/pi_1GszXG2eZvKYlo2CELvuyh4E';
      const Auth = `Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc`;

      const response = await fetch(url, { headers: { 'Authorization': Auth } });
      const data = await response.json()
      return data;
    }

    async function fetchData() {
      const buyingIntent = await getBuyingIntent();
      setBuyingIntent(buyingIntent);
    }

    fetchData();
  }, []);

  if (!buyingIntent.client_secret) return <Loader />;

  const options = { clientSecret: buyingIntent.client_secret };

  return (
    <section className="container mx-auto py-24">
      <div className="grid grid-cols-5 gap-4">
        <div className='col-span-2'><CheckoutCart /></div>
        <div className='col-span-3'>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements></div>
      </div>
    </section>
  );
}

