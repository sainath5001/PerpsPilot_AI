"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { ChatInput } from "@/components/copilot/chat-input";
import { ChatMessage } from "@/components/copilot/chat-message";
import { SuggestedPrompts } from "@/components/copilot/suggested-prompts";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useCopilotChat } from "@/hooks/use-copilot-chat";
import { fetchAiStatus } from "@/lib/ai/client";
import { useState } from "react";

export function CopilotTerminal() {
  const { messages, isLoading, sendMessage, clearMessages } = useCopilotChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [aiReady, setAiReady] = useState<boolean | null>(null);

  useEffect(() => {
    fetchAiStatus()
      .then((s) => setAiReady(s.configured))
      .catch(() => setAiReady(false));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <GlassPanel glow className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 lg:px-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">AI Copilot</p>
            <h2 className="text-lg font-semibold">Perpetual Risk Assistant</h2>
            <p className="text-xs text-muted-foreground">
              {aiReady === false
                ? "Backend AI offline — start backend with OPENAI_API_KEY"
                : "Describe positions · get leverage & liquidation insights"}
            </p>
          </div>
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={clearMessages}
              className="flex items-center gap-1 rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          ) : null}
        </div>

        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto px-4 py-4 lg:px-5"
        >
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full min-h-[280px] flex-col items-center justify-center gap-6 text-center"
            >
              <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  Try: &quot;Analyze my BTC 20x long at $67,000&quot;
                </p>
              </div>
              <SuggestedPrompts onSelect={sendMessage} disabled={isLoading} />
            </motion.div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0 space-y-3 border-t border-white/10 p-4 lg:p-5">
          {messages.length > 0 ? (
            <SuggestedPrompts onSelect={sendMessage} disabled={isLoading} />
          ) : null}
          <ChatInput onSend={sendMessage} disabled={isLoading || aiReady === false} />
        </div>
      </GlassPanel>
    </div>
  );
}
