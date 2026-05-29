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
  id: DashboardSection | "faucet" | "copilot-link";
  label: string;
  icon: typeof LayoutDashboard;
  href?: string;
  section?: DashboardSection;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "dashboard" },
  { id: "copilot-link", label: "AI Copilot", icon: Bot, href: "/copilot" },
  { id: "portfolio", label: "Portfolio", icon: PieChart, section: "portfolio" },
  { id: "risk", label: "Risk Analyzer", icon: ShieldAlert, section: "risk" },
  { id: "faucet", label: "Faucet", icon: Droplets, href: "/faucet" },
  { id: "market", label: "Market Overview", icon: TrendingUp, section: "market" },
];

export const SECTION_TITLES: Record<DashboardSection, string> = {
  dashboard: "Trading Terminal",
  copilot: "AI Copilot",
  portfolio: "Portfolio",
  risk: "Risk Analyzer",
  market: "Market Overview",
};
