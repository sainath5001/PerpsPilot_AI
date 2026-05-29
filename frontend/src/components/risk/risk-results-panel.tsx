"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { LeverageDangerChart } from "@/components/risk/charts/leverage-danger-chart";
import { LiquidationDistanceChart } from "@/components/risk/charts/liquidation-distance-chart";
import { PortfolioExposureChart } from "@/components/risk/charts/portfolio-exposure-chart";
import { RiskGauge } from "@/components/risk/charts/risk-gauge";
import { RiskScoreCard } from "@/components/risk/risk-score-card";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { RiskAnalyzeResult } from "@/types/risk";
interface RiskResultsPanelProps {
  result: RiskAnalyzeResult;
}

export function RiskResultsPanel({ result }: RiskResultsPanelProps) {
  const { scores, liquidation, market, emotional } = result;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <GlassPanel glow className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">
                Overall assessment
              </p>
              <h3 className="mt-1 text-2xl font-semibold capitalize">
                {scores.overall} risk
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {liquidation.proximityLabel}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm">
                {market.change24hPercent >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                {result.market.asset} mark ${market.currentPrice.toLocaleString()} (
                {market.change24hPercent.toFixed(2)}% 24h) · {market.source}
              </p>
            </div>
            <RiskGauge score={scores.composite} level={scores.overall} />
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <RiskScoreCard title="Leverage" score={scores.leverage} subtitle={result.leverage.tier} delay={0.05} />
        <RiskScoreCard title="Liquidation" score={scores.liquidation} subtitle={`~${liquidation.adverseMovePercent}% adverse move`} delay={0.1} />
        <RiskScoreCard title="Volatility" score={scores.volatility} subtitle={result.volatility.sensitivity} delay={0.15} />
        <RiskScoreCard title="Emotional" score={scores.emotional} subtitle={`${emotional.flags.length} flags`} delay={0.2} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassPanel className="p-5">
          <p className="mb-1 text-sm font-medium">Liquidation proximity</p>
          <p className="mb-4 text-xs text-muted-foreground">
            Est. liq ${liquidation.estimatedPrice.toLocaleString()} ·{" "}
            {liquidation.distancePercent.toFixed(1)}% from mark
          </p>
          <div className="h-[200px]">
            <LiquidationDistanceChart data={result.charts.liquidationDistance} />
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <p className="mb-1 text-sm font-medium">Leverage danger curve</p>
          <p className="mb-4 text-xs text-muted-foreground">
            Your {result.leverage.effectiveLeverage}x vs danger scores
          </p>
          <div className="h-[200px]">
            <LeverageDangerChart
              data={result.charts.leverageDanger}
              highlightLeverage={result.leverage.effectiveLeverage}
            />
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <p className="mb-1 text-sm font-medium">Portfolio exposure</p>
          <p className="mb-4 text-xs text-muted-foreground">
            {result.portfolio.exposurePercent.toFixed(1)}% of ${result.portfolio.notionalUsd.toLocaleString()} notional context
          </p>
          <div className="h-[200px]">
            <PortfolioExposureChart data={result.portfolio.allocation} />
          </div>
        </GlassPanel>

        <GlassPanel className="border-amber-500/20 p-5">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <p className="text-sm font-medium">Emotional & behavioral risk</p>
          </div>
          <p className="text-sm text-muted-foreground">{emotional.psychologyNote}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {emotional.flags.map((flag) => (
              <span
                key={flag}
                className="rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-200"
              >
                {flag}
              </span>
            ))}
          </div>
        </GlassPanel>
      </div>

      {result.aiInsight ? (
        <GlassPanel className="border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-transparent p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-violet-300">AI desk note</p>
          <div className="copilot-markdown prose prose-invert prose-sm mt-3 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.aiInsight}</ReactMarkdown>
          </div>
        </GlassPanel>
      ) : null}
    </motion.div>
  );
}
