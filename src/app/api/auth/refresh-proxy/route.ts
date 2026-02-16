import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST() {
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

  if (!backendResponse.ok || !json.success) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return NextResponse.json(
      {
        statusCode: 401,
        success: false,
        message: json.message ?? "Token refresh failed",
      },
      { status: 401 },
    );
  }

  const { accessToken, refreshToken: newRefreshToken } = json.data;

  cookieStore.set("accessToken", accessToken, {
    path: "/",
    secure: true,
    sameSite: "lax",
  });

  if (newRefreshToken) {
    cookieStore.set("refreshToken", newRefreshToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }

  return NextResponse.json({
    statusCode: 200,
    success: true,
    data: { accessToken },
  });
}
