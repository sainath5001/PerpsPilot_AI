"use client";

import { useCallback } from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { pptTokenAbi } from "@/lib/blockchain/abi/ppt-token";
import {
  BLOCKCHAIN_CONSTANTS,
  isPptTokenConfigured,
  pptTokenAddress,
  SUPPORTED_CHAIN,
} from "@/lib/blockchain/constants";

export function useFaucetMint() {
  const {
    writeContractAsync,
    data: hash,
    isPending: isWriting,
    error: writeError,
    reset,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
    chainId: SUPPORTED_CHAIN.id,
  });

  const mint = useCallback(
    async (amount: bigint = BLOCKCHAIN_CONSTANTS.defaultMintAmount) => {
      if (!isPptTokenConfigured) {
        throw new Error("PPT token contract address is not configured.");
      }

      return writeContractAsync({
        address: pptTokenAddress,
        abi: pptTokenAbi,
        functionName: "mint",
        args: [amount],
        chainId: SUPPORTED_CHAIN.id,
      });
    },
    [writeContractAsync],
  );

  return {
    mint,
    hash,
    isPending: isWriting || isConfirming,
    isWriting,
    isConfirming,
    isSuccess,
    error: writeError ?? confirmError,
    reset,
  };
}
