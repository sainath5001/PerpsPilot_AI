import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function GlassPanel({
  className,
  glow = false,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        glow && "shadow-[0_0_40px_rgba(59,130,246,0.08)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
