
"use client";

import ReusableHeader from '@/hook/resuable-header'
import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
    SearchCode, Building2, ShieldCheck, FileSignature,
    LibraryBig, Wallet, UserPlus, ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
}

const steps: OnboardingStep[] = [
    { id: "01", title: "Lead Generation & Qualification", description: "Initial screening and suitability assessment to ensure alignment with institutional mandates.", icon: SearchCode },
    { id: "02", title: "Digital Intake", description: "Secure digital questionnaire for KYC/AML collecting essential ID and tax documentation.", icon: Building2 },
    { id: "03", title: "Risk Assessment", description: "Global AML, KYC, and sanctions checks utilizing advanced biometric verification.", icon: ShieldCheck },
    { id: "04", title: "Legal Review", description: "Subscription Agreement and LPA execution via secure e-signature protocols.", icon: FileSignature },
    { id: "05", title: "Account Setup", description: "Final compliance sign-off and internal account creation in relevant systems.", icon: LibraryBig },
    { id: "06", title: "Capital Funding", description: "Managed escrow wire transfer and secure fund verification process.", icon: Wallet },
    { id: "07", title: "Final Admission", description: "Successful onboarding completion and entry to the investor portal.", icon: UserPlus },
];

const CARD_WIDTH = 296; // card width (280px) + gap (16px)

export default function Onboarding() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const startXRef = useRef(0);
    const startScrollRef = useRef(0);

    const updateScrollState = useCallback(() => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 2);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
        const index = Math.round(scrollLeft / CARD_WIDTH);
        setActiveIndex(Math.min(index, steps.length - 1));
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        updateScrollState();
        el.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [updateScrollState]);

    const scrollTo = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === 'left' ? -CARD_WIDTH : CARD_WIDTH,
            behavior: 'smooth',
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        startXRef.current = e.pageX;
        startScrollRef.current = scrollRef.current.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        scrollRef.current.scrollLeft = startScrollRef.current - (e.pageX - startXRef.current) * 1.5;
    };

    const stopDrag = () => setIsDragging(false);

    // Dot groups: 3 dots covering all 7 steps
    const dotActive = (i: number) => {
        if (i === 0) return activeIndex <= 2;
        if (i === 1) return activeIndex >= 3 && activeIndex <= 4;
        return activeIndex >= 5;
    };

    return (
        <section className="bg-white py-8">
            <ReusableHeader
                badge=""
                title="International Investor Onboarding Process"
                description="Our streamlined 7-step architecture ensures rigorous compliance while maintaining institutional velocity."
                className="pb-10"
            />

            <div className="container mx-auto px-4">
                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollTo('left')}
                        disabled={!canScrollLeft}
                        aria-label="Scroll left"
                        className={cn(
                            "absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4",
                            "w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm",
                            "flex items-center justify-center transition-all",
                            "hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                        )}
                    >
                        <ChevronLeft className="w-5 h-5 text-[#1F1F1F]" />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollTo('right')}
                        disabled={!canScrollRight}
                        aria-label="Scroll right"
                        className={cn(
                            "absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4",
                            "w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm",
                            "flex items-center justify-center transition-all",
                            "hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                        )}
                    >
                        <ChevronRight className="w-5 h-5 text-[#1F1F1F]" />
                    </button>

                    {/* Scrollable Track */}
                    <div
                        ref={scrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={stopDrag}
                        onMouseUp={stopDrag}
                        onMouseMove={handleMouseMove}
                        className={cn(
                            "flex gap-4 overflow-x-auto pb-4 px-1",
                            "snap-x snap-mandatory scroll-smooth",
                            isDragging ? "cursor-grabbing" : "cursor-grab"
                        )}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className="flex-shrink-0 w-[280px] bg-[#F9F9F9] p-6 snap-start transition-all hover:bg-gray-100 group select-none"
                            >
                                <div className="mb-5 flex items-center justify-start">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <step.icon className="w-5 h-5 text-[#1F1F1F]" />
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-[#1F1F1F] mb-3 block tracking-wide">
                                    {step.id}
                                </span>
                                <h3 className="text-lg font-medium italic text-secondary mb-3 leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-[#4C4C4C] font-normal text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Dots */}
                <div className="flex justify-center items-center gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1 w-10 rounded-full transition-all duration-300",
                                dotActive(i) ? "bg-[#F65353]" : "bg-[#D9D9D9]"
                            )}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                div::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
}