"use server";

import { signUp } from "@/services/authService";
import { ActionResult } from "@/types/actionResult";
import { UserSignUpFormSchema } from "@/types/user";

// Basic rate-limiting logic for Next using attempts and cooldown
// Probably, there are better ways to do this
const signUpAttempts = new Map<string, number>();
const COOLDOWN_MS = 5_000;

export async function signUpAction(rawData: unknown): Promise<ActionResult> {
  const parsed = UserSignUpFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0].message,
    };
  }

  const key = parsed.data.email;
  const lastAttempt = signUpAttempts.get(key);

  const now = Date.now();
  if (lastAttempt) {
    const elapsed = now - lastAttempt;

    if (elapsed < COOLDOWN_MS) {
      const remainingSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000);

      return {
        ok: false,
        error: `Please wait ${remainingSeconds} seconds before trying again`,
      };
    }
  }

  signUpAttempts.set(key, now);

  const result = await signUp(parsed.data);

  if (!result.ok) {
    return result;
  }

  return { ok: true, data: null };
}
