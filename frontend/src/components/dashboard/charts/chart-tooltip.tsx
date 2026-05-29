interface ChartTooltipProps {
  active?: boolean;
  payload?: { value: number; name?: string }[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border/70 bg-card/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      {label ? <p className="mb-1 text-muted-foreground">{label}</p> : null}
      <p className="font-medium text-foreground">{payload[0].value}</p>
    </div>
  );
}
