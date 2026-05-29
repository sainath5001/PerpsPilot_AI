"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export function DashboardPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Dashboard</p>
        <h2 className="mt-3 text-3xl font-bold">Professional trading terminal UI</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          TradingView charts, market sentiment, portfolio cards, and risk widgets —
          inspired by Hyperliquid and GMX.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-12"
      >
        <GlassPanel glow className="overflow-hidden border-primary/20 p-2">
          <div className="aspect-[16/9] rounded-lg border border-white/10 bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f] p-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <LayoutDashboard className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">PerpPilot Terminal</span>
              <div className="ml-auto flex gap-2">
                <div className="h-6 w-16 rounded bg-primary/20" />
                <div className="h-6 w-16 rounded bg-white/10" />
              </div>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-4">
              <div className="h-48 rounded-lg bg-primary/5 lg:col-span-3 lg:h-64" />
              <div className="space-y-3">
                <div className="h-20 rounded-lg bg-white/5" />
                <div className="h-20 rounded-lg bg-white/5" />
                <div className="h-20 rounded-lg bg-white/5" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 rounded-lg bg-white/5" />
              ))}
            </div>
          </div>
        </GlassPanel>

        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button variant="terminal" size="lg">
              Enter Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
