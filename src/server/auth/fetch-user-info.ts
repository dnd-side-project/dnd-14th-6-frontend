import type { ApiResponse } from "@/server/types";
import type { UserInfo } from "@/types/user";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchUserInfo(
  accessToken: string,
): Promise<UserInfo | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      console.error("[fetchUserInfo] Failed:", response.status);
      return null;
    }

    const json: ApiResponse<UserInfo> = await response.json();
    return json.data;
  } catch (error) {
    console.error("[fetchUserInfo] Error:", error);
    return null;
  }
}
