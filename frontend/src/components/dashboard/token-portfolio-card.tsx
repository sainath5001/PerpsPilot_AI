"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import { TokenBalanceCard } from "@/components/wallet/token-balance-card";
import { WalletBalanceCard } from "@/components/wallet/wallet-balance-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePptBalance } from "@/hooks/use-ppt-balance";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/blockchain/constants";
import {
  formatTokenAmount,
  formatUsdFromTokens,
} from "@/lib/blockchain/format";

export function TokenPortfolioCard() {
  const { balance, isConfigured } = usePptBalance();
  const mockUsd = formatUsdFromTokens(balance);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-card/90 via-card/70 to-primary/5">
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Portfolio Simulation Balance</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                PPT powers mock portfolio sizing and AI risk simulation.
              </p>
            </div>
            <div className="rounded-full border border-primary/30 bg-primary/10 p-2">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="rounded-xl border border-primary/20 bg-black/30 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              Simulation Capital
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">
              {isConfigured
                ? `${formatTokenAmount(balance)} ${BLOCKCHAIN_CONSTANTS.tokenSymbol}`
                : "—"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Mock valuation:{" "}
              <span className="font-medium text-primary">{mockUsd}</span>
            </p>
          </div>

          <WalletBalanceCard />
          <TokenBalanceCard showUsd={false} />
        </CardContent>

        <div className="border-t border-border/60 px-6 py-4">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              In upcoming AI features, your PPT balance will define simulated
              position size, margin usage, and liquidation risk scenarios.
            </p>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
