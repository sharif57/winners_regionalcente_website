import React from "react";

export default function ExploreProjectSkeleton() {
    return (
        <div className="w-full animate-pulse">
            {/* Hero Skeleton */}
            <div className="w-full min-h-125 lg:min-h-175 bg-[#E2E8F0]" />
            
            <section className="w-full bg-white p-3 sm:p-4 mt-4">
                {/* Top Stats Bar Skeleton */}
                <div className="w-full h-24 bg-[#E2E8F0] rounded-md mb-4" />
                
                {/* About and Job Creation Skeleton */}
                <div className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-10 sm:mb-4 sm:gap-4">
                    <div className="xl:col-span-7 h-64 bg-[#E2E8F0] rounded-md" />
                    <div className="xl:col-span-3 h-64 bg-[#E2E8F0] rounded-md" />
                </div>

                {/* Funding and Timeline Skeleton */}
                <div className="mb-3 grid grid-cols-1 gap-3 lg:grid-cols-2 sm:mb-4 sm:gap-4">
                    <div className="h-80 bg-[#E2E8F0] rounded-md" />
                    <div className="h-80 bg-[#E2E8F0] rounded-md" />
                </div>

                {/* Bottom section */}
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 sm:gap-4">
                    <div className="h-40 bg-[#E2E8F0] rounded-md" />
                    <div className="h-40 bg-[#E2E8F0] rounded-md" />
                </div>
            </section>
        </div>
    );
}
