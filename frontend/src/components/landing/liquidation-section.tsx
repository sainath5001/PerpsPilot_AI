"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export function LiquidationSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <GlassPanel glow className="overflow-hidden p-8 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-red-400">
              Liquidation Analytics
            </p>
            <h2 className="mt-3 text-3xl font-bold">Know your liquidation zone before the market does</h2>
            <p className="mt-4 text-muted-foreground">
              The risk analyzer estimates liquidation price, adverse move percentage,
              and composite risk levels — visualized with interactive charts.
            </p>
            <Link href="/dashboard" className="mt-6 inline-block">
              <Button variant="outline" className="gap-2">
                Risk Analyzer <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Risk score", value: "72", sub: "High" },
              { label: "Liq distance", value: "4.2%", sub: "BTC long 20x" },
              { label: "Leverage tier", value: "Aggressive", sub: "20x effective" },
              { label: "Vol sensitivity", value: "Elevated", sub: "24h +2.4%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-red-500/20 bg-red-500/5 p-4"
              >
                <AlertTriangle className="mb-2 h-4 w-4 text-red-400" />
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </GlassPanel>
    </section>
  );
}
