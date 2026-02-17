export type SocialProvider = "google" | "github";

interface SocialLoginOptions {
  redirectUrl?: string;
  gameSessionId?: string;
}

export function getSocialLoginUrl(
  provider: SocialProvider,
  options?: SocialLoginOptions,
): string {
  const base = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login/${provider}`;
  const params = new URLSearchParams();

  if (options?.redirectUrl) params.set("redirectUrl", options.redirectUrl);
  if (options?.gameSessionId)
    params.set("gameSessionId", options.gameSessionId);

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}
