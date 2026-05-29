"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export function AiRiskSection() {
  return (
    <section id="risk" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-violet-400">AI Risk Management</p>
          <h2 className="mt-3 text-3xl font-bold">
            Describe your trade. Get institutional-grade risk context.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ask &quot;Analyze my BTC 20x long&quot; and receive leverage breakdowns,
            liquidation proximity, volatility sensitivity, and behavioral flags —
            powered by OpenAI with structured risk scoring.
          </p>
          <Link href="/copilot" className="mt-8 inline-block">
            <Button variant="terminal" className="gap-2">
              Open AI Copilot <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <GlassPanel className="border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent p-6">
            <div className="flex items-center gap-2 text-violet-300">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium">Copilot preview</span>
            </div>
            <div className="mt-4 space-y-3 rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-sm">
              <p className="text-muted-foreground">You</p>
              <p>Analyze my BTC 20x long at $67,000</p>
              <p className="mt-4 text-primary">PerpPilot</p>
              <p className="text-foreground/90">
                At 20x, a ~5% adverse move can approach liquidation under typical
                maintenance assumptions. Consider reducing size or widening your
                buffer...
              </p>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
