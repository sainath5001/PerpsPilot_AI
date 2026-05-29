"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

const sampleData = [
  { time: "09:00", pnl: 120 },
  { time: "10:00", pnl: 80 },
  { time: "11:00", pnl: 160 },
  { time: "12:00", pnl: 95 },
  { time: "13:00", pnl: 210 },
  { time: "14:00", pnl: 175 },
];

interface ChartContainerProps {
  className?: string;
}

/** Recharts foundation — real position data wired in a later sprint step. */
export function ChartContainer({ className }: ChartContainerProps) {
  return (
    <div
      className={cn(
        "h-[280px] w-full rounded-lg border border-border/60 bg-black/30 p-4",
        className,
      )}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampleData}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="pnl"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
