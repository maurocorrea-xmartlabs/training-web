"use server";

import { getSessionId } from "@/lib/auth/getSessionId";
import { createEmailVerificationRequest, logOut } from "@/services/authService";

export async function logOutAction() {
  const sessionId = await getSessionId();

  if (sessionId) {
    await logOut(sessionId);
  }

  cookieStore.delete("session");
}

export async function requestEmailVerificationAction(email: string) {
  await createEmailVerificationRequest(email);
}
