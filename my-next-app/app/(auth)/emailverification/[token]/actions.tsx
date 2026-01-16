"use server";

import { verifyEmail } from "@/services/authService";
import { ActionResult } from "@/types/actionResult";

export async function verifyEmailAction(
  token: string
): Promise<ActionResult> {
  if (!token) {
    return {
      ok: false,
      error: "Missing verification token",
    };
  }

  return await verifyEmail(token);
}
