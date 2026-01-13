"use server";

import { logOut } from "@/services/authService";
import { getSessionId } from "@/lib/auth/getSessionId";

export async function logOutAction() {
  const sessionId = await getSessionId();

  if (sessionId) {
    await logOut(sessionId);
  }

  cookieStore.delete("session");
}
