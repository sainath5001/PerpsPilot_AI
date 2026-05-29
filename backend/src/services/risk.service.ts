import { runRiskEngine } from "../risk/calculations.js";
import type { PositionInput, RiskAnalyzeResponse } from "../risk/types.js";
import { fetchMarketSnapshot } from "./coingecko.service.js";
import { analyzeChat, isOpenAIConfigured } from "./ai.service.js";

export async function analyzePositionRisk(
  position: PositionInput,
): Promise<RiskAnalyzeResponse> {
  const market = await fetchMarketSnapshot(position.asset);
  const engine = runRiskEngine(position, market.currentPrice, market.change24hPercent);

  const response: RiskAnalyzeResponse = {
    position: { ...position, notionalUsd: engine.notionalUsd },
    market: {
      asset: market.asset,
      currentPrice: market.currentPrice,
      change24hPercent: market.change24hPercent,
      source: market.coingeckoId === "fallback" ? "fallback" : "coingecko",
    },
    scores: {
      overall: engine.overall,
      composite: engine.composite,
      leverage: Math.round(engine.levScore),
      liquidation: Math.round(engine.liqScore),
      volatility: Math.round(engine.volScore),
      emotional: Math.round(engine.emotional.score),
    },
    liquidation: {
      estimatedPrice: Math.round(engine.liqPrice * 100) / 100,
      distancePercent: Math.round(engine.distPct * 100) / 100,
      adverseMovePercent: Math.round(engine.adverseMove * 100) / 100,
      sensitivity: engine.overall === "low" || engine.overall === "moderate" ? "moderate" : engine.overall,
      proximityLabel: engine.proximityLabel,
    },
    leverage: {
      effectiveLeverage: position.leverage,
      dangerScore: Math.round(engine.levScore),
      tier: engine.levTier,
    },
    volatility: {
      score: Math.round(engine.volScore),
      change24hPercent: market.change24hPercent,
      sensitivity:
        Math.abs(market.change24hPercent) > 5
          ? "High 24h volatility — widen stops or reduce size"
          : "Normal volatility band for majors",
    },
    emotional: engine.emotional,
    portfolio: {
      exposurePercent: Math.round(engine.exposurePercent * 10) / 10,
      notionalUsd: Math.round(engine.notionalUsd * 100) / 100,
      allocation: engine.allocation,
    },
    charts: {
      liquidationDistance: engine.liquidationChart,
      leverageDanger: engine.leverageChart,
      riskGauge: engine.composite,
    },
    analyzedAt: new Date().toISOString(),
  };

  if (isOpenAIConfigured()) {
    try {
      const ai = await analyzeChat({
        message: buildAiContextMessage(position, response),
        context: {
          symbol: position.asset,
          side: position.direction,
          leverage: position.leverage,
          entryPrice: position.entryPrice,
        },
      });
      response.aiInsight = ai.reply;
    } catch {
      response.aiInsight = undefined;
    }
  }

  return response;
}

function buildAiContextMessage(
  position: PositionInput,
  report: RiskAnalyzeResponse,
): string {
  return `Analyze this perpetual position for risk (be concise, 3-4 bullets max):
Asset: ${position.asset} ${position.direction.toUpperCase()}
Leverage: ${position.leverage}x
Entry: $${position.entryPrice}
Size: ${position.positionSize} contracts
Mark: $${report.market.currentPrice}
Est. liquidation: $${report.liquidation.estimatedPrice}
Adverse move to liq: ~${report.liquidation.adverseMovePercent}%
Overall risk: ${report.scores.overall} (composite ${report.scores.composite}/100)
24h change: ${report.market.change24hPercent}%
Emotional flags: ${report.emotional.flags.join(", ") || "none"}`;
}
