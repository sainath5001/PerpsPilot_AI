"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Web3Provider } from "@/components/providers/web3-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Web3Provider>
      {children}
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              "border border-border/70 bg-card/95 text-foreground shadow-lg backdrop-blur",
          },
        }}
      />
    </Web3Provider>
  );
}
