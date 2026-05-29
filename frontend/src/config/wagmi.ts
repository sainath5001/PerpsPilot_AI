"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { chainConfig, walletConnectProjectId } from "@/config/site";

export const wagmiConfig = getDefaultConfig({
  appName: "PerpPilot AI",
  projectId: walletConnectProjectId || "00000000000000000000000000000000",
  chains: [sepolia],
  ssr: true,
  /** Reduces fights between multiple browser wallet extensions */
  multiInjectedProviderDiscovery: false,
});

export const defaultChainId = chainConfig.defaultChainId;
