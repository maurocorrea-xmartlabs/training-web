import { env } from "@/config/env";
import { transporter } from "../mailer";

export async function resetPasswordEmail(userEmail: string, token: string) {
  const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/resetpassword/${token}`;

  await transporter.sendMail({
    from: env.MAIL_FROM,
    to: userEmail,
    subject: "Reset your Uni-Do password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 520px; margin: 0 auto;">
        
        <h2 style="margin-bottom: 12px;">Reset your password</h2>

        <p>
          We received a request to reset the password for your Uni-Do account.
        </p>

        <p>
          Click the button below to choose a new password:
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
            Reset password
          </a>
        </div>

        <p style="font-size: 14px; color: #555;">
          This link will expire in <strong>1 hour</strong> for security reasons.
        </p>

        <p style="font-size: 14px; color: #555; margin-top: 16px;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />

        <p style="font-size: 14px; color: #777;">
          — The Uni-Do team
        </p>
      </div>
    `,
  });
}
