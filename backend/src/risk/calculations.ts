import type {
  ChartPoint,
  PortfolioSlice,
  PositionDirection,
  PositionInput,
  RiskLevel,
} from "./types.js";

/** Simplified maintenance margin for hackathon demo (0.5%) */
const MAINTENANCE_MARGIN = 0.005;

export function estimateLiquidationPrice(
  entry: number,
  leverage: number,
  direction: PositionDirection,
): number {
  const lev = Math.max(leverage, 1);
  if (direction === "long") {
    return entry * (1 - 1 / lev + MAINTENANCE_MARGIN);
  }
  return entry * (1 + 1 / lev - MAINTENANCE_MARGIN);
}

export function adverseMoveToLiquidationPercent(
  entry: number,
  mark: number,
  liqPrice: number,
  direction: PositionDirection,
): number {
  if (direction === "long") {
    const move = ((entry - liqPrice) / entry) * 100;
    const currentDrop = ((entry - mark) / entry) * 100;
    return Math.max(0, move - currentDrop);
  }
  const move = ((liqPrice - entry) / entry) * 100;
  const currentRise = ((mark - entry) / entry) * 100;
  return Math.max(0, move - currentRise);
}

export function liquidationDistancePercent(
  mark: number,
  liqPrice: number,
): number {
  return (Math.abs(mark - liqPrice) / mark) * 100;
}

export function scoreLeverage(leverage: number): number {
  if (leverage <= 3) return 15 + leverage * 5;
  if (leverage <= 10) return 30 + (leverage - 3) * 5;
  if (leverage <= 25) return 65 + (leverage - 10) * 1.5;
  return Math.min(100, 88 + (leverage - 25) * 0.5);
}

export function scoreLiquidationProximity(adverseMovePercent: number): number {
  if (adverseMovePercent >= 15) return 20;
  if (adverseMovePercent >= 10) return 40;
  if (adverseMovePercent >= 5) return 65;
  if (adverseMovePercent >= 3) return 80;
  return 95;
}

export function scoreVolatility(change24hPercent: number, leverage: number): number {
  const vol = Math.abs(change24hPercent);
  const base = Math.min(50, vol * 4);
  const levAmp = Math.min(40, leverage * 1.2);
  return Math.min(100, base + levAmp);
}

export function analyzeEmotionalRisk(
  leverage: number,
  exposurePercent: number,
): { flags: string[]; psychologyNote: string; score: number } {
  const flags: string[] = [];
  let score = 15;

  if (leverage >= 50) {
    flags.push("Extreme leverage — lottery-ticket mentality");
    score += 40;
  } else if (leverage >= 25) {
    flags.push("Overleveraging — small moves can wipe margin");
    score += 30;
  } else if (leverage >= 15) {
    flags.push("Elevated leverage — confidence may exceed edge");
    score += 20;
  }

  if (exposurePercent >= 80) {
    flags.push("Excessive portfolio concentration");
    score += 25;
  } else if (exposurePercent >= 50) {
    flags.push("High single-position exposure");
    score += 15;
  }

  if (leverage >= 20 && exposurePercent >= 60) {
    flags.push("Revenge-trade pattern risk — size + leverage combo");
    score += 20;
  }

  if (leverage >= 10 && flags.length === 0) {
    flags.push("Monitor FOMO scaling — avoid adding after wins");
    score += 10;
  }

  const psychologyNote =
    flags.length > 0
      ? "Behavioral flags suggest elevated emotional risk. Reduce size before increasing leverage."
      : "Position sizing appears disciplined relative to typical retail perp mistakes.";

  return { flags: flags.slice(0, 4), psychologyNote, score: Math.min(100, score) };
}

export function compositeToLevel(composite: number): RiskLevel {
  if (composite < 35) return "low";
  if (composite < 55) return "moderate";
  if (composite < 75) return "high";
  return "extreme";
}

export function buildLiquidationChart(
  mark: number,
  liqPrice: number,
  direction: PositionDirection,
): ChartPoint[] {
  const steps = 8;
  const range = mark * 0.12;
  const points: ChartPoint[] = [];

  for (let i = 0; i <= steps; i++) {
    const price = mark - range + (2 * range * i) / steps;
    const dist = (Math.abs(price - liqPrice) / mark) * 100;
    const risk = Math.max(0, 100 - dist * 4);
    points.push({
      label: `$${(price / 1000).toFixed(1)}k`,
      value: Math.round(risk),
    });
  }

  if (direction === "short") {
    return points.reverse();
  }

  return points;
}

export function buildLeverageCurve(currentLeverage: number): ChartPoint[] {
  const anchors = [1, 5, 10, 15, 20, 25, 50, 75, 100];
  const unique = new Set(anchors);
  unique.add(Math.min(100, Math.round(currentLeverage)));
  return [...unique]
    .sort((a, b) => a - b)
    .map((m) => ({
      label: `${m}x`,
      value: Math.round(scoreLeverage(m)),
    }));
}

export function buildPortfolioAllocation(
  position: PositionInput,
  notionalUsd: number,
): PortfolioSlice[] {
  const capital = position.portfolioCapitalUsd ?? notionalUsd * 2;
  const exposure = Math.min(100, (notionalUsd / capital) * 100);
  const cash = Math.max(0, 100 - exposure);

  return [
    {
      name: `${position.asset} ${position.direction}`,
      value: Math.round(exposure),
      color: position.direction === "long" ? "#3b82f6" : "#ef4444",
    },
    {
      name: "Unallocated margin",
      value: Math.round(cash),
      color: "#64748b",
    },
  ];
}

export function runRiskEngine(
  position: PositionInput,
  markPrice: number,
  change24h: number,
) {
  const notionalUsd = position.positionSize * position.entryPrice;
  const liqPrice = estimateLiquidationPrice(
    position.entryPrice,
    position.leverage,
    position.direction,
  );
  const distPct = liquidationDistancePercent(markPrice, liqPrice);
  const adverseMove = adverseMoveToLiquidationPercent(
    position.entryPrice,
    markPrice,
    liqPrice,
    position.direction,
  );

  const levScore = scoreLeverage(position.leverage);
  const liqScore = scoreLiquidationProximity(adverseMove);
  const volScore = scoreVolatility(change24h, position.leverage);

  const capital = position.portfolioCapitalUsd ?? notionalUsd * 2;
  const exposurePercent = Math.min(100, (notionalUsd / capital) * 100);
  const emotional = analyzeEmotionalRisk(position.leverage, exposurePercent);

  const composite = Math.round(
    levScore * 0.35 +
      liqScore * 0.3 +
      volScore * 0.2 +
      emotional.score * 0.15,
  );

  const overall = compositeToLevel(composite);

  let proximityLabel = "Comfortable buffer to liquidation";
  if (adverseMove < 3) proximityLabel = "Critical — liquidation very close";
  else if (adverseMove < 5) proximityLabel = "Danger zone — limited adverse room";
  else if (adverseMove < 10) proximityLabel = "Moderate — watch volatility spikes";

  const levTier =
    position.leverage <= 5
      ? "Conservative"
      : position.leverage <= 15
        ? "Active"
        : position.leverage <= 30
          ? "Aggressive"
          : "Extreme";

  return {
    notionalUsd,
    liqPrice,
    distPct,
    adverseMove,
    levScore,
    liqScore,
    volScore,
    emotional,
    composite,
    overall,
    proximityLabel,
    levTier,
    exposurePercent,
    allocation: buildPortfolioAllocation(position, notionalUsd),
    liquidationChart: buildLiquidationChart(markPrice, liqPrice, position.direction),
    leverageChart: buildLeverageCurve(position.leverage),
  };
}
