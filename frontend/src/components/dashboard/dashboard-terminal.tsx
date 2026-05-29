"use client";

import { DashboardShell } from "@/components/dashboard/layout/dashboard-shell";
import { DashboardMainView } from "@/components/dashboard/views/dashboard-main-view";
import { DashboardSectionView } from "@/components/dashboard/views/dashboard-section-view";
import { useAppStore } from "@/store/use-app-store";

export function DashboardTerminal() {
  const section = useAppStore((s) => s.dashboardSection);

  return (
    <DashboardShell>
      {section === "dashboard" ? (
        <DashboardMainView />
      ) : (
        <DashboardSectionView section={section} />
      )}
    </DashboardShell>
  );
}
