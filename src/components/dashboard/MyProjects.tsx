"use client";

import React from "react";

const myProjects = [
    { name: "Winner Tower at Milk", invested: "$5000", progress: 75, status: "Active" },
    { name: "Winner Tower at Milk", invested: "$5000", progress: 75, status: "Active" },
    { name: "Winner Tower at Milk", invested: "$5000", progress: 75, status: "Active" },
];

export default function MyProjects() {
    return (
        <div className="bg-white p-6 lg:p-8 border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h3 className="text-[#1F1F1F] text-xl font-bold italic mb-8">
                My Project
            </h3>

            <div className="space-y-6">
                {myProjects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-[#F9FAFB] p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm">
                                <div className="bg-[#121E38] w-full h-full flex items-center justify-center text-white text-xs">
                                    IMG
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-[#1F1F1F] text-base lg:text-lg font-bold italic">
                                    {project.name}
                                </h4>
                                <p className="text-[#696969] text-sm font-medium">
                                    {project.invested} invested
                                </p>
                            </div>
                        </div>

                        {/* Progress and Badge */}
                        <div className="flex flex-col md:items-end gap-3 min-w-[200px]">
                            <span className="bg-[#038862] text-white text-[10px] font-bold px-4 py-1.5 uppercase rounded-sm self-start md:self-auto">
                                {project.status}
                            </span>
                            <div className="w-full space-y-2">
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#121E38] transition-all duration-1000"
                                        style={{ width: `${project.progress}%` }}
                                    />
                                </div>
                                <p className="text-[#696969] text-[10px] font-bold text-right">
                                    {project.progress}% Completed
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
