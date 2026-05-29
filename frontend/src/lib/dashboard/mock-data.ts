import type {
  AiAnalysisItem,
  ChartPoint,
  MarketStat,
  PortfolioSlice,
} from "@/types/dashboard";

export const MARKET_STATS: MarketStat[] = [
  { label: "BTC", value: "$67,420", change: 2.4 },
  { label: "ETH", value: "$3,512", change: -0.8 },
  { label: "24h Volume", value: "$48.2B", change: 5.1 },
  { label: "Open Interest", value: "$19.7B", change: 1.2 },
];

export const FEAR_GREED_INDEX = 62;

export const MARKET_SENTIMENT = {
  label: "Bullish Bias",
  score: 68,
  description: "Momentum improving on majors; funding neutral-to-positive.",
};

export const LEVERAGE_EXPOSURE_DATA: ChartPoint[] = [
  { label: "Mon", value: 3.2 },
  { label: "Tue", value: 4.1 },
  { label: "Wed", value: 5.8 },
  { label: "Thu", value: 4.6 },
  { label: "Fri", value: 6.2 },
  { label: "Sat", value: 5.1 },
  { label: "Sun", value: 5.9 },
];

export const LIQUIDATION_RISK_DATA: ChartPoint[] = [
  { label: "8k", value: 12 },
  { label: "10k", value: 18 },
  { label: "12k", value: 28 },
  { label: "14k", value: 45 },
  { label: "16k", value: 72 },
  { label: "18k", value: 91 },
  { label: "20k", value: 100 },
];

export const RISK_SCORE_DATA: ChartPoint[] = [
  { label: "00:00", value: 42 },
  { label: "04:00", value: 48 },
  { label: "08:00", value: 55 },
  { label: "12:00", value: 51 },
  { label: "16:00", value: 58 },
  { label: "20:00", value: 54 },
  { label: "Now", value: 57 },
];

export const PORTFOLIO_ALLOCATION: PortfolioSlice[] = [
  { name: "BTC Perp", value: 42, color: "#3b82f6" },
  { name: "ETH Perp", value: 28, color: "#8b5cf6" },
  { name: "Stable Margin", value: 20, color: "#22c55e" },
  { name: "Cash (PPT)", value: 10, color: "#64748b" },
];

export const RECENT_AI_ANALYSIS: AiAnalysisItem[] = [
  {
    id: "1",
    title: "BTC 20x long risk",
    summary: "5.2% adverse move may approach liquidation zone.",
    severity: "high",
    timestamp: "2m ago",
  },
  {
    id: "2",
    title: "Funding rate alert",
    summary: "BTC perp funding turning positive — carry cost rising.",
    severity: "medium",
    timestamp: "18m ago",
  },
  {
    id: "3",
    title: "Portfolio hedge",
    summary: "ETH short hedge reduces net delta by 18%.",
    severity: "low",
    timestamp: "1h ago",
  },
];

export const AI_INSIGHT_PREVIEW = {
  headline: "Elevated leverage on BTC exposure",
  body: "At 5.9x effective leverage, a -4.1% move could trigger partial liquidation under current margin assumptions.",
  confidence: 87,
};
