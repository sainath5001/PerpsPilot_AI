import OpenAI from "openai";
import { env } from "../config/env.js";

let client: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!env.openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  if (!client) {
    client = new OpenAI({ apiKey: env.openaiApiKey });
  }

  return client;
}

export const AI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
