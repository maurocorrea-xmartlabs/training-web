import { env } from "@/config/env";
import { transporter } from "../mailer";

export async function sendSignUpEmail(userEmail: string) {
  try {
    await transporter.sendMail({
      from: env.MAIL_FROM,
      to: userEmail,
      subject: "Welcome to Uni-Do 👋",
      text: "Your Uni-Do account was created successfully.",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="margin-bottom: 8px;">Welcome to Uni-Do</h2>

        <p>
          Your account has been created successfully.
        </p>

        <p>
          You can now start organizing your subjects, exams and projects
          in one place.
        </p>

        <p style="margin-top: 24px; font-size: 14px; color: #666;">
          If you didn't create this account, you can safely ignore this email.
        </p>

        <p style="margin-top: 16px;">
          — The Uni-Do team
        </p>
      </div>
    `,
    });
  } catch (error) {
    console.error("[sendSignUpEmail] Error sending email:", error);
  }
}
