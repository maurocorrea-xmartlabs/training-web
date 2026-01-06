import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma";

// Should be used on pages
export async function getSession() {
  const sessionId = (await cookies()).get("session")?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session;
}
