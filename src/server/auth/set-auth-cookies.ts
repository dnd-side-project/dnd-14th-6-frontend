import type { NextResponse } from "next/server";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export function setAuthCookies(
  response: NextResponse,
  tokens: AuthTokens,
): void {
  response.cookies.set("accessToken", tokens.accessToken, {
    httpOnly: false,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    path: "/",
  });

  response.cookies.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}
