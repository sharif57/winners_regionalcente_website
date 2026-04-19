// import AboutProjectCard from "@/components/dashboard/explore-project/AboutProjectCard";
// import DocumentsSection from "@/components/dashboard/explore-project/DocumentsSection";
// import FundingProgressCard from "@/components/dashboard/explore-project/FundingProgressCard";
// import JobCreationProgressCard from "@/components/dashboard/explore-project/JobCreationProgressCard";
// import ProjectTimelineCard from "@/components/dashboard/explore-project/ProjectTimelineCard";
// import TopStatsBar from "@/components/dashboard/explore-project/TopStatsBar";
// import { DocumentItem, TopStat } from "@/components/dashboard/explore-project/types";
// import ProjectHero from "@/components/visa/project/ProjectHero";

// const topStats: TopStat[] = [
//     { label: "TOTAL PROJECT VALUE", value: "$220M", sub: "" },
//     { label: "MIN. INVESTMENT", value: "$800K", sub: "" },
//     { label: "EXPECTED ROI", value: "5-7%", sub: "( PER ANNUAL )" },
//     { label: "CAPITAL RAISED", value: "$140M", sub: "( 65% FUNDED )" },
//     { label: "DURATION", value: "Jan 2026 - Dec 2028", sub: "" },
// ];

// const documents: DocumentItem[] = [
//     { name: "Bushiness Plan", type: "PDF . 12MB" },
//     { name: "Financial Report", type: "XLSX . 2.2MB" },
//     { name: "Legal Documents", type: "PDF .12MB" },
//     { name: "Agreement", type: "PDF .12MB" },
// ];

// export default function ExploreProject() {
//     return (
//         <div>
//             <ProjectHero />
//             <section className="w-full bg-white p-3 sm:p-4">
//                 <TopStatsBar stats={topStats} />

//                 <div className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-10 sm:mb-4 sm:gap-4">
//                     <AboutProjectCard />
//                     <JobCreationProgressCard />
//                 </div>

//                 <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2 sm:mb-4 sm:gap-4">
//                     <FundingProgressCard />
//                     <ProjectTimelineCard />
//                 </div>

//                 <DocumentsSection documents={documents} />
//             </section>
//         </div>
//     );
// }
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ProjectStatus = "Active" | "Pending" | "Completed";



const portfolioStats = [
    { label: "TOTAL INVESTED", value: "$800K" },
    { label: "ANNUAL YIELD", value: "8% ROI" },
    { label: "ACTIVE ASSETS", value: "3 PROJECTS" },
    { label: "ECONOMIC IMPACT", value: "1250+ JOBS" },
];



const projects = [
    {
        id: 1,
        image: "/image/project-1.png",
        status: "Active",
        statusColor: "bg-[#1E293B]",
        title: "WINNERS TOWER AT MILK-DALLAS, TEXAS",
        investment: "$800k",
        roi: "5.5%",
        description: "Premium residential complex in the heart of Austin teach corridor.",
        buttonLabel: "VIEW DETAILS",
        buttonVariant: "outline",
    },
    {
        id: 2,
        image: "/image/project-2.png",
        status: "Limited",
        statusColor: "bg-[#C51D1D]",
        title: "Houston Commercial Tower Project",
        investment: "$800k",
        roi: "5.5%",
        description: "Iconic business center targeting professionals service in Houston.",
        buttonLabel: "VIEW DETAILS",
        buttonVariant: "outline",
    },
    {
        id: 3,
        image: "/image/project-3.png",
        status: "Fully Funded",
        statusColor: "bg-[#94A3B8]",
        title: "Dallas Mixed-Use Development",
        investment: "$800k",
        roi: "5.5%",
        description: "Urban lifestyle development successfully funded by global investor.",
        buttonLabel: "CLOSED",
        buttonVariant: "ghost",
    },
];
export default function ExploreProjectPage() {
    const router = useRouter();

    return (
        <section>
            <div className="mb-5 bg-white px-4 py-4 sm:mb-7 sm:px-6 sm:py-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
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

            <section className="w-full bg-white p-4 ">

                <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 sm:mb-7 sm:gap-x-8">
                    <button
                        type="button"
                        className={`text-[16px] leading-none italic transition-colors sm:text-[24px] font-normal text-secondary hover:text-[#DE6D70]`}
                    >
                        All Projects
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-[#E8E9EC52] group transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Image with Badge */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className={cn(
                                    "absolute top-4 right-0 px-4 py-1.5 text-xs font-bold text-white tracking-wider",
                                    project.statusColor
                                )}>
                                    {project.status}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow space-y-2">
                                <h3 className="text-xl font-bold italic uppercase text-secondary max-w-xs leading-snug">
                                    {project.title}
                                </h3>

                                <div className="flex items-center gap-6 py-4">
                                    <div className="space-y-1">
                                        <p className="text-base font-normal uppercase tracking-widest text-[#696969]">INVESTMENT</p>
                                        <p className="text-xl font-bold text-secondary">{project.investment}</p>
                                    </div>
                                    {project.roi && (
                                        <>
                                            <div className="w-[2px] h-10 bg-[#000000]" />
                                            <div className="space-y-1">
                                                <p className="text-base font-normal uppercase tracking-widest text-[#696969]">EST.ROI</p>
                                                <p className="text-lg font-bold text-[#EA4335]">{project.roi}</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <p className="text-[#696969] text-base font-normal leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="pt-4">
                                    <Button
                                        onClick={() => router.push('/dashboard/explore-project/1')}
                                        variant={project.buttonVariant === "ghost" ? "secondary" : "outline"}
                                        className={cn(
                                            "w-full rounded-none py-6 font-bold tracking-widest text-base transition-all duration-300",
                                            project.buttonVariant === "ghost"
                                                ? "bg-[#94A3B8]/20 text-[#64748B] hover:bg-[#94A3B8]/30 cursor-not-allowed"
                                                : "border-[#9399A6] text-[#121E38] hover:bg-[#121E38] hover:text-white"
                                        )}
                                    >
                                        {project.buttonLabel}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
}
