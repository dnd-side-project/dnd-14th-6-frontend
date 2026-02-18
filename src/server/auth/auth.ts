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

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000");
  const redirectUrl = options?.redirectUrl ?? "/api/auth/callback";
  params.set("redirectUrl", `${origin}${redirectUrl}`);

  if (options?.gameSessionId)
    params.set("gameSessionId", options.gameSessionId);

  return `${base}?${params.toString()}`;
}
