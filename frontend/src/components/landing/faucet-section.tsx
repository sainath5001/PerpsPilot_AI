"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

export function FaucetSection() {
  return (
    <section id="faucet" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <GlassPanel className="border-primary/20 p-8 text-center">
            <Droplets className="mx-auto h-12 w-12 text-primary" />
            <p className="mt-4 text-3xl font-bold text-primary">1,000 PPT</p>
            <p className="text-sm text-muted-foreground">per faucet claim · 5 min cooldown</p>
            <div className="mt-6 rounded-lg border border-border/60 bg-black/30 p-4 font-mono text-xs text-muted-foreground">
              0x8aA4...37AB · Sepolia
            </div>
          </GlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Token Faucet</p>
          <h2 className="mt-3 text-3xl font-bold">Simulation capital on Sepolia</h2>
          <p className="mt-4 text-muted-foreground">
            Mint PerpPilot Token (PPT) to fund portfolio simulation. Connect your wallet,
            claim from the faucet, and use balances across the dashboard and risk engine.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="h-4 w-4 text-primary" />
            RainbowKit · MetaMask · WalletConnect
          </div>
          <Link href="/faucet" className="mt-8 inline-block">
            <Button variant="terminal">Mint PPT Tokens</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
