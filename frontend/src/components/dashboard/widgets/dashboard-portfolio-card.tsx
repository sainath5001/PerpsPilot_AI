"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { usePptBalance } from "@/hooks/use-ppt-balance";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/blockchain/constants";
import {
  formatTokenAmount,
  formatUsdFromTokens,
} from "@/lib/blockchain/format";

export function DashboardPortfolioCard() {
  const { balance, isConfigured } = usePptBalance();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <GlassPanel className="h-full p-5 transition hover:border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Portfolio
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {isConfigured
                ? `${formatTokenAmount(balance)} ${BLOCKCHAIN_CONSTANTS.tokenSymbol}`
                : "—"}
            </p>
            <p className="mt-1 text-sm text-primary">
              {formatUsdFromTokens(balance)} mock USD
            </p>
          </div>
          <Wallet className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <Stat label="Net exposure" value="Long BTC" />
          <Stat label="Margin used" value="62%" />
        </div>
      </GlassPanel>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-black/30 px-3 py-2">
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium text-foreground">{value}</p>
    </div>
  );
}
