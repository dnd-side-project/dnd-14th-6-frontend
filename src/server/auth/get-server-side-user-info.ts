import { cookies } from "next/headers";
import type { UserInfo } from "@/types/user";

async function parseUserInfoCookie(): Promise<UserInfo | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("userInfo")?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserInfo;
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
