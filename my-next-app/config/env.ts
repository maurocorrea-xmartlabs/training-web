import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  MAILTRAP_HOST: z.string(),
  MAILTRAP_PORT: z.coerce.number(),
  MAILTRAP_USER: z.string(),
  MAILTRAP_PASS: z.string(),
  MAIL_FROM: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
