"use server";

import { signUp } from "@/services/authService";
import { UserSignUp } from "@/types/user";

// Basic rate-limiting logic for Next using attempts and cooldown
// Probably, there are better ways to do this
const signUpAttempts = new Map<string, number>();
const COOLDOWN_MS = 5_000;

export async function signUpAction(data: UserSignUp) {
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

  await signUp(data);
}
