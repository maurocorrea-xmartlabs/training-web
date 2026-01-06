"use server";

import { cookies } from "next/headers";
import { logOut } from "@/services/authService";

export async function logOutAction() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;

  if (sessionId) {
    await logOut(sessionId);
  }

  cookieStore.delete("session");
}
