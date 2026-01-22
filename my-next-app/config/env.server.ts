import { z } from "zod";

const envSchema = z
  .object({
    DATABASE_URL: z.string(),

    NEXT_PUBLIC_APP_URL: z.string().optional(),
    VERCEL_URL: z.string().optional(),

    MAILTRAP_HOST: z.string(),
    MAILTRAP_PORT: z.coerce.number(),
    MAILTRAP_USER: z.string(),
    MAILTRAP_PASS: z.string(),
    MAIL_FROM: z.string(),

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("production"),

    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
  })
  .refine((env) => env.NEXT_PUBLIC_APP_URL || env.VERCEL_URL, {
    message: "Either NEXT_PUBLIC_APP_URL or VERCEL_URL must be defined",
  });

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));
}

export const env = parsedEnv.data;

export function getAppUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return process.env.NEXT_PUBLIC_APP_URL;
}
