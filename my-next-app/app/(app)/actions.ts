"use server";

import { createEmailVerificationRequest, logOut } from "@/services/authService";
import { ActionResult } from "@/types/actionResult";
import { cookies } from "next/headers";
import { z } from "zod";

const EmailSchema = z.email();

export async function logOutAction(): Promise<ActionResult> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (sessionId) {
    await logOut(sessionId);
  }

  cookieStore.delete("session");

  return { ok: true, data: null } as const;
}

export async function requestEmailVerificationAction(
  rawEmail: unknown
): Promise<ActionResult> {
  const parsed = EmailSchema.safeParse(rawEmail);

  if (!parsed.success) {
    return { ok: false, error: "Invalid email" };
  }

  return await createEmailVerificationRequest(parsed.data);
}
