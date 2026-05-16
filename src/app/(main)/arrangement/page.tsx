'use client';

import { useArrangementProgressQuery, useUploadArrangementProgressMutation } from "@/redux/feature/arrangementSlice";
import { useState, useRef } from "react";
import { Check, Download, Upload, AlertCircle, Loader } from "lucide-react";

interface CompletedDocument {
    user_document_id: number;
    required_document_id: number;
    step: number;
    title: string;
    download_file: string;
    signed_file: string;
    status: string;
    reviewed_at: string;
}

interface CurrentDocument {
    user_document_id: null | number;
    required_document_id: number;
    step: number;
    title: string;
    download_file: string;
    signed_file: null | string;
    status: string;
    admin_note: string;
    submitted_at: null | string;
    reviewed_at: null | string;
    allow_upload: boolean;
}

interface ArrangementProgressData {
    total_steps: number;
    completed_steps: number;
    all_completed: boolean;
    current_step: number;
    completed_documents: CompletedDocument[];
    current_document: CurrentDocument;
}

export default function Arrangement() {
    const { data: arrangementProgressResponse, isLoading: isArrangementProgressLoading, refetch } = useArrangementProgressQuery(undefined);
    const [uploadArrangementProgress, { isLoading: isUploadingArrangementProgress }] = useUploadArrangementProgressMutation();

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    const arrangementProgress = arrangementProgressResponse?.data as ArrangementProgressData | undefined;

    const handleDownload = async (fileUrl: string, fileName: string) => {
        try {
            setDownloadingId(1);
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Download failed:", error);
            setUploadError("Failed to download file");
        } finally {
            setDownloadingId(null);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 50MB)
            if (file.size > 50 * 1024 * 1024) {
                setUploadError("File size must be less than 50MB");
                return;
            }
            setUploadedFile(file);
            setUploadError("");
            setUploadSuccess(false);
        }
    };

    const handleUpload = async () => {
        if (!uploadedFile) {
            setUploadError("Please select a file first");
            return;
        }

        try {
            setUploadError("");
            const formData = new FormData();
            formData.append("signed_file", uploadedFile);

            await uploadArrangementProgress(formData).unwrap();

            setUploadSuccess(true);
            setUploadedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            // Refetch the data to get updated progress
            setTimeout(() => {
                refetch();
                setUploadSuccess(false);
            }, 1500);
        } catch (error: unknown) {
            const message = typeof error === "object" && error !== null && "data" in error
                ? (error as { data?: { message?: string } }).data?.message
                : undefined;

            setUploadError(message || "Upload failed. Please try again.");
            console.error("Upload error:", error);
        }
    };

    if (isArrangementProgressLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="w-12 h-12 animate-spin text-blue-600" />
                    <p className="text-gray-600">Loading your arrangement progress...</p>
                </div>
            </div>
        );
    }

    if (!arrangementProgress) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-gray-600">Failed to load arrangement progress</p>
                </div>
            </div>
        );
    }

    const allSteps = Array.from({ length: arrangementProgress.total_steps }, (_, i) => i + 1);
    const completedSteps = allSteps.filter(step => step < arrangementProgress.current_step);
    const currentStep = arrangementProgress.current_step;

    const getStatusChip = (status: string) => {
        const normalizedStatus = status?.toLowerCase();

        if (normalizedStatus === "approved") {
            return "bg-[#E8F8F2] text-[#038862] border-[#038862]";
        }

        if (normalizedStatus === "rejected") {
            return "bg-[#FDECEC] text-[#F65353] border-[#F65353]";
        }

        return "bg-[#F5F6FA] text-[#696969] border-[#BABABA]";
    };

    return (
        <div className="min-h-screen py-4 px-3 sm:py-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-[#E9E9E9] p-4 sm:p-6 lg:p-10 mt-6 sm:mt-10 lg:mt-20">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold italic text-[#1F1F1F] mb-2">
                        Welcome to Our Platform
                    </h1>
                </div>

                <div className="bg-white p-4 sm:p-6 lg:p-10">
                    {/* Main Content - Half/half Layout */}
                    <div className="flex flex-col lg:flex-row gap-6 border border-[#BABABA] p-4 sm:p-6 lg:p-10">
                        {/* Left Section - Instructions */}
                        <div className="w-full lg:w-1/2 lg:pr-6">
                            <div>
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#4C4C4C] mb-4">
                                    Thank you for joining our platform.
                                </h2>

                                <p className="text-[#696969] text-sm sm:text-base font-normal mb-6 leading-relaxed">
                                    You are currently in the Arrangement Phase for our investment program.
                                    To continue, you will need to complete a simple step-by-step verification process.
                                </p>

                                <div className="mb-8">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#4C4C4C] mb-3">
                                        What You Need to Do
                                    </h3>
                                    <ul className="space-y-2 text-[#696969] text-sm sm:text-base font-normal">
                                        <li className="flex gap-2">
                                            <span className="font-semibold">{arrangementProgress.total_steps} Steps Only</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-blue-600">•</span>
                                            <span>Download all required forms</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-blue-600">•</span>
                                            <span>Carefully review and sign each form</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-blue-600">•</span>
                                            <span>Submit the signed documents through the platform</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-[#4C4C4C] mb-3">
                                        After Submission
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Once your documents are successfully reviewed and approved, you will be able to:
                                    </p>
                                    <ul className="space-y-2 text-[#696969] text-sm sm:text-base font-normal">
                                        <li className="flex gap-2">
                                            <span className="text-green-600">✓</span>
                                            <span>Explore available projects</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-green-600">✓</span>
                                            <span>Access detailed project information</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-green-600">✓</span>
                                            <span>Start investing in suitable opportunities</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-[#F5F6FA]  p-4">
                                    <p className="text-sm sm:text-base lg:text-xl text-[#038862] font-medium text-center">
                                        Thank you for your cooperation and interest in<br />
                                        working with us.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Progress Steps */}
                        <div className="w-full lg:w-1/2 lg:border-l lg:border-[#BABABA] lg:pl-6">
                            <div className="">
                                {/* Step Header */}
                                <div className="mb-6">
                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#1F1F1F]">
                                        Step {currentStep} <span className="text-[#F65353] text-lg sm:text-xl font-normal">(Out of {arrangementProgress.total_steps})</span>
                                    </h3>
                                </div>

                                {/* Completed Steps */}
                                {completedSteps.length > 0 && (
                                    <div className="mb-8 space-y-2">
                                        {completedSteps.map((step) => {
                                            const doc = arrangementProgress.completed_documents.find(d => d.step === step);
                                            return (
                                                <div key={step} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-[#038862] p-4 hover:shadow-md transition-shadow">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="shrink-0">
                                                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#038862]">
                                                                <Check className="h-4 w-4 text-white" />
                                                            </div>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {doc?.title || `Step ${step}`}
                                                            </p>

                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
                                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusChip(doc?.status || "approved")}`}>
                                                            {doc?.status || "approved"}
                                                        </span>
                                                        <button
                                                            onClick={() => handleDownload(doc!.signed_file, `step-${step}-signed.pdf`)}
                                                            className="shrink-0 text-gray-500 hover:text-gray-700"
                                                            title="Download signed document"
                                                        >
                                                            <Download className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Current Step Section */}
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                        Now
                                    </h4>

                                    {arrangementProgress.current_document && (
                                        <div className="border border-gray-300 rounded-lg p-4 sm:p-5 lg:p-6 bg-gray-50">
                                            {/* File Title */}
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-4">
                                                <h5 className="text-lg sm:text-xl font-semibold text-gray-900">
                                                    {arrangementProgress.current_document.title}
                                                </h5>
                                                <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusChip(arrangementProgress.current_document.status)}`}>
                                                    {arrangementProgress.current_document.status}
                                                </span>
                                            </div>

                                            {/* File Info */}
                                            <div className="mb-6">
                                                <p className="text-xs sm:text-sm text-gray-600">
                                                    <span className="font-medium">
                                                        {arrangementProgress.current_document.download_file.split('.').pop()?.toUpperCase()}
                                                    </span>
                                                    <span className="text-gray-400 mx-1">•</span>
                                                    <span className="text-gray-600">12MB</span>
                                                </p>
                                            </div>

                                            {/* Download and Upload Buttons */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                                <button
                                                    onClick={() => handleDownload(
                                                        arrangementProgress.current_document.download_file,
                                                        `${arrangementProgress.current_document.title}.pdf`
                                                    )}
                                                    disabled={downloadingId !== null}
                                                    className="w-full flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2.5 px-4 rounded transition-colors disabled:opacity-50 text-sm"
                                                >
                                                    {downloadingId ? (
                                                        <>
                                                            <Loader className="h-4 w-4 animate-spin" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Download className="h-4 w-4" />
                                                            DOWNLOAD
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="w-full flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2.5 px-4 rounded transition-colors text-sm"
                                                >
                                                    <Upload className="h-4 w-4" />
                                                    UPLOAD
                                                </button>
                                            </div>

                                            {/* File Input */}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                            />

                                            {/* Selected File Display */}
                                            {uploadedFile && (
                                                <div className="bg-white border border-gray-300 rounded p-3 mb-4 wrap-break-word">
                                                    <p className="text-xs text-gray-500 mb-1">SELECTED FILE</p>
                                                    <p className="text-sm text-gray-700 font-medium wrap-break-word">
                                                        {uploadedFile.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            )}

                                            {/* Error Message */}
                                            {uploadError && (
                                                <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 flex gap-2">
                                                    <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                                                    <p className="text-sm text-red-700">{uploadError}</p>
                                                </div>
                                            )}

                                            {/* Success Message */}
                                            {uploadSuccess && (
                                                <div className="bg-green-50 border border-green-200 rounded p-3 mb-4 flex gap-2">
                                                    <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                                                    <p className="text-sm text-green-700">File uploaded successfully!</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button - Full Width */}
                                <button
                                    onClick={handleUpload}
                                    disabled={!uploadedFile || isUploadingArrangementProgress || uploadSuccess}
                                    className="w-full bg-[#B91D1D] hover:bg-[#9A1A1A] disabled:bg-gray-400 text-white font-bold py-3 px-6 transition-colors text-sm sm:text-base flex items-center justify-center gap-2 mb-6"
                                >
                                    {isUploadingArrangementProgress ? (
                                        <>
                                            <Loader className="h-5 w-5 animate-spin" />
                                            UPLOADING...
                                        </>
                                    ) : uploadSuccess ? (
                                        <>
                                            <Check className="h-5 w-5" />
                                            UPLOAD SUCCESSFUL
                                        </>
                                    ) : (
                                        "SUBMIT NOW"
                                    )}
                                </button>


                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
