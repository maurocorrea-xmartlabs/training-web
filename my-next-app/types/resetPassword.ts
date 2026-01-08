import { z } from "zod";

export type resetPasswordType = {
  password: string;
  passwordConfirmation: string;
};

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Invalid password")
      .regex(/[A-Z]/, "Invalid password")
      .regex(/[^A-Za-z0-9]/, "Invalid password"),

    passwordConfirmation: z
      .string()
      .min(8, "Invalid confirmation password")
      .regex(/[A-Z]/, "Invalid confirmation password")
      .regex(/[^A-Za-z0-9]/, "Invalid confirmation password"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });
