import { type NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES } from "./constants/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    (PUBLIC_ROUTES as readonly string[]).includes(pathname) ||
    pathname.startsWith("/api/");

  if (isPublic) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|icons|assets).*)"],
};
