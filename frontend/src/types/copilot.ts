export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: "complete" | "streaming" | "error";
  analysis?: AiAnalysisMeta;
  createdAt: number;
}

export interface AiAnalysisMeta {
  riskLevel: RiskLevel;
  leverageInsight: string;
  liquidationInsight: string;
  emotionalFlags: string[];
  safetyTips: string[];
  headline: string;
}

export interface AiChatContext {
  pptBalance?: string;
  symbol?: string;
  side?: "long" | "short";
  leverage?: number;
  entryPrice?: number;
}
