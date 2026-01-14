"use server";

import { verifyEmail } from "@/services/authService";

export async function verifyEmailAction(token: string) {
  await verifyEmail(token);
}
