"use client";

import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardRightPanel } from "./dashboard-right-panel";
import { DashboardSidebar } from "./dashboard-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.1),transparent_40%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.06),transparent_35%)]" />

      <div className="relative flex min-h-screen flex-col">
        <DashboardNavbar />

        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />

          <main className="flex min-h-0 flex-1 flex-col overflow-y-auto p-3 lg:p-4">
            {children}
          </main>

          <DashboardRightPanel />
        </div>
      </div>
    </div>
  );
}
