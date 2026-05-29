"use client";

import { useAccount, useBalance, useChainId, useSwitchChain } from "wagmi";
import { SUPPORTED_CHAIN } from "@/lib/blockchain/constants";

export function useWalletStatus() {
  const { address, isConnected, isConnecting, isReconnecting, status } =
    useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();

  const isWrongChain = isConnected && chainId !== SUPPORTED_CHAIN.id;

  const switchToSepolia = () => {
    switchChain({ chainId: SUPPORTED_CHAIN.id });
  };

  return {
    address,
    isConnected,
    isConnecting: isConnecting || isReconnecting,
    status,
    chainId,
    isWrongChain,
    isSwitchingChain,
    switchToSepolia,
    supportedChain: SUPPORTED_CHAIN,
  };
}

export function useEthBalance() {
  const { address, isConnected } = useAccount();

  return useBalance({
    address,
    chainId: SUPPORTED_CHAIN.id,
    query: {
      enabled: isConnected && Boolean(address),
      refetchInterval: 15_000,
    },
  });
}
