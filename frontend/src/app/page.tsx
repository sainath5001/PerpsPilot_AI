import Link from "next/link";
import { ArrowRight, Droplets, LayoutDashboard, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { AppShell, TerminalPanel } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <AppShell>
      <AppHeader />

      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">
          Sepolia Testnet Live
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {siteConfig.tagline}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Connect your wallet, mint PPT from the faucet, and view your simulation
          balance on the dashboard.
        </p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/faucet" className="group">
          <Card className="h-full border-primary/20 bg-gradient-to-br from-card/90 to-primary/5 transition hover:border-primary/40">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Droplets className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <CardTitle className="mt-4">Faucet</CardTitle>
              <CardDescription>
                Mint up to 1,000 PPT per transaction on Sepolia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="terminal" className="w-full sm:w-auto">
                Open Faucet
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/copilot" className="group">
          <Card className="h-full border-violet-500/20 bg-gradient-to-br from-card/90 to-violet-500/5 transition hover:border-violet-500/40">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Sparkles className="h-8 w-8 text-violet-400" />
                <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-violet-400" />
              </div>
              <CardTitle className="mt-4">AI Copilot</CardTitle>
              <CardDescription>
                Analyze leverage, liquidation risk, and trading psychology.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full sm:w-auto">
                Open Copilot
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard" className="group">
          <Card className="h-full border-border/70 bg-card/80 transition hover:border-primary/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <CardTitle className="mt-4">Dashboard</CardTitle>
              <CardDescription>
                View ETH balance, PPT holdings, and mock USD valuation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full sm:w-auto">
                Open Dashboard
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/70 bg-card/80 lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Three steps to get running</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <TerminalPanel title="1. Connect" description="Top-right wallet button">
              <p className="text-sm text-muted-foreground">
                Use MetaMask, Rainbow, or WalletConnect on Sepolia.
              </p>
            </TerminalPanel>
            <TerminalPanel title="2. Mint" description="/faucet">
              <p className="text-sm text-muted-foreground">
                Claim PPT tokens for portfolio simulation.
              </p>
            </TerminalPanel>
            <TerminalPanel title="3. Track" description="/dashboard">
              <p className="text-sm text-muted-foreground">
                Monitor wallet and token balances in the terminal UI.
              </p>
            </TerminalPanel>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/80">
          <CardHeader>
            <CardTitle>Deployed Contract</CardTitle>
            <CardDescription>PPT on Sepolia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Token: PerpPilot Token (PPT)</p>
            <p>Max mint: 1,000 PPT / tx</p>
            <p>Cooldown: 5 minutes</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
