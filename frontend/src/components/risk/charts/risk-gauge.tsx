"use client";

import { motion } from "framer-motion";
import type { RiskLevel } from "@/types/risk";
import { cn } from "@/lib/utils";

const levelColors: Record<RiskLevel, string> = {
  low: "text-emerald-400",
  moderate: "text-amber-300",
  high: "text-orange-400",
  extreme: "text-red-400",
};

interface RiskGaugeProps {
  score: number;
  level: RiskLevel;
}

export function RiskGauge({ score, level }: RiskGaugeProps) {
  const rotation = (score / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-48 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-24 rounded-t-full border border-white/10 bg-gradient-to-r from-emerald-500/20 via-amber-400/20 to-red-500/30" />
        <motion.div
          className="absolute bottom-0 left-1/2 h-12 w-1 origin-bottom rounded-full bg-primary shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
          style={{ translateX: "-50%" }}
        />
      </div>
      <p className={cn("mt-2 text-3xl font-bold tabular-nums", levelColors[level])}>
        {score}
      </p>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Composite risk
      </p>
      <p className={cn("mt-1 text-sm font-medium capitalize", levelColors[level])}>
        {level}
      </p>
    </div>
  );
}
