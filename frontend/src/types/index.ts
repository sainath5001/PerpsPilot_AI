export type AppView = "terminal" | "positions" | "copilot";

export interface AppState {
  sidebarOpen: boolean;
  activeView: AppView;
  setSidebarOpen: (open: boolean) => void;
  setActiveView: (view: AppView) => void;
}
