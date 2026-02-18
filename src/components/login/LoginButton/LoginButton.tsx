"use client";

import type { ComponentPropsWithoutRef } from "react";
import IcLoginGit from "@/assets/icons/colored/IcLoginGit";
import IcLoginGoogle from "@/assets/icons/colored/IcLoginGoogle";
import Text from "@/components/common/Text/Text";
import { getSocialLoginUrl } from "@/server";
import { buttonStyle } from "./LoginButton.css";

type Provider = "github" | "google";

type LoginButtonProps = {
  provider: Provider;
  redirectUrl?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick">;

const PROVIDER_CONFIG = {
  github: {
    label: "Github로 계속하기",
    textVariant: "body8",
    textColor: "coolgrey_20",
  },
  google: {
    label: "Google로 계속하기",
    textVariant: "body4",
    textColor: "coolgrey_170",
  },
} as const;

export default function LoginButton({
  provider,
  redirectUrl,
  ...props
}: LoginButtonProps) {
  const { label, textVariant, textColor } = PROVIDER_CONFIG[provider];

  const handleClick = () => {
    const callbackUrl = redirectUrl
      ? `/api/auth/callback?redirect=${encodeURIComponent(redirectUrl)}`
      : "/api/auth/callback";
    const url = getSocialLoginUrl(provider, { redirectUrl: callbackUrl });
    window.location.href = url;
  };

  return (
    <button
      className={buttonStyle({ provider })}
      type="button"
      onClick={handleClick}
      {...props}
    >
      {provider === "github" ? (
        <IcLoginGit size={24} />
      ) : (
        <IcLoginGoogle width={22} height={23} />
      )}
      <Text as="span" variant={textVariant} color={textColor}>
        {label}
      </Text>
    </button>
  );
}
