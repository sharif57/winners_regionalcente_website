"use client";

import { useMyProjectsQuery } from "@/redux/feature/projectSlice";
import { useState } from "react";

export default function MyProjects() {

    const [page, setPage] = useState<number>(1);
    const page_size = 20;

    const { data: myProjectsData, isFetching } = useMyProjectsQuery({ page, page_size });

    const projects = myProjectsData?.data ?? [];
    const meta = myProjectsData?.meta;

    const handlePrev = () => {
        if (!meta) return;
        if (page > 1) setPage((p) => p - 1);
    };

    const handleNext = () => {
        if (!meta) return;
        if (page < meta.total_pages) setPage((p) => p + 1);
    };

    return (
        <div className="bg-white px-6  py-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 h-full">
            <h3 className="text-[#1F1F1F]  text-lg lg:text-[28px] font-semibold italic mb-8">
                My Project
            </h3>

            <div className="space-y-5">
                {projects.length === 0 && !isFetching && (
                    <div className="text-center text-sm text-gray-500 py-6">No projects found.</div>
                )}

                {projects.map((project, index) => {
                    const minInv = parseFloat(project.minimum_investment || "0") || 0;
                    const totalVal = parseFloat(project.total_project_value || "0") || 0;
                    const progress = totalVal > 0 ? Math.round((minInv / totalVal) * 100) : 0;

                    return (
                        <div
                            key={project.id ?? index}
                            className="bg-[#F9FAFB] p-6 lg:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:shadow-md transition-all"
                        >

                            {/* LEFT SIDE */}
                            <div className="flex items-center gap-6 md:min-w-[250px]">

                                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                                    {project.banner ? (
                                        <img src={project.banner} alt={project.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="bg-[#121E38] w-full h-full flex items-center justify-center text-white text-xs">IMG</div>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-[#1F1F1F] text-base lg:text-xl font-bold italic">{project.name}</h4>

                                    <p className="text-[#696969] text-base font-medium">${project.minimum_investment} minimum</p>
                                </div>

                            </div>

                            {/* MIDDLE PROGRESS BAR (Fixed 200px) */}
                            <div className="flex-1 flex items-center justify-center">

                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-[200px]">
                                    <div
                                        className="h-full bg-[#121E38] transition-all duration-1000"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex flex-col md:items-end gap-3 md:min-w-[200px]">

                                <span className="bg-[#038862] text-white text-lg font-medium px-4 py-1.5 uppercase rounded-sm self-start md:self-auto">{project.status}</span>

                                <p className="text-[#696969] text-lg font-bold text-right text-[#4C4C4C]">{progress}% Completed</p>

                            </div>

                        </div>
                    );
                })}
            </div>

            {meta && (
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">Page {meta.page} of {meta.total_pages}</div>

                    <div className="flex items-center gap-3">
                        <button onClick={handlePrev} disabled={meta.page <= 1} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Prev</button>
                        <button onClick={handleNext} disabled={meta.page >= meta.total_pages} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">Next</button>
                    </div>
                </div>
            )}

        </div>
    );
}
