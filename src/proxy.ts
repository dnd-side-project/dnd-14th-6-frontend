import { type NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES } from "./constants/routes";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function refreshAccessToken(
  refreshToken: string,
): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return null;

    const json = await response.json();
    const data = json.data;

    if (!data?.accessToken || !data?.refreshToken) return null;

    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  } catch {
    return null;
  }
}

const IS_PRODUCTION = process.env.NODE_ENV === "production";

function setTokenCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string },
) {
  response.cookies.set("accessToken", tokens.accessToken, {
    httpOnly: false,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });
  response.cookies.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic =
    (PUBLIC_ROUTES as readonly string[]).includes(pathname) ||
    pathname.startsWith("/api/");

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // accessToken 없고 refreshToken 있으면 갱신 시도
  if (!accessToken && refreshToken) {
    const tokens = await refreshAccessToken(refreshToken);

    if (tokens) {
      const response = NextResponse.redirect(request.url);
      setTokenCookies(response, tokens);

      // userInfo 쿠키도 갱신
      try {
        const userInfoResponse = await fetch(`${BACKEND_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${tokens.accessToken}` },
        });
        if (userInfoResponse.ok) {
          const userInfoJson = await userInfoResponse.json();
          if (userInfoJson.data) {
            response.cookies.set(
              "userInfo",
              JSON.stringify(userInfoJson.data),
              {
                httpOnly: false,
                secure: IS_PRODUCTION,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60,
              },
            );
          }
        }
      } catch {
        // userInfo 실패해도 토큰 갱신은 유지
      }

      return response;
    }
  }

  if (isPublic) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fonts|icons|assets).*)"],
};
