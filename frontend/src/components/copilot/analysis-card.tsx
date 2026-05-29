"use client";

import { Shield } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { AiAnalysisMeta } from "@/types/copilot";
import { cn } from "@/lib/utils";

const riskColors = {
  low: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  medium: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  high: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  critical: "text-red-400 border-red-500/30 bg-red-500/10",
};

interface AnalysisCardProps {
  analysis: AiAnalysisMeta;
}

export function AnalysisCard({ analysis }: AnalysisCardProps) {
  return (
    <GlassPanel className="mt-3 border-primary/20 p-4">
      <div className="flex items-start gap-3">
        <Shield className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0 flex-1 space-y-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-foreground">{analysis.headline}</span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] uppercase",
                riskColors[analysis.riskLevel],
              )}
            >
              {analysis.riskLevel} risk
            </span>
          </div>
          <p className="text-muted-foreground">{analysis.leverageInsight}</p>
          <p className="text-muted-foreground">{analysis.liquidationInsight}</p>
          {analysis.emotionalFlags.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {analysis.emotionalFlags.map((flag) => (
                <span
                  key={flag}
                  className="rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-amber-200"
                >
                  {flag}
                </span>
              ))}
            </div>
          ) : null}
          <ul className="list-inside list-disc space-y-0.5 text-muted-foreground">
            {analysis.safetyTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </GlassPanel>
  );
}
