import type { Options, SearchParamsOption } from "ky";
import { clearTokens } from "../auth/clear-tokens";
import { getClientSideTokens } from "../auth/get-client-side-tokens";
import type { ApiResponse, Tokens } from "../types";
import { apiClient } from "./client";

let refreshPromise: Promise<string> | null = null;

async function getNewAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const response = await fetch("/api/auth/refresh-proxy", {
        method: "POST",
      });
      const json: ApiResponse<{ accessToken: string }> = await response.json();

      if (!json.success) throw new Error("refresh failed");

      return json.data.accessToken;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function getAuthHeaders(tokens?: Tokens): Record<string, string> {
  const accessToken = tokens?.accessToken ?? getClientSideTokens().accessToken;
  if (!accessToken) return {};
  return { Authorization: `Bearer ${accessToken}` };
}

async function handleUnauthorized<T>(
  requestFn: (headers: Record<string, string>) => Promise<ApiResponse<T>>,
  tokens?: Tokens,
): Promise<ApiResponse<T>> {
  try {
    return await requestFn(getAuthHeaders(tokens));
  } catch (error: unknown) {
    const isUnauthorized =
      error instanceof Error &&
      "response" in error &&
      (error as { response: Response }).response?.status === 401;

    if (!isUnauthorized || tokens) throw error;

    try {
      const newAccessToken = await getNewAccessToken();
      return await requestFn({
        Authorization: `Bearer ${newAccessToken}`,
      });
    } catch {
      clearTokens();
      window.location.href = "/login";
      throw error;
    }
  }
}

export async function GET<T>(
  path: string,
  searchParams?: SearchParamsOption,
  tokens?: Tokens,
): Promise<ApiResponse<T>> {
  return handleUnauthorized(
    (headers) =>
      apiClient.get(path, { searchParams, headers }).json<ApiResponse<T>>(),
    tokens,
  );
}

export async function POST<T>(
  path: string,
  body?: unknown,
  tokens?: Tokens,
  options?: Options,
): Promise<ApiResponse<T>> {
  return handleUnauthorized(
    (headers) =>
      apiClient
        .post(path, { json: body, headers, ...options })
        .json<ApiResponse<T>>(),
    tokens,
  );
}

export async function PUT<T>(
  path: string,
  body?: unknown,
  tokens?: Tokens,
  options?: Options,
): Promise<ApiResponse<T>> {
  return handleUnauthorized(
    (headers) =>
      apiClient
        .put(path, { json: body, headers, ...options })
        .json<ApiResponse<T>>(),
    tokens,
  );
}

export async function DELETE<T>(
  path: string,
  tokens?: Tokens,
  options?: Options,
): Promise<ApiResponse<T>> {
  return handleUnauthorized(
    (headers) =>
      apiClient.delete(path, { headers, ...options }).json<ApiResponse<T>>(),
    tokens,
  );
}

export async function PATCH<T>(
  path: string,
  body?: unknown,
  tokens?: Tokens,
  options?: Options,
): Promise<ApiResponse<T>> {
  return handleUnauthorized(
    (headers) =>
      apiClient
        .patch(path, { json: body, headers, ...options })
        .json<ApiResponse<T>>(),
    tokens,
  );
}
