"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const links = [
  { href: "#features", label: "Features" },
  { href: "#risk", label: "Risk AI" },
  { href: "#faucet", label: "Faucet" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-1.5">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold tracking-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Launch App
            </Button>
          </Link>
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
