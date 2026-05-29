"use client";

import { motion } from "framer-motion";
import { Bot, PieChart, ShieldAlert, TrendingUp } from "lucide-react";
import { PortfolioAllocationChart } from "@/components/dashboard/charts/portfolio-allocation-chart";
import { LeverageExposureCard } from "@/components/dashboard/widgets/leverage-exposure-card";
import { TradingChartPanel } from "@/components/dashboard/widgets/trading-chart-panel";
import { RiskAnalyzerTerminal } from "@/components/risk/risk-analyzer-terminal";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SECTION_TITLES } from "@/lib/dashboard/constants";
import type { DashboardSection } from "@/types/dashboard";

const icons = {
  copilot: Bot,
  portfolio: PieChart,
  risk: ShieldAlert,
  market: TrendingUp,
};

interface DashboardSectionViewProps {
  section: Exclude<DashboardSection, "dashboard">;
}

export function DashboardSectionView({ section }: DashboardSectionViewProps) {
  const Icon = icons[section];

  return (
    <motion.div
      key={section}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <GlassPanel className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{SECTION_TITLES[section]}</h2>
            <p className="text-sm text-muted-foreground">
              {section === "portfolio" && "Allocation and simulation capital overview."}
              {section === "risk" && "Leverage, liquidation, and risk score analytics."}
              {section === "market" && "Live market charts and macro sentiment."}
            </p>
          </div>
        </div>
      </GlassPanel>

      {section === "portfolio" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <GlassPanel className="p-5">
            <p className="mb-4 text-sm font-medium">Portfolio Allocation</p>
            <div className="h-[280px]">
              <PortfolioAllocationChart />
            </div>
          </GlassPanel>
          <LeverageExposureCard />
        </div>
      )}

      {section === "risk" && <RiskAnalyzerTerminal />}

      {section === "market" && <TradingChartPanel variant="hero" />}
    </motion.div>
  );
}
