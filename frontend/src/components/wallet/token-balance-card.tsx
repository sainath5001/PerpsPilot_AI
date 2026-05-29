"use client";

import { Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePptBalance } from "@/hooks/use-ppt-balance";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/blockchain/constants";
import {
  formatTokenAmount,
  formatUsdFromTokens,
} from "@/lib/blockchain/format";
import { cn } from "@/lib/utils";

interface TokenBalanceCardProps {
  className?: string;
  showUsd?: boolean;
}

export function TokenBalanceCard({
  className,
  showUsd = true,
}: TokenBalanceCardProps) {
  const { balance, isLoading, isFetching, isConfigured } = usePptBalance();

  return (
    <Card className={cn("border-border/70 bg-card/80 backdrop-blur-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {BLOCKCHAIN_CONSTANTS.tokenSymbol} Balance
        </CardTitle>
        <Coins className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        {!isConfigured ? (
          <p className="text-sm text-muted-foreground">
            Set `NEXT_PUBLIC_PPT_TOKEN_ADDRESS` to load token balance.
          </p>
        ) : (
          <>
            <div className="text-2xl font-semibold tracking-tight">
              {isLoading
                ? "..."
                : `${formatTokenAmount(balance)} ${BLOCKCHAIN_CONSTANTS.tokenSymbol}`}
            </div>
            {showUsd ? (
              <p className="mt-1 text-sm text-primary">
                {formatUsdFromTokens(balance)} mock USD
              </p>
            ) : null}
            <p className="mt-1 text-xs text-muted-foreground">
              {BLOCKCHAIN_CONSTANTS.tokenName}
              {isFetching && !isLoading ? " · updating" : ""}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
