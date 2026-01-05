"use server";

import { UserLogIn } from "@/types/user";
import { revalidatePath } from "next/cache";

export async function logInAction(data: UserLogIn) {
  //await logIn(data);
  revalidatePath("/logIn");
  return true;
}
