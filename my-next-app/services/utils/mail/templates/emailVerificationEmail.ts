import { env, getAppUrl } from "@/config/env.server";
import { transporter } from "../mailer";

export async function sendEmailVerificationEmail(
  userEmail: string,
  token: string
) {
  const resetUrl = `${getAppUrl()}/emailverification/${token}`;
  try {
    await transporter.sendMail({
      from: env.MAIL_FROM,
      to: userEmail,
      subject: "Verify your Uni-Do email",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 520px; margin: 0 auto;">
        
        <h2 style="margin-bottom: 12px;">Verify your email</h2>

        <p>
          We received a request to verify the email of your Uni-Do account.
        </p>

        <p>
          Click the button below to verify it:
        </p>

        <div style="margin: 24px 0;">
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              background-color: #000;
              color: #fff;
              padding: 12px 20px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
            "
          >
            Verify your email
          </a>
        </div>

        <p style="font-size: 14px; color: #555;">
          This link will expire in <strong>1 hour</strong> for security reasons.
        </p>

        <p style="font-size: 14px; color: #555; margin-top: 16px;">
          If you didn't request an email verification, you can safely ignore this email.
        </p>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />

        <p style="font-size: 14px; color: #777;">
          — The Uni-Do team
        </p>
      </div>
    `,
    });
  } catch (error) {
    console.error("[sendEmailVerificationEmail] Error sending email:", error);
  }
}
