"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowLeftRight,
    BarChart3,
    Globe,
    FileText,
    ShieldCheck,
    CircleDollarSign,
    Download,
    Upload,
    LucideIcon
} from "lucide-react";

import DocumentUploadCard from "@/components/dashboard/explore-project/DocumentUploadCard";
import InvestmentSuccess from "@/components/dashboard/explore-project/InvestmentSuccess";

type ReviewFieldProps = {
    label: string;
    type?: string;
};

type ReviewSectionProps = {
    number: string;
    title: string;
    children: React.ReactNode;
    className?: string;
    hideNumber?: boolean;
};

type StrategyOption = {
    id: string;
    label: string;
    icon: LucideIcon;
};

const personalInformationFields: ReviewFieldProps[] = [
    { label: "Full name ( Legal )" },
    { label: "Enter email address", type: "email" },
    { label: "Phone number", type: "tel" },
    { label: "Nationality" },
];

const regulatoryFields: ReviewFieldProps[] = [
    { label: "Current Country of residence" },
    { label: "Source fo fund" },
];

const strategyOptions: StrategyOption[] = [
    { id: "immigration", label: "IMMIGRATION", icon: Globe },
    { id: "profit", label: "PROFIT", icon: BarChart3 },
    { id: "both", label: "BOTH", icon: ArrowLeftRight },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function ReviewField({ label, type = "text" }: ReviewFieldProps) {
    return (
        <input
            type={type}
            placeholder={label}
            aria-label={label}
            className="h-12 w-full border border-[#ECECEE] bg-white px-4 text-[13px] text-[#1F1F1F] shadow-[0_4px_12px_rgba(0,0,0,0.02)] outline-none transition-all duration-300 focus:border-[#F65353] focus:ring-1 focus:ring-[#F65353]/20 hover:border-gray-300"
        />
    );
}

function ReviewSection({ number, title, children, className, hideNumber = false }: ReviewSectionProps) {
    return (
        <article className={cn("rounded-sm bg-[#E8E9EC52] p-4 sm:p-6 lg:p-8", className)}>
            {!hideNumber && (
                <span className="inline-flex h-6 min-w-6 items-center justify-center bg-[#F65353] px-1.5 text-[10px] sm:text-[11px] font-semibold text-white">
                    {number}
                </span>
            )}
            <h2 className="mt-2 text-lg font-semibold italic text-secondary sm:text-2xl leading-tight">{title}</h2>
            <div className="mt-4 sm:mt-6">{children}</div>
        </article>
    );
}

export default function InvestmentFlowPage() {
    const [step, setStep] = useState(1);
    const [selectedStrategy, setSelectedStrategy] = useState("immigration");

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
    const prevStep = () => {
        if (step === 1) {
            // Logic to go back to project details if needed
            window.history.back();
        } else {
            setStep((prev) => prev - 1);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="rounded-sm bg-[#E8E9EC52] p-4 sm:p-6 lg:p-7">
                <span className="text-[#F65353] text-[10px] font-bold uppercase tracking-widest block mb-2">| INVESTMENT</span>
                <h1 className="text-[28px] leading-tight font-semibold italic text-secondary sm:text-4xl">
                    Investor Information
                </h1>
                <p className="mt-4 text-[#6A6A6A] text-[13px] max-w-[900px]">
                    Please Provide the personal and regulatory details required to facilitate your institution investment entry. All data is encrypted and handled under federal privacy protocol
                </p>
            </header>

            <ReviewSection number="1" title="Personal Information">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {personalInformationFields.map((field) => (
                        <ReviewField key={field.label} label={field.label} type={field.type} />
                    ))}
                </div>
            </ReviewSection>

            <ReviewSection number="2" title="Geographic & Regulatory">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {regulatoryFields.map((field) => (
                        <ReviewField key={field.label} label={field.label} type={field.type} />
                    ))}
                </div>
            </ReviewSection>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
                <ReviewSection number="3" title="Investment Strategy & Amount" className="h-full">
                    <div className="space-y-6">
                        <ReviewField label="Invest amount" />

                        <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3">
                            {strategyOptions.map((option) => {
                                const Icon = option.icon;
                                const isActive = selectedStrategy === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => setSelectedStrategy(option.id)}
                                        className={cn(
                                            "flex min-h-[100px] flex-col items-center justify-center gap-2 border bg-white px-3 py-5 text-center text-[13px] font-medium transition-all duration-300",
                                            isActive
                                                ? "border-[#F65353] bg-[#FFF7F7] text-[#1F1F1F] shadow-[0_8px_20px_rgba(246,83,83,0.1)] scale-[1.02]"
                                                : "border-[#D3D5DA] text-[#5E5E5E] hover:border-[#F65353]/60 hover:bg-gray-50"
                                        )}
                                    >
                                        <Icon className={cn("h-6 w-6 transition-colors", isActive ? "text-[#F65353]" : "text-[#8B8B8B]")} />
                                        <span className="uppercase tracking-wider">{option.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </ReviewSection>

                <aside className="flex flex-col items-center justify-center rounded-sm bg-white p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.05)] border border-gray-100 h-full">
                    <h2 className="text-[24px] md:text-[32px] font-semibold italic text-secondary text-center leading-[1.2]">
                        Ready to take <br className="hidden sm:block" /> next step?
                    </h2>
                    <button
                        onClick={nextStep}
                        className="mt-8 w-full bg-[#C91E1E] py-4 text-sm font-bold text-white uppercase tracking-[0.1em] hover:bg-[#AD1717] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-red-900/10"
                    >
                        CONTINUE TO DOCUMENTS &gt;
                    </button>
                </aside>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="rounded-sm bg-[#E8E9EC52] p-4 sm:p-6 lg:p-7">
                <span className="text-[#F65353] text-[10px] font-bold uppercase tracking-widest block mb-2">| INVESTMENT</span>
                <h1 className="text-[28px] leading-tight font-semibold italic text-secondary sm:text-4xl">
                    Submit Documents
                </h1>
                <p className="mt-4 text-[#6A6A6A] text-[13px] max-w-[900px]">
                    To comply with international AML/KYC regulations. Please provide high quality documents ( PDF ). Your data is stored in our sovereign - grade digital vault.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ReviewSection number="1" title="Personal Identity">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <DocumentUploadCard
                            title="Passport Copy"
                            description="Color scan"
                            fileName="PSSSPORT_SCAN_V.PDF"
                            icon={FileText}
                            type="upload"
                        />
                        <DocumentUploadCard
                            title="Prof of Address"
                            description="Utility bill or Bank statement (Last 90 Day's)"
                            fileName="BANK_V.PDF"
                            icon={ShieldCheck}
                            type="upload"
                        />
                    </div>
                </ReviewSection>

                <ReviewSection number="2" title="Financial Verification">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <DocumentUploadCard
                            title="Prof of Funds"
                            description="Color scan"
                            fileName="SOURCE OF FUND_V.PDF"
                            icon={CircleDollarSign}
                            type="upload"
                        />
                        <DocumentUploadCard
                            title="Bank Statement"
                            description="Last 6 Months"
                            fileName="BANK_V.PDF"
                            icon={FileText}
                            type="upload"
                        />
                    </div>
                </ReviewSection>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_350px]">
                <ReviewSection number="3" title="Sign Agreement">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <DocumentUploadCard
                            title="Download Agreements"
                            description=""
                            icon={FileText}
                            type="download"
                        />
                        <DocumentUploadCard
                            title="Upload Signed Documents"
                            description=""
                            icon={FileText}
                            type="upload"
                        />
                    </div>
                </ReviewSection>

                <aside className="flex flex-col items-center justify-center rounded-sm bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
                    <h2 className="text-[24px] md:text-[28px] font-semibold italic text-secondary text-center leading-tight">
                        Ready to take next step?
                    </h2>
                    <button
                        onClick={nextStep}
                        className="mt-6 w-full bg-[#C91E1E] py-3.5 text-xs font-bold text-white uppercase tracking-widest hover:bg-[#AD1717] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        CONTINUE TO SUBMIT &gt;
                    </button>
                </aside>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <InvestmentSuccess
            projectData={{
                name: "Houston Commercial Tower Project",
                amount: "$8000",
                roi: "8-12%"
            }}
        />
    );

    return (
        <div className="min-h-screen bg-white">
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 sm:px-6 py-4">
                <div className=" flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={prevStep}
                            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-secondary" />
                        </button>
                        <h2 className="text-xl md:text-2xl font-bold text-secondary">Start Investment</h2>
                    </div>

                    <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
                        <Link href="#" className="text-secondary hover:text-[#F65353] transition-colors">Insights</Link>
                        <button
                            className={cn(
                                "transition-colors",
                                step === 2 ? "text-[#F65353]" : "text-secondary hover:text-[#F65353]"
                            )}
                        >
                            Documents
                        </button>
                    </div>
                </div>
            </nav>

            <main className=" p-6">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </main>
        </div>
    );
}