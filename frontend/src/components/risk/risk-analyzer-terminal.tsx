"use client";

import { useState } from "react";
import { toast } from "sonner";
import { RiskAnalyzerForm } from "@/components/risk/risk-analyzer-form";
import { RiskResultsPanel } from "@/components/risk/risk-results-panel";
import { analyzePositionRisk } from "@/lib/risk/api";
import type { PositionFormInput, RiskAnalyzeResult } from "@/types/risk";
import { formatUsdFromTokens } from "@/lib/blockchain/format";
import { usePptBalance } from "@/hooks/use-ppt-balance";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/blockchain/constants";

export function RiskAnalyzerTerminal() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskAnalyzeResult | null>(null);
  const { balance } = usePptBalance();

  const pptUsd =
    balance !== undefined
      ? Number(balance) / 1e18 * BLOCKCHAIN_CONSTANTS.mockUsdPricePerToken
      : undefined;

  const runAnalysis = async (input: PositionFormInput) => {
    setLoading(true);
    try {
      const payload: PositionFormInput = {
        ...input,
        portfolioCapitalUsd:
          input.portfolioCapitalUsd ??
          (pptUsd && pptUsd > 0 ? pptUsd * 100 : 10000),
      };
      const data = await analyzePositionRisk(payload);
      setResult(data);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Analysis failed";
      toast.error("Risk analysis failed", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
      <RiskAnalyzerForm
        onAnalyze={runAnalysis}
        loading={loading}
        initial={{
          asset: "BTC",
          leverage: 20,
          direction: "long",
          entryPrice: 67000,
          positionSize: 0.25,
          portfolioCapitalUsd: pptUsd ? pptUsd * 100 : 10000,
        }}
      />
      <div>
        {result ? (
          <RiskResultsPanel result={result} />
        ) : (
          <div className="flex h-full min-h-[320px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-sm text-muted-foreground">
            Configure your position and run analysis to see liquidation estimates,
            leverage scoring, and AI contextual insights.
            {balance !== undefined ? (
              <p className="mt-2 block text-primary">
                PPT simulation capital: {formatUsdFromTokens(balance)} mock USD
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
