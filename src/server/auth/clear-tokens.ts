import { deleteCookie } from "cookies-next";

export function clearTokens(): void {
  deleteCookie("accessToken", { path: "/" });
  deleteCookie("userInfo", { path: "/" });
  // refreshToken은 httpOnly이므로 클라이언트에서 삭제 불가 (로그아웃 Route Handler에서 처리)
}
