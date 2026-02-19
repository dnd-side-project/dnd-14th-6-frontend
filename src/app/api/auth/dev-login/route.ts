import { NextResponse } from "next/server";
import { fetchUserInfo } from "@/server/auth/fetch-user-info";
import { setAuthCookies } from "@/server/auth/set-auth-cookies";
import { setUserInfoCookie } from "@/server/auth/set-user-info-cookie";

export async function GET() {
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

  const response = NextResponse.redirect(new URL("/", "http://localhost:3000"));
  setAuthCookies(response, { accessToken, refreshToken });

  const userInfo = await fetchUserInfo(accessToken);
  if (userInfo) {
    setUserInfoCookie(response, userInfo);
  }

  return response;
}
