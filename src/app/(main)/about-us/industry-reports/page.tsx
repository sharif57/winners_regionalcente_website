'use client';

import { useGetBlogListQuery } from "@/redux/feature/userSlice";
import ReusableHeader from "@/hook/resuable-header";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BlogItem = {
    id: number;
    title: string;
    featured_image?: string | null;
    content?: string | null;
    created_at?: string | null;
};

type BlogListResponse = {
    data?: BlogItem[];
};

const SkeletonCard = () => (
    <div className="bg-white border border-slate-100 overflow-hidden flex flex-col h-full animate-pulse shadow-sm">
        <div className="relative h-64 bg-slate-200" />
        <div className="p-8 flex flex-col grow space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="space-y-2">
                <div className="h-6 bg-slate-200 rounded w-full" />
                <div className="h-6 bg-slate-200 rounded w-2/3" />
            </div>
            <div className="space-y-2 grow pt-2">
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
            </div>
            <div className="h-5 bg-slate-200 rounded w-1/2 pt-4" />
        </div>
    </div>
);

export default function IndustryReports() {
    const { data, isLoading, isError } = useGetBlogListQuery({ category: 'industry_updates' }) as {
        data?: BlogListResponse;
        isLoading: boolean;
        isError: boolean;
    };

    const industryReports = data?.data ?? [];

    function stripHtml(html?: string | null) {
        if (!html) {
            return "";
        }
        return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    }

    function formatDate(value?: string | null) {
        if (!value) {
            return "";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(date);
    }

    return (
        <main className="min-h-screen bg-slate-50/50 pt-28 pb-20 md:pt-32 lg:pt-36">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">


                {/* Section Header */}
                <ReusableHeader
                    // badge=""
                    title="Industry Updates & Reports"
                    description="Stay informed with our latest research, market analyses, and regulatory updates regarding EB-5 investments and wealth management."
                    className="!pb-12 !pt-2 text-center"
                />

                {/* Content States */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <SkeletonCard key={`skeleton-${index}`} />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-16 bg-white border border-slate-100 shadow-sm p-8 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-primary mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-secondary mb-2">Failed to Load Reports</h3>
                        <p className="text-[#696969] text-base mb-6">There was an error retrieving the industry reports. Please try reloading the page.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 transition-colors uppercase text-sm tracking-wider cursor-pointer"
                        >
                            Reload Page
                        </button>
                    </div>
                ) : industryReports.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-slate-100 shadow-sm p-8 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-[#696969] mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-secondary mb-2">No Reports Available</h3>
                        <p className="text-[#696969] text-base mb-6">We are currently updating our database. Please check back soon for our latest reports.</p>
                        <Link href="/">
                            <button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 transition-colors uppercase text-sm tracking-wider cursor-pointer">
                                Go to Home
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industryReports.map((item) => (
                            <article
                                key={item.id}
                                className="group bg-white border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col h-full"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                    {item.featured_image ? (
                                        <Image
                                            src={item.featured_image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100" />
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="p-8 flex flex-col grow space-y-4">
                                    {/* Metadata */}
                                    <div className="flex justify-between items-center text-sm font-semibold text-primary tracking-wide">
                                        <span>{formatDate(item.created_at)}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold italic text-secondary leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-accent text-base font-normal grow line-clamp-3 leading-relaxed">
                                        {stripHtml(item.content)}
                                    </p>

                                    {/* CTA Link */}
                                    <div className="pt-4 border-t border-slate-100">
                                        <Link
                                            href={`/blog/${item.id}`}
                                            className="inline-flex items-center justify-between gap-2 text-sm w-full font-bold tracking-widest text-secondary hover:text-primary transition-colors"
                                        >
                                            <span>READ ARTICLE</span>
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

