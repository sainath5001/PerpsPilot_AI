export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface ChatMessageInput {
  role: "user" | "assistant";
  content: string;
}

export interface AiAnalysisMeta {
  riskLevel: RiskLevel;
  leverageInsight: string;
  liquidationInsight: string;
  emotionalFlags: string[];
  safetyTips: string[];
  headline: string;
}

export interface AiChatRequest {
  message: string;
  history?: ChatMessageInput[];
  context?: {
    pptBalance?: string;
    symbol?: string;
    side?: "long" | "short";
    leverage?: number;
    entryPrice?: number;
  };
}

export interface AiChatResponse {
  reply: string;
  analysis: AiAnalysisMeta;
  model: string;
  timestamp: string;
}

export interface AiStatusResponse {
  configured: boolean;
  model: string;
  features: string[];
}
