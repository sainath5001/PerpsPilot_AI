import { env } from "../config/env.js";

export function isOpenAIConfigured(): boolean {
  return Boolean(env.openaiApiKey);
}

/** OpenAI integration placeholder — wired in a later sprint step. */
export async function analyzeTradeContext(_payload: unknown) {
  if (!isOpenAIConfigured()) {
    return {
      configured: false,
      message: "OpenAI API key not configured",
    };
  }

  return {
    configured: true,
    message: "AI service ready for integration",
  };
}
