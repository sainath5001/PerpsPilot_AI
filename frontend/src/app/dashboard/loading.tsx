import { DashboardShell } from "@/components/dashboard/layout/dashboard-shell";
import { DashboardPageSkeleton } from "@/components/ui/page-skeleton";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardPageSkeleton />
    </DashboardShell>
  );
}
