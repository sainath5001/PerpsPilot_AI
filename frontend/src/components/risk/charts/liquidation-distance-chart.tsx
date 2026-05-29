"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "@/components/dashboard/charts/chart-tooltip";

interface LiquidationDistanceChartProps {
  data: { label: string; value: number }[];
}

export function LiquidationDistanceChart({ data }: LiquidationDistanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="liqDist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#64748b" fontSize={10} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 100]} />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          fill="url(#liqDist)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
