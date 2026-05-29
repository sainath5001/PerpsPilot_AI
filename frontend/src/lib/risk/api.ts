import { apiConfig } from "@/config/site";
import type { PositionFormInput, RiskAnalyzeResult } from "@/types/risk";

export async function analyzePositionRisk(
  position: PositionFormInput,
): Promise<RiskAnalyzeResult> {
  const res = await fetch(`${apiConfig.baseUrl}/risk/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(position),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(err.error ?? `Risk analysis failed (${res.status})`);
  }

  return res.json() as Promise<RiskAnalyzeResult>;
}
