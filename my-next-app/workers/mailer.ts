import nodemailer from "nodemailer";
import { workerEnv } from "@/config/env.worker";

export const transporter = nodemailer.createTransport({
  host: workerEnv.MAILTRAP_HOST,
  port: Number(workerEnv.MAILTRAP_PORT),
  auth: {
    user: workerEnv.MAILTRAP_USER,
    pass: workerEnv.MAILTRAP_PASS,
  },
});
