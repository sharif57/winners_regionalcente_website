import { CheckCircle2, ClipboardList, LineChart } from "lucide-react";

export default function ProjectTimelineCard() {
    return (
        <article className="rounded-md bg-[#E8E9EC52] p-4 sm:p-6">
            <h2 className="mb-5 text-[42px] font-black italic text-[#222326] sm:text-[56px]">Project Timeline</h2>
            <div className="mb-4 hidden items-center justify-between lg:flex">
                <div className="h-2 w-2 rounded-full bg-[#243051]" />
                <div className="h-px flex-1 border-t border-dashed border-[#7A8292]" />
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#4A556F] text-white">
                    <ClipboardList size={28} />
                </div>
                <div className="h-px flex-1 border-t border-dashed border-[#7A8292]" />
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#4A556F] text-white">
                    <LineChart size={28} />
                </div>
                <div className="h-px flex-1 border-t border-dashed border-[#7A8292]" />
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#4A556F] text-white">
                    <CheckCircle2 size={28} />
                </div>
                <div className="h-px flex-1 border-t border-dashed border-[#7A8292]" />
                <div className="h-2 w-2 rounded-full bg-[#243051]" />
            </div>
            <div className="grid grid-cols-1 gap-3 text-center sm:grid-cols-3 sm:gap-2">
                <div>
                    <p className="text-[30px] font-bold text-[#232323]">Planning</p>
                    <p className="text-[18px] text-[#555]">Completed -Jan, 2020</p>
                </div>
                <div>
                    <p className="text-[30px] font-bold text-[#232323]">Construction</p>
                    <p className="text-[18px] text-[#555]">Ongoing -Jan, 2023</p>
                </div>
                <div>
                    <p className="text-[30px] font-bold text-[#232323]">Completion</p>
                    <p className="text-[18px] text-[#555]">Target Dec, 2028</p>
                </div>
            </div>
        </article>
    );
}
