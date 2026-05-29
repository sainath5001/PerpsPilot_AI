"use client";

import { FearGreedWidget } from "@/components/dashboard/widgets/fear-greed-widget";
import { MarketStatsWidget } from "@/components/dashboard/widgets/market-stats-widget";
import { RecentAiAnalysis } from "@/components/dashboard/widgets/recent-ai-analysis";

export function DashboardRightPanel() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col gap-4 overflow-y-auto border-l border-white/10 bg-black/20 p-3 xl:flex 2xl:w-80">
      <RecentAiAnalysis />
      <MarketStatsWidget />
      <FearGreedWidget />
    </aside>
  );
}
