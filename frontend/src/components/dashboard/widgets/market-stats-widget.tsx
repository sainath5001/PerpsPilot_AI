"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { MARKET_STATS } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function MarketStatsWidget() {
  return (
    <GlassPanel className="p-4">
      <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Market Stats
      </p>
      <div className="space-y-3">
        {MARKET_STATS.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{stat.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{stat.value}</span>
              <span
                className={cn(
                  "flex items-center text-xs",
                  stat.change >= 0 ? "text-emerald-400" : "text-red-400",
                )}
              >
                {stat.change >= 0 ? (
                  <TrendingUp className="mr-0.5 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-0.5 h-3 w-3" />
                )}
                {Math.abs(stat.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
