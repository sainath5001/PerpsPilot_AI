"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { streamChatMessage, sendChatMessage } from "@/lib/ai/client";
import { formatAiErrorMessage } from "@/lib/ai/errors";
import { useCopilotStore } from "@/store/use-copilot-store";
import { usePptBalance } from "@/hooks/use-ppt-balance";
import { formatTokenAmount } from "@/lib/blockchain/format";
import type { AiChatContext } from "@/types/copilot";

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useCopilotChat() {
  const messages = useCopilotStore((s) => s.messages);
  const isLoading = useCopilotStore((s) => s.isLoading);
  const addMessage = useCopilotStore((s) => s.addMessage);
  const updateMessage = useCopilotStore((s) => s.updateMessage);
  const appendToMessage = useCopilotStore((s) => s.appendToMessage);
  const setLoading = useCopilotStore((s) => s.setLoading);
  const clearMessages = useCopilotStore((s) => s.clearMessages);
  const { balance } = usePptBalance();

  const buildContext = useCallback((): AiChatContext | undefined => {
    if (balance === undefined) return undefined;
    return { pptBalance: formatTokenAmount(balance) };
  }, [balance]);

  const sendMessage = useCallback(
    async (text: string, useStream = true) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg = {
        id: newId(),
        role: "user" as const,
        content: trimmed,
        status: "complete" as const,
        createdAt: Date.now(),
      };

      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      addMessage(userMsg);
      setLoading(true);

      const assistantId = newId();
      addMessage({
        id: assistantId,
        role: "assistant",
        content: "",
        status: "streaming",
        createdAt: Date.now(),
      });

      const context = buildContext();

      try {
        if (useStream) {
          await streamChatMessage(trimmed, history, context, (delta) => {
            appendToMessage(assistantId, delta);
          });
          updateMessage(assistantId, { status: "complete" });
        } else {
          const result = await sendChatMessage(trimmed, history, context);
          updateMessage(assistantId, {
            content: result.reply,
            analysis: result.analysis,
            status: "complete",
          });
        }
      } catch (error) {
        const msg = formatAiErrorMessage(error);
        updateMessage(assistantId, {
          content: msg,
          status: "error",
        });
        toast.error("Copilot unavailable", {
          description: error instanceof Error ? error.message : "AI request failed",
        });
      } finally {
        setLoading(false);
      }
    },
    [
      isLoading,
      messages,
      addMessage,
      appendToMessage,
      updateMessage,
      setLoading,
      buildContext,
    ],
  );

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
