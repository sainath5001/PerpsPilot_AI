import type { NextFunction, Request, Response } from "express";
import { toAppError } from "../utils/openai-errors.js";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  const openAiErr = toAppError(err);
  if (openAiErr.statusCode !== 500 || openAiErr.message !== "AI request failed") {
    console.error(err);
    res.status(openAiErr.statusCode).json({ error: openAiErr.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
