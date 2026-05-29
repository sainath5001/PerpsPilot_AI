export function getHealthStatus() {
  return {
    status: "ok",
    service: "perppilot-backend",
    timestamp: new Date().toISOString(),
  };
}
