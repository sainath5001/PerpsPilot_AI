"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { PositionDirection, PositionFormInput } from "@/types/risk";
import { cn } from "@/lib/utils";

interface RiskAnalyzerFormProps {
  onAnalyze: (input: PositionFormInput) => void;
  loading?: boolean;
  initial?: Partial<PositionFormInput>;
}

export function RiskAnalyzerForm({
  onAnalyze,
  loading,
  initial,
}: RiskAnalyzerFormProps) {
  const [asset, setAsset] = useState(initial?.asset ?? "BTC");
  const [direction, setDirection] = useState<PositionDirection>(
    initial?.direction ?? "long",
  );
  const [leverage, setLeverage] = useState(initial?.leverage ?? 10);
  const [positionSize, setPositionSize] = useState(initial?.positionSize ?? 0.5);
  const [entryPrice, setEntryPrice] = useState(initial?.entryPrice ?? 67000);
  const [portfolioCapital, setPortfolioCapital] = useState(
    initial?.portfolioCapitalUsd ?? 10000,
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze({
      asset: asset.toUpperCase(),
      leverage,
      positionSize,
      entryPrice,
      direction,
      portfolioCapitalUsd: portfolioCapital,
    });
  };

  return (
    <GlassPanel className="p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">
        Position Input
      </p>
      <h3 className="mt-1 text-lg font-semibold">Risk Analyzer</h3>

      <form onSubmit={submit} className="mt-5 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Asset">
            <input
              value={asset}
              onChange={(e) => setAsset(e.target.value)}
              className="input-terminal"
              placeholder="BTC"
            />
          </Field>
          <Field label="Direction">
            <div className="flex gap-2">
              {(["long", "short"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDirection(d)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-sm font-medium capitalize transition",
                    direction === d
                      ? d === "long"
                        ? "border-primary/40 bg-primary/15 text-primary"
                        : "border-red-500/40 bg-red-500/15 text-red-300"
                      : "border-border/60 text-muted-foreground hover:bg-white/5",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <Field label={`Leverage — ${leverage}x`}>
          <input
            type="range"
            min={1}
            max={100}
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>1x</span>
            <span>50x</span>
            <span>100x</span>
          </div>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Position size (contracts)">
            <input
              type="number"
              step="any"
              min={0.001}
              value={positionSize}
              onChange={(e) => setPositionSize(Number(e.target.value))}
              className="input-terminal"
            />
          </Field>
          <Field label="Entry price (USD)">
            <input
              type="number"
              step="any"
              min={1}
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              className="input-terminal"
            />
          </Field>
        </div>

        <Field label="Portfolio capital (USD) — exposure context">
          <input
            type="number"
            step="any"
            min={100}
            value={portfolioCapital}
            onChange={(e) => setPortfolioCapital(Number(e.target.value))}
            className="input-terminal"
          />
        </Field>

        <Button type="submit" variant="terminal" className="w-full" disabled={loading}>
          <Search className="h-4 w-4" />
          {loading ? "Analyzing..." : "Run risk analysis"}
        </Button>
      </form>
    </GlassPanel>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
