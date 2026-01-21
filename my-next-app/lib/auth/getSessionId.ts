import { cookies } from "next/headers";

export async function getSessionId() {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value;
}
