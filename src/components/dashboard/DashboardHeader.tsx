"use client";

import React from "react";
import Image from "next/image";

export default function DashboardHeader() {
    return (
        <header className="flex items-center justify-between p-6 lg:p-8 bg-white border-b border-gray-100">
            <div className="space-y-1">
                <h1 className="text-[#1F1F1F] text-2xl lg:text-[28px] font-bold italic">
                    Wellcome Back, johnson Roy
                </h1>
                <p className="text-[#696969] text-xs lg:text-sm font-medium">
                    Your EB-5 is actively contributing to following regional economic developers.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-gray-100 cursor-pointer hover:border-[#F65353] transition-all">
                    {/* Fallback image if /image/user.jpg doesn't exist, using a placeholder logic */}
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[#121E38] font-bold text-lg">
                        JR
                    </div>
                </div>
            </div>
        </header>
    );
}
