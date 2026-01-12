import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/session";

export default async function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  const session = await getSession();
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const publicPaths = ["/logIn", "/signUp", "/logoAlt.png", "logo.png"];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!sessionCookie || !session) {
    return NextResponse.redirect(new URL("/logIn", req.url));
  }

  return NextResponse.next();
}
