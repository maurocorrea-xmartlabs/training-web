import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export async function sendSignUpEmail(userEmail: string) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
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

export async function sendLogInEmail(userEmail: string) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: userEmail,
    subject: "New access to Uni-Do",
    text: "We detected a new access to our website",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="margin-bottom: 8px;">New login to your Uni-Do account 🔐</h2>

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
}
