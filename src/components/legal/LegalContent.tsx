"use client";

import { useGetSettingsQuery } from "@/redux/feature/settingSlice";

type LegalSection = "about" | "privacy" | "terms";

const sectionMeta: Record<
    LegalSection,
    {
        title: string;
        field: "about_us" | "legal_privacy_policy" | "legal_terms_of_use_policy";
        emptyMessage: string;
    }
> = {
    about: {
        title: "About Us",
        field: "about_us",
        emptyMessage: "About Us content is not available right now.",
    },
    privacy: {
        title: "Privacy Policy",
        field: "legal_privacy_policy",
        emptyMessage: "Privacy policy content is not available right now.",
    },
    terms: {
        title: "Terms of Use",
        field: "legal_terms_of_use_policy",
        emptyMessage: "Terms of use content is not available right now.",
    },
};

function formatContent(content: string) {
    return content.replace(/\r\n/g, "<br />");
}

export default function LegalContent({ section }: { section: LegalSection }) {
    const { data, isLoading, isError } = useGetSettingsQuery(undefined);
    const meta = sectionMeta[section];
    const rawContent = data?.data?.[meta.field] ?? "";
    const hasContent = rawContent.trim().length > 0;

    return (
        <main className="min-h-screen bg-white">
            <section className="mx-auto w-full container px-5 py-16 sm:px-8 lg:px-12">
                <div className="mb-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#b91d1d]">
                        Winners Regional Center
                    </p>
                    <h1 className="font-['Playfair_Display'] text-3xl font-bold text-center italic text-[#121E38] sm:text-4xl">
                        {meta.title}
                    </h1>
                </div>

                <div className="  ">
                    {isLoading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 w-full rounded bg-[#D8D8D8]" />
                            <div className="h-4 w-full rounded bg-[#D8D8D8]" />
                            <div className="h-4 w-4/5 rounded bg-[#D8D8D8]" />
                            <div className="h-4 w-11/12 rounded bg-[#D8D8D8]" />
                        </div>
                    ) : isError ? (
                        <p className="text-base leading-7 text-red-600">
                            Failed to load settings.
                        </p>
                    ) : hasContent ? (
                        <div
                            className="prose max-w-none text-center text-[16px] leading-7 text-[#364152] prose-p:my-0 prose-a:text-[#b91d1d]"
                            dangerouslySetInnerHTML={{
                                __html: formatContent(rawContent),
                            }}
                        />
                    ) : (
                        <p className="text-base leading-7 text-[#5E5E5E]">
                            {meta.emptyMessage}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}