"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradingViewWidgetProps {
  symbol?: string;
  className?: string;
}

/** TradingView advanced chart embed — requires parent with explicit height (autosize). */
export function TradingViewWidget({
  symbol = "BINANCE:BTCUSDT",
  className,
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    setLoading(true);
    const el = containerRef.current;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      width: "100%",
      height: "100%",
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
      allow_symbol_change: false,
      support_host: "https://www.tradingview.com",
    });

    script.onload = () => setLoading(false);

    el.innerHTML = "";
    el.appendChild(script);

    const timeout = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timeout);
  }, [symbol]);

  return (
    <div
      className={cn(
        "relative h-full min-h-[inherit] w-full overflow-hidden bg-[#0b0b0f]",
        className,
      )}
    >
      {loading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="tradingview-widget-container h-full min-h-[inherit] w-full [&_.tradingview-widget-container__widget]:h-full [&_.tradingview-widget-container__widget]:min-h-full [&_iframe]:min-h-full"
      />
    </div>
  );
}
