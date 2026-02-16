"use client";

import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "./get-query-client";

interface QueryClientProviderProps {
  children: ReactNode;
}

export default function QueryClientProvider({
  children,
}: QueryClientProviderProps) {
  const queryClient = getQueryClient();

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
