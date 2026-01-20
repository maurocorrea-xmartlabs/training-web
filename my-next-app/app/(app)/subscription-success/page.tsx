import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <main className="max-w-6xl mx-auto p-10 text-center border m-10 rounded-md">
      <div className="">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">Your payment is being processed</h2>
        <p>Your subscription will be activated shortly.</p>
        <p className="pt-10">
          <Link href="/" className="text-black hover:underline font-medium">
            Return to To-Do
          </Link>
        </p>
      </div>
    </main>
  );
}
