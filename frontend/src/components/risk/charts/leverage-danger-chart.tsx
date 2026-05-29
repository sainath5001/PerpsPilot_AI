"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "@/components/dashboard/charts/chart-tooltip";

interface LeverageDangerChartProps {
  data: { label: string; value: number }[];
  highlightLeverage?: number;
}

export function LeverageDangerChart({
  data,
  highlightLeverage,
}: LeverageDangerChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#64748b" fontSize={10} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 100]} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={28}>
          {data.map((entry) => {
            const lev = Number(entry.label.replace("x", ""));
            const active = highlightLeverage === lev;
            return (
              <Cell
                key={entry.label}
                fill={active ? "#3b82f6" : "rgba(59,130,246,0.35)"}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
