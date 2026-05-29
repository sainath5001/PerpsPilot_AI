"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Injective Solo AI Builder Sprint
        </p>

        <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            AI Bloomberg Terminal
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-blue-400 to-violet-400 bg-clip-text text-transparent">
            for Perpetual Traders
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {siteConfig.description}. Analyze leverage, estimate liquidation, and trade
          smarter — without executing positions on-chain.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button variant="terminal" size="lg" className="gap-2 px-8">
              Launch Terminal
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/copilot">
            <Button variant="outline" size="lg" className="px-8">
              Try AI Copilot
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" /> Risk-first design
          </span>
          <span>Sepolia testnet live</span>
          <span>OpenAI-powered insights</span>
        </div>
      </motion.div>
    </section>
  );
}
