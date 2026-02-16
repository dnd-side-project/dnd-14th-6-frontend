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

  // 백엔드의 Set-Cookie 헤더를 브라우저에 그대로 전달
  const response = NextResponse.json(json);
  for (const setCookie of backendResponse.headers.getSetCookie()) {
    response.headers.append("Set-Cookie", setCookie);
  }

  return response;
}
