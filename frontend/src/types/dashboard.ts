export type DashboardSection =
  | "dashboard"
  | "copilot"
  | "portfolio"
  | "risk"
  | "market";

export type ChartSymbol = "BINANCE:BTCUSDT" | "BINANCE:ETHUSDT";

export interface MarketStat {
  label: string;
  value: string;
  change: number;
}

export interface AiAnalysisItem {
  id: string;
  title: string;
  summary: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface PortfolioSlice {
  name: string;
  value: number;
  color: string;
}
