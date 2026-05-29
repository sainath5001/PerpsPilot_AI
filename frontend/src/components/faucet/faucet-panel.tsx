"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Droplets,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TerminalPanel } from "@/components/layout/app-shell";
import { TokenBalanceCard } from "@/components/wallet/token-balance-card";
import { WalletStatusBadge } from "@/components/wallet/wallet-status-badge";
import { useFaucetMint } from "@/hooks/use-faucet-mint";
import { usePptBalance, usePptFaucetInfo } from "@/hooks/use-ppt-balance";
import { useWalletStatus } from "@/hooks/use-wallet-status";
import {
  BLOCKCHAIN_CONSTANTS,
  getExplorerTxUrl,
  isPptTokenConfigured,
} from "@/lib/blockchain/constants";
import {
  formatCooldown,
  formatTokenAmount,
  getTxErrorMessage,
} from "@/lib/blockchain/format";
import { formatUnits } from "viem";

export function FaucetPanel() {
  const { isConnected, isWrongChain, switchToSepolia, isSwitchingChain } =
    useWalletStatus();
  const { balance, refetch: refetchBalance } = usePptBalance();
  const {
    maxMintAmount,
    cooldownRemaining,
    refetchCooldown,
    isLoading: isFaucetInfoLoading,
  } = usePptFaucetInfo();
  const {
    mint,
    hash,
    isPending,
    isSuccess,
    error,
    reset,
  } = useFaucetMint();

  const mintAmount = maxMintAmount ?? BLOCKCHAIN_CONSTANTS.defaultMintAmount;
  const canMint =
    isConnected &&
    !isWrongChain &&
    isPptTokenConfigured &&
    !isPending &&
    Number(cooldownRemaining ?? BigInt(0)) === 0;

  useEffect(() => {
    if (!isSuccess || !hash) return;

    toast.success("PPT minted successfully", {
      description: "Your simulation balance has been updated.",
    });
    refetchBalance();
    refetchCooldown();
    reset();
  }, [hash, isSuccess, refetchBalance, refetchCooldown, reset]);

  useEffect(() => {
    if (!error) return;
    toast.error("Mint failed", {
      description: getTxErrorMessage(error),
    });
  }, [error]);

  const handleMint = async () => {
    if (!isConnected) {
      toast.error("Connect your wallet first");
      return;
    }

    if (isWrongChain) {
      toast.message("Switching to Sepolia...");
      switchToSepolia();
      return;
    }

    if (!isPptTokenConfigured) {
      toast.error("Token contract not configured");
      return;
    }

    try {
      await mint(mintAmount);
      toast.loading("Transaction pending...", { id: "mint-tx" });
    } catch (mintError) {
      toast.error("Mint failed", {
        description: getTxErrorMessage(mintError),
      });
    }
  };

  useEffect(() => {
    if (isPending) return;
    if (isSuccess) toast.dismiss("mint-tx");
  }, [isPending, isSuccess]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-primary/20 bg-gradient-to-br from-card/90 via-card/70 to-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-primary/30 bg-primary/10 p-3">
                <Droplets className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">PPT Faucet</CardTitle>
                <CardDescription>
                  Mint PerpPilot Token on Sepolia for portfolio simulation.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <WalletStatusBadge />

            <TerminalPanel
              title="Faucet Parameters"
              description="On-chain limits enforced by the smart contract"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                <Metric
                  label="Mint Amount"
                  value={
                    isFaucetInfoLoading
                      ? "..."
                      : `${formatTokenAmount(mintAmount)} PPT`
                  }
                />
                <Metric
                  label="Cooldown"
                  value={formatCooldown(cooldownRemaining)}
                />
                <Metric
                  label="Your Balance"
                  value={`${formatTokenAmount(balance)} PPT`}
                />
              </div>
            </TerminalPanel>

            <div className="rounded-xl border border-border/70 bg-black/30 p-5">
              {!isPptTokenConfigured ? (
                <p className="text-sm text-muted-foreground">
                  Deploy the contract and set `NEXT_PUBLIC_PPT_TOKEN_ADDRESS` in
                  `.env.local` to enable minting.
                </p>
              ) : isSuccess && hash ? (
                <SuccessState hash={hash} amount={mintAmount} />
              ) : isPending ? (
                <PendingState hash={hash} />
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Claim up to{" "}
                    <span className="font-medium text-foreground">
                      {formatTokenAmount(mintAmount)} PPT
                    </span>{" "}
                    per transaction. Cooldown applies between mints.
                  </p>

                  <Button
                    variant="terminal"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={!canMint && isConnected && !isWrongChain}
                    onClick={handleMint}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Minting...
                      </>
                    ) : isWrongChain ? (
                      isSwitchingChain ? "Switching..." : "Switch to Sepolia"
                    ) : Number(cooldownRemaining ?? BigInt(0)) > 0 ? (
                      `Cooldown · ${formatCooldown(cooldownRemaining)}`
                    ) : (
                      <>
                        <Droplets className="h-4 w-4" />
                        Mint {formatTokenAmount(mintAmount)} PPT
                      </>
                    )}
                  </Button>

                  {!isConnected ? (
                    <p className="text-xs text-muted-foreground">
                      Connect MetaMask, Rainbow, or WalletConnect to mint.
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="space-y-4"
      >
        <TokenBalanceCard />
        <TerminalPanel title="Simulation Use" description="Why mint PPT?">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Fund mock perpetual positions for risk analysis</li>
            <li>Power portfolio exposure simulations</li>
            <li>Feed AI copilot with realistic capital context</li>
          </ul>
        </TerminalPanel>
      </motion.div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/50 p-3">
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function PendingState({ hash }: { hash?: `0x${string}` }) {
  return (
    <div className="flex items-start gap-3">
      <Loader2 className="mt-0.5 h-5 w-5 animate-spin text-primary" />
      <div>
        <p className="font-medium text-foreground">Transaction pending</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirm the mint in your wallet and wait for Sepolia confirmation.
        </p>
        {hash ? (
          <a
            href={getExplorerTxUrl(hash)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View transaction
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

function SuccessState({
  hash,
  amount,
}: {
  hash: `0x${string}`;
  amount: bigint;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
        <div>
          <p className="font-medium text-foreground">Mint successful</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatUnits(amount, 18)} PPT added to your wallet.
          </p>
        </div>
      </div>
      <a
        href={getExplorerTxUrl(hash)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary transition hover:bg-primary/15"
      >
        {hash.slice(0, 10)}...{hash.slice(-8)}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.location.reload()}
        className="mt-2"
      >
        <RefreshCw className="h-4 w-4" />
        Mint again after cooldown
      </Button>
    </div>
  );
}
