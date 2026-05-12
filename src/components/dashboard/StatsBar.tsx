"use client";

import { useGetUserDashboardQuery } from "@/redux/feature/evaluationSlice";




export default function StatsBar() {

    const { data: dashboardData } = useGetUserDashboardQuery(undefined);

    console.log(dashboardData?.data, '=============')
    // {total_investment_amount: 0, active_projects: 0, total_projects: 0}
    const portfolioStats = [
        { label: "TOTAL INVESTED", value: `$${dashboardData?.data.total_investment_amount || 0}` },
        // { label: "ANNUAL YIELD", value: "8% ROI" },
        { label: "ACTIVE ASSETS", value: `${dashboardData?.data.active_projects || 0} PROJECTS` },
        { label: "ECONOMIC IMPACT", value: `${dashboardData?.data.total_projects || 0}+ JOBS` },
    ];
    return (
        <div className="mb-5 bg-white px-4 py-4 sm:mb-7 sm:px-6 sm:py-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-0">
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
            </div>
        </div>
    );
}
