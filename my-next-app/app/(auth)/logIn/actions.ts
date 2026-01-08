"use server";

import { logIn } from "@/services/authService";
import { UserLogIn } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Basic rate-limiting logic for Next using attempts and cooldown
// Probably, there are better ways to do this
const logInAttempts = new Map<string, number>();
const COOLDOWN_MS = 20_000;

export async function logInAction(data: UserLogIn) {
  const key = data.email;
  const lastAttempt = logInAttempts.get(key);

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

  logInAttempts.set(key, now);

  const sessionId = await logIn(data);

  (await cookies()).set("session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  redirect("/");
}
