"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LEVERAGE_EXPOSURE_DATA } from "@/lib/dashboard/mock-data";
import { ChartTooltip } from "./chart-tooltip";

export function LeverageExposureChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={LEVERAGE_EXPOSURE_DATA}>
        <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} />
        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}
