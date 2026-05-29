import { apiConfig } from "@/config/site";
import type { AiAnalysisMeta, AiChatContext } from "@/types/copilot";

const AI_BASE = `${apiConfig.baseUrl}/ai`;

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export async function fetchAiStatus() {
  const res = await fetch(`${AI_BASE}/status`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch AI status");
  return res.json() as Promise<{
    configured: boolean;
    model: string;
    features: string[];
  }>;
}

export async function sendChatMessage(
  message: string,
  history: ChatHistoryItem[],
  context?: AiChatContext,
) {
  const res = await fetch(`${AI_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, context }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `AI request failed (${res.status})`);
  }

  return res.json() as Promise<{
    reply: string;
    analysis: AiAnalysisMeta;
    model: string;
    timestamp: string;
  }>;
}

export async function streamChatMessage(
  message: string,
  history: ChatHistoryItem[],
  context: AiChatContext | undefined,
  onDelta: (text: string) => void,
): Promise<void> {
  const res = await fetch(`${AI_BASE}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history, context }),
  });

  if (!res.ok || !res.body) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `AI stream failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      try {
        const data = JSON.parse(line.slice(6)) as {
          delta?: string;
          done?: boolean;
          error?: string;
        };
        if (data.error) throw new Error(data.error);
        if (data.delta) onDelta(data.delta);
      } catch (parseErr) {
        if (parseErr instanceof Error && parseErr.message !== buffer) throw parseErr;
      }
    }
  }
}
