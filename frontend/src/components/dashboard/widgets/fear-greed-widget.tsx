"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { FEAR_GREED_INDEX } from "@/lib/dashboard/mock-data";

export function FearGreedWidget() {
  const rotation = (FEAR_GREED_INDEX / 100) * 180 - 90;

  return (
    <GlassPanel className="p-4">
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Fear & Greed
      </p>
      <div className="relative mx-auto mt-4 h-24 w-40 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-20 rounded-t-full border border-border/60 bg-gradient-to-r from-red-500/30 via-amber-400/30 to-emerald-400/30" />
        <div
          className="absolute bottom-0 left-1/2 h-10 w-0.5 origin-bottom bg-primary"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        />
      </div>
      <p className="mt-2 text-center text-2xl font-semibold text-amber-300">
        {FEAR_GREED_INDEX}
      </p>
      <p className="text-center text-xs text-muted-foreground">Greed zone</p>
    </GlassPanel>
  );
}
