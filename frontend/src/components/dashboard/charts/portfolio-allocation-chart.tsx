"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PORTFOLIO_ALLOCATION } from "@/lib/dashboard/mock-data";
import { ChartTooltip } from "./chart-tooltip";

export function PortfolioAllocationChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={PORTFOLIO_ALLOCATION}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={52}
          outerRadius={72}
          paddingAngle={3}
        >
          {PORTFOLIO_ALLOCATION.map((entry) => (
            <Cell key={entry.name} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
