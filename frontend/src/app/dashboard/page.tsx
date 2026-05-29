import { AppHeader } from "@/components/layout/app-header";
import { AppShell } from "@/components/layout/app-shell";
import { TokenPortfolioCard } from "@/components/dashboard/token-portfolio-card";
import { TerminalPanel } from "@/components/layout/app-shell";
import { WalletStatusBadge } from "@/components/wallet/wallet-status-badge";

export default function DashboardPage() {
  return (
    <AppShell>
      <AppHeader />

      <div className="mb-6">
        <WalletStatusBadge />
      </div>

      <div className="space-y-6">
        <TokenPortfolioCard />

        <div className="grid gap-4 md:grid-cols-2">
          <TerminalPanel
            title="Risk Simulation"
            description="Coming in the AI copilot sprint"
          >
            <p className="text-sm text-muted-foreground">
              Your PPT balance will seed mock position sizing, margin usage,
              liquidation distance, and funding exposure analysis.
            </p>
          </TerminalPanel>

          <TerminalPanel
            title="Portfolio Context"
            description="Token-backed simulation layer"
          >
            <p className="text-sm text-muted-foreground">
              Mint from the faucet to fund simulation capital, then use the AI
              copilot to analyze trades against your available PPT balance.
            </p>
          </TerminalPanel>
        </div>
      </div>
    </AppShell>
  );
}
