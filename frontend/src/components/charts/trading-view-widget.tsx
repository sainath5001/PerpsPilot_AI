"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TradingViewWidgetProps {
  symbol?: string;
  className?: string;
}

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: Record<string, unknown>) => void;
    };
  }
}

/** TradingView widget wrapper — chart UI added in a later sprint step. */
export function TradingViewWidget({
  symbol = "BINANCE:BTCUSDT",
  className,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "60",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(0, 0, 0, 0)",
      gridColor: "rgba(255, 255, 255, 0.06)",
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      className={cn(
        "h-[420px] w-full overflow-hidden rounded-lg border border-border/60 bg-black/40",
        className,
      )}
    >
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
