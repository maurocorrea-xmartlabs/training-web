import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value;
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (req.method !== "GET") {
    return NextResponse.next();
  }

  const publicPaths = ["/logIn", "/signUp", "/forgotpassword", "resetpassword"];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/logIn", req.url));
  }

  return NextResponse.next();
}
