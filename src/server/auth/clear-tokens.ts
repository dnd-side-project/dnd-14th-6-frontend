import { deleteCookie } from "cookies-next";

export function clearTokens(): void {
  deleteCookie("accessToken", { path: "/" });
  deleteCookie("refreshToken", { path: "/" });
}
