"use client";

import type { ReactNode } from "react";
import QueryClientProvider from "./query-client-provider";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
