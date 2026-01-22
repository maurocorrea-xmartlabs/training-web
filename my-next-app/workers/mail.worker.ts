import { workerEnv } from "@/config/env.worker";
import { Worker } from "bullmq";
import { redisConnection } from "@/lib/queue/redis";
import { transporter } from "./mailer";

type SendMailJob = {
  to: string;
  subject: string;
  html: string;
};

const mailWorker = new Worker<SendMailJob>(
  "mail-queue",
  async (job) => {
    const { to, subject, html } = job.data;

    console.log(`[mail-worker] Sending mail to ${to}`);

    await transporter.sendMail({
      from: workerEnv.MAIL_FROM,
      to,
      subject,
      html,
    });

    console.log(`[mail-worker] Mail sent to ${to}`);
  },
  {
    connection: redisConnection,
  },
);

mailWorker.on("failed", (job, err) => {
  console.error(`[mail-worker] Job ${job?.id} failed:`, err.message);
});

mailWorker.on("completed", (job) => {
  console.log(`[mail-worker] Job ${job?.id} completed`);
});
