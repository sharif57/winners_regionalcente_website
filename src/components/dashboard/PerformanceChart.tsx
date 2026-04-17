"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function PerformanceChart() {
    const [view, setView] = useState<"Yearly" | "Monthly">("Yearly");

    return (
        <div className="bg-white p-6 lg:p-8 border border-gray-100 shadow-sm animate-in fade-in slide-in-from-left-5 duration-1000">
            <div className="flex items-center justify-between mb-10">
                <h3 className="text-[#1F1F1F] text-xl font-bold italic">
                    Portfolio Performance
                </h3>
                <div className="flex bg-[#F2F2F2] p-1 rounded-sm">
                    {["Yearly", "Monthly"].map((mode) => (
                        <button
                            key={mode}
                            onClick={() => setView(mode as any)}
                            className={cn(
                                "px-6 py-2 text-[11px] font-bold uppercase tracking-wider rounded-sm transition-all",
                                view === mode
                                    ? "bg-white text-[#1F1F1F] shadow-sm"
                                    : "text-[#696969] hover:text-[#1F1F1F]"
                            )}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            {/* Custom SVG Area Chart */}
            <div className="relative h-64 w-full">
                <svg
                    viewBox="0 0 1000 300"
                    className="w-full h-full preserve-3d"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8DA8C8" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#8DA8C8" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Background Area */}
                    <path
                        d="M0,150 C100,100 200,200 300,150 C400,100 500,180 600,120 C700,60 800,200 900,100 L1000,50 L1000,300 L0,300 Z"
                        fill="url(#chartGradient)"
                    />

                    {/* Main Line */}
                    <path
                        d="M0,150 C100,100 200,200 300,150 C400,100 500,180 600,120 C700,60 800,200 900,100 L1000,50"
                        fill="none"
                        stroke="#8DA8C8"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="animate-draw"
                    />

                    {/* Data Points */}
                    <circle cx="600" cy="120" r="10" fill="#F65353" className="animate-pulse" />
                </svg>

                {/* Value Bubble */}
                <div className="absolute top-[35%] left-[58%] -translate-x-1/2 -translate-y-full mb-2 group">
                    <div className="bg-[#F65353] text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-lg animate-bounce">
                        $8,900
                    </div>
                    <div className="w-1 h-3 bg-[#F65353] mx-auto opacity-40"></div>
                </div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between mt-6 px-2">
                {["2020", "2021", "2023", "2024", "2025", "2026"].map((year) => (
                    <span key={year} className="text-[#696969] text-xs font-semibold">
                        {year}
                    </span>
                ))}
            </div>
        </div>
    );
}
