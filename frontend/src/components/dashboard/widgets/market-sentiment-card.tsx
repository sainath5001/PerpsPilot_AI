"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { MARKET_SENTIMENT } from "@/lib/dashboard/mock-data";

export function MarketSentimentCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
    >
      <GlassPanel className="h-full p-5 transition hover:border-primary/20 hover:shadow-[0_0_24px_rgba(59,130,246,0.06)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Market Sentiment
            </p>
            <p className="mt-2 text-xl font-semibold">{MARKET_SENTIMENT.label}</p>
          </div>
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div className="mt-4">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Bearish</span>
            <span className="font-medium text-primary">{MARKET_SENTIMENT.score}/100</span>
            <span>Bullish</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-black/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-500/80 via-amber-400/80 to-emerald-400/90"
              style={{ width: `${MARKET_SENTIMENT.score}%` }}
            />
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{MARKET_SENTIMENT.description}</p>
      </GlassPanel>
    </motion.div>
  );
}
