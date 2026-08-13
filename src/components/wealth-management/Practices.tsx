"use client";

import React, { useState } from "react";
import ReusableHeader from "@/hook/resuable-header";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  FileCheck,
  Activity,
  Zap,
  Scale,
  TrendingUp,
  CheckCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

interface PracticeDetail {
  id: string;
  title: string;
  shortDesc: string;
  whatItMeans: string;
  howItDrivesWealth: string;
  colSpan: string;
  iconPosition?: "top" | "right";
  iconSvg: React.ReactNode;
  lucideIcon: React.ElementType;
  badge: string;
  accentColor: string;
}

const practices: PracticeDetail[] = [
  {
    id: "portal",
    title: "Secure Digital Portals",
    shortDesc: "Military-grade encryption for all investor data and document exchanges.",
    whatItMeans:
      "We utilize the highest standard of cryptographic security—the same level used by top-tier financial institutions and defense organizations—to protect your sensitive financial data, identity, and strategic investment documents from cyber threats.",
    howItDrivesWealth:
      "Wealth preservation is the foundation of wealth generation. A single data breach can result in identity theft, unauthorized asset liquidation, or exposure of private investment strategies. By creating an impenetrable digital fortress around your assets, we eliminate catastrophic cyber risks. This gives you the peace of mind necessary to confidently allocate larger capital reserves into high-yield opportunities without fear of exposure.",
    colSpan: "md:col-span-2",
    iconPosition: "top",
    lucideIcon: ShieldCheck,
    badge: "256-Bit Cryptographic Security",
    accentColor: "border-red-500 bg-red-50/20 text-primary",
    iconSvg: (
      <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21C14.55 18.7 16.1875 17.0812 16.9125 16.1437C17.6375 15.2062 18 14.275 18 13.35C18 12.45 17.675 11.675 17.025 11.025C16.375 10.375 15.6 10.05 14.7 10.05C14.175 10.05 13.6687 10.1562 13.1812 10.3687C12.6937 10.5812 12.3 10.875 12 11.25C11.7 10.875 11.3125 10.5812 10.8375 10.3687C10.3625 10.1562 9.85 10.05 9.3 10.05C8.4 10.05 7.625 10.375 6.975 11.025C6.325 11.675 6 12.45 6 13.35C6 13.825 6.0625 14.2625 6.1875 14.6625C6.3125 15.0625 6.5875 15.5312 7.0125 16.0688C7.4375 16.6063 8.04375 17.2625 8.83125 18.0375C9.61875 18.8125 10.675 19.8 12 21ZM12 30C8.525 29.125 5.65625 27.1312 3.39375 24.0187C1.13125 20.9062 0 17.45 0 13.65V4.5L12 0L24 4.5V13.65C24 17.45 22.8688 20.9062 20.6063 24.0187C18.3438 27.1312 15.475 29.125 12 30ZM12 26.85C14.6 26.025 16.75 24.375 18.45 21.9C20.15 19.425 21 16.675 21 13.65V6.5625L12 3.1875L3 6.5625V13.65C3 16.675 3.85 19.425 5.55 21.9C7.25 24.375 9.4 26.025 12 26.85Z"
          fill="#F65353"
        />
      </svg>
    ),
  },
  {
    id: "prefill",
    title: "Pre-Fill Existing Data",
    shortDesc: "Reduce friction by leveraging historical data for returning investors and institutional partners.",
    whatItMeans:
      "Our smart systems securely store and recall your profile, KYC (Know Your Customer) details, and historical investment parameters. When a new investment opportunity arises, your application and subscription documents are automatically populated.",
    howItDrivesWealth:
      "Speed to market. In institutional wealth management, exclusive investment windows can close rapidly. By eliminating redundant paperwork and administrative delays, your capital is deployed faster. This means your money starts working and compounding sooner, capturing prime entry points in the market that slower, manual systems miss.",
    colSpan: "md:col-span-4",
    iconPosition: "right",
    lucideIcon: FileCheck,
    badge: "Frictionless Re-Investment",
    accentColor: "border-[#2e153b] bg-purple-50/30 text-secondary",
    iconSvg: (
      <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 25C7.10417 24.2708 4.71354 22.6094 2.82812 20.0156C0.942708 17.4219 0 14.5417 0 11.375V3.75L10 0L20 3.75V11.375C20 13.1458 19.6979 14.849 19.0938 16.4844C18.4896 18.1198 17.625 19.5625 16.5 20.8125L12.5 16.8125C12.125 17.0417 11.724 17.2135 11.2969 17.3281C10.8698 17.4427 10.4375 17.5 10 17.5C8.625 17.5 7.44792 17.0104 6.46875 16.0312C5.48958 15.0521 5 13.875 5 12.5C5 11.125 5.48958 9.94792 6.46875 8.96875C7.44792 7.98958 8.625 7.5 10 7.5C11.375 7.5 12.5521 7.98958 13.5312 8.96875C14.5104 9.94792 15 11.125 15 12.5C15 12.9583 14.9427 13.401 14.8281 13.8281C14.7135 14.2552 14.5417 14.6667 14.3125 15.0625L16.1875 16.9375C16.6042 16.0833 16.9271 15.1875 17.1562 14.25C17.3854 13.3125 17.5 12.3542 17.5 11.375V5.46875L10 2.65625L2.5 5.46875V11.375C2.5 13.8958 3.20833 16.1875 4.625 18.25C6.04167 20.3125 7.83333 21.6875 10 22.375C10.5417 22.2083 11.0573 21.9948 11.5469 21.7344C12.0365 21.474 12.5208 21.1667 13 20.8125L14.75 22.5625C14.0625 23.125 13.3177 23.6146 12.5156 24.0312C11.7135 24.4479 10.875 24.7708 10 25ZM10 15C10.6875 15 11.276 14.7552 11.7656 14.2656C12.2552 13.776 12.5 13.1875 12.5 12.5C12.5 11.8125 12.2552 11.224 11.7656 10.7344C11.276 10.2448 10.6875 10 10 10C9.3125 10 8.72396 10.2448 8.23438 10.7344C7.74479 11.224 7.5 11.8125 7.5 12.5C7.5 13.1875 7.74479 13.776 8.23438 14.2656C8.72396 14.7552 9.3125 15 10 15Z"
          fill="#F65353"
        />
      </svg>
    ),
  },
  {
    id: "communication",
    title: "Transparent Communication",
    shortDesc: "Real-time status tracking throughout the multi-stage onboarding lifecycle.",
    whatItMeans:
      "Instead of waiting for quarterly reports or manual email updates, you have 24/7 visibility into your investments. You can track exactly where your funds are, the status of capital calls, and the progression of onboarding processes in real-time.",
    howItDrivesWealth:
      "Actionable intelligence allows for superior capital allocation. When you know exactly where your current investments stand, you can make precise liquidity decisions for your broader portfolio. This level of transparency eliminates \"dead capital\" (money sitting idle while you wait for updates) and empowers you to aggressively plan your next wealth-generating move with complete confidence.",
    colSpan: "md:col-span-2",
    iconPosition: "top",
    lucideIcon: Activity,
    badge: "24/7 Real-Time Tracking",
    accentColor: "border-blue-500 bg-blue-50/20 text-blue-600",
    iconSvg: (
      <svg width="28" height="19" viewBox="0 0 28 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.75 15C15.3125 15 16.6406 14.4531 17.7344 13.3594C18.8281 12.2656 19.375 10.9375 19.375 9.375C19.375 7.8125 18.8281 6.48438 17.7344 5.39062C16.6406 4.29688 15.3125 3.75 13.75 3.75C12.1875 3.75 10.8594 4.29688 9.76562 5.39062C8.67188 6.48438 8.125 7.8125 8.125 9.375C8.125 10.9375 8.67188 12.2656 9.76562 13.3594C10.8594 14.4531 12.1875 15 13.75 15ZM13.75 12.75C12.8125 12.75 12.0156 12.4219 11.3594 11.7656C10.7031 11.1094 10.375 10.3125 10.375 9.375C10.375 8.4375 10.7031 7.64062 11.3594 6.98438C12.0156 6.32812 12.8125 6 13.75 6C14.6875 6 15.4844 6.32812 16.1406 6.98438C16.7969 7.64062 17.125 8.4375 17.125 9.375C17.125 10.3125 16.7969 11.1094 16.1406 11.7656C15.4844 12.4219 14.6875 12.75 13.75 12.75ZM13.75 18.75C10.7083 18.75 7.9375 17.901 5.4375 16.2031C2.9375 14.5052 1.125 12.2292 0 9.375C1.125 6.52083 2.9375 4.24479 5.4375 2.54688C7.9375 0.848958 10.7083 0 13.75 0C16.7917 0 19.5625 0.848958 22.0625 2.54688C24.5625 4.24479 26.375 6.52083 27.5 9.375C26.375 12.2292 24.5625 14.5052 22.0625 16.2031C19.5625 17.901 16.7917 18.75 13.75 18.75ZM13.75 16.25C16.1042 16.25 18.2656 15.6302 20.2344 14.3906C22.2031 13.151 23.7083 11.4792 24.75 9.375C23.7083 7.27083 22.2031 5.59896 20.2344 4.35938C18.2656 3.11979 16.1042 2.5 13.75 2.5C11.3958 2.5 9.23438 3.11979 7.26562 4.35938C5.29688 5.59896 3.79167 7.27083 2.75 9.375C3.79167 11.4792 5.29688 13.151 7.26562 14.3906C9.23438 15.6302 11.3958 16.25 13.75 16.25Z"
          fill="#F65353"
        />
      </svg>
    ),
  },
  {
    id: "automate",
    title: "Automate Workflows",
    shortDesc: "Trigger automated notifications and validation checks to expedite processing.",
    whatItMeans:
      "We use advanced software to instantly handle routine administrative tasks. Document routing, signature verifications, compliance checks, and fund transfer notifications happen automatically in the background, rather than relying on human processing time.",
    howItDrivesWealth:
      "Generating \"Operational Alpha.\" Because our back-office operations run with automated, frictionless efficiency, our human capital—our top-tier financial analysts and wealth managers—spends zero time on administration. Instead, 100% of their expertise is dedicated to actively analyzing markets, sourcing lucrative deals, and managing your portfolio for maximum returns.",
    colSpan: "md:col-span-2",
    iconPosition: "top",
    lucideIcon: Zap,
    badge: "Operational Alpha",
    accentColor: "border-amber-500 bg-amber-50/20 text-amber-600",
    iconSvg: (
      <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.1875 20.25L14.6562 12.5H9.65625L10.5625 5.40625L4.78125 13.75H9.125L8.1875 20.25ZM5 25L6.25 16.25H0L11.25 0H13.75L12.5 10H20L7.5 25H5Z"
          fill="#F65353"
        />
      </svg>
    ),
  },
  {
    id: "compliance",
    title: "Maintain Compliance",
    shortDesc: "Continuous adherence to international regulatory standards and SEC mandates.",
    whatItMeans:
      "Our systems dynamically adapt to the ever-changing landscape of global tax laws, SEC regulations, and international financial rules. We ensure that every transaction, structure, and fund strictly adheres to the letter of the law.",
    howItDrivesWealth:
      "Uninterrupted compound growth. Non-compliance in wealth management can lead to devastating fines, frozen assets, forced liquidations, or severe tax penalties. By maintaining flawless, automated compliance, we insulate your portfolio from regulatory friction. Your wealth continues to compound smoothly, efficiently, and legally across borders, maximizing your net returns after taxes and fees.",
    colSpan: "md:col-span-2",
    iconPosition: "top",
    lucideIcon: Scale,
    badge: "SEC & Global Compliance",
    accentColor: "border-emerald-500 bg-emerald-50/20 text-emerald-600",
    iconSvg: (
      <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 25C7.10417 24.2708 4.71354 22.6094 2.82812 20.0156C0.942708 17.4219 0 14.5417 0 11.375V3.75L10 0L20 3.75V11.375C20 13.1458 19.6979 14.849 19.0938 16.4844C18.4896 18.1198 17.625 19.5625 16.5 20.8125L12.5 16.8125C12.125 17.0417 11.724 17.2135 11.2969 17.3281C10.8698 17.4427 10.4375 17.5 10 17.5C8.625 17.5 7.44792 17.0104 6.46875 16.0312C5.48958 15.0521 5 13.875 5 12.5C5 11.125 5.48958 9.94792 6.46875 8.96875C7.44792 7.98958 8.625 7.5 10 7.5C11.375 7.5 12.5521 7.98958 13.5312 8.96875C14.5104 9.94792 15 11.125 15 12.5C15 12.9583 14.9427 13.401 14.8281 13.8281C14.7135 14.2552 14.5417 14.6667 14.3125 15.0625L16.1875 16.9375C16.6042 16.0833 16.9271 15.1875 17.1562 14.25C17.3854 13.3125 17.5 12.3542 17.5 11.375V5.46875L10 2.65625L2.5 5.46875V11.375C2.5 13.8958 3.20833 16.1875 4.625 18.25C6.04167 20.3125 7.83333 21.6875 10 22.375C10.5417 22.2083 11.0573 21.9948 11.5469 21.7344C12.0365 21.474 12.5208 21.1667 13 20.8125L14.75 22.5625C14.0625 23.125 13.3177 23.6146 12.5156 24.0312C11.7135 24.4479 10.875 24.7708 10 25ZM10 15C10.6875 15 11.276 14.7552 11.7656 14.2656C12.2552 13.776 12.5 13.1875 12.5 12.5C12.5 11.8125 12.2552 11.224 11.7656 10.7344C11.276 10.2448 10.6875 10 10 10C9.3125 10 8.72396 10.2448 8.23438 10.7344C7.74479 11.224 7.5 11.8125 7.5 12.5C7.5 13.1875 7.74479 13.776 8.23438 14.2656C8.72396 14.7552 9.3125 15 10 15Z"
          fill="#F65353"
        />
      </svg>
    ),
  },
];

export default function Practices() {
  const [activeTabId, setActiveTabId] = useState<string>("portal");

  const activePractice = practices.find((p) => p.id === activeTabId) || practices[0];

  return (
    <section className="bg-[#F9FAFB] py-16 lg:py-24 border-b border-gray-100">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header with Title & Detailed Introduction */}
        <div className="max-w-4xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-primary text-xs lg:text-sm font-bold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Operational Architecture</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold italic text-secondary leading-tight">
            Elevating the Standards of Institutional Wealth Management
          </h2>

          <p className="text-base md:text-lg text-[#4C4C4C] leading-relaxed font-normal pt-2">
            At Winners Regional Center, we believe that how your wealth is managed operationally is just as critical as where it is invested. We employ precision, security, and advanced technology to remove friction and drive results. Here is how our operational best practices directly translate into wealth generation and preservation for our clients:
          </p>
        </div>

        {/* SUMMARY DIAGRAMS (Intact Grid Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-12 lg:mb-16">
          {practices.map((item) => {
            const isActive = activeTabId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveTabId(item.id)}
                className={cn(
                  "bg-white p-8 rounded-2xl shadow-sm border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden",
                  item.colSpan,
                  item.iconPosition === "right" ? "md:flex-row md:items-center" : "flex-col",
                  isActive
                    ? "border-primary ring-2 ring-primary/20 shadow-md scale-[1.01]"
                    : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                )}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full pointer-events-none flex items-top justify-end p-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                )}

                <div className={cn("flex-1", item.iconPosition === "right" ? "pr-8" : "")}>
                  {item.iconPosition === "top" && <div className="w-8 h-8 mb-6">{item.iconSvg}</div>}
                  <h3 className="text-xl lg:text-[24px] font-semibold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#4C4C4C] text-[15px] lg:text-base leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                {item.iconPosition === "right" && (
                  <div className="mt-6 md:mt-0 flex items-center gap-2">
                    <svg width="47" height="38" viewBox="0 0 47 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.03847 16.25C2.92789 16.25 1.97717 15.8546 1.1863 15.0637C0.395433 14.2728 0 13.3221 0 12.2115V4.03847C0 2.92789 0.395433 1.97717 1.1863 1.1863C1.97717 0.395434 2.92789 0 4.03847 0H26.25V16.25H4.03847ZM4.03847 13.75H23.75V2.50002H4.03847C3.58975 2.50002 3.22116 2.64425 2.9327 2.9327C2.64425 3.22116 2.50002 3.58975 2.50002 4.03847V12.2115C2.50002 12.6603 2.64425 13.0288 2.9327 13.3173C3.22116 13.6058 3.58975 13.75 4.03847 13.75ZM4.03847 37.5C2.92789 37.5 1.97717 37.1046 1.1863 36.3137C0.395433 35.5228 0 34.5721 0 33.4615V25.2885C0 24.1779 0.395433 23.2272 1.1863 22.4363C1.97717 21.6454 2.92789 21.25 4.03847 21.25H31.25V37.5H4.03847ZM4.03847 35H28.75V23.75H4.03847C3.58975 23.75 3.22116 23.8943 2.9327 24.1827C2.64425 24.4712 2.50002 24.8398 2.50002 25.2885V33.4615C2.50002 33.9103 2.64425 34.2789 2.9327 34.5673C3.22116 34.8558 3.58975 35 4.03847 35ZM36.25 37.5V16.25H31.25V0H46.9231L41.9231 12.7885H46.8269L36.25 37.5ZM6.25 31.25H10V27.5H6.25V31.25ZM6.25 10H10V6.25H6.25V10ZM2.50002 13.75C2.50002 13.75 2.50002 13.6058 2.50002 13.3173C2.50002 13.0288 2.50002 12.6603 2.50002 12.2115V4.03847C2.50002 3.58975 2.50002 3.22116 2.50002 2.9327C2.50002 2.64425 2.50002 2.50002 2.50002 2.50002V13.75ZM2.50002 35C2.50002 35 2.50002 34.8558 2.50002 34.5673C2.50002 34.2789 2.50002 33.9103 2.50002 33.4615V25.2885C2.50002 24.8398 2.50002 24.4712 2.50002 24.1827C2.50002 23.8943 2.50002 23.75 2.50002 23.75V35Z"
                        fill="#F65353"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DETAILED EXPLANATION BREAKDOWN (Interactive Tabs + Deep Dive) */}
        <div className="mt-12 lg:mt-16 bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Tab Navigation Header */}
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50 p-2 gap-2">
            {practices.map((item, idx) => {
              const Icon = item.lucideIcon;
              const isActive = activeTabId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTabId(item.id)}
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-xs lg:text-sm transition-all duration-200 flex-1 min-w-[180px] justify-center",
                    isActive
                      ? "bg-white text-secondary shadow-md border border-gray-200/80"
                      : "text-gray-600 hover:text-secondary hover:bg-white/60"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-gray-400")} />
                  <span>
                    {idx + 1}. {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Detail Content */}
          <div className="p-8 lg:p-12 space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-primary tracking-widest uppercase">
                  Operational Practice Detail
                </span>
                <h3 className="text-2xl lg:text-3xl font-extrabold italic text-secondary">
                  {activePractice.title}
                </h3>
              </div>
              <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs border", activePractice.accentColor)}>
                <activePractice.lucideIcon className="w-4 h-4" />
                <span>{activePractice.badge}</span>
              </div>
            </div>

            {/* Two Column Explanation: What it Means vs How it Drives Wealth */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* What it Means Card */}
              <div className="bg-[#fafafa] border border-gray-200/80 rounded-2xl p-6 lg:p-8 space-y-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3 border-b border-gray-200/60 pb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-secondary">What It Means</h4>
                    <p className="text-xs text-gray-500">Core operational mechanism</p>
                  </div>
                </div>

                <p className="text-[#4c4c4c] text-sm lg:text-base leading-relaxed font-normal">
                  {activePractice.whatItMeans}
                </p>
              </div>

              {/* How it Drives Wealth Card */}
              <div className="bg-gradient-to-br from-red-50/40 via-white to-amber-50/30 border border-primary/20 rounded-2xl p-6 lg:p-8 space-y-4 shadow-sm hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-3 border-b border-primary/10 pb-3">
                  <div className="w-9 h-9 rounded-lg bg-red-100 text-primary flex items-center justify-center font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-secondary">How It Drives Wealth</h4>
                    <p className="text-xs text-primary font-semibold">Direct financial impact</p>
                  </div>
                </div>

                <p className="text-[#3c3c3c] text-sm lg:text-base leading-relaxed font-normal">
                  {activePractice.howItDrivesWealth}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
