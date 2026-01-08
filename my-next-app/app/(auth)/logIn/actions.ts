"use server";

import { logIn } from "@/services/authService";
import { UserLogIn } from "@/types/user";
import { cookies } from "next/headers";
import { env } from "@/config/env";

export async function logInAction(data: UserLogIn) {
  const sessionId = await logIn(data);

  (await cookies()).set("session", sessionId, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}
