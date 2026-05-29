"use client";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div
        className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[100px]"
        style={{ animation: "pulse 4s ease-in-out infinite" }}
      />
      <div className="absolute bottom-0 left-1/2 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
