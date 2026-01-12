import { cookies } from "next/headers";
import { getSessionById } from "@/services/authService";

export async function getSession() {
  const sessionId = (await cookies()).get("session")?.value;

  const session = await getSessionById(sessionId!);

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session;
}
