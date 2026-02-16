import { getCookie } from "cookies-next";
import type { Tokens } from "../types";

export function getClientSideTokens(): Tokens {
  return {
    accessToken: (getCookie("accessToken") as string) ?? "",
  };
}
