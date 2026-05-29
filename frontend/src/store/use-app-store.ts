import { create } from "zustand";
import type { AppState, AppView } from "@/types";

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activeView: "terminal",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveView: (view: AppView) => set({ activeView: view }),
}));
