import type { AiChatRequest, ChatMessageInput } from "../types.js";
import { COPILOT_SYSTEM_PROMPT, COPILOT_STREAM_INSTRUCTION } from "./system.js";

const MAX_HISTORY = 8;

export function buildStructuredMessages(payload: AiChatRequest) {
  const history = trimHistory(payload.history ?? []);

  return [
    { role: "system" as const, content: COPILOT_SYSTEM_PROMPT },
    ...history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    {
      role: "user" as const,
      content: buildUserMessage(payload),
    },
  ];
}

export function buildStreamMessages(payload: AiChatRequest) {
  const history = trimHistory(payload.history ?? []);

  return [
    { role: "system" as const, content: COPILOT_STREAM_INSTRUCTION },
    ...history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    {
      role: "user" as const,
      content: buildUserMessage(payload),
    },
  ];
}

function buildUserMessage(payload: AiChatRequest): string {
  const parts = [payload.message.trim()];

  if (payload.context) {
    const ctx = payload.context;
    const extras: string[] = [];

    if (ctx.pptBalance) extras.push(`Simulation capital (PPT): ${ctx.pptBalance}`);
    if (ctx.symbol) extras.push(`Symbol: ${ctx.symbol}`);
    if (ctx.side) extras.push(`Side: ${ctx.side}`);
    if (ctx.leverage) extras.push(`Leverage: ${ctx.leverage}x`);
    if (ctx.entryPrice) extras.push(`Entry: $${ctx.entryPrice}`);

    if (extras.length > 0) {
      parts.push("\n[Position context]\n" + extras.join("\n"));
    }
  }

  return parts.join("\n");
}

function trimHistory(history: ChatMessageInput[]): ChatMessageInput[] {
  return history.slice(-MAX_HISTORY);
}
