"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <GlassPanel className="flex flex-col items-center justify-center border-destructive/20 p-10 text-center">
      <div className="mb-4 rounded-full border border-destructive/30 bg-destructive/10 p-4">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <Button variant="outline" className="mt-6 gap-2" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      ) : null}
    </GlassPanel>
  );
}
