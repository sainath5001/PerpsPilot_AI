"use client";

import { useState } from "react";
import { toast } from "sonner";
import { RiskAnalyzerForm } from "@/components/risk/risk-analyzer-form";
import { RiskResultsPanel } from "@/components/risk/risk-results-panel";
import { analyzePositionRisk } from "@/lib/risk/api";
import type { PositionFormInput, RiskAnalyzeResult } from "@/types/risk";
import { EmptyState } from "@/components/ui/empty-state";
import { formatUsdFromTokens } from "@/lib/blockchain/format";
import { BarChart3 } from "lucide-react";
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
          <EmptyState
            icon={<BarChart3 className="h-8 w-8 text-primary" />}
            title="No analysis yet"
            description={
              balance !== undefined
                ? `Configure your position and run analysis. PPT simulation capital: ${formatUsdFromTokens(balance)} mock USD.`
                : "Configure asset, leverage, size, and entry — then run analysis for liquidation estimates and risk scores."
            }
            actionLabel="Use sample: BTC 20x long"
            onAction={() =>
              runAnalysis({
                asset: "BTC",
                leverage: 20,
                positionSize: 0.25,
                entryPrice: 67000,
                direction: "long",
                portfolioCapitalUsd: pptUsd ? pptUsd * 100 : 10000,
              })
            }
          />
        )}
      </div>
    </div>
  );
}
