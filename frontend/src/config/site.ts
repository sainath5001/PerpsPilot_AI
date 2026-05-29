export const siteConfig = {
  name: "PerpPilot AI",
  description: "AI-powered perpetual trading copilot",
  tagline: "Trade smarter. Manage risk with clarity.",
} as const;

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",
} as const;

export const chainConfig = {
  defaultChainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 11155111),
} as const;

export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

export const isWalletConfigured = Boolean(walletConnectProjectId);
