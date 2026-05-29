import type { ChartSymbol, DashboardSection } from "@/types/dashboard";
import {
  Bot,
  Droplets,
  LayoutDashboard,
  PieChart,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";

export const CHART_SYMBOLS: { id: ChartSymbol; label: string }[] = [
  { id: "BINANCE:BTCUSDT", label: "BTC" },
  { id: "BINANCE:ETHUSDT", label: "ETH" },
];

export const SIDEBAR_ITEMS: {
  id: DashboardSection | "faucet";
  label: string;
  icon: typeof LayoutDashboard;
  href?: string;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "copilot", label: "AI Copilot", icon: Bot },
  { id: "portfolio", label: "Portfolio", icon: PieChart },
  { id: "risk", label: "Risk Analyzer", icon: ShieldAlert },
  { id: "faucet", label: "Faucet", icon: Droplets, href: "/faucet" },
  { id: "market", label: "Market Overview", icon: TrendingUp },
];

export const SECTION_TITLES: Record<DashboardSection, string> = {
  dashboard: "Trading Terminal",
  copilot: "AI Copilot",
  portfolio: "Portfolio",
  risk: "Risk Analyzer",
  market: "Market Overview",
};
