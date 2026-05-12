"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import ReusableHeader from "@/hook/resuable-header";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProjectListQuery } from "@/redux/feature/projectSlice";

type ApiProject = {
  id: number;
  name: string;
  short_description?: string;
  minimum_investment?: string;
  roi?: string;
  banner?: string;
  status?: string;
};

const PROJECTS_PER_PAGE = 3;
const fallbackImage = "/image/project-1.png";

const formatCurrency = (value?: string) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

const getStatusColor = (status?: string) => {
  if (status === "completed") {
    return "bg-[#94A3B8]";
  }

  if (status === "active") {
    return "bg-[#1E293B]";
  }

  return "bg-[#C51D1D]";
};

const formatStatus = (status?: string) => {
  if (!status) {
    return "Active";
  }

  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getProjectList = (response: unknown): ApiProject[] => {
  if (Array.isArray(response)) {
    return response;
  }

  if (response && typeof response === "object" && "data" in response) {
    const data = (response as { data?: unknown }).data;

    if (Array.isArray(data)) {
      return data;
    }

    if (data && typeof data === "object" && "results" in data) {
      const results = (data as { results?: unknown }).results;
      return Array.isArray(results) ? results : [];
    }
  }

  return [];
};

export default function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const { data } = useProjectListQuery(undefined);

  const projects = useMemo(() => getProjectList(data), [data]);
  const totalPages = Math.max(1, Math.ceil(projects.length / PROJECTS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);
  const currentProjects = projects.slice(
    (activePage - 1) * PROJECTS_PER_PAGE,
    activePage * PROJECTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);

    setCurrentPage(nextPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="py-[32px] bg-[#F9F9F9]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          badge="EB-5 PROJECTS"
          title="Signature Opportunities"
          description=""
          className="pb-12"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project) => {
            const isCompleted = project.status === "completed";

            return (
              <div
                key={project.id}
                className="bg-[#E8E9EC52] group transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Image with Badge */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.banner || fallbackImage}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className={cn(
                    "absolute top-4 right-0 px-4 py-1.5 text-xs font-bold text-white tracking-wider",
                    getStatusColor(project.status)
                  )}>
                    {formatStatus(project.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow space-y-2">
                  <h3 className="text-xl font-bold italic uppercase text-secondary max-w-xs leading-snug">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-6 py-4">
                    <div className="space-y-1">
                      <p className="text-base font-normal uppercase tracking-widest text-[#696969]">INVESTMENT</p>
                      <p className="text-xl font-bold text-secondary">{formatCurrency(project.minimum_investment)}</p>
                    </div>
                    {!!project.roi && (
                      <>
                        <div className="w-[1px] h-10 bg-[#EEEEEE]" />
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-widest text-[#666666] font-medium">EST.ROI</p>
                          <p className="text-lg font-bold text-[#EA4335]">{project.roi}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <p className="text-[#696969] text-base font-normal leading-relaxed flex-grow">
                    {project.short_description}
                  </p>

                  <div className="pt-4">
                    <Button
                      variant={isCompleted ? "secondary" : "outline"}
                      className={cn(
                        "w-full rounded-none py-6 font-bold tracking-widest text-base transition-all duration-300",
                        isCompleted
                          ? "bg-[#94A3B8]/20 text-[#64748B] hover:bg-[#94A3B8]/30 cursor-not-allowed"
                          : "border-[#9399A6] text-[#121E38] hover:bg-[#121E38] hover:text-white"
                      )}
                    >
                      {isCompleted ? "CLOSED" : "VIEW DETAILS"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-16 text-[#1A1A1A]">
          <button
            type="button"
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage === 1}
            className="p-2 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                type="button"
                onClick={() => handlePageChange(i + 1)}
                aria-label={`Go to projects page ${i + 1}`}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  activePage === i + 1 ? "bg-primary w-6" : "bg-[#D1D1D1]"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage === totalPages}
            className="p-2 hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next projects"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
