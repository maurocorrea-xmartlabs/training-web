import { z } from "zod";

export type ForgotPassword = {
  email: string;
};

export const ForgotPasswordFormSchema = z.object({
  email: z.email("Invalid email or password"),
});
