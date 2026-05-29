import type {
  AiChatRequest,
  AiChatResponse,
  AiAnalysisMeta,
  AiStatusResponse,
} from "../ai/types.js";
import {
  buildStreamMessages,
  buildStructuredMessages,
} from "../ai/prompts/build-messages.js";
import { AI_MODEL, getOpenAIClient } from "./openai.client.js";
import { env } from "../config/env.js";

export function isOpenAIConfigured(): boolean {
  return Boolean(env.openaiApiKey);
}

export function getAiStatus(): AiStatusResponse {
  return {
    configured: isOpenAIConfigured(),
    model: AI_MODEL,
    features: [
      "risk-analysis",
      "leverage-analysis",
      "liquidation-explanation",
      "emotional-trading-flags",
      "beginner-insights",
    ],
  };
}

export async function analyzeChat(payload: AiChatRequest): Promise<AiChatResponse> {
  const openai = getOpenAIClient();
  const messages = buildStructuredMessages(payload);

  const completion = await openai.chat.completions.create({
    model: AI_MODEL,
    messages,
    temperature: 0.4,
    max_tokens: 1200,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new Error("Empty response from OpenAI");
  }

  const parsed = parseStructuredResponse(raw);

  return {
    reply: parsed.reply,
    analysis: parsed.analysis,
    model: AI_MODEL,
    timestamp: new Date().toISOString(),
  };
}

export async function* streamChat(
  payload: AiChatRequest,
): AsyncGenerator<string, void, unknown> {
  const openai = getOpenAIClient();
  const messages = buildStreamMessages(payload);

  const stream = await openai.chat.completions.create({
    model: AI_MODEL,
    messages,
    temperature: 0.45,
    max_tokens: 1000,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}

function parseStructuredResponse(raw: string): {
  reply: string;
  analysis: AiAnalysisMeta;
} {
  try {
    const data = JSON.parse(raw) as {
      reply?: string;
      analysis?: Partial<AiAnalysisMeta>;
    };

    return {
      reply: data.reply ?? "Unable to generate analysis. Please try again.",
      analysis: normalizeAnalysis(data.analysis),
    };
  } catch {
    return {
      reply: raw,
      analysis: normalizeAnalysis({}),
    };
  }
}

function normalizeAnalysis(partial?: Partial<AiAnalysisMeta>): AiAnalysisMeta {
  const risk = partial?.riskLevel;
  const validRisk = ["low", "medium", "high", "critical"].includes(risk ?? "")
    ? (risk as AiAnalysisMeta["riskLevel"])
    : "medium";

  return {
    headline: partial?.headline ?? "Review position risk before increasing size",
    riskLevel: validRisk,
    leverageInsight:
      partial?.leverageInsight ?? "Leverage amplifies both gains and losses.",
    liquidationInsight:
      partial?.liquidationInsight ??
      "Monitor distance to liquidation as price moves against you.",
    emotionalFlags: Array.isArray(partial?.emotionalFlags)
      ? partial.emotionalFlags.slice(0, 3)
      : [],
    safetyTips: Array.isArray(partial?.safetyTips)
      ? partial.safetyTips.slice(0, 4)
      : [
          "Use a stop-loss or max loss per trade",
          "Avoid increasing leverage after losses",
        ],
  };
}
