import { AppHeader } from "@/components/layout/app-header";
import { AppShell } from "@/components/layout/app-shell";
import { FaucetPanel } from "@/components/faucet/faucet-panel";

export default function FaucetPage() {
  return (
    <AppShell>
      <AppHeader />
      <FaucetPanel />
    </AppShell>
  );
}
