import { cookies } from "next/headers";
import type { Tokens } from "../types";

export async function getServerSideTokens(): Promise<Tokens> {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get("accessToken")?.value ?? "",
  };
}
