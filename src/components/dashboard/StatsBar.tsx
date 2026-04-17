"use client";

import React from "react";

const stats = [
    { label: "Total Invested", value: "$800K", suffix: "" },
    { label: "Annual Yield", value: "8% ROI", suffix: "" },
    { label: "Active Assets", value: "3 PROJECTS", suffix: "" },
    { label: "Economic Impact", value: "1250+ JOBS", suffix: "" },
];

export default function StatsBar() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-2 animate-in fade-in slide-in-from-bottom-5 duration-700"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <span className="text-[#696969] text-xs font-bold uppercase tracking-widest text-center">
                        {stat.label}
                    </span>
                    <h2 className="text-[#1F1F1F] text-2xl lg:text-3xl font-extrabold italic text-center">
                        {stat.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}
