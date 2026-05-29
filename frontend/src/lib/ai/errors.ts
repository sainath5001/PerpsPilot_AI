export function formatAiErrorMessage(error: unknown): string {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "AI request failed";

  if (
    message.includes("429") ||
    /quota|billing|exceeded/i.test(message)
  ) {
    return (
      "**OpenAI quota exceeded.** Your API key has no credits left.\n\n" +
      "1. Go to [OpenAI Billing](https://platform.openai.com/account/billing)\n" +
      "2. Add a payment method or prepaid credits\n" +
      "3. Restart the backend and try again\n\n" +
      "Until then, use **Dashboard → Risk Analyzer** (works without OpenAI for scores)."
    );
  }

  if (message.includes("401") || /invalid.*api.*key/i.test(message)) {
    return "**Invalid OpenAI API key.** Update `OPENAI_API_KEY` in `backend/.env`.";
  }

  return message.length > 300 ? `${message.slice(0, 300)}...` : message;
}
