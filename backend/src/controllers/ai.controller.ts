import type { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error-handler.js";
import type { AiChatRequest } from "../ai/types.js";
import {
  analyzeChat,
  getAiStatus,
  isOpenAIConfigured,
  streamChat,
} from "../services/ai.service.js";

export async function aiStatus(_req: Request, res: Response): Promise<void> {
  res.json(getAiStatus());
}

export async function aiChat(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!isOpenAIConfigured()) {
      throw new AppError(503, "AI service is not configured. Set OPENAI_API_KEY.");
    }

    const payload = validateChatBody(req.body);
    const result = await analyzeChat(payload);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function aiChatStream(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!isOpenAIConfigured()) {
      throw new AppError(503, "AI service is not configured. Set OPENAI_API_KEY.");
    }

    const payload = validateChatBody(req.body);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    for await (const delta of streamChat(payload)) {
      res.write(`data: ${JSON.stringify({ delta })}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    if (!res.headersSent) {
      next(error);
      return;
    }

    res.write(
      `data: ${JSON.stringify({ error: error instanceof Error ? error.message : "Stream failed" })}\n\n`,
    );
    res.end();
  }
}

function validateChatBody(body: unknown): AiChatRequest {
  if (!body || typeof body !== "object") {
    throw new AppError(400, "Invalid request body");
  }

  const { message, history, context } = body as AiChatRequest;

  if (!message || typeof message !== "string" || message.trim().length < 2) {
    throw new AppError(400, "Message must be at least 2 characters");
  }

  if (message.length > 4000) {
    throw new AppError(400, "Message too long (max 4000 characters)");
  }

  return {
    message: message.trim(),
    history: Array.isArray(history) ? history : [],
    context: context && typeof context === "object" ? context : undefined,
  };
}
