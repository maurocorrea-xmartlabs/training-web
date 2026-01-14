"use server";

import { createEmailVerificationRequest, logOut } from "@/services/authService";
import { cookies } from "next/headers";

export async function logOutAction() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (sessionId) {
    await logOut(sessionId);
  }

  cookieStore.delete("session");
}

export async function requestEmailVerificationAction(email: string) {
  await createEmailVerificationRequest(email);
}
