"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { RECENT_AI_ANALYSIS } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";

const severityStyles = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  high: "border-red-500/30 bg-red-500/10 text-red-300",
};

export function RecentAiAnalysis() {
  return (
    <GlassPanel className="p-4">
      <p className="mb-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
        Recent AI Analysis
      </p>
      <div className="space-y-3">
        {RECENT_AI_ANALYSIS.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-border/50 bg-black/25 p-3 transition hover:border-primary/20"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium">{item.title}</p>
              <span
                className={cn(
                  "shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase",
                  severityStyles[item.severity],
                )}
              >
                {item.severity}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{item.summary}</p>
            <p className="mt-2 text-[10px] text-muted-foreground">{item.timestamp}</p>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
