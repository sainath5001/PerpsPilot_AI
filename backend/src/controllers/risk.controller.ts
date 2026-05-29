import type { NextFunction, Request, Response } from "express";
import { AppError } from "../middleware/error-handler.js";
import type { PositionDirection, PositionInput } from "../risk/types.js";
import { analyzePositionRisk } from "../services/risk.service.js";

export async function analyzeRisk(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const position = validatePosition(req.body);
    const result = await analyzePositionRisk(position);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

function validatePosition(body: unknown): PositionInput {
  if (!body || typeof body !== "object") {
    throw new AppError(400, "Invalid request body");
  }

  const b = body as Record<string, unknown>;
  const asset = String(b.asset ?? "").trim();
  const leverage = Number(b.leverage);
  const positionSize = Number(b.positionSize);
  const entryPrice = Number(b.entryPrice);
  const direction = String(b.direction ?? "").toLowerCase() as PositionDirection;
  const portfolioCapitalUsd =
    b.portfolioCapitalUsd !== undefined ? Number(b.portfolioCapitalUsd) : undefined;

  if (!asset || asset.length > 12) {
    throw new AppError(400, "Valid asset symbol required (e.g. BTC, ETH)");
  }
  if (!Number.isFinite(leverage) || leverage < 1 || leverage > 125) {
    throw new AppError(400, "Leverage must be between 1 and 125");
  }
  if (!Number.isFinite(positionSize) || positionSize <= 0) {
    throw new AppError(400, "Position size must be positive");
  }
  if (!Number.isFinite(entryPrice) || entryPrice <= 0) {
    throw new AppError(400, "Entry price must be positive");
  }
  if (direction !== "long" && direction !== "short") {
    throw new AppError(400, "Direction must be long or short");
  }

  return {
    asset,
    leverage,
    positionSize,
    entryPrice,
    direction,
    portfolioCapitalUsd:
      portfolioCapitalUsd !== undefined && Number.isFinite(portfolioCapitalUsd)
        ? portfolioCapitalUsd
        : undefined,
  };
}
