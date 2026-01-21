import { z } from "zod";

const rawClientEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  VERCEL_URL: process.env.VERCEL_URL,
};

export const clientEnv = z
  .object({
    NEXT_PUBLIC_APP_URL: z.string().optional(),
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
    VERCEL_URL: z.string().optional(),
  })
  .refine((env) => env.NEXT_PUBLIC_APP_URL || env.VERCEL_URL, {
    message: "Either NEXT_PUBLIC_APP_URL or VERCEL_URL must be defined",
  })
  .parse(rawClientEnv);

export function getAppUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
