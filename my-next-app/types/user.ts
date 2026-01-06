import { z } from "zod";

export type UserSignUp = {
  name: string;
  email: string;
  password: string;
};

export type UserLogIn = {
  email: string;
  password: string;
};

// All login validation errors use the same message on purpose
// This prevents revealing whether the email or the password is incorrect
export const UserLogInFormSchema = z.object({
  email: z.email("Invalid email or password"),
  password: z
    .string()
    .min(8, "Invalid email or password")
    .regex(/[A-Z]/, "Invalid email or password")
    .regex(/[^A-Za-z0-9]/, "Invalid email or password"),
});

export const UserSignUpFormSchema = z.object({
  name: z.string().min(8, "Username must have more than 8 characters"),
  email: z.email("Email must be valid"),
  password: z
    .string()
    .min(8, "Password must have more than 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});
