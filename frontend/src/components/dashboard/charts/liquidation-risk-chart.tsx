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
import { LIQUIDATION_RISK_DATA } from "@/lib/dashboard/mock-data";
import { ChartTooltip } from "./chart-tooltip";

export function LiquidationRiskChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={LIQUIDATION_RISK_DATA}>
        <defs>
          <linearGradient id="liqRisk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#ef4444"
          fill="url(#liqRisk)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
