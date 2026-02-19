import type { NextResponse } from "next/server";
import type { UserInfo } from "@/types/user";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const USER_INFO_MAX_AGE = 60 * 60; // 1시간 (accessToken과 동일)

export function setUserInfoCookie(
  response: NextResponse,
  userInfo: UserInfo,
): void {
  response.cookies.set("userInfo", JSON.stringify(userInfo), {
    httpOnly: false,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    path: "/",
    maxAge: USER_INFO_MAX_AGE,
  });
}
