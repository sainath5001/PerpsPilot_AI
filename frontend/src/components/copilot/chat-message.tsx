"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User } from "lucide-react";
import { AnalysisCard } from "@/components/copilot/analysis-card";
import { TypingIndicator } from "@/components/copilot/typing-indicator";
import type { CopilotMessage } from "@/types/copilot";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: CopilotMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isStreaming = message.status === "streaming" && !message.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
          isUser
            ? "border-primary/30 bg-primary/10"
            : "border-violet-500/30 bg-violet-500/10",
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-primary" />
        ) : (
          <Bot className="h-4 w-4 text-violet-300" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[min(100%,42rem)] rounded-2xl border px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-white/10 bg-white/[0.04] text-foreground backdrop-blur-sm",
          message.status === "error" && "border-destructive/30 bg-destructive/10",
        )}
      >
        {isStreaming ? (
          <TypingIndicator />
        ) : (
          <div className="copilot-markdown prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        )}

        {message.analysis && message.status === "complete" ? (
          <AnalysisCard analysis={message.analysis} />
        ) : null}
      </div>
    </motion.div>
  );
}
