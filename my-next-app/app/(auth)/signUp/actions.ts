"use server";

import { signUp } from "@/services/authService";
import { UserSignUp } from "@/types/user";
import { revalidatePath } from "next/cache";

export async function signUpAction(data: UserSignUp) {
  await signUp(data);
  revalidatePath("/signUp");
  return true;
}
