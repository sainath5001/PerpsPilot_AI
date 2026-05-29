"use client";

import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_20%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}

interface TerminalPanelProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function TerminalPanel({
  title,
  description,
  children,
  className,
}: TerminalPanelProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mb-4 border-b border-border/60 pb-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
