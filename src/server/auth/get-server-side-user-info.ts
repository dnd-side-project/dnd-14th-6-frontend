import { cookies } from "next/headers";
import type { UserInfo } from "@/types/user";

async function parseUserInfoCookie(): Promise<UserInfo | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("userInfo")?.value;

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    if (
      typeof parsed?.id !== "string" ||
      typeof parsed?.nickname !== "string" ||
      typeof parsed?.profileImage !== "string"
    ) {
      return null;
    }

    return {
      id: parsed.id,
      nickname: parsed.nickname,
      profileImage: parsed.profileImage,
    };
  } catch {
    return null;
  }
}

export async function getServerSideUserInfo(): Promise<UserInfo | null> {
  return parseUserInfoCookie();
}

export async function getServerSideUserId(): Promise<string | null> {
  const userInfo = await parseUserInfoCookie();
  return userInfo?.id ?? null;
}
