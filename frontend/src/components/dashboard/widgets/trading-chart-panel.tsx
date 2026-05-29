"use client";

import { motion } from "framer-motion";
import { TradingViewWidget } from "@/components/charts/trading-view-widget";
import { GlassPanel } from "@/components/ui/glass-panel";
import { CHART_SYMBOLS } from "@/lib/dashboard/constants";
import { useAppStore } from "@/store/use-app-store";
import { cn } from "@/lib/utils";

interface TradingChartPanelProps {
  className?: string;
  /** GMX-style hero chart — fills available vertical space */
  variant?: "hero" | "compact";
}

export function TradingChartPanel({
  className,
  variant = "hero",
}: TradingChartPanelProps) {
  const chartSymbol = useAppStore((s) => s.chartSymbol);
  const setChartSymbol = useAppStore((s) => s.setChartSymbol);

  const isHero = variant === "hero";

  return (
    <GlassPanel
      glow
      className={cn(
        "flex flex-col overflow-hidden",
        isHero ? "min-h-[min(72vh,820px)]" : "min-h-[420px]",
        className,
      )}
    >
      <div className="flex shrink-0 flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-5">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Live Chart</p>
            <h3 className="mt-0.5 text-base font-semibold lg:text-lg">Perpetual Market</h3>
          </div>
          <div className="hidden h-8 w-px bg-white/10 sm:block" />
          <div className="flex gap-1.5">
            {CHART_SYMBOLS.map((sym) => (
              <button
                key={sym.id}
                type="button"
                onClick={() => setChartSymbol(sym.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition",
                  chartSymbol === sym.id
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
                )}
              >
                {sym.label}/USD
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        key={chartSymbol}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className={cn(
          "relative min-h-0 flex-1",
          isHero ? "min-h-[min(64vh,740px)]" : "min-h-[360px]",
        )}
      >
        <TradingViewWidget
          symbol={chartSymbol}
          className="absolute inset-0 h-full min-h-full rounded-none border-0"
        />
      </motion.div>
    </GlassPanel>
  );
}
