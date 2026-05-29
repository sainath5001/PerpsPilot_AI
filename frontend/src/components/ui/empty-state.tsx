import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <GlassPanel className="flex flex-col items-center justify-center p-10 text-center">
      <div className="mb-4 rounded-full border border-primary/20 bg-primary/10 p-4">
        {icon ?? <Inbox className="h-8 w-8 text-primary" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="terminal" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </GlassPanel>
  );
}
