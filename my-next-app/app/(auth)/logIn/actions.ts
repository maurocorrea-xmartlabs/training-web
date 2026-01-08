"use server";

import { UserLogIn } from "@/types/user";
import { revalidatePath } from "next/cache";

export async function logInAction(data: UserLogIn) {
  // The logIn feature is not implemented yet, so I comment this to avoid exceptions
  //await logIn(data);
  revalidatePath("/logIn");
  return true;
}
