"use server";

import { ForgotPassword } from "@/types/forgotPassword";

export async function forgotPasswordAction(data: ForgotPassword) {
  //rate-limiting importante (20 secs o algo)
  //forgotPassword(email);
}
