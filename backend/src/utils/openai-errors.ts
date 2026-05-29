import { AppError } from "../middleware/error-handler.js";

export function toAppError(error: unknown): AppError {
  const message = extractMessage(error);

  if (message.includes("429") || /quota|billing|insufficient/i.test(message)) {
    return new AppError(
      402,
      "OpenAI quota exceeded. Add billing or credits at platform.openai.com/account/billing, then try again.",
    );
  }

  if (message.includes("401") || /invalid.*api.*key/i.test(message)) {
    return new AppError(401, "Invalid OpenAI API key. Check OPENAI_API_KEY in backend/.env");
  }

  if (message.includes("rate limit")) {
    return new AppError(429, "OpenAI rate limit hit. Wait a minute and try again.");
  }

  return new AppError(500, message.length > 200 ? "AI request failed" : message);
}

function extractMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: string }).message);
  }
  return "AI request failed";
}

export function formatOpenAIErrorForStream(error: unknown): string {
  return toAppError(error).message;
}
