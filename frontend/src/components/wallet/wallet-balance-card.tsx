"use client";

import { Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEthBalance } from "@/hooks/use-wallet-status";
import { formatEthAmount } from "@/lib/blockchain/format";
import { cn } from "@/lib/utils";

interface WalletBalanceCardProps {
  className?: string;
}

export function WalletBalanceCard({ className }: WalletBalanceCardProps) {
  const { data, isLoading, isFetching } = useEthBalance();

  return (
    <Card className={cn("border-border/70 bg-card/80 backdrop-blur-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Wallet Balance
        </CardTitle>
        <Wallet className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">
          {isLoading ? "..." : `${formatEthAmount(data?.value)} ETH`}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Sepolia testnet native balance
          {isFetching && !isLoading ? " · updating" : ""}
        </p>
      </CardContent>
    </Card>
  );
}
