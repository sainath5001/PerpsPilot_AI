import { DashboardShell } from "@/components/dashboard/layout/dashboard-shell";
import { CopilotTerminal } from "@/components/copilot/copilot-terminal";

export default function CopilotPage() {
  return (
    <DashboardShell>
      <CopilotTerminal />
    </DashboardShell>
  );
}
