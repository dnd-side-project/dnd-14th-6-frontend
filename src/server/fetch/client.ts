import ky from "ky";

export const apiClient = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30_000,
});
