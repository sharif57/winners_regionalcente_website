'use client';
import AboutProjectCard from "@/components/dashboard/explore-project/AboutProjectCard";
import DocumentsSection from "@/components/dashboard/explore-project/DocumentsSection";
import FundingProgressCard from "@/components/dashboard/explore-project/FundingProgressCard";
import JobCreationProgressCard from "@/components/dashboard/explore-project/JobCreationProgressCard";
import ProjectTimelineCard from "@/components/dashboard/explore-project/ProjectTimelineCard";
import TopStatsBar from "@/components/dashboard/explore-project/TopStatsBar";
import { DocumentItem, TopStat } from "@/components/dashboard/explore-project/types";
import ProjectHero from "@/components/visa/project/ProjectHero";
import { useProjectDetailsQuery } from "@/redux/feature/projectSlice";
import { useParams } from "next/navigation";

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

const formatDate = (value?: string) => {
    if (!value) {
        return "TBD";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(date);
};

const formatStatus = (value?: string) => {
    if (!value) {
        return "Active";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
};

export default function ExploreProjectDetails() {
    // http://localhost:3000/explore-project/6
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const projectId = Number(id);
    console.log(projectId, '------------------')

    const { data } = useProjectDetailsQuery(projectId, {
        skip: Number.isNaN(projectId),
    });

    const project = data?.data;

    const topStats: TopStat[] = [
        { label: "TOTAL PROJECT VALUE", value: formatCurrency(project?.total_project_value) },
        { label: "MIN. INVESTMENT", value: formatCurrency(project?.minimum_investment) },
        { label: "EXPECTED ROI", value: project?.roi ?? "TBD", sub: "( PER ANNUAL )" },
        { label: "CAPITAL RAISED", value: formatCurrency(project?.minimum_investment), sub: "( 65% FUNDED )" },
        { label: "DURATION", value: `${formatDate(project?.project_start_date)} - ${formatDate(project?.project_end_date)}`, sub: "" },
    ];

    const documents: DocumentItem[] = [
        { name: "Business Plan", type: "PDF", href: project?.business_plan },
        { name: "Financial Report", type: "PDF", href: project?.financial_report },
        { name: "Legal Document", type: "PDF", href: project?.legal_document },
        { name: "Agreement", type: "PDF", href: project?.agreement },
    ];

    const heroTitle = project ? `${project.name} - ${project.city}, ${project.state}` : undefined;
    const heroLocation = project?.location;
    const aboutTitle = project ? `${project.name} - ${project.city}, ${project.state}` : undefined;
    const aboutSummary = project?.short_description;
    const aboutDetails = project
        ? `Located in ${project.location} across ${project.city}, ${project.state}, this project targets a total project value of ${formatCurrency(project.total_project_value)} with a minimum investment of ${formatCurrency(project.minimum_investment)}. The project runs from ${formatDate(project.project_start_date)} to ${formatDate(project.project_end_date)} and is currently ${formatStatus(project.status)}.`
        : undefined;

    return (
        <div>
            <ProjectHero
                title={heroTitle}
                banner={project?.banner}
                location={heroLocation}
                status={formatStatus(project?.status)}
                eb5Enabled={Boolean(project?.is_eb_5_enabled)}
            />
            <section className="w-full bg-white p-3 sm:p-4">
                <TopStatsBar stats={topStats} />

                <div className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-10 sm:mb-4 sm:gap-4">
                    <AboutProjectCard
                        title={aboutTitle}
                        status={formatStatus(project?.status)}
                        summary={aboutSummary}
                        details={aboutDetails}
                    />
                    <JobCreationProgressCard
                        jobImpact={project?.job_impact ? `${project.job_impact}${project.job_impact.endsWith("+") ? "" : "+"}` : undefined}
                        description={project?.is_eb_5_enabled
                            ? "Verified economic impacts jobs projected through USCIS compliant methodologies."
                            : "Projected jobs supported through the current development plan and operational phases."
                        }
                    />
                </div>

                <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2 sm:mb-4 sm:gap-4">
                    <FundingProgressCard
                        projectValue={project?.total_project_value}
                        minimumInvestment={project?.minimum_investment}
                        roi={project?.roi}
                    />
                    <ProjectTimelineCard
                        startDate={project?.project_start_date}
                        endDate={project?.project_end_date}
                        status={formatStatus(project?.status)}
                    />
                </div>

                <DocumentsSection documents={documents} />
            </section>
        </div>
    );
}
