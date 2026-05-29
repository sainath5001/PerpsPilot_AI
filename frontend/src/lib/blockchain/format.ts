import { formatUnits } from "viem";
import { BLOCKCHAIN_CONSTANTS } from "./constants";

export function formatTokenAmount(
  value: bigint | undefined,
  decimals = 18,
  maximumFractionDigits = 2,
): string {
  if (value === undefined) return "0.00";

  const formatted = formatUnits(value, decimals);
  const numeric = Number(formatted);

  return numeric.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  });
}

export function formatEthAmount(value: bigint | undefined, decimals = 18): string {
  if (value === undefined) return "0.0000";

  const formatted = formatUnits(value, decimals);
  const numeric = Number(formatted);

  return numeric.toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
}

export function formatUsdFromTokens(tokenBalance: bigint | undefined): string {
  if (tokenBalance === undefined) return "$0.00";

  const tokens = Number(formatUnits(tokenBalance, 18));
  const usd = tokens * BLOCKCHAIN_CONSTANTS.mockUsdPricePerToken;

  return usd.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCooldown(seconds: bigint | number | undefined): string {
  if (!seconds || Number(seconds) <= 0) return "Ready";

  const total = Number(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;

  if (minutes === 0) return `${secs}s`;
  return `${minutes}m ${secs}s`;
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`;
}

export function getTxErrorMessage(error: unknown): string {
  if (!error) return "Transaction failed";

  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error !== null && "shortMessage" in error
        ? String((error as { shortMessage: string }).shortMessage)
        : "Transaction failed";

  if (message.includes("MintCooldownActive")) {
    return "Mint cooldown active. Please wait before minting again.";
  }

  if (message.includes("InvalidMintAmount")) {
    return "Invalid mint amount. Check the faucet limits.";
  }

  if (message.includes("User rejected")) {
    return "Transaction rejected in wallet.";
  }

  if (message.includes("wrong network") || message.includes("chain")) {
    return "Please switch to Sepolia testnet.";
  }

  return message.length > 120 ? `${message.slice(0, 120)}...` : message;
}
