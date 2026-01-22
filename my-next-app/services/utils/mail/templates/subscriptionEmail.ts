import { mailQueue } from "@/lib/queue/mail.queue";

export async function sendSubscriptionEmail(userEmail: string) {
  const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="margin-bottom: 8px;">
          Thank you for subscribing to Uni-Do!
        </h2>

        <p>
          Your subscription has been <strong>successfully processed</strong> and is now active.
        </p>

        <p>
          You can now enjoy all the features and benefits of Uni-Do without restrictions.
        </p>

        <p>
          If you have any questions or need help, feel free to reach out to us at any time.
        </p>

        <p style="margin-top: 24px; font-size: 14px; color: #666;">
          This email confirms that your payment was received and your subscription is active.
        </p>

        <p style="margin-top: 16px;">
          — The Uni-Do team
        </p>
      </div>
    `;
  const subject = "Your Uni-Do subscription is active";
  const to = userEmail;
  try {
    await mailQueue.add("send-email", { to, subject, html });
  } catch (error) {
    console.error("[sendSubscriptionEmail] Error sending email:", error);
  }
}
