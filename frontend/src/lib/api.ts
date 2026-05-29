import { apiConfig } from "@/config/site";

export async function fetchHealth() {
  const response = await fetch(`${apiConfig.baseUrl}/health`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

  return response.json() as Promise<{
    status: string;
    service: string;
    timestamp: string;
  }>;
}
