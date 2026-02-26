"use client";

import type { ReactNode } from "react";
import { useMainBGM } from "@/hooks/useMainBGM";
import QueryClientProvider from "./query-client-provider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  useMainBGM();

  return <QueryClientProvider>{children}</QueryClientProvider>;
}
