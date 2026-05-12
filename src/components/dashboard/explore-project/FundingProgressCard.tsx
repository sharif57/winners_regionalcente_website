type FundingProgressCardProps = {
    projectValue?: string;
    minimumInvestment?: string;
    roi?: string;
    progress?: number;
};

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

export default function FundingProgressCard({
    projectValue = "$8.0M",
    minimumInvestment = "$5.2M",
    roi = "120",
    progress,
}: FundingProgressCardProps) {
    const derivedProgress = typeof progress === "number"
        ? progress
        : Math.max(0, Math.min(100, Math.round((Number(minimumInvestment) / Number(projectValue)) * 100) || 0));

    return (
        <article className="rounded-md bg-[#E8E9EC52] p-4 sm:p-6">
            <div className="mb-3 flex items-end justify-between">
                <h2 className="text-2xl font-semibold italic text-secondary sm:text-[36px]">Funding Progress</h2>
                <p className="text-2xl leading-none font-semibold italic text-[#F65353] sm:text-4xl">
                    {derivedProgress}%
                    <span className="ml-2 text-[16px] font-normal not-italic text-[#2A2A2A] sm:text-base">(OF {formatCurrency(projectValue)} GOAL)</span>
                </p>
            </div>

            <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-[#C9C9CC]">
                <div
                    className="h-full w-[var(--progress-width)] bg-[#4A556F]"
                    style={{ "--progress-width": `${derivedProgress}%` } as React.CSSProperties}
                />
            </div>
            <div className="flex items-center justify-between font-medium text-base text-[#4C4C4C] sm:text-xl">
                <span>{formatCurrency(minimumInvestment)} Min. Investment</span>
                <span>{roi}</span>
            </div>
        </article>
    );
}
