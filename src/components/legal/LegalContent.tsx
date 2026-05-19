// "use client";

// // ─── Install if not already: npm install react-quill
// // ─── This import brings in Quill's full Snow theme CSS automatically
// import "react-quill/dist/quill.snow.css";

// import { useGetSettingsQuery } from "@/redux/feature/settingSlice";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type LegalSection = "about" | "privacy" | "terms";

// const sectionMeta: Record<
//     LegalSection,
//     {
//         title: string;
//         field: "about_us" | "legal_privacy_policy" | "legal_terms_of_use_policy";
//         emptyMessage: string;
//     }
// > = {
//     about: {
//         title: "About Us",
//         field: "about_us",
//         emptyMessage: "About Us content is not available right now.",
//     },
//     privacy: {
//         title: "Privacy Policy",
//         field: "legal_privacy_policy",
//         emptyMessage: "Privacy policy content is not available right now.",
//     },
//     terms: {
//         title: "Terms of Use Policy",
//         field: "legal_terms_of_use_policy",
//         emptyMessage: "Terms of use content is not available right now.",
//     },
// };

// // ─── Skeleton ─────────────────────────────────────────────────────────────────

// function SkeletonLoader() {
//     return (
//         <div className="animate-pulse space-y-3">
//             <div className="h-4 w-full rounded-sm bg-[#EBEBEB]" />
//             <div className="h-4 w-11/12 rounded-sm bg-[#EBEBEB]" />
//             <div className="h-4 w-4/5 rounded-sm bg-[#EBEBEB]" />
//             <div className="h-4 w-full rounded-sm bg-[#EBEBEB]" />
//             <div className="h-4 w-3/4 rounded-sm bg-[#EBEBEB]" />
//             <div className="mt-6 h-4 w-full rounded-sm bg-[#EBEBEB]" />
//             <div className="h-4 w-10/12 rounded-sm bg-[#EBEBEB]" />
//             <div className="h-4 w-4/5 rounded-sm bg-[#EBEBEB]" />
//         </div>
//     );
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function LegalContent({ section }: { section: LegalSection }) {
//     const { data, isLoading, isError, refetch } = useGetSettingsQuery(undefined);

//     const meta = sectionMeta[section];
//     const rawContent: string = data?.data?.[meta.field] ?? "";
//     const hasContent = rawContent.trim().length > 0;

//     return (
//         <main className="min-h-screen bg-white">

//             {/*
//              * Override only the parts we need:
//              * — remove Quill's editor border/padding so it looks like a plain page
//              * — keep all typography (h1–h3, p, ul, ol, blockquote, a …) intact
//              */}
//             <style>{`
//                 .ql-editor-view {
//                     /* Reset Quill editor chrome */
//                     border: none !important;
//                     padding: 0 !important;
//                     font-family: inherit;
//                     font-size: 16px;
//                     line-height: 1.85;
//                     color: #364152;
//                     outline: none;
//                     white-space: normal;
//                 }

//                 /* ── Typography ── */
//                 .ql-editor-view h1 { font-size: 26px; font-weight: 700; color: #121E38; margin: 28px 0 10px; line-height: 1.3; }
//                 .ql-editor-view h2 { font-size: 21px; font-weight: 700; color: #121E38; margin: 22px 0 8px; line-height: 1.35; }
//                 .ql-editor-view h3 { font-size: 17px; font-weight: 600; color: #1E2D4A; margin: 18px 0 6px; line-height: 1.4; }
//                 .ql-editor-view p  { margin: 0 0 14px; }
//                 .ql-editor-view p:last-child { margin-bottom: 0; }

//                 /* ── Lists ── */
//                 .ql-editor-view ul { list-style: none; padding: 0; margin: 0 0 18px; }
//                 .ql-editor-view ul li { position: relative; padding-left: 20px; margin-bottom: 8px; }
//                 .ql-editor-view ul li::before {
//                     content: '';
//                     position: absolute; left: 0; top: 10px;
//                     width: 7px; height: 7px;
//                     border-radius: 50%;
//                     background: #b91d1d;
//                 }

//                 .ql-editor-view ol { list-style: none; counter-reset: ol-counter; padding: 0; margin: 0 0 18px; }
//                 .ql-editor-view ol li { position: relative; padding-left: 26px; margin-bottom: 8px; counter-increment: ol-counter; }
//                 .ql-editor-view ol li::before {
//                     content: counter(ol-counter) ".";
//                     position: absolute; left: 0; top: 0;
//                     font-weight: 700; color: #b91d1d; font-size: 15px;
//                 }

//                 /* ── Inline ── */
//                 .ql-editor-view strong, .ql-editor-view b { font-weight: 700; color: #121E38; }
//                 .ql-editor-view em, .ql-editor-view i   { font-style: italic; }
//                 .ql-editor-view u  { text-decoration: underline; text-underline-offset: 3px; }
//                 .ql-editor-view s  { text-decoration: line-through; color: #888; }

//                 /* ── Link ── */
//                 .ql-editor-view a { color: #b91d1d; text-decoration: underline; text-underline-offset: 3px; transition: opacity .15s; }
//                 .ql-editor-view a:hover { opacity: 0.7; }

//                 /* ── Blockquote ── */
//                 .ql-editor-view blockquote {
//                     border-left: 3px solid #b91d1d;
//                     margin: 18px 0; padding: 12px 18px;
//                     background: #FDF5F5;
//                     border-radius: 0 6px 6px 0;
//                     color: #5E5E5E; font-style: italic;
//                 }

//                 /* ── Quill alignment helpers ── */
//                 .ql-editor-view .ql-align-center  { text-align: center; }
//                 .ql-editor-view .ql-align-right   { text-align: right; }
//                 .ql-editor-view .ql-align-justify { text-align: justify; }

//                 /* ── Quill indent helpers ── */
//                 .ql-editor-view .ql-indent-1 { padding-left: 2em; }
//                 .ql-editor-view .ql-indent-2 { padding-left: 4em; }
//                 .ql-editor-view .ql-indent-3 { padding-left: 6em; }
//             `}</style>

//             <section className="container mx-auto w-full px-5 py-16 sm:px-8 lg:px-12">

//                 {/* ── Header ── */}
//                 <div className="mb-12 text-center">
//                     <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#b91d1d]">
//                         Winners Regional Center
//                     </p>
//                     <h1 className="font-['Playfair_Display'] text-3xl font-bold italic text-[#121E38] sm:text-4xl">
//                         {meta.title}
//                     </h1>
//                     <div className="mx-auto mt-5 flex items-center justify-center gap-3">
//                         <div className="h-px w-16 bg-[#E0E0E0]" />
//                         <div className="h-1.5 w-1.5 rounded-full bg-[#b91d1d]" />
//                         <div className="h-px w-16 bg-[#E0E0E0]" />
//                     </div>
//                 </div>

//                 {/* ── Body ── */}
//                 <div className="mx-auto max-w-3xl">
//                     {isLoading ? (
//                         <SkeletonLoader />
//                     ) : isError ? (
//                         <div className="rounded-md border border-red-200 bg-red-50 px-5 py-4">
//                             <p className="text-sm text-red-600">
//                                 Failed to load {meta.title}. Please try again.
//                             </p>
//                             <button
//                                 type="button"
//                                 onClick={refetch}
//                                 className="mt-2 text-sm font-medium text-[#b91d1d] underline hover:no-underline"
//                             >
//                                 Retry
//                             </button>
//                         </div>
//                     ) : hasContent ? (
//                         /*
//                          * KEY TRICK:
//                          * "ql-editor" is Quill's own CSS class — importing
//                          * react-quill/dist/quill.snow.css applies all Snow theme
//                          * typography rules automatically.
//                          * "ql-editor-view" removes the editor border/padding
//                          * so it looks like a normal readable page.
//                          */
//                         <div
//                             className="ql-editor ql-editor-view"
//                             dangerouslySetInnerHTML={{ __html: rawContent }}
//                         />
//                     ) : (
//                         <p className="text-center text-base leading-7 text-[#5E5E5E]">
//                             {meta.emptyMessage}
//                         </p>
//                     )}
//                 </div>
//             </section>
//         </main>
//     );
// }

"use client";

// ─── Install if not already: npm install react-quill
// ─── This import brings in Quill's full Snow theme CSS automatically
import "react-quill/dist/quill.snow.css";

import { useGetSettingsQuery } from "@/redux/feature/settingSlice";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonLoader() {
    return (
        <div className="animate-pulse space-y-3">
            <div className="h-4 w-full rounded-sm bg-[#EBEBEB]" />
            <div className="h-4 w-11/12 rounded-sm bg-[#EBEBEB]" />
            <div className="h-4 w-4/5 rounded-sm bg-[#EBEBEB]" />
            <div className="h-4 w-full rounded-sm bg-[#EBEBEB]" />
            <div className="h-4 w-3/4 rounded-sm bg-[#EBEBEB]" />
            <div className="mt-6 h-4 w-full rounded-sm bg-[#EBEBEB]" />
            <div className="h-4 w-10/12 rounded-sm bg-[#EBEBEB]" />
            <div className="h-4 w-4/5 rounded-sm bg-[#EBEBEB]" />
        </div>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LegalContent({ section }: { section: LegalSection }) {
    const { data, isLoading, isError, refetch } = useGetSettingsQuery(undefined);

    const meta = sectionMeta[section];
    const rawContent: string = data?.data?.[meta.field] ?? "";
    const hasContent = rawContent.trim().length > 0;

    return (
        <main className="min-h-screen bg-white">

            {/*
             * Override only the parts we need:
             * — remove Quill's editor border/padding so it looks like a plain page
             * — keep all typography (h1–h3, p, ul, ol, blockquote, a …) intact
             */}
            <style>{`
                .ql-editor-view {
                    /* Reset Quill editor chrome */
                    border: none !important;
                    padding: 0 !important;
                    font-family: inherit;
                    font-size: 16px;
                    line-height: 1.85;
                    color: #364152;
                    outline: none;
                    white-space: normal;
                }

                /* ── Typography ── */
                .ql-editor-view h1 { font-size: 26px; font-weight: 700; color: #121E38; margin: 28px 0 10px; line-height: 1.3; }
                .ql-editor-view h2 { font-size: 21px; font-weight: 700; color: #121E38; margin: 22px 0 8px; line-height: 1.35; }
                .ql-editor-view h3 { font-size: 17px; font-weight: 600; color: #1E2D4A; margin: 18px 0 6px; line-height: 1.4; }
                .ql-editor-view p  { margin: 0 0 14px; }
                .ql-editor-view p:last-child { margin-bottom: 0; }

                /* ── Lists ── */
                .ql-editor-view ul { list-style: none; padding: 0; margin: 0 0 18px; }
                .ql-editor-view ul li { position: relative; padding-left: 20px; margin-bottom: 8px; }
                .ql-editor-view ul li::before {
                    content: '';
                    position: absolute; left: 0; top: 10px;
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: #b91d1d;
                }

                .ql-editor-view ol { list-style: none; counter-reset: ol-counter; padding: 0; margin: 0 0 18px; }
                .ql-editor-view ol li { position: relative; padding-left: 26px; margin-bottom: 8px; counter-increment: ol-counter; }
                .ql-editor-view ol li::before {
                    content: counter(ol-counter) ".";
                    position: absolute; left: 0; top: 0;
                    font-weight: 700; color: #b91d1d; font-size: 15px;
                }

                /* ── Inline ── */
                .ql-editor-view strong, .ql-editor-view b { font-weight: 700; color: #121E38; }
                .ql-editor-view em, .ql-editor-view i   { font-style: italic; }
                .ql-editor-view u  { text-decoration: underline; text-underline-offset: 3px; }
                .ql-editor-view s  { text-decoration: line-through; color: #888; }

                /* ── Link ── */
                .ql-editor-view a { color: #b91d1d; text-decoration: underline; text-underline-offset: 3px; transition: opacity .15s; }
                .ql-editor-view a:hover { opacity: 0.7; }

                /* ── Blockquote ── */
                .ql-editor-view blockquote {
                    border-left: 3px solid #b91d1d;
                    margin: 18px 0; padding: 12px 18px;
                    background: #FDF5F5;
                    border-radius: 0 6px 6px 0;
                    color: #5E5E5E; font-style: italic;
                }

                /* ── Quill alignment helpers ── */
                .ql-editor-view .ql-align-center  { text-align: center; }
                .ql-editor-view .ql-align-right   { text-align: right; }
                .ql-editor-view .ql-align-justify { text-align: justify; }

                /* ── Quill indent helpers ── */
                .ql-editor-view .ql-indent-1 { padding-left: 2em; }
                .ql-editor-view .ql-indent-2 { padding-left: 4em; }
                .ql-editor-view .ql-indent-3 { padding-left: 6em; }
            `}</style>

            <section className="container mx-auto w-full px-5 py-16 sm:px-8 lg:px-12">

                {/* ── Header ── */}
                <div className="mb-12 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#b91d1d]">
                        Winners Regional Center
                    </p>
                    <h1 className="font-['Playfair_Display'] text-3xl font-bold italic text-[#121E38] sm:text-4xl">
                        {meta?.title}
                    </h1>
                    <div className="mx-auto mt-5 flex items-center justify-center gap-3">
                        <div className="h-px w-16 bg-[#E0E0E0]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-[#b91d1d]" />
                        <div className="h-px w-16 bg-[#E0E0E0]" />
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="mx-auto max-w-3xl">
                    {isLoading ? (
                        <SkeletonLoader />
                    ) : isError ? (
                        <div className="rounded-md border border-red-200 bg-red-50 px-5 py-4">
                            <p className="text-sm text-red-600">
                                Failed to load {meta.title}. Please try again.
                            </p>
                            <button
                                type="button"
                                onClick={refetch}
                                className="mt-2 text-sm font-medium text-[#b91d1d] underline hover:no-underline"
                            >
                                Retry
                            </button>
                        </div>
                    ) : hasContent ? (
                        
                        <div
                            className="ql-editor ql-editor-view"
                            dangerouslySetInnerHTML={{ __html: rawContent }}
                        />
                    ) : (
                        <p className="text-center text-base leading-7 text-[#5E5E5E]">
                            {meta.emptyMessage}
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}