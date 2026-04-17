"use client";

import React from "react";

export default function JobProgress() {
    return (
        <div className="bg-white p-6 lg:p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center animate-in fade-in slide-in-from-right-5 duration-1000">
            <h3 className="text-[#1F1F1F] text-xl font-bold italic mb-8">
                Job Creation Progress
            </h3>

            <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        className="text-gray-100"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="85"
                        cx="96"
                        cy="96"
                    />
                    <circle
                        className="text-[#0D9488]"
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 85}
                        strokeDashoffset={2 * Math.PI * 85 * (1 - 0.23)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="85"
                        cx="96"
                        cy="96"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl lg:text-5xl font-extrabold italic text-[#1F1F1F]">
                        23%
                    </span>
                </div>
            </div>

            <p className="mt-8 text-[#696969] text-xs lg:text-sm font-medium text-center leading-relaxed max-w-[200px]">
                850 / 1200 jobs required for residency qualification.
            </p>
        </div>
    );
}
