import { getCookie } from "cookies-next";
import type { Tokens } from "../types";

export function getClientSideTokens(): Tokens {
  const accessToken = (getCookie("accessToken") as string) ?? "";
  return { accessToken };
}
