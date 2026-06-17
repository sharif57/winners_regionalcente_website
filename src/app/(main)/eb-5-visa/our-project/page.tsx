// import React from 'react'
// import ProjectHero from '@/components/visa/project/ProjectHero'
// import ProjectStats from '@/components/visa/project/ProjectStats'
// import ProjectDetails from '@/components/visa/project/ProjectDetails'
// import ProjectCTA from '@/components/visa/project/ProjectCTA'

// export default function OurProject() {
//     return (
//         <div className="bg-white">
//             <ProjectHero />
//             <ProjectStats />
//             <ProjectDetails />
//             <ProjectCTA />
//         </div>
//     )
// }
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProjectListQuery } from "@/redux/feature/projectSlice";
import Link from "next/link";

const DEFAULT_PROJECT_IMAGE = "/image/project-1.png";

const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case "active":
            return "bg-[#1E293B]";
        case "limited":
            return "bg-[#C51D1D]";
        case "completed":
            return "bg-[#94A3B8]";
        default:
            return "bg-[#1E293B]";
    }
};

const formatCurrency = (value: string) => {
    const amount = Number(value);

    if (Number.isNaN(amount)) {
        return value;
    }

    return `$${amount.toLocaleString("en-US", {
        maximumFractionDigits: 0,
    })}`;
};

export default function ProjectsSection() {

    const { data, isLoading, isFetching, isError } = useProjectListQuery();

    const projects = data?.data ?? [];



    return (
        <section className="pt-30">
            <div className="container mx-auto px-6 lg:px-12">

                <h1 className="text-3xl font-semibold text-secondary sm:text-2xl text-start pb-8 italic">Explore Projects</h1>
                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading &&
                        Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="bg-[#E8E9EC52] transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <div className="h-64 bg-[#E2E8F0] animate-pulse" />
                                <div className="p-8 space-y-4">
                                    <div className="h-6 bg-[#E2E8F0] animate-pulse" />
                                    <div className="h-16 bg-[#E2E8F0] animate-pulse" />
                                    <div className="h-10 bg-[#E2E8F0] animate-pulse" />
                                </div>
                            </div>
                        ))}

                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-[#E8E9EC52] group transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Image with Badge */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={project.banner || DEFAULT_PROJECT_IMAGE}
                                    alt={project.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className={cn(
                                    "absolute top-4 right-0 px-4 py-1.5 text-xs font-bold text-white tracking-wider",
                                    getStatusColor(project.status)
                                )}>
                                    {project.status === "completed" ? "Fully Funded" : project.status}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col grow space-y-2">
                                <h3 className="text-xl font-bold italic uppercase text-secondary max-w-xs leading-snug">
                                    {project.name}
                                </h3>

                                <div className="flex items-center gap-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-base font-normal uppercase tracking-widest text-[#696969]">INVESTMENT</p>
                                        <p className="text-xl font-bold text-secondary">{formatCurrency(project.minimum_investment)}</p>
                                    </div>
                                    {project.roi && (
                                        <>
                                            <div className="w-px h-10 bg-[#EEEEEE]" />
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-widest text-[#666666] font-medium">EST.ROI</p>
                                                <p className="text-lg font-bold text-[#EA4335]">{project.roi}</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <p className="text-[#696969] text-base font-normal leading-relaxed grow">
                                    {project.short_description?.slice(0, 100)}...
                                </p>

                                <div className="pt-4">
                                    {project.status.toLowerCase() === "completed" ? (
                                        <Button
                                            variant="secondary"
                                            className="w-full rounded-none py-6 font-bold tracking-widest text-base transition-all duration-300 bg-[#94A3B8]/20 text-[#64748B] hover:bg-[#94A3B8]/30 cursor-not-allowed"
                                        >
                                            CLOSED
                                        </Button>
                                    ) : (
                                        <Link href={`/explore-project/${project.id}`}>
                                            <Button
                                                variant="outline"
                                                className="w-full rounded-none py-6 font-bold tracking-widest text-base transition-all duration-300 border-[#9399A6] text-[#121E38] hover:bg-[#121E38] hover:text-white"
                                            >
                                                VIEW DETAILS
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {!isLoading && !isError && projects.length === 0 && (
                        <p className="text-[#696969] text-base">No projects found.</p>
                    )}

                    {isError && (
                        <p className="text-[#C51D1D] text-base">Failed to load projects. Please try again.</p>
                    )}
                </div>


            </div>
        </section>
    );
}
