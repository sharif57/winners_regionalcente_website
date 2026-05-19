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

function cleanHtml(html: string) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const allowed = new Set([
            "P",
            "BR",
            "H1",
            "H2",
            "H3",
            "H4",
            "UL",
            "OL",
            "LI",
            "A",
            "STRONG",
            "B",
            "EM",
            "I",
        ]);

        function sanitizeNode(node: ChildNode): Node | null {
            if (node.nodeType === Node.TEXT_NODE) {
                return document.createTextNode(node.textContent || "");
            }
            if (node.nodeType !== Node.ELEMENT_NODE) return null;

            const el = node as Element;
            const tag = el.tagName.toUpperCase();

            if (!allowed.has(tag)) {
                // preserve children but skip this node
                const frag = document.createDocumentFragment();
                node.childNodes.forEach((child) => {
                    const sn = sanitizeNode(child);
                    if (sn) frag.appendChild(sn);
                });
                return frag;
            }

            const newEl = document.createElement(tag.toLowerCase());

            if (tag === "A") {
                const href = el.getAttribute("href");
                if (href) {
                    newEl.setAttribute("href", href);
                    newEl.setAttribute("target", "_blank");
                    newEl.setAttribute("rel", "noopener noreferrer");
                }
            }

            node.childNodes.forEach((child) => {
                const sn = sanitizeNode(child);
                if (sn) newEl.appendChild(sn);
            });

            return newEl;
        }

        const wrapper = document.createElement("div");
        doc.body.childNodes.forEach((child) => {
            const cleaned = sanitizeNode(child);
            if (cleaned) wrapper.appendChild(cleaned);
        });

        // remove empty paragraphs
        wrapper.querySelectorAll("p").forEach((p) => {
            if (!p.textContent || p.textContent.trim().length === 0) p.remove();
        });

        return wrapper.innerHTML || "";
    } catch (err) {
        return html.replace(/\r\n|\n/g, "<br />");
    }
}

function formatContent(content: string) {
    const trimmed = content.trim();
    // If content appears to be HTML, clean it, otherwise convert line breaks
    if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
        return cleanHtml(content);
    }
    return content.replace(/\r\n|\n/g, "<br />");
}

export default function LegalContent({ section }: { section: LegalSection }) {
    const { data, isLoading, isError } = useGetSettingsQuery(undefined);
    const meta = sectionMeta[section];
    const rawContent = data?.data?.[meta.field] ?? "";
    const hasContent = rawContent.trim().length > 0;
    const lastUpdatedMatch = rawContent.match(/Last Updated:\s*([^<\n]+)/i);
    const lastUpdated = lastUpdatedMatch?.[1]?.trim();

    const cleanedHtml = hasContent ? formatContent(rawContent) : "";

    return (
        <main className="min-h-screen bg-white">
            <section className="mx-auto w-full container px-5 py-16 sm:px-8 lg:px-12">
                <div className="max-w-3xl mx-auto">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#b91d1d]">
                        Winners Regional Center
                    </p>
                    <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-center italic text-[#121E38] mb-2">
                        {meta.title}
                    </h1>
                    {lastUpdated && (
                        <p className="text-center text-sm text-gray-500 mb-6">Last Updated: <span className="font-medium text-gray-700">{lastUpdated}</span></p>
                    )}

                    <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-8">
                        {isLoading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 w-full rounded bg-[#D8D8D8]" />
                                <div className="h-4 w-full rounded bg-[#D8D8D8]" />
                                <div className="h-4 w-4/5 rounded bg-[#D8D8D8]" />
                                <div className="h-4 w-11/12 rounded bg-[#D8D8D8]" />
                            </div>
                        ) : isError ? (
                            <p className="text-base leading-7 text-red-600">Failed to load settings.</p>
                        ) : hasContent ? (
                            <div
                                className="prose prose-lg max-w-none text-[16px] leading-8 text-[#364152] prose-p:my-0 prose-a:text-[#b91d1d] prose-ul:list-disc prose-ol:list-decimal"
                                dangerouslySetInnerHTML={{ __html: cleanedHtml }}
                            />
                        ) : (
                            <p className="text-base leading-7 text-[#5E5E5E]">{meta.emptyMessage}</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
