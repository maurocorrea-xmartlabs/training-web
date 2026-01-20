import { updateSubscription } from "@/services/subscriptionService";
import { sendSubscriptionFailedEmail } from "@/services/utils/mail/templates/subscriptionFailedEmail";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const userId = Number(paymentIntent.metadata.userId);

    await updateSubscription(userId);
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    //we use the email directly here because we only need to send a mail
    await sendSubscriptionFailedEmail(paymentIntent.metadata.userEmail);
  }

  return NextResponse.json({ received: true });
}
