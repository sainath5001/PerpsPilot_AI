"use client";

const PROMPTS = [
  "Analyze my BTC 20x long",
  "What is liquidation risk?",
  "Explain leverage dangers",
  "Is 50x leverage safe?",
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export function SuggestedPrompts({ onSelect, disabled }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-border/60 bg-black/30 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary disabled:opacity-50"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
