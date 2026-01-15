import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_APP_URL: z.string(),
  MAILTRAP_HOST: z.string(),
  MAILTRAP_PORT: z.coerce.number(),
  MAILTRAP_USER: z.string(),
  MAILTRAP_PASS: z.string(),
  MAIL_FROM: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
  AWS_S3_ACCESS_KEY_ID: z.string(),
  AWS_S3_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_REGION: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));
}

export const env = parsedEnv.data;
