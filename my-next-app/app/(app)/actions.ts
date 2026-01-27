"use server";

import { getSessionId } from "@/lib/auth/getSessionId";
import { createEmailVerificationRequest, logOut } from "@/services/authService";
import { ActionResult } from "@/types/actionResult";
import { z } from "zod";

const EmailSchema = z.email();

export async function logOutAction(): Promise<ActionResult> {
  const sessionId = await getSessionId();

  if (sessionId) {
    await logOut(sessionId);
  }

  cookieStore.delete("session");

  return { ok: true, data: null } as const;
}

export async function requestEmailVerificationAction(
  rawEmail: unknown,
): Promise<ActionResult> {
  const parsed = EmailSchema.safeParse(rawEmail);

  if (!parsed.success) {
    return { ok: false, error: "Invalid email" };
  }

  return await createEmailVerificationRequest(parsed.data);
}
