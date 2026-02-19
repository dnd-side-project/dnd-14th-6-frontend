import { type NextRequest, NextResponse } from "next/server";
import { fetchUserInfo } from "@/server/auth/fetch-user-info";
import { setAuthCookies } from "@/server/auth/set-auth-cookies";
import { setUserInfoCookie } from "@/server/auth/set-user-info-cookie";
import type { ApiResponse } from "@/server/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const backendResponse = await fetch(
      `${BACKEND_URL}/api/auth/token?code=${encodeURIComponent(code)}`,
    );

    if (!backendResponse.ok) {
      console.error(
        "[Auth Callback] Token exchange failed:",
        backendResponse.status,
      );
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const json: ApiResponse<{ accessToken: string; refreshToken: string }> =
      await backendResponse.json();
    const data = json.data;

    if (!data?.accessToken || !data?.refreshToken) {
      console.error("[Auth Callback] Invalid tokens received from backend.");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const { accessToken, refreshToken } = data;

    const rawRedirect = request.nextUrl.searchParams.get("redirect") ?? "/";
    const redirectPath =
      rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
        ? rawRedirect
        : "/";

    const response = NextResponse.redirect(new URL(redirectPath, request.url));
    setAuthCookies(response, { accessToken, refreshToken });

    const userInfo = await fetchUserInfo(accessToken);
    if (userInfo) {
      setUserInfoCookie(response, userInfo);
    }

    return response;
  } catch (error) {
    console.error("[Auth Callback] Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
