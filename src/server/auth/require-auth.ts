import { redirect } from "next/navigation";
import type { Tokens } from "../types";
import { getServerSideTokens } from "./get-server-side-tokens";
import { getServerSideUserId } from "./get-server-side-user-info";

interface AuthContext {
  userId: string;
  tokens: Tokens;
}

export async function requireAuth(): Promise<AuthContext> {
  const [userId, tokens] = await Promise.all([
    getServerSideUserId(),
    getServerSideTokens(),
  ]);

  if (!userId || !tokens.accessToken) {
    redirect("/login");
  }

  return { userId, tokens };
}
