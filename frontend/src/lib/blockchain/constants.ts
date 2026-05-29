import { sepolia } from "viem/chains";

export const SUPPORTED_CHAIN = sepolia;

export const BLOCKCHAIN_CONSTANTS = {
  tokenSymbol: "PPT",
  tokenName: "PerpPilot Token",
  defaultMintAmount: BigInt("1000000000000000000000"),
  mockUsdPricePerToken: 0.05,
  sepoliaExplorerUrl: "https://sepolia.etherscan.io",
} as const;

export const pptTokenAddress = (process.env.NEXT_PUBLIC_PPT_TOKEN_ADDRESS ??
  "") as `0x${string}`;

export const isPptTokenConfigured = Boolean(
  pptTokenAddress && pptTokenAddress.startsWith("0x") && pptTokenAddress.length === 42,
);

export function getExplorerTxUrl(txHash: string): string {
  return `${BLOCKCHAIN_CONSTANTS.sepoliaExplorerUrl}/tx/${txHash}`;
}

export function getExplorerAddressUrl(address: string): string {
  return `${BLOCKCHAIN_CONSTANTS.sepoliaExplorerUrl}/address/${address}`;
}
