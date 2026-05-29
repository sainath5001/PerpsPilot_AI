"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { RiskLevel } from "@/types/risk";
import { cn } from "@/lib/utils";

const styles: Record<RiskLevel, string> = {
  low: "border-emerald-500/30 from-emerald-500/10",
  moderate: "border-amber-500/30 from-amber-500/10",
  high: "border-orange-500/30 from-orange-500/10",
  extreme: "border-red-500/30 from-red-500/10",
};

interface RiskScoreCardProps {
  title: string;
  score: number;
  subtitle?: string;
  delay?: number;
}

export function RiskScoreCard({
  title,
  score,
  subtitle,
  delay = 0,
}: RiskScoreCardProps) {
  const level: RiskLevel =
    score < 35 ? "low" : score < 55 ? "moderate" : score < 75 ? "high" : "extreme";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay }}
    >
      <GlassPanel
        className={cn(
          "bg-gradient-to-br to-transparent p-4 transition hover:shadow-[0_0_24px_rgba(59,130,246,0.08)]",
          styles[level],
        )}
      >
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {title}
        </p>
        <p className="mt-2 text-2xl font-semibold tabular-nums">{score}</p>
        {subtitle ? (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </GlassPanel>
    </motion.div>
  );
}
