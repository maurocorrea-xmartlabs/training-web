import nodemailer from "nodemailer";
import { env } from "@/config/env";

const transporter = nodemailer.createTransport({
  host: env.MAILTRAP_HOST,
  port: Number(env.MAILTRAP_PORT),
  auth: {
    user: env.MAILTRAP_USER,
    pass: env.MAILTRAP_PASS,
  },
});

export async function sendSignUpEmail(userEmail: string) {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to: userEmail,
    subject: "Welcome to Uni-Do 👋",
    text: "Your Uni-Do account was created successfully.",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="margin-bottom: 8px;">Welcome to Uni-Do 👋</h2>

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
}
