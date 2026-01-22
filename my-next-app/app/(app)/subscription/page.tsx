import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { StripeWrapper } from "@/lib/ui/payments/stripeWrapper";

export default async function SubscriptionPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (
    session.user.subscriptionExpirationDate &&
    session.user.subscriptionExpirationDate >= new Date()
  ) {
    redirect("/");
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-black text-center border-m10 rounded-md">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Subscribe to us!</h1>
        <h2 className="text-2xl">
          For only <span className="text-4xl font-extrabold mb-2">$4.99</span>
        </h2>
      </div>

      <StripeWrapper amount={4.99} />
    </main>
  );
}
