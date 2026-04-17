"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const opportunities = [
    {
        name: "Houston Commercial Tower Project",
        investment: "$800k",
        roi: "6%",
        tag: "Hot Asset",
        tagColor: "bg-[#F65353]",
        image: "/image/project1.jpg"
    },
    {
        name: "Houston Commercial Tower Project",
        investment: "$800k",
        roi: "6%",
        tag: "Active",
        tagColor: "bg-[#121E38]",
        image: "/image/project1.jpg"
    },
    {
        name: "Houston Commercial Tower Project",
        investment: "$800k",
        roi: "6%",
        tag: "Limited",
        tagColor: "bg-[#696969]",
        image: "/image/project1.jpg"
    },
];

export default function EliteOpportunities() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h3 className="text-[#1F1F1F] text-xl font-bold italic">
                Elite Opportunity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {opportunities.map((opp, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500"
                    >
                        {/* Image Container */}
                        <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                            <div className="w-full h-full bg-[#121E38]/20 group-hover:bg-transparent transition-all duration-700" />
                            <div className={cn(
                                "absolute top-4 right-4 text-white text-[10px] font-bold px-4 py-2 uppercase rounded-sm z-10",
                                opp.tagColor
                            )}>
                                {opp.tag}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            <h4 className="text-[#1F1F1F] text-[17px] font-bold italic leading-tight">
                                {opp.name}
                            </h4>

                            <div className="flex items-center justify-between border-t border-gray-50 pt-5">
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <p className="text-[#696969] text-[10px] font-bold uppercase tracking-wider">
                                            Investment
                                        </p>
                                        <p className="text-[#1F1F1F] text-base font-bold italic">{opp.investment}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[#696969] text-[10px] font-bold uppercase tracking-wider">
                                            EST.ROI
                                        </p>
                                        <p className="text-[#F65353] text-base font-bold italic">{opp.roi}</p>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="border-[#BABABA] hover:border-[#F65353] hover:text-[#F65353] text-[#1F1F1F] px-6 py-5 text-[10px] font-black uppercase tracking-widest rounded-none transition-all"
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Helper for class merging if needed elsewhere, but using standard template literals here for specific opp props
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
