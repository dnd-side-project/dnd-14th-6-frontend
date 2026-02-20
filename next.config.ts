import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "i.pravatar.cc" },
      { hostname: "github.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "cdn.orvit.net" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "placehold.co" },
    ],
  },
};

export default withVanillaExtract(nextConfig);
