"use server";

import { forgotPassword } from "@/services/authService";
import { ForgotPassword } from "@/types/forgotPassword";

const signUpAttempts = new Map<string, number>();
const COOLDOWN_MS = 20_000;

export async function forgotPasswordAction(data: ForgotPassword) {
  const key = data.email;
  const lastAttempt = signUpAttempts.get(key);

  const now = Date.now();
  if (lastAttempt) {
    const elapsed = now - lastAttempt;

    if (elapsed < COOLDOWN_MS) {
      const remainingSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000);

      throw new Error(
        `Please wait ${remainingSeconds} seconds before trying again`
      );
    }
  }

  signUpAttempts.set(key, now);
  await forgotPassword(data.email);
}
