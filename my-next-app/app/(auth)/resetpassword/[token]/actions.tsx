"use server";

import { resetPassword } from "@/services/authService";
import { ActionResult } from "@/types/actionResult";
import { ResetPasswordSchema } from "@/types/resetPassword";

export async function resetPasswordAction(
  token: string,
  rawData: unknown
): Promise<ActionResult> {
  const parsed = ResetPasswordSchema.safeParse(rawData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }
  return await resetPassword(token, parsed.data.password);
}
