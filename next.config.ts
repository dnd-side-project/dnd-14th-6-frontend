import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "i.pravatar.cc" },
      { hostname: "github.com" },
      { hostname: "*.githubusercontent.com" },
    ],
  },
};

export default withVanillaExtract(nextConfig);
