"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/copilot", label: "AI Copilot" },
  { href: "/faucet", label: "Faucet" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-border/60 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8">
        <div>
          <Link href="/" className="group inline-block">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              Perp Trading Copilot
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight transition group-hover:text-primary sm:text-3xl">
              {siteConfig.name}
            </h1>
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "border border-primary/30 bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card/80 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <ConnectWalletButton />
    </header>
  );
}
