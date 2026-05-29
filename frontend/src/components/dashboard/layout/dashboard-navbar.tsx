"use client";

import Link from "next/link";
import { Menu, Zap } from "lucide-react";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { WalletStatusBadge } from "@/components/wallet/wallet-status-badge";
import { SECTION_TITLES } from "@/lib/dashboard/constants";
import { siteConfig } from "@/config/site";
import { useAppStore } from "@/store/use-app-store";

export function DashboardNavbar() {
  const section = useAppStore((s) => s.dashboardSection);
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg border border-border/60 p-2 text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg border border-primary/30 bg-primary/10 p-1.5">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-none">{siteConfig.name}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {SECTION_TITLES[section]}
              </p>
            </div>
          </Link>
        </div>

        <div className="hidden md:block">
          <WalletStatusBadge />
        </div>

        <ConnectWalletButton />
      </div>
    </header>
  );
}
