"use client";

import StatsBar from "@/components/dashboard/StatsBar";
import { useMyProjectsQuery } from "@/redux/feature/projectSlice";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type ProjectStatus = "Active" | "Pending" | "Completed";
type FilterTab = "All" | ProjectStatus;

type ProjectCard = {
    id: number;
    title: string;
    description: string;
    investment: string;
    estRoi: string;
    progress: string;
    status: ProjectStatus;
    image: string;
};

const tabs: FilterTab[] = ["All", "Active", "Pending", "Completed"];
const statusStyles: Record<ProjectStatus, string> = {
    Active: "bg-[#4B5776] text-white",
    Pending: "bg-[#9EA0A8] text-white",
    Completed: "bg-[#07966F] text-white",
};

const pageSize = 20;

const formatCurrency = (value?: string) => {
    if (!value) {
        return "$0";
    }

    const amount = Number(value);

    if (Number.isNaN(amount)) {
        return value;
    }

    return `$${amount.toLocaleString("en-US", {
        maximumFractionDigits: 0,
    })}`;
};

const normalizeStatus = (value?: string): ProjectStatus => {
    const status = value?.toLowerCase();

    if (status === "completed") {
        return "Completed";
    }

    if (status === "pending") {
        return "Pending";
    }

    return "Active";
};

const getProgress = (status: ProjectStatus) => {
    if (status === "Completed") {
        return "100%";
    }

    if (status === "Pending") {
        return "35%";
    }

    return "75%";
};

const mapProjectToCard = (project: {
    id: number;
    name: string;
    short_description: string;
    city: string;
    state: string;
    location: string;
    minimum_investment: string;
    roi: string;
    banner: string;
    status: string;
}): ProjectCard => {
    const status = normalizeStatus(project.status);

    return {
        id: project.id,
        title: `${project.name} - ${project.city}, ${project.state}`,
        description: `${project.short_description} Located in ${project.location}.`,
        investment: formatCurrency(project.minimum_investment),
        estRoi: project.roi || "TBD",
        progress: getProgress(status),
        status,
        image: project.banner || "/image/project-1.png",
    };
};

export default function ProjectPage() {
    const [activeTab, setActiveTab] = useState<FilterTab>("All");
    const [page, setPage] = useState(1);

    const queryParams = useMemo(() => {
        const statusParam =
            activeTab === "Pending"
                ? { investment_status: "pending" }
                : activeTab === "Active" || activeTab === "Completed"
                    ? { project_status: activeTab.toLowerCase() }
                    : {};

        return {
            page,
            page_size: pageSize,
            ...statusParam,
        };
    }, [activeTab, page]);

    const { data: myProjectsData, isFetching } = useMyProjectsQuery(queryParams);
    const projects = useMemo(() => (myProjectsData?.data ?? []).map(mapProjectToCard), [myProjectsData]);
    const filteredProjects = projects;
    const meta = myProjectsData?.meta;
    const totalPages = meta?.total_pages ?? 1;

    const handleTabChange = (tab: FilterTab) => {
        setActiveTab(tab);
        setPage(1);
    };

    const handlePreviousPage = () => {
        setPage((current) => Math.max(1, current - 1));
    };

    const handleNextPage = () => {
        setPage((current) => Math.min(totalPages, current + 1));
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
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => handleTabChange(tab)}
                            className={`text-[16px] leading-none italic transition-colors sm:text-[24px] font-normal ${activeTab === tab ? "text-[#F65353]" : "text-secondary hover:text-[#DE6D70]"
                                }`}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {filteredProjects.map((project: ProjectCard) => (
                        <article
                            key={project.id}
                            className=" bg-[#E8E9EC52] p-4 sm:p-6 lg:p-7"
                        >
                            <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={190}
                                    height={190}
                                    className="h-42.5 w-42.5 shrink-0 rounded-full object-cover shadow-md sm:h-47.5 sm:w-47.5"
                                    priority={project.id <= 2}
                                />

                                <div className="flex-1 min-w-0">
                                    <div className="mb-4 flex  items-center justify-between gap-3">
                                        <h3 className="max-w-97.5 text-xl leading-[1.18] font-bold italic text-[#1F1F1F] uppercase sm:text-[25px]">
                                            {project.title}
                                        </h3>
                                        <span
                                            className={`inline-flex  justify-center px-3 py-1.5 text-lg leading-none ${statusStyles[project.status]}`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>

                                    <div 
                                        className="mb-4 max-w-125 text-[14px] leading-[1.35] text-[#636363] sm:text-base line-clamp-3 [&>p]:inline"
                                        dangerouslySetInnerHTML={{ 
                                            __html: project.description || "No description available." 
                                        }}
                                    />

                                    <div className="mb-5 flex flex-wrap items-center gap-y-3 text-[12px] text-[#6B6B6B] uppercase sm:text-[16px]">
                                        <div className="pr-4">
                                            <p>Investment</p>
                                            <p className="text-[24px] leading-tight font-semibold normal-case text-[#1F1F1F] sm:text-[30px]">
                                                {project.investment}
                                            </p>
                                        </div>
                                        <div className="mx-4 h-12 w-px bg-[#A5A5A5]" />
                                        <div className="pr-4">
                                            <p>Est.Roi</p>
                                            <p className="text-[24px] leading-tight font-medium normal-case text-[#D45D72] sm:text-[30px]">
                                                {project.estRoi}
                                            </p>
                                        </div>
                                        <div className="mx-4 h-12 w-px bg-[#A5A5A5]" />
                                        <div>
                                            <p>Progress</p>
                                            <p className="text-[24px] leading-tight font-medium normal-case text-[#D45D72] sm:text-[30px]">
                                                {project.progress}
                                            </p>
                                        </div>
                                    </div>

                                    <Link href={`/dashboard/my-project/${project.id}`}>
                                        <button
                                            type="button"
                                            className="w-full border border-[#C4C4C4] bg-white px-4 py-3 text-center text-[15px] font-bold text-[#1E2738] uppercase transition-colors hover:bg-white sm:text-[18px]"
                                        >
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E5E7] pt-4">
                    <p className="text-sm italic text-[#6B6B6B]">
                        Page {meta?.page ?? page} of {totalPages} | {meta?.count ?? 0} projects
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handlePreviousPage}
                            disabled={page <= 1 || isFetching}
                            className="border border-[#C4C4C4] bg-white px-4 py-2 text-[13px] font-bold uppercase text-[#1E2738] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={handleNextPage}
                            disabled={page >= totalPages || isFetching}
                            className="border border-[#C4C4C4] bg-white px-4 py-2 text-[13px] font-bold uppercase text-[#1E2738] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
}
