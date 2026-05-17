"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
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

export default function BlogDetailsPage() {
    const params = useParams<{ id?: string }>();
    const blogId = params?.id;
    const { data, isLoading, isError } = useGetBlogDetailsQuery(blogId as string, {
        skip: !blogId,
    });

    const blog = data?.data;

    if (isLoading) {
        return (
            <main className="container mx-auto px-6 py-16">
                <p className="text-secondary text-lg">Loading blog post...</p>
            </main>
        );
    }

    if (isError || !blog) {
        return (
            <main className="container mx-auto px-6 py-16">
                <p className="text-secondary text-lg">Blog post not found.</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-6 py-16 space-y-10">
            <header className="space-y-4 max-w-4xl">
                <p className="text-accent uppercase tracking-[0.3em] text-sm">
                    {formatDate(blog.created_at)}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
                    {blog.title}
                </h1>
            </header>

            {blog.featured_image ? (
                <div className="relative w-full h-105 overflow-hidden rounded-3xl">
                    <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            ) : null}

            <article
                className="max-w-4xl space-y-6 text-accent leading-8"
                dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
            />
        </main>
    );
}