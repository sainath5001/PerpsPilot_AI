"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { AI_INSIGHT_PREVIEW } from "@/lib/dashboard/mock-data";

export function AiInsightPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
    >
      <GlassPanel className="h-full bg-gradient-to-br from-primary/10 via-transparent to-violet-500/5 p-5 transition hover:border-primary/30">
        <div className="flex items-start gap-3">
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-2">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-primary">AI Insight</p>
            <h3 className="mt-1 font-semibold">{AI_INSIGHT_PREVIEW.headline}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{AI_INSIGHT_PREVIEW.body}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              Confidence:{" "}
              <span className="font-medium text-foreground">
                {AI_INSIGHT_PREVIEW.confidence}%
              </span>
            </p>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
