import { DashboardShell } from "@/components/dashboard/layout/dashboard-shell";
import { CopilotPageSkeleton } from "@/components/ui/page-skeleton";

export default function CopilotLoading() {
  return (
    <DashboardShell>
      <CopilotPageSkeleton />
    </DashboardShell>
  );
}
