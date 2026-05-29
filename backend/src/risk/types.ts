export type RiskLevel = "low" | "moderate" | "high" | "extreme";
export type PositionDirection = "long" | "short";

export interface PositionInput {
  asset: string;
  leverage: number;
  positionSize: number;
  entryPrice: number;
  direction: PositionDirection;
  portfolioCapitalUsd?: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface PortfolioSlice {
  name: string;
  value: number;
  color: string;
}

export interface RiskAnalyzeResponse {
  position: PositionInput & { notionalUsd: number };
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
    allocation: PortfolioSlice[];
  };
  charts: {
    liquidationDistance: ChartPoint[];
    leverageDanger: ChartPoint[];
    riskGauge: number;
  };
  aiInsight?: string;
  analyzedAt: string;
}
