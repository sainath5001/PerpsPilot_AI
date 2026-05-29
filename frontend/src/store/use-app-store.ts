import { create } from "zustand";
import type { AppState, AppView, ChartSymbol, DashboardSection } from "@/types";

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activeView: "terminal",
  dashboardSection: "dashboard",
  chartSymbol: "BINANCE:BTCUSDT",
  mobileSidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveView: (view: AppView) => set({ activeView: view }),
  setDashboardSection: (section: DashboardSection) =>
    set({ dashboardSection: section, mobileSidebarOpen: false }),
  setChartSymbol: (symbol: ChartSymbol) => set({ chartSymbol: symbol }),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
}));
