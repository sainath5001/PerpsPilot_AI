"use client";

import { AiInsightPreviewCard } from "@/components/dashboard/widgets/ai-insight-preview-card";
import { DashboardPortfolioCard } from "@/components/dashboard/widgets/dashboard-portfolio-card";
import { LeverageExposureCard } from "@/components/dashboard/widgets/leverage-exposure-card";
import { LiquidationRiskCard } from "@/components/dashboard/widgets/liquidation-risk-card";
import { MarketSentimentCard } from "@/components/dashboard/widgets/market-sentiment-card";
import { TradingChartPanel } from "@/components/dashboard/widgets/trading-chart-panel";
import { FearGreedWidget } from "@/components/dashboard/widgets/fear-greed-widget";
import { MarketStatsWidget } from "@/components/dashboard/widgets/market-stats-widget";
import { RecentAiAnalysis } from "@/components/dashboard/widgets/recent-ai-analysis";

/** GMX-style layout: dominant chart on top, metrics strip below */
export function DashboardMainView() {
  return (
    <div className="flex min-h-0 flex-col gap-4">
      <TradingChartPanel variant="hero" className="w-full shrink-0" />

      <div className="grid shrink-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MarketSentimentCard />
        <DashboardPortfolioCard />
        <LeverageExposureCard />
        <LiquidationRiskCard />
      </div>

      <div className="grid shrink-0 gap-4 lg:grid-cols-2">
        <AiInsightPreviewCard />
        <div className="grid gap-4 sm:grid-cols-2 xl:hidden">
          <MarketStatsWidget />
          <FearGreedWidget />
        </div>
      </div>

      <div className="grid shrink-0 gap-4 xl:hidden">
        <RecentAiAnalysis />
      </div>
    </div>
  );
}
