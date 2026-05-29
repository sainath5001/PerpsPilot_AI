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
import { RISK_SCORE_DATA } from "@/lib/dashboard/mock-data";
import { ChartTooltip } from "./chart-tooltip";

export function RiskScoreChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={RISK_SCORE_DATA}>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8b5cf6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
