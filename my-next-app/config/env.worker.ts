import { z } from "zod";

const rawWorkerEnv = {
  MAILTRAP_HOST: process.env.MAILTRAP_HOST,
  MAILTRAP_PORT: process.env.MAILTRAP_PORT,
  MAILTRAP_USER: process.env.MAILTRAP_USER,
  MAILTRAP_PASS: process.env.MAILTRAP_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
};

export const workerEnv = z
  .object({
    MAILTRAP_HOST: z.string(),
    MAILTRAP_PORT: z.string().transform((val) => Number(val)),
    MAILTRAP_USER: z.string(),
    MAILTRAP_PASS: z.string(),
    MAIL_FROM: z.string().default("no-reply@unido.test"),
  })
  .parse(rawWorkerEnv);
