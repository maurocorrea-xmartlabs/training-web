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

export const UserLogInFormSchema = z.object({
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
