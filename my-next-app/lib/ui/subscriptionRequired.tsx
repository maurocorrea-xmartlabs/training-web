import Link from "next/link";

export function SubscriptionRequired() {
  return (
    <div className="max-w-xl mx-auto mt-20 p-8 border rounded-md text-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Subscription required</h1>

      <p className="text-gray-700 mb-4">
        This content is available to subscribed users only.
      </p>

      <p className="text-gray-700 mb-6">
        Subscribe now for <span className="font-semibold">$4.99</span> and get
        full access to all resources and features.
      </p>

      <Link
        href="/subscription"
        className="inline-block bg-black text-white px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
      >
        Subscribe for $4.99
      </Link>
    </div>
  );
}
