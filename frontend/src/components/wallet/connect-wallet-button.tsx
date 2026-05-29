"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { cn } from "@/lib/utils";

interface ConnectWalletButtonProps {
  className?: string;
}

export function ConnectWalletButton({ className }: ConnectWalletButtonProps) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className={cn("flex items-center gap-2", className)}
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {connected && chain.unsupported ? (
              <button
                type="button"
                onClick={openChainModal}
                className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/20"
              >
                Wrong network
              </button>
            ) : connected ? (
              <>
                <button
                  type="button"
                  onClick={openChainModal}
                  className="hidden rounded-lg border border-border/70 bg-card/80 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground sm:inline-flex"
                >
                  {chain.name}
                </button>
                <button
                  type="button"
                  onClick={openAccountModal}
                  className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-[0_0_20px_rgba(59,130,246,0.12)] transition hover:border-primary/60 hover:bg-primary/15"
                >
                  {account.displayName}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={openConnectModal}
                className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-[0_0_20px_rgba(59,130,246,0.12)] transition hover:border-primary/60 hover:bg-primary/15"
              >
                Connect Wallet
              </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
