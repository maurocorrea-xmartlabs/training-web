import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/session";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const session = await getSession();

  const authPages = ["/logIn", "/signUp"];
  const publicAssets = ["/logoAlt.png", "/logo.png"];

  const isAuthPage = authPages.some((path) => pathname.startsWith(path));

  const isPublicAsset = publicAssets.some((path) => pathname.startsWith(path));

  if (isPublicAsset) {
    return NextResponse.next();
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (isAuthPage && !session) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/logIn", req.url));
  }

  return NextResponse.next();
}
