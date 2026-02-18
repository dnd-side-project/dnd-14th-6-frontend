import { type NextRequest, NextResponse } from "next/server";
import { setAuthCookies } from "@/server/auth/set-auth-cookies";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!backendResponse.ok) {
      console.error(
        "[Auth Callback] Token exchange failed:",
        backendResponse.status,
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { accessToken, refreshToken } = await backendResponse.json();

    const redirectPath = request.nextUrl.searchParams.get("redirect") ?? "/";

    const response = NextResponse.redirect(new URL(redirectPath, request.url));
    setAuthCookies(response, { accessToken, refreshToken });

    return response;
  } catch (error) {
    console.error("[Auth Callback] Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
