import type { ChartSymbol, DashboardSection } from "./dashboard";

export type { ChartSymbol, DashboardSection } from "./dashboard";

export type AppView = "terminal" | "positions" | "copilot";

export interface AppState {
  sidebarOpen: boolean;
  activeView: AppView;
  dashboardSection: DashboardSection;
  chartSymbol: ChartSymbol;
  mobileSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setActiveView: (view: AppView) => void;
  setDashboardSection: (section: DashboardSection) => void;
  setChartSymbol: (symbol: ChartSymbol) => void;
  setMobileSidebarOpen: (open: boolean) => void;
}
