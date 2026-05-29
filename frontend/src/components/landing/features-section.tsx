"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Droplets,
  LineChart,
  Shield,
  Wallet,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/glass-panel";

const features = [
  {
    icon: Bot,
    title: "AI Copilot",
    description:
      "Streaming risk analysis for leverage, liquidation, and trader psychology.",
  },
  {
    icon: Shield,
    title: "Risk Engine",
    description:
      "Position-based scoring with CoinGecko market context and liquidation estimates.",
  },
  {
    icon: LineChart,
    title: "Trading Terminal",
    description:
      "GMX-style dashboard with TradingView charts and live portfolio metrics.",
  },
  {
    icon: Droplets,
    title: "PPT Faucet",
    description: "Mint simulation capital on Sepolia for portfolio and risk demos.",
  },
  {
    icon: Wallet,
    title: "Wallet Native",
    description: "RainbowKit — MetaMask, Rainbow, and WalletConnect on Sepolia.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Recharts visualizations for leverage, liquidation, and exposure.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Features</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          Everything a perp trader needs
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <GlassPanel className="h-full p-6 transition hover:border-primary/25 hover:shadow-[0_0_32px_rgba(59,130,246,0.08)]">
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
