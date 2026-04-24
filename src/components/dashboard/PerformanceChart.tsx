/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data
const yearlyData = [
  { label: "2020", value: 4200 },
  { label: "2021", value: 5800 },
  { label: "2022", value: 7100 },
  { label: "2023", value: 6500 },
  { label: "2024", value: 8200 },
  { label: "2025", value: 8900 },
  { label: "2026", value: 9500 },
];

const monthlyData = [
  { label: "Jan", value: 6200 },
  { label: "Feb", value: 6800 },
  { label: "Mar", value: 7100 },
  { label: "Apr", value: 6900 },
  { label: "May", value: 7400 },
  { label: "Jun", value: 8100 },
  { label: "Jul", value: 8500 },
  { label: "Aug", value: 8900 },
  { label: "Sep", value: 9200 },
  { label: "Oct", value: 8800 },
  { label: "Nov", value: 9100 },
  { label: "Dec", value: 9500 },
];

export default function PerformanceChart() {
  const [view, setView] = useState<"Yearly" | "Monthly">("Yearly");

  const data = view === "Yearly" ? yearlyData : monthlyData;
  const xKey = "label";


  return (
    <div className="w-full  mx-auto bg-white text-[#1F1F1F] p-8 border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold italic text-secondary">Portfolio Performance</h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          {["Yearly", "Monthly"].map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode as "Yearly" | "Monthly")}
              className={cn(
                "px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                view === mode
                  ? "bg-white text-[#1F1F1F] shadow-sm"
                  : "text-gray-500 hover:text-[#1F1F1F]"
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>


      {/* Chart Area */}
      <div className="h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0650B1" stopOpacity={0.70} />
                <stop offset="95%" stopColor="#F5F8FF" stopOpacity={0.95} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />

            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 13 }}
              dy={12}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 13 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                color: "#1F1F1F",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Portfolio Value"]}
              labelStyle={{ color: "#6B7280" }}
            />

            <Area
              type="natural"
              dataKey="value"
              stroke="#0650B1"
              strokeWidth={4}
              fill="url(#colorValue)"
              activeDot={{
                r: 7,
                fill: "#0650B1",
                stroke: "white",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}