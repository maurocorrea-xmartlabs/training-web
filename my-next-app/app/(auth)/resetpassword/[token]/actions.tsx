"use server";

import { resetPassword } from "@/services/authService";
import { resetPasswordType } from "@/types/resetPassword";

export async function resetPasswordAction(
  token: string,
  data: resetPasswordType
) {
  await resetPassword(token, data.password);
}
