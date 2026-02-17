import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

    if (!backendResponse.ok || !json.success) {
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
      return response;
    }

    const response = NextResponse.json(json);
    for (const setCookie of backendResponse.headers.getSetCookie()) {
      response.headers.append("Set-Cookie", setCookie);
    }

    return response;
  } catch {
    return NextResponse.json(
      { statusCode: 503, success: false, message: "Service Unavailable" },
      { status: 503 },
    );
  }
}
