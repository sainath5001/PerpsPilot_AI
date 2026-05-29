"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";

const faqs = [
  {
    q: "Do I need to open real perpetual positions?",
    a: "No. PerpPilot analyzes positions you describe or simulate. No GMX-style execution is required for the demo.",
  },
  {
    q: "Which network is supported?",
    a: "Sepolia testnet for wallet connection and PPT faucet. The stack is EVM-compatible and positioned for Injective ecosystem expansion.",
  },
  {
    q: "How does AI analysis work?",
    a: "Your message is sent to our Express backend with OpenAI. Structured prompts focus on leverage, liquidation, and trader safety — not generic chat.",
  },
  {
    q: "Is this financial advice?",
    a: "No. PerpPilot is an educational risk copilot for hackathon demonstration. Always do your own research.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-primary">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold">Common questions</h2>
      </motion.div>

      <div className="mt-10 space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={faq.q}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <GlassPanel className="p-5">
              <h3 className="font-medium">{faq.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
            </GlassPanel>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
