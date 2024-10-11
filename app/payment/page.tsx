"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutPage from "@/components/payment/CheckoutPage";
import { convertToSubcurrency } from "@/lib/utils";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentPage() {
  const amount = 25.6;

  return (
    <div>
      <Elements
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "cad",
        }}
        stripe={stripePromise}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </div>
  );
}
