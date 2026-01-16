"use server";

import { forgotPassword } from "@/services/authService";
import { ActionResult } from "@/types/actionResult";
import { ForgotPasswordFormSchema } from "@/types/forgotPassword";

const signUpAttempts = new Map<string, number>();
const COOLDOWN_MS = 20_000;

export async function forgotPasswordAction(
  rawData: unknown
): Promise<ActionResult> {
  const parsed = ForgotPasswordFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0].message,
    };
  }

  const key = parsed.data.email;
  const lastAttempt = signUpAttempts.get(key);
  const now = Date.now();

  if (lastAttempt && now - lastAttempt < COOLDOWN_MS) {
    const remainingSeconds = Math.ceil(
      (COOLDOWN_MS - (now - lastAttempt)) / 1000
    );

    return {
      ok: false,
      error: `Please wait ${remainingSeconds} seconds before trying again`,
    };
  }

  signUpAttempts.set(key, now);
  return await forgotPassword(parsed.data.email);
}
