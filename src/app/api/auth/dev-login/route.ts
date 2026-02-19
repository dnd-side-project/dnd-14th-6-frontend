import { type NextRequest, NextResponse } from "next/server";
import { fetchUserInfo } from "@/server/auth/fetch-user-info";
import { setAuthCookies } from "@/server/auth/set-auth-cookies";
import { setUserInfoCookie } from "@/server/auth/set-user-info-cookie";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { message: "Not available in production" },
      { status: 403 },
    );
  }

  const accessToken = process.env.DEV_ACCESS_TOKEN;
  const refreshToken = process.env.DEV_REFRESH_TOKEN;

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { message: "DEV_ACCESS_TOKEN / DEV_REFRESH_TOKEN not set in .env" },
      { status: 500 },
    );
  }

  const userInfo = await fetchUserInfo(accessToken);
  if (!userInfo) {
    return NextResponse.json(
      { message: "Failed to fetch user info. Token may be expired." },
      { status: 500 },
    );
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  setAuthCookies(response, { accessToken, refreshToken });
  setUserInfoCookie(response, userInfo);

  return response;
}
