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
    LucideIcon,
    AlertCircle
} from "lucide-react";

import DocumentUploadCard from "@/components/dashboard/explore-project/DocumentUploadCard";
import InvestmentSuccess from "@/components/dashboard/explore-project/InvestmentSuccess";
import { useProjectInvestmentsMutation } from "@/redux/feature/evaluationSlice";
import { useSearchParams } from "next/navigation";
import { useProjectDetailsQuery } from "@/redux/feature/projectSlice";

type ReviewFieldProps = {
    label: string;
    type?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
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

type FormData = {
    full_name: string;
    email: string;
    phone: string;
    nationality: string;
    current_country_of_residence: string;
    source_of_funds: string;
    investment_amount: string;
    investment_strategy: string;
    passport_copy: string;
    proof_of_address: string;
    proof_of_funds: string;
    bank_statements: string;
    upload_agreement: string;
};

const strategyOptions: StrategyOption[] = [
    { id: "immigration", label: "IMMIGRATION", icon: Globe },
    { id: "profit", label: "PROFIT", icon: BarChart3 },
    { id: "both", label: "BOTH", icon: ArrowLeftRight },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function ReviewField({ label, type = "text", name, value, onChange, required = true }: ReviewFieldProps) {
    return (
        <div>
            <label className="text-xs font-semibold text-[#6A6A6A] uppercase tracking-wider">
                {label} {required && <span className="text-[#F65353]">*</span>}
            </label>
            <input
                type={type}
                placeholder={label}
                aria-label={label}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="mt-2 h-12 w-full border border-[#ECECEE] bg-white px-4 text-[13px] text-[#1F1F1F] shadow-[0_4px_12px_rgba(0,0,0,0.02)] outline-none transition-all duration-300 focus:border-[#F65353] focus:ring-1 focus:ring-[#F65353]/20 hover:border-gray-300"
            />
        </div>
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
    const params = useSearchParams();
    const id = params.get("id");
    const projectId = Number(id);
    console.log(projectId, '=======sdfsda=')
    const [step, setStep] = useState(1);
    const [selectedStrategy, setSelectedStrategy] = useState("immigration");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { data } = useProjectDetailsQuery(projectId, {
        skip: Number.isNaN(projectId),
    });

    const project = data?.data;
    console.log(project, '=========')

    const [projectInvestments, { isLoading: isMutating }] = useProjectInvestmentsMutation();

    // Form data state
    const [formData, setFormData] = useState<FormData>({
        full_name: "",
        email: "",
        phone: "",
        nationality: "",
        current_country_of_residence: "",
        source_of_funds: "",
        investment_amount: "",
        investment_strategy: "immigration",
        passport_copy: "",
        proof_of_address: "",
        proof_of_funds: "",
        bank_statements: "",
        upload_agreement: "",
    });

    // File state for actual file uploads
    const [uploadedFiles, setUploadedFiles] = useState<{
        passport_copy: File | null;
        proof_of_address: File | null;
        proof_of_funds: File | null;
        bank_statements: File | null;
        upload_agreement: File | null;
    }>({
        passport_copy: null,
        proof_of_address: null,
        proof_of_funds: null,
        bank_statements: null,
        upload_agreement: null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: keyof typeof uploadedFiles) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type (PDF or images)
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setError(`Invalid file type for ${fileType}. Please upload PDF or image file.`);
                return;
            }

            // Validate file size (max 10MB)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                setError(`File too large for ${fileType}. Maximum size is 10MB.`);
                return;
            }

            setUploadedFiles((prev) => ({
                ...prev,
                [fileType]: file,
            }));
            setError(null);
        }
    };

    const validateStep1 = () => {
        const requiredFields: { [key: string]: string } = {
            full_name: "Full Name",
            email: "Email Address",
            phone: "Phone Number",
            nationality: "Nationality",
            current_country_of_residence: "Country of Residence",
            source_of_funds: "Source of Funds",
            investment_amount: "Investment Amount",
        };

        for (const [field, label] of Object.entries(requiredFields)) {
            if (!formData[field as keyof FormData]?.toString().trim()) {
                setError(`${label} is required`);
                return false;
            }
        }

        if (!formData.email.includes("@")) {
            setError("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const validateStep2 = () => {
        const requiredFiles: { [key: string]: string } = {
            passport_copy: "Passport Copy",
            proof_of_address: "Proof of Address",
            proof_of_funds: "Proof of Funds",
            bank_statements: "Bank Statement",
            upload_agreement: "Signed Agreement",
        };

        for (const [file, label] of Object.entries(requiredFiles)) {
            if (!uploadedFiles[file as keyof typeof uploadedFiles]) {
                setError(`${label} is required`);
                return false;
            }
        }

        return true;
    };

    const handleAgreementDownload = async () => {
        if (!project?.agreement) {
            setError("Agreement file is not available for this project.");
            return;
        }

        try {
            setError(null);
            const response = await fetch(project.agreement);

            if (!response.ok) {
                throw new Error("Unable to download agreement file");
            }

            const blob = await response.blob();
            const objectUrl = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = objectUrl;
            anchor.download = project.agreement.split("/").pop() || "agreement";
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            window.URL.revokeObjectURL(objectUrl);
        } catch {
            setError("Failed to download agreement file. Please try again.");
        }
    };

    const handleSubmitInvestment = async () => {
        try {
            setError(null);
            setLoading(true);

            // Create FormData to handle file uploads
            const formDataToSend = new window.FormData();

            // Append personal information
            formDataToSend.append("project", projectId.toString());
            formDataToSend.append("full_name", formData.full_name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("phone", formData.phone);
            formDataToSend.append("nationality", formData.nationality);
            formDataToSend.append("current_country_of_residence", formData.current_country_of_residence);
            formDataToSend.append("source_of_funds", formData.source_of_funds);
            formDataToSend.append("investment_amount", formData.investment_amount);
            formDataToSend.append("investment_strategy", selectedStrategy);

            // Append files
            if (uploadedFiles.passport_copy) {
                formDataToSend.append("passport_copy", uploadedFiles.passport_copy);
            }
            if (uploadedFiles.proof_of_address) {
                formDataToSend.append("proof_of_address", uploadedFiles.proof_of_address);
            }
            if (uploadedFiles.proof_of_funds) {
                formDataToSend.append("proof_of_funds", uploadedFiles.proof_of_funds);
            }
            if (uploadedFiles.bank_statements) {
                formDataToSend.append("bank_statements", uploadedFiles.bank_statements);
            }
            if (uploadedFiles.upload_agreement) {
                formDataToSend.append("upload_agreement", uploadedFiles.upload_agreement);
            }

            // Call the mutation with FormData
            await projectInvestments(formDataToSend).unwrap();

            setSubmitSuccess(true);
            setLoading(false);
        } catch (err) {
            const error = err as Record<string, unknown>;
            setError((error?.data as { message?: string })?.message || "Failed to submit investment request. Please try again.");
            setLoading(false);
        }
    };

    const nextStep = () => {
        setError(null);

        if (step === 1) {
            if (validateStep1()) {
                setFormData((prev) => ({
                    ...prev,
                    investment_strategy: selectedStrategy,
                }));
                setStep(2);
            }
        } else if (step === 2) {
            if (validateStep2()) {
                setStep(3);
            }
        }
    };

    const prevStep = () => {
        setError(null);
        if (step === 1) {
            window.history.back();
        } else {
            setStep((prev) => prev - 1);
        }
    };

    const renderStep1 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {error && (
                <div className="rounded-sm bg-red-50 border border-red-200 p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <header className="rounded-sm bg-[#E8E9EC52] p-4 sm:p-6 lg:p-7">
                <span className="text-[#F65353] text-[10px] font-bold uppercase tracking-widest block mb-2">| INVESTMENT</span>
                <h1 className="text-[28px] leading-tight font-semibold italic text-secondary sm:text-4xl">
                    Investor Information
                </h1>
                <p className="mt-4 text-[#6A6A6A] text-[13px] max-w-96">
                    Please Provide the personal and regulatory details required to facilitate your institution investment entry. All data is encrypted and handled under federal privacy protocol
                </p>
            </header>

            <ReviewSection number="1" title="Personal Information">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ReviewField
                        label="Full name (Legal)"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                    />
                    <ReviewField
                        label="Enter email address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <ReviewField
                        label="Phone number"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <ReviewField
                        label="Nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                    />
                </div>
            </ReviewSection>

            <ReviewSection number="2" title="Geographic & Regulatory">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ReviewField
                        label="Current Country of residence"
                        name="current_country_of_residence"
                        value={formData.current_country_of_residence}
                        onChange={handleInputChange}
                    />
                    <ReviewField
                        label="Source of fund"
                        name="source_of_funds"
                        value={formData.source_of_funds}
                        onChange={handleInputChange}
                    />
                </div>
            </ReviewSection>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
                <ReviewSection number="3" title="Investment Strategy & Amount" className="h-full">
                    <div className="space-y-6">
                        <ReviewField
                            label="Invest amount"
                            name="investment_amount"
                            value={formData.investment_amount}
                            onChange={handleInputChange}
                        />

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
                                            "flex min-h-25 flex-col items-center justify-center gap-2 border bg-white px-3 py-5 text-center text-[13px] font-medium transition-all duration-300",
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
                        className="mt-8 w-full bg-[#C91E1E] py-4 text-sm font-bold text-white uppercase tracking-widest hover:bg-[#AD1717] transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-red-900/10"
                    >
                        CONTINUE TO DOCUMENTS &gt;
                    </button>
                </aside>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {error && (
                <div className="rounded-sm bg-red-50 border border-red-200 p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <header className="rounded-sm bg-[#E8E9EC52] p-4 sm:p-6 lg:p-7">
                <span className="text-[#F65353] text-[10px] font-bold uppercase tracking-widest block mb-2">| INVESTMENT</span>
                <h1 className="text-[28px] leading-tight font-semibold italic text-secondary sm:text-4xl">
                    Submit Documents
                </h1>
                <p className="mt-4 text-[#6A6A6A] text-[13px] max-w-96">
                    To comply with international AML/KYC regulations. Please provide high quality documents (PDF or Images). Your data is stored in our sovereign-grade digital vault.
                </p>
            </header>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ReviewSection number="1" title="Personal Identity">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Passport Copy Upload */}
                        <label className="bg-white p-4 sm:p-5 border border-gray-200 rounded-sm hover:border-[#F65353]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col h-full cursor-pointer">
                            <div className="mb-4">
                                <FileText className="w-6 h-6 text-[#8B8B8B]" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1F1F1F] uppercase mb-1">Passport Copy</h3>
                            <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-4">Color scan (PDF or Image)</p>
                            <div className="mt-auto pt-4 border-t border-[#F5F5F5]">
                                <span className={cn(
                                    "text-[10px] font-medium uppercase tracking-wider",
                                    uploadedFiles.passport_copy ? "text-[#038862]" : "text-[#F65353]"
                                )}>
                                    {uploadedFiles.passport_copy ? `✓ ${uploadedFiles.passport_copy.name}` : "NO FILE"}
                                </span>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,image/jpeg,image/png,image/jpg"
                                onChange={(e) => handleFileInputChange(e, "passport_copy")}
                                className="hidden"
                            />
                        </label>

                        {/* Proof of Address Upload */}
                        <label className="bg-white p-4 sm:p-5 border border-gray-200 rounded-sm hover:border-[#F65353]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col h-full cursor-pointer">
                            <div className="mb-4">
                                <ShieldCheck className="w-6 h-6 text-[#8B8B8B]" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1F1F1F] uppercase mb-1">Proof of Address</h3>
                            <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-4">Utility bill or Bank statement (Last 90 Days)</p>
                            <div className="mt-auto pt-4 border-t border-[#F5F5F5]">
                                <span className={cn(
                                    "text-[10px] font-medium uppercase tracking-wider",
                                    uploadedFiles.proof_of_address ? "text-[#038862]" : "text-[#F65353]"
                                )}>
                                    {uploadedFiles.proof_of_address ? `✓ ${uploadedFiles.proof_of_address.name}` : "NO FILE"}
                                </span>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,image/jpeg,image/png,image/jpg"
                                onChange={(e) => handleFileInputChange(e, "proof_of_address")}
                                className="hidden"
                            />
                        </label>
                    </div>
                </ReviewSection>

                <ReviewSection number="2" title="Financial Verification">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Proof of Funds Upload */}
                        <label className="bg-white p-4 sm:p-5 border border-gray-200 rounded-sm hover:border-[#F65353]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col h-full cursor-pointer">
                            <div className="mb-4">
                                <CircleDollarSign className="w-6 h-6 text-[#8B8B8B]" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1F1F1F] uppercase mb-1">Proof of Funds</h3>
                            <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-4">Color scan</p>
                            <div className="mt-auto pt-4 border-t border-[#F5F5F5]">
                                <span className={cn(
                                    "text-[10px] font-medium uppercase tracking-wider",
                                    uploadedFiles.proof_of_funds ? "text-[#038862]" : "text-[#F65353]"
                                )}>
                                    {uploadedFiles.proof_of_funds ? `✓ ${uploadedFiles.proof_of_funds.name}` : "NO FILE"}
                                </span>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,image/jpeg,image/png,image/jpg"
                                onChange={(e) => handleFileInputChange(e, "proof_of_funds")}
                                className="hidden"
                            />
                        </label>

                        {/* Bank Statement Upload */}
                        <label className="bg-white p-4 sm:p-5 border border-gray-200 rounded-sm hover:border-[#F65353]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col h-full cursor-pointer">
                            <div className="mb-4">
                                <FileText className="w-6 h-6 text-[#8B8B8B]" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1F1F1F] uppercase mb-1">Bank Statement</h3>
                            <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-4">Last 6 Months</p>
                            <div className="mt-auto pt-4 border-t border-[#F5F5F5]">
                                <span className={cn(
                                    "text-[10px] font-medium uppercase tracking-wider",
                                    uploadedFiles.bank_statements ? "text-[#038862]" : "text-[#F65353]"
                                )}>
                                    {uploadedFiles.bank_statements ? `✓ ${uploadedFiles.bank_statements.name}` : "NO FILE"}
                                </span>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,image/jpeg,image/png,image/jpg"
                                onChange={(e) => handleFileInputChange(e, "bank_statements")}
                                className="hidden"
                            />
                        </label>
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
                            fileName={project?.agreement ? project.agreement.split("/").pop() : undefined}
                            onAction={handleAgreementDownload}
                        />

                        {/* Agreement Upload */}
                        <label className="bg-white p-4 sm:p-5 border border-gray-200 rounded-sm hover:border-[#F65353]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col h-full cursor-pointer">
                            <div className="mb-4">
                                <FileText className="w-6 h-6 text-[#8B8B8B]" />
                            </div>
                            <h3 className="text-sm font-bold text-[#1F1F1F] uppercase mb-1">Upload Signed Documents</h3>
                            <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-4">Signed agreement</p>
                            <div className="mt-auto pt-4 border-t border-[#F5F5F5]">
                                <span className={cn(
                                    "text-[10px] font-medium uppercase tracking-wider",
                                    uploadedFiles.upload_agreement ? "text-[#038862]" : "text-[#F65353]"
                                )}>
                                    {uploadedFiles.upload_agreement ? `✓ ${uploadedFiles.upload_agreement.name}` : "NO FILE"}
                                </span>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,image/jpeg,image/png,image/jpg"
                                onChange={(e) => handleFileInputChange(e, "upload_agreement")}
                                className="hidden"
                            />
                        </label>
                    </div>
                </ReviewSection>

                <aside className="flex flex-col items-center justify-center rounded-sm bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
                    <h2 className="text-[24px] md:text-[28px] font-semibold italic text-secondary text-center leading-tight">
                        Ready to take next step?
                    </h2>
                    <button
                        onClick={nextStep}
                        disabled={loading}
                        className="mt-6 w-full bg-[#C91E1E] py-3.5 text-xs font-bold text-white uppercase tracking-widest hover:bg-[#AD1717] transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "PROCESSING..." : "CONTINUE TO SUBMIT >"}
                    </button>
                </aside>
            </div>
        </div>
    );

    const renderStep3 = () => {
        if (submitSuccess) {
            return (
                <InvestmentSuccess
                    projectData={{
                        name: "Houston Commercial Tower Project",
                        amount: formData.investment_amount,
                        roi: "8-12%"
                    }}
                />
            );
        }

        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {error && (
                    <div className="rounded-sm bg-red-50 border border-red-200 p-4 flex gap-3 mb-8 max-w-md">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <div className="mb-8">
                    <h1 className="text-[28px] md:text-[36px] font-semibold italic text-secondary text-center leading-tight">
                        Review Your Investment
                    </h1>
                    <p className="mt-4 text-[#6A6A6A] text-center max-w-lg mx-auto text-sm leading-relaxed">
                        Please review your investment details before final submission
                    </p>
                </div>

                <div className="w-full max-w-xl bg-[#E8E9EC52] p-6 md:p-8 rounded-sm mb-10">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                            <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Full Name</span>
                            <span className="text-sm font-bold italic text-secondary">{formData.full_name}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                            <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Email</span>
                            <span className="text-sm font-bold text-secondary">{formData.email}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                            <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Investment Amount</span>
                            <span className="text-sm font-bold text-secondary">${formData.investment_amount}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                            <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Investment Strategy</span>
                            <span className="text-sm font-bold text-[#F65353] uppercase">{selectedStrategy}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                            <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Estimate ROI</span>
                            <div className="text-right">
                                <span className="text-sm font-bold text-[#F65353]">8-12%</span>
                                <span className="text-xs text-[#6A6A6A] italic ml-1">(annually)</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Documents</span>
                            <div className="text-right space-y-1">
                                {uploadedFiles.passport_copy && <div className="text-[10px] text-[#038862]">✓ Passport</div>}
                                {uploadedFiles.proof_of_address && <div className="text-[10px] text-[#038862]">✓ Address</div>}
                                {uploadedFiles.proof_of_funds && <div className="text-[10px] text-[#038862]">✓ Funds</div>}
                                {uploadedFiles.bank_statements && <div className="text-[10px] text-[#038862]">✓ Bank</div>}
                                {uploadedFiles.upload_agreement && <div className="text-[10px] text-[#038862]">✓ Agreement</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
                    <button
                        onClick={prevStep}
                        className="flex-1 border border-[#E0E2E7] bg-white py-3.5 text-xs font-bold text-secondary uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                        BACK TO DOCUMENTS
                    </button>
                    <button
                        onClick={handleSubmitInvestment}
                        disabled={loading || isMutating}
                        className="flex-1 bg-[#C91E1E] py-3.5 text-xs font-bold text-white uppercase tracking-widest hover:bg-[#AD1717] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading || isMutating ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                SUBMITTING...
                            </>
                        ) : (
                            "SUBMIT INVESTMENT"
                        )}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
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

            <main className="p-6">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </main>
        </div>
    );
}
