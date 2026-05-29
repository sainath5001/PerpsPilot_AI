"use client";

import { useAccount, useReadContract } from "wagmi";
import { pptTokenAbi } from "@/lib/blockchain/abi/ppt-token";
import {
  isPptTokenConfigured,
  pptTokenAddress,
  SUPPORTED_CHAIN,
} from "@/lib/blockchain/constants";

export function usePptBalance() {
  const { address, isConnected } = useAccount();

  const query = useReadContract({
    address: pptTokenAddress,
    abi: pptTokenAbi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: SUPPORTED_CHAIN.id,
    query: {
      enabled: isConnected && Boolean(address) && isPptTokenConfigured,
      refetchInterval: 10_000,
    },
  });

  return {
    balance: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
    isConfigured: isPptTokenConfigured,
  };
}

export function usePptFaucetInfo() {
  const { address, isConnected } = useAccount();

  const maxMint = useReadContract({
    address: pptTokenAddress,
    abi: pptTokenAbi,
    functionName: "MAX_MINT_AMOUNT",
    chainId: SUPPORTED_CHAIN.id,
    query: { enabled: isPptTokenConfigured },
  });

  const cooldown = useReadContract({
    address: pptTokenAddress,
    abi: pptTokenAbi,
    functionName: "MINT_COOLDOWN",
    chainId: SUPPORTED_CHAIN.id,
    query: { enabled: isPptTokenConfigured },
  });

  const cooldownRemaining = useReadContract({
    address: pptTokenAddress,
    abi: pptTokenAbi,
    functionName: "mintCooldownRemaining",
    args: address ? [address] : undefined,
    chainId: SUPPORTED_CHAIN.id,
    query: {
      enabled: isConnected && Boolean(address) && isPptTokenConfigured,
      refetchInterval: 5_000,
    },
  });

  return {
    maxMintAmount: maxMint.data,
    mintCooldown: cooldown.data,
    cooldownRemaining: cooldownRemaining.data,
    isLoading:
      maxMint.isLoading || cooldown.isLoading || cooldownRemaining.isLoading,
    refetchCooldown: cooldownRemaining.refetch,
  };
}
