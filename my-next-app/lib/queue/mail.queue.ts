import { Queue } from "bullmq";
import { redisConnection } from "./redis";

export type SendMailJob = {
  to: string;
  subject: string;
  html: string;
};

export const mailQueue = new Queue<SendMailJob>("mail-queue", {
  connection: redisConnection,
});
