import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { fetchUserInfo } from "@/server/auth/fetch-user-info";
import { setAuthCookies } from "@/server/auth/set-auth-cookies";
import { setUserInfoCookie } from "@/server/auth/set-user-info-cookie";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { statusCode: 401, success: false, message: "No refresh token" },
        { status: 401 },
      );
    }

    const backendResponse = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const json = await backendResponse.json();

    if (!backendResponse.ok) {
      const response = NextResponse.json(
        {
          statusCode: 401,
          success: false,
          message: json.message ?? "Token refresh failed",
        },
        { status: 401 },
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete("userInfo");
      return response;
    }

    const data = json.data;

    if (!data?.accessToken || !data?.refreshToken) {
      return NextResponse.json(
        { statusCode: 401, success: false, message: "Invalid token response" },
        { status: 401 },
      );
    }

    const { accessToken, refreshToken: newRefreshToken } = data;

    const userInfo = await fetchUserInfo(accessToken);
    if (!userInfo) {
      const response = NextResponse.json(
        {
          statusCode: 401,
          success: false,
          message: "Failed to fetch user info",
        },
        { status: 401 },
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete("userInfo");
      return response;
    }

    const response = NextResponse.json({
      statusCode: 200,
      success: true,
      data: { accessToken },
    });
    setAuthCookies(response, {
      accessToken,
      refreshToken: newRefreshToken,
    });
    setUserInfoCookie(response, userInfo);

    return response;
  } catch {
    return NextResponse.json(
      { statusCode: 503, success: false, message: "Service Unavailable" },
      { status: 503 },
    );
  }
}
