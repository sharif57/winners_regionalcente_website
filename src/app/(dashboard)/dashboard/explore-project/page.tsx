
"use client";

import { useState } from "react";
import StatsBar from "@/components/dashboard/StatsBar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProjectListQuery } from "@/redux/feature/projectSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DEFAULT_PROJECT_IMAGE = "/image/project-1.png";

export default function ExploreProjectPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isFetching, isError } = useProjectListQuery({
        page: currentPage,
    });

    const projects = data?.data ?? [];
    const totalPages = data?.meta?.total_pages ?? 1;

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }

        setCurrentPage(page);
    };

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "bg-[#1E293B]";
            case "completed":
                return "bg-[#94A3B8]";
            default:
                return "bg-[#C51D1D]";
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

    const getButtonLabel = (status: string) => {
        return status?.toLowerCase() === "completed" ? "CLOSED" : "VIEW DETAILS";
    };

    const getButtonVariant = (status: string) => {
        return status?.toLowerCase() === "completed" ? "secondary" : "outline";
    };

    const getButtonClassName = (status: string) => {
        return status?.toLowerCase() === "completed"
            ? "bg-[#94A3B8]/20 text-[#64748B] hover:bg-[#94A3B8]/30 cursor-not-allowed"
            : "border-[#9399A6] text-[#121E38] hover:bg-[#121E38] hover:text-white";
    };

    return (
        <section>
            <div className="mb-5 ">
                {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
                    {portfolioStats.map((item, index) => (
                        <div
                            key={item.label}
                            className={`px-3 sm:px-4 xl:px-6 ${index !== portfolioStats.length - 1
                                ? "xl:border-r xl:border-[#C9C9CB]"
                                : ""
                                }`}
                        >
                            <p className="text-base  leading-tight font-normal text-secondary uppercase">
                                {item.label}
                            </p>
                            <p className="mt-1 text-2xl lg:text-[32px]  font-black italic text-[#1F1F1F] sm:text-[40px]">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div> */}
                <StatsBar />
            </div>

            <section className="w-full bg-white p-4 ">

                <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mb-7 sm:gap-x-8">
                    <button
                        type="button"
                        className={`text-[16px] leading-none italic transition-colors sm:text-[24px] font-normal text-secondary hover:text-[#DE6D70]`}
                    >
                        All Projects
                    </button>
                </div>

                {isLoading && (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={`project-skeleton-${index}`}
                                className="bg-[#E8E9EC52] overflow-hidden flex flex-col"
                            >
                                <div className="h-64 bg-[#E2E8F0] animate-pulse" />
                                <div className="p-8 space-y-4">
                                    <div className="h-6 bg-[#E2E8F0] animate-pulse" />
                                    <div className="h-16 bg-[#E2E8F0] animate-pulse" />
                                    <div className="h-10 bg-[#E2E8F0] animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && isError && (
                    <p className="text-[#C51D1D] text-base">Failed to load projects. Please try again.</p>
                )}

                {!isLoading && !isError && projects.length === 0 && (
                    <p className="text-[#696969] text-base">No projects found.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-[#E8E9EC52] group transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
                        >
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
                                    {project.status?.toLowerCase() === "completed" ? "Fully Funded" : project.status}
                                </div>
                            </div>

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
                                            <div className="w-0.5 h-10 bg-[#000000]" />
                                            <div className="space-y-1">
                                                <p className="text-base font-normal uppercase tracking-widest text-[#696969]">EST.ROI</p>
                                                <p className="text-lg font-bold text-[#EA4335]">{project.roi}</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div 
                                    className="text-[#696969] text-base font-normal leading-relaxed grow line-clamp-3"
                                    dangerouslySetInnerHTML={{ 
                                        __html: project.short_description || "No description available." 
                                    }}
                                />

                                <div className="pt-4">
                                    <Button
                                        onClick={() => {
                                            if (project.status?.toLowerCase() === "completed") {
                                                return;
                                            }

                                            router.push(`/dashboard/explore-project/${project.id}`);
                                        }}
                                        variant={getButtonVariant(project.status)}
                                        disabled={project.status?.toLowerCase() === "completed"}
                                        className={cn(
                                            "w-full rounded-none py-6 font-bold tracking-widest text-base transition-all duration-300",
                                            getButtonClassName(project.status)
                                        )}
                                    >
                                        {getButtonLabel(project.status)}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!isLoading && !isError && projects.length > 0 && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6 mt-16 text-[#1A1A1A]">
                        <button
                            type="button"
                            className={cn(
                                "p-2 hover:text-primary transition-colors",
                                (currentPage === 1 || isFetching) && "opacity-50 cursor-not-allowed hover:text-[#1A1A1A]"
                            )}
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1 || isFetching}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <div className="flex gap-3">
                            {Array.from({ length: totalPages }).map((_, index) => {
                                const pageNumber = index + 1;

                                return (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        onClick={() => goToPage(pageNumber)}
                                        disabled={isFetching}
                                        aria-label={`Page ${pageNumber}`}
                                        className={cn(
                                            "rounded-full transition-all duration-300",
                                            pageNumber === currentPage ? "bg-primary w-6 h-2.5" : "bg-[#D1D1D1] w-2.5 h-2.5",
                                            isFetching && "cursor-not-allowed"
                                        )}
                                    />
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            className={cn(
                                "p-2 hover:text-primary transition-colors",
                                (currentPage === totalPages || isFetching) && "opacity-50 cursor-not-allowed hover:text-[#1A1A1A]"
                            )}
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages || isFetching}
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </section>
        </section>
    );
}
