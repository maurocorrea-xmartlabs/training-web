import { env } from "@/config/env.server";
import { transporter } from "../mailer";

export async function sendLogInEmail(userEmail: string) {
  try {
    await transporter.sendMail({
      from: env.MAIL_FROM,
      to: userEmail,
      subject: "New access to Uni-Do",
      text: "We detected a new access to our website",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="margin-bottom: 8px;">New login to your Uni-Do account</h2>

            <p>
              We detected a new sign-in to your account.
            </p>

            <p>
              If this was you, no further action is required.
            </p>

            <p>
              If you don't recognize this activity, we recommend changing your password
              as soon as possible.
            </p>

            <p style="margin-top: 24px; font-size: 14px; color: #666;">
              This email is sent for security reasons to help keep your account safe.
            </p>

            <p style="margin-top: 16px;">
              — The Uni-Do team
            </p>
      </div>
    `,
    });
  } catch (error) {
    console.error("[sendLogInEmail] Error sending email:", error);
  }
}
