"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ReusableHeader from "@/hook/resuable-header";
import { cn } from "@/lib/utils";
import { useGetBlogListQuery } from "@/redux/feature/userSlice";

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

const ITEMS_PER_VIEW = 3;

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

export default function NewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useGetBlogListQuery(undefined) as { data?: BlogListResponse };
  const newsItems = data?.data ?? [];

  const totalItems = newsItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_VIEW));
  const activePage = Math.min(activeIndex, totalPages - 1);
  const visibleItems = newsItems.slice(
    activePage * ITEMS_PER_VIEW,
    activePage * ITEMS_PER_VIEW + ITEMS_PER_VIEW
  );

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? totalPages - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === totalPages - 1 ? 0 : current + 1));
  };

  return (
    <section className="py-8 bg-[#E8E9EC52]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          badge="NEWS & INSIGHTS"
          title="Stay Informed With Market Insights"
          description=""
          className="pb-12"
        />

        {/* News Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                {item.featured_image ? (
                  <Image
                    src={item.featured_image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100" />
                )}
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col grow space-y-4">
                {/* Metadata */}
                <div className="flex justify-between items-center text-base font-normal text-accent tracking-wide">
                  <span>{formatDate(item.created_at)}</span>
                  {/* <span>{item.content ? `${Math.max(1, Math.ceil(stripHtml(item.content).split(/\s+/).length / 180))} min read` : ""}</span> */}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold italic text-secondary leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-accent text-base font-normal grow">
                  {stripHtml(item.content).slice(0, 160)}...
                </p>

                {/* CTA Link */}
                <div className="pt-4">
                  <Link
                    href={`/blog/${item.id}`}
                    className="inline-flex items-center justify-between gap-2 text-base w-full font-bold tracking-widest text-secondary hover:text-primary transition-colors"
                  >
                    READ ARTICLE
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-16 text-[#1A1A1A]">
          <button
            type="button"
            onClick={goToPrevious}
            className="p-2 hover:text-primary transition-colors"
            aria-label="Previous news item"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to news page ${index + 1}`}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === activePage ? "bg-primary w-6" : "bg-[#D1D1D1]"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goToNext}
            className="p-2 hover:text-primary transition-colors"
            aria-label="Next news item"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
