import AboutProjectCard from "@/components/dashboard/explore-project/AboutProjectCard";
import DocumentsSection from "@/components/dashboard/explore-project/DocumentsSection";
import FundingProgressCard from "@/components/dashboard/explore-project/FundingProgressCard";
import JobCreationProgressCard from "@/components/dashboard/explore-project/JobCreationProgressCard";
import ProjectTimelineCard from "@/components/dashboard/explore-project/ProjectTimelineCard";
import TopStatsBar from "@/components/dashboard/explore-project/TopStatsBar";
import { DocumentItem, TopStat } from "@/components/dashboard/explore-project/types";
import ProjectHero from "@/components/visa/project/ProjectHero";

const topStats: TopStat[] = [
    { label: "TOTAL PROJECT VALUE", value: "$220M", sub: "" },
    { label: "MIN. INVESTMENT", value: "$800K", sub: "" },
    { label: "EXPECTED ROI", value: "5-7%", sub: "( PER ANNUAL )" },
    { label: "CAPITAL RAISED", value: "$140M", sub: "( 65% FUNDED )" },
    { label: "DURATION", value: "Jan 2026 - Dec 2028", sub: "" },
];

const documents: DocumentItem[] = [
    { name: "Bushiness Plan", type: "PDF . 12MB" },
    { name: "Financial Report", type: "XLSX . 2.2MB" },
    { name: "Legal Documents", type: "PDF .12MB" },
    { name: "Agreement", type: "PDF .12MB" },
];

export default function ExploreProject() {
    return (
        <div>
            <ProjectHero />
            <section className="w-full bg-white p-3 sm:p-4">
                <TopStatsBar stats={topStats} />

                <div className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-10 sm:mb-4 sm:gap-4">
                    <AboutProjectCard />
                    <JobCreationProgressCard />
                </div>

                <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2 sm:mb-4 sm:gap-4">
                    <FundingProgressCard />
                    <ProjectTimelineCard />
                </div>

                <DocumentsSection documents={documents} />
            </section>
        </div>
    );
}
