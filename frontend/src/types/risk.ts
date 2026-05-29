export type RiskLevel = "low" | "moderate" | "high" | "extreme";
export type PositionDirection = "long" | "short";

export interface PositionFormInput {
  asset: string;
  leverage: number;
  positionSize: number;
  entryPrice: number;
  direction: PositionDirection;
  portfolioCapitalUsd?: number;
}

export interface RiskAnalyzeResult {
  position: PositionFormInput & { notionalUsd: number };
  market: {
    asset: string;
    currentPrice: number;
    change24hPercent: number;
    source: string;
  };
  scores: {
    overall: RiskLevel;
    composite: number;
    leverage: number;
    liquidation: number;
    volatility: number;
    emotional: number;
  };
  liquidation: {
    estimatedPrice: number;
    distancePercent: number;
    adverseMovePercent: number;
    sensitivity: RiskLevel;
    proximityLabel: string;
  };
  leverage: {
    effectiveLeverage: number;
    dangerScore: number;
    tier: string;
  };
  volatility: {
    score: number;
    change24hPercent: number;
    sensitivity: string;
  };
  emotional: {
    flags: string[];
    psychologyNote: string;
  };
  portfolio: {
    exposurePercent: number;
    notionalUsd: number;
    allocation: { name: string; value: number; color: string }[];
  };
  charts: {
    liquidationDistance: { label: string; value: number }[];
    leverageDanger: { label: string; value: number }[];
    riskGauge: number;
  };
  aiInsight?: string;
  analyzedAt: string;
}
