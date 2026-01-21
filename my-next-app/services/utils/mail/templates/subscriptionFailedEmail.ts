import { env, getAppUrl } from "@/config/env.server";
import { transporter } from "../mailer";

export async function sendSubscriptionFailedEmail(userEmail: string) {
  try {
    await transporter.sendMail({
      from: env.MAIL_FROM,
      to: userEmail,
      subject: "There was an issue with your Uni-Do subscription",
      text: "We couldn't process your subscription payment. Please try again.",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="margin-bottom: 8px;">
            We couldn't complete your subscription
          </h2>

          <p>
            Unfortunately, we were unable to process your subscription payment.
          </p>

          <p>
            No charges were made, and your account has not been upgraded.
          </p>

          <p>
            You can retry your subscription at any time by clicking the link below:
          </p>

          <p style="margin: 16px 0;">
            <a
              href="${getAppUrl()}/subscription"
              style="
                display: inline-block;
                padding: 12px 20px;
                background-color: #000;
                color: #fff;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
              "
            >
              Retry subscription
            </a>
          </p>

          <p style="margin-top: 24px; font-size: 14px; color: #666;">
            If you believe this is a mistake or need help, feel free to reply to this email.
          </p>

          <p style="margin-top: 16px;">
            — The Uni-Do team
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[sendSubscriptionFailedEmail] Error sending email:", error);
  }
}
