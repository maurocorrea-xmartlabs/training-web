"use server";

import { logIn } from "@/services/authService";
import { UserLogInFormSchema } from "@/types/user";
import { cookies } from "next/headers";
import { env } from "@/config/env.server";
import { ActionResult } from "@/types/actionResult";

const logInAttempts = new Map<string, number>();
const COOLDOWN_MS = 5_000;

export async function logInAction(rawData: unknown): Promise<ActionResult> {
  const parsed = UserLogInFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0].message,
    };
  }

  const key = parsed.data.email;
  const lastAttempt = logInAttempts.get(key);

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

  logInAttempts.set(key, now);

  const result = await logIn(parsed.data);

  if (!result.ok) {
    return result;
  }

  (await cookies()).set("session", result.data, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return { ok: true, data: null };
}
