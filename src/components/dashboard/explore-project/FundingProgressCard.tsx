export default function FundingProgressCard() {
    return (
        <article className="rounded-md bg-[#E8E9EC52] p-4 sm:p-6">
            <div className="mb-3 flex items-end justify-between">
                <h2 className="text-[42px] font-black italic text-[#222326] sm:text-[56px]">Funding Progress</h2>
                <p className="text-[52px] leading-none font-black italic text-[#FF5858] sm:text-[68px]">
                    65%
                    <span className="ml-2 text-[16px] font-medium not-italic text-[#2A2A2A] sm:text-[20px]">(OF 8.0M GOAL)</span>
                </p>
            </div>

            <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-[#C9C9CC]">
                <div className="h-full w-[65%] bg-[#4A556F]" />
            </div>
            <div className="flex items-center justify-between text-[18px] text-[#3F3F3F] sm:text-[30px]">
                <span>$5.2 M Raised</span>
                <span>120 Committed Investor</span>
            </div>
        </article>
    );
}
