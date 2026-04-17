import { Download } from "lucide-react";
import { DocumentItem } from "./types";

type DocumentsSectionProps = {
    documents: DocumentItem[];
};

export default function DocumentsSection({ documents }: DocumentsSectionProps) {
    return (
        <article className="rounded-md bg-[#E8E9EC52] p-4 sm:p-6">
            <h2 className="mb-4 text-[42px] font-black italic text-[#222326] sm:text-[56px]">Documents</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 sm:gap-4">
                {documents.map((item) => (
                    <div key={item.name} className="rounded-md bg-[#EBEBEC] p-4">
                        <p className="mb-2 text-[33px] font-medium text-[#262626]">{item.name}</p>
                        <p className="mb-3 text-[24px] text-[#666666]">{item.type}</p>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="flex-1 border border-[#C8C8CA] bg-[#F1F1F2] px-3 py-2 text-[23px] font-bold text-[#22304B]"
                            >
                                VIEW
                            </button>
                            <button
                                type="button"
                                aria-label={`Download ${item.name}`}
                                className="grid h-[49px] w-[76px] place-items-center bg-[#C91E1E] text-white"
                            >
                                <Download size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}
