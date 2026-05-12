"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProjectListQuery } from "@/redux/feature/projectSlice";
import Link from "next/link";

function statusColorClass(status?: string) {
    if (!status) return "bg-[#14213D]";
    const s = status.toLowerCase();
    if (s.includes("active")) return "bg-[#038862]";
    if (s.includes("completed")) return "bg-gray-400";
    if (s.includes("pending")) return "bg-[#F59E0B]";
    return "bg-[#14213D]";
}

function SkeletonCard() {
    return (
        <div className="bg-[#E8E9EC52] animate-pulse overflow-hidden flex flex-col">
            <div className="relative h-64 bg-gray-200" />
            <div className="p-8 flex flex-col flex-grow space-y-2">
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="flex items-center gap-6 py-4">
                    <div className="space-y-1">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-6 w-32 bg-gray-200 rounded" />
                    </div>
                    <div className="w-[2px] h-10 bg-gray-200" />
                    <div className="space-y-1">
                        <div className="h-4 w-20 bg-gray-200 rounded" />
                        <div className="h-6 w-12 bg-gray-200 rounded" />
                    </div>
                    <div className="ml-auto h-10 w-28 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
}

export default function EliteOpportunities() {
    // request only 3 projects for this component
    const { data, isLoading, isFetching, isError } = useProjectListQuery({ page: 1, page_size: 3 });
    const projects = data?.data ?? [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 bg-white p-6">
            <h3 className="text-[#1F1F1F] text-xl font-bold italic">Elite Opportunity</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(isFetching || isLoading) ? (
                    // show exactly 3 skeleton cards
                    [1, 2, 3].map((n) => <SkeletonCard key={n} />)
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-[#E8E9EC52] group transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Image with Badge */}
                            <div className="relative h-64 overflow-hidden">
                                {project.banner ? (
                                    // next/image requires `fill` with parent `relative` - container is relative above
                                    <Image src={project.banner} alt={project.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}

                                <div className={cn(
                                    "absolute top-4 right-0 px-4 py-1.5 text-xs font-bold text-white tracking-wider",
                                    statusColorClass(project.status)
                                )}>
                                    {project.status}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow space-y-2">
                                <h3 className="text-xl font-bold italic uppercase text-secondary max-w-xs leading-snug">{project.name}</h3>

                                <div className="flex flex-wrap items-center gap-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-base font-normal uppercase tracking-widest text-[#696969]">INVESTMENT</p>
                                        <p className="text-xl font-bold text-secondary">${project.minimum_investment}</p>
                                    </div>
                                    {project.roi && (
                                        <>
                                            <div className="w-[2px] h-10 bg-[#000000]" />
                                            <div className="space-y-1">
                                                <p className="text-base uppercase tracking-widest text-[#696969] font-normal">EST.ROI</p>
                                                <p className="text-lg font-bold text-[#EA4335]">{project.roi}</p>
                                            </div>
                                        </>
                                    )}
                                    <Link href={`/dashboard/explore-project/${project.id}`}>
                                        <Button variant={"outline"} size={"lg"} className="ml-auto text-base font-bold text-[#121E38] rounded-none px-[24px] py-[12px] ">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>


                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


