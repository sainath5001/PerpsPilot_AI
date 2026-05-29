"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { LeverageExposureChart } from "@/components/dashboard/charts/leverage-exposure-chart";
import { GlassPanel } from "@/components/ui/glass-panel";

export function LeverageExposureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="h-full"
    >
      <GlassPanel className="flex h-full flex-col p-5 transition hover:border-primary/20">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Leverage Exposure
            </p>
            <p className="mt-1 text-2xl font-semibold">5.9x</p>
          </div>
          <Gauge className="h-5 w-5 text-primary" />
        </div>
        <div className="min-h-[140px] flex-1">
          <LeverageExposureChart />
        </div>
      </GlassPanel>
    </motion.div>
  );
}
