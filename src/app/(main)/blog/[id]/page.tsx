"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CalendarDays, Clock3, ArrowLeft, Sparkles } from "lucide-react";
import { useGetBlogDetailsQuery } from "@/redux/feature/userSlice";

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

function stripHtml(value?: string | null) {
    if (!value) {
        return "";
    }

    return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadTime(content?: string | null) {
    const text = stripHtml(content);

    if (!text) {
        return "1 min read";
    }

    const words = text.split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 180))} min read`;
}

function contentLooksLikeHtml(content?: string | null) {
    if (!content) {
        return false;
    }

    return /<\s*[a-z][\s\S]*>/i.test(content);
}

function renderPlainContent(content: string) {
    return content
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, index) => {
            const lines = paragraph.split("\n");

            return (
                <p key={`${index}-${paragraph.slice(0, 12)}`}>
                    {lines.map((line, lineIndex) => (
                        <span key={`${lineIndex}-${line.slice(0, 12)}`}>
                            {line}
                            {lineIndex < lines.length - 1 ? <br /> : null}
                        </span>
                    ))}
                </p>
            );
        });
}

export default function BlogDetailsPage() {
    const params = useParams<{ id?: string }>();
    const blogId = params?.id;
    const { data, isLoading, isError } = useGetBlogDetailsQuery(blogId as string, {
        skip: !blogId,
    });

    const blog = data?.data;
    const excerpt = stripHtml(blog?.content).slice(0, 220);
    const readTime = estimateReadTime(blog?.content);

    if (isLoading) {
        return (
            <main className="min-h-[60vh] bg-[radial-gradient(circle_at_top,rgba(184,29,29,0.12),transparent_35%),linear-gradient(180deg,#fff,#f7f4ef)]">
                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-4xl space-y-5 animate-pulse">
                        <div className="h-4 w-32 rounded-full bg-slate-200" />
                        <div className="h-12 w-11/12 rounded-2xl bg-slate-200" />
                        <div className="h-12 w-8/12 rounded-2xl bg-slate-200" />
                        <div className="h-96 rounded-[2rem] bg-slate-200" />
                    </div>
                </div>
            </main>
        );
    }

    if (isError || !blog) {
        return (
            <main className="min-h-[60vh] bg-[radial-gradient(circle_at_top,rgba(184,29,29,0.12),transparent_35%),linear-gradient(180deg,#fff,#f7f4ef)]">
                <div className="container mx-auto px-6 py-20">
                    <div className="max-w-2xl rounded-[2rem] border border-[#E8D9D2] bg-white/90 p-8 shadow-[0_24px_80px_rgba(25,22,20,0.08)] backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            Article unavailable
                        </p>
                        <h1 className="mt-4 text-3xl font-bold text-secondary">Blog post not found.</h1>
                        <p className="mt-3 text-accent leading-7">
                            The article you requested could not be loaded. Please return to the blog list and try again.
                        </p>

                        <Link
                            href="/"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back home
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[radial-gradient(circle_at_top,rgba(184,29,29,0.1),transparent_35%),linear-gradient(180deg,#fff,#f7f4ef)]">
            <div className="container mx-auto px-6 py-10 md:py-16 mt-12">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-[#E8D9D2] bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-secondary shadow-[0_12px_30px_rgba(25,22,20,0.05)] transition-colors hover:border-primary hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                </Link>

                <section className="mt-8  lg:items-start">
                    <div className="space-y-8">
                        <header className="overflow-hidden  border border-[#E8D9D2] bg-white/90 shadow-[0_24px_80px_rgba(25,22,20,0.08)] backdrop-blur">
                            {blog.featured_image ? (
                                <div className="relative aspect-video w-full bg-[#E8D9D2]">
                                    <Image
                                        src={blog.featured_image}
                                        alt={blog.title}
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/60 via-transparent to-transparent" />
                                    {/* <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#A51D1D] backdrop-blur">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            Featured Article
                                        </span>
                                    </div> */}
                                </div>
                            ) : null}

                            <div className="p-8 md:p-10">
                                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                                    {!blog.featured_image ? (
                                        <span className="inline-flex items-center gap-2 rounded-full bg-[#FBECEC] px-4 py-2 text-[#A51D1D]">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            Featured Article
                                        </span>
                                    ) : null}
                                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F7F1EF] px-4 py-2 text-secondary">
                                        <CalendarDays className="h-4 w-4" />
                                        {formatDate(blog.created_at)}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F7F1EF] px-4 py-2 text-secondary">
                                        <Clock3 className="h-4 w-4" />
                                        {readTime}
                                    </span>
                                </div>

                                <h1 className="mt-6 max-w-4xl italic text-4xl font-semibold leading-[1.05] tracking-tight text-secondary md:text-5xl lg:text-6xl">
                                    {blog.title}
                                </h1>

                                {excerpt ? (
                                    <p className="mt-5 max-w-3xl text-lg leading-8 text-accent md:text-xl">
                                        {excerpt}
                                    </p>
                                ) : null}
                            </div>
                        </header>

                        <article className=" border border-[#E8D9D2] bg-white/95 p-7 shadow-[0_24px_80px_rgba(25,22,20,0.08)] md:p-10">
                            <div className="mb-6 flex items-center gap-3 border-b border-[#EFE2DC] pb-5">

                            </div>

                            <style>{`
                                .blog-content {
                                    color: #364152;
                                    font-size: 17px;
                                    line-height: 1.95;
                                    inline-size: 100%;
                                    max-inline-size: none;
                                }

                                .blog-content > * {
                                    inline-size: 100%;
                                    max-inline-size: 100%;
                                }

                                .blog-content > * + * {
                                    margin-block-start: 1.25rem;
                                }

                                .blog-content h1,
                                .blog-content h2,
                                .blog-content h3 {
                                    color: #121E38;
                                    font-weight: 700;
                                    line-height: 1.25;
                                    margin-block-start: 2rem;
                                    margin-block-end: 0.75rem;
                                }

                                .blog-content h1 { font-size: 2.25rem; }
                                .blog-content h2 { font-size: 1.75rem; }
                                .blog-content h3 { font-size: 1.35rem; }

                                .blog-content p {
                                    margin: 0;
                                    max-inline-size: none;
                                    inline-size: 100%;
                                }

                                .blog-content ul,
                                .blog-content ol {
                                    margin: 0;
                                    padding-inline-start: 1.25rem;
                                }

                                .blog-content li + li {
                                    margin-block-start: 0.5rem;
                                }

                                .blog-content blockquote {
                                    border-inline-start: 4px solid #b91d1d;
                                    margin: 1.75rem 0;
                                    padding: 1rem 1.25rem;
                                    background: #fef7f7;
                                    border-radius: 0 1rem 1rem 0;
                                    color: #5e5e5e;
                                    font-style: italic;
                                }

                                .blog-content p:first-child {
                                    font-size: 1.05rem;
                                }

                                .blog-content a {
                                    color: #b91d1d;
                                    text-decoration: underline;
                                    text-underline-offset: 3px;
                                }

                                .blog-content img {
                                    max-inline-size: 100%;
                                    block-size: auto;
                                    border-radius: 1rem;
                                }
                            `}</style>

                            <div className="blog-content w-full">
                                {contentLooksLikeHtml(blog.content) ? (
                                    <div dangerouslySetInnerHTML={{ __html: blog.content ?? "" }} />
                                ) : (
                                    renderPlainContent(blog.content ?? "")
                                )}
                            </div>
                        </article>
                    </div>



                </section>
            </div>
        </main>
    );
}