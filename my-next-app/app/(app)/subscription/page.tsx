"use client";

import { convertToSubcurrency } from "@/lib/convertToSubcurrency";
import { CheckoutPage } from "@/lib/ui/payments/checkoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
export default function SubscriptionPage() {
  const amount = 4.99;

  return (
    <main className="max-w-6xl mx-auto p-10 text-black text-center border-m10 rounded-md">
      <div className="mb-10">
        <h1 className="text-4xl front-extrabold mb-2"> Subscribe to us!</h1>
        <h2 className="text-2xl">
          For only <span className="text-4xl font-extrabold mb-2">$4.99</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}
