export type { SocialProvider } from "./auth/auth";
export { getSocialLoginUrl } from "./auth/auth";
export { clearTokens } from "./auth/clear-tokens";
export { getClientSideTokens } from "./auth/get-client-side-tokens";
// getServerSideTokens, getServerSideUserInfo는 next/headers를 사용하므로 barrel에서 제외
// fetchUserInfo, setUserInfoCookie는 Route Handler 전용이므로 barrel에서 제외
// Server Component에서 직접 import: import { getServerSideUserInfo } from "@/server/auth/get-server-side-user-info"

export { DELETE, GET, PATCH, POST, PUT } from "./fetch/fetch-private";
export {
  DELETE_PUBLIC,
  GET_PUBLIC,
  PATCH_PUBLIC,
  POST_PUBLIC,
  PUT_PUBLIC,
} from "./fetch/fetch-public";

export { getQueryClient } from "./query/get-query-client";
export { queryKeys } from "./query/query-keys";

export type { ApiError, ApiResponse, Tokens } from "./types";
export { STATUS } from "./types";
