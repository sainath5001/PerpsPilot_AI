"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { LiquidationRiskChart } from "@/components/dashboard/charts/liquidation-risk-chart";
import { GlassPanel } from "@/components/ui/glass-panel";

export function LiquidationRiskCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="h-full"
    >
      <GlassPanel className="flex h-full flex-col border-red-500/10 p-5 transition hover:border-red-500/25 hover:shadow-[0_0_24px_rgba(239,68,68,0.08)]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Liquidation Risk
            </p>
            <p className="mt-1 text-2xl font-semibold text-red-400">Medium</p>
          </div>
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>
        <div className="min-h-[140px] flex-1">
          <LiquidationRiskChart />
        </div>
      </GlassPanel>
    </motion.div>
  );
}
