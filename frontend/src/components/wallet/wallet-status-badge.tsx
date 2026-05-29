"use client";

import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Loader2, WifiOff } from "lucide-react";
import { useWalletStatus } from "@/hooks/use-wallet-status";
import { shortenAddress } from "@/lib/blockchain/format";
import { cn } from "@/lib/utils";

interface WalletStatusBadgeProps {
  className?: string;
}

export function WalletStatusBadge({ className }: WalletStatusBadgeProps) {
  const { address, isConnected, isConnecting, isWrongChain, supportedChain } =
    useWalletStatus();

  if (isConnecting) {
    return (
      <StatusPill
        className={className}
        icon={<Loader2 className="h-3.5 w-3.5 animate-spin" />}
        label="Connecting wallet..."
        tone="muted"
      />
    );
  }

  if (!isConnected) {
    return (
      <StatusPill
        className={className}
        icon={<WifiOff className="h-3.5 w-3.5" />}
        label="Wallet disconnected"
        tone="muted"
      />
    );
  }

  if (isWrongChain) {
    return (
      <StatusPill
        className={className}
        icon={<AlertTriangle className="h-3.5 w-3.5" />}
        label={`Switch to ${supportedChain.name}`}
        tone="warning"
      />
    );
  }

  return (
    <StatusPill
      className={className}
      icon={<CheckCircle2 className="h-3.5 w-3.5" />}
      label={`Connected · ${shortenAddress(address ?? "")}`}
      tone="success"
    />
  );
}

function StatusPill({
  icon,
  label,
  tone,
  className,
}: {
  icon: ReactNode;
  label: string;
  tone: "muted" | "success" | "warning";
  className?: string;
}) {
  const toneClasses = {
    muted: "border-border/70 bg-card/60 text-muted-foreground",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
