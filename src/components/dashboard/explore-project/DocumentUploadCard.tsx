"use client";

import React from "react";
import { Download, Upload, FileText, type LucideIcon } from "lucide-react";

interface DocumentUploadCardProps {
    title: string;
    description: string;
    fileName?: string;
    icon: LucideIcon;
    type: "upload" | "download";
    onAction?: () => void;
}

export default function DocumentUploadCard({
    title,
    description,
    fileName,
    icon: Icon,
    type,
    onAction
}: DocumentUploadCardProps) {
    return (
        <div className="bg-white p-4 sm:p-5 flex flex-col justify-between h-full border border-transparent hover:border-[#F65353]/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <div>
                <div className="mb-4">
                    <Icon className="w-6 h-6 text-[#8B8B8B]" />
                </div>
                <h3 className="text-sm font-bold text-[#1F1F1F] uppercase mb-1">{title}</h3>
                <p className="text-[11px] text-[#A0A0A0] leading-relaxed mb-4">{description}</p>
            </div>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F5F5F5]">
                <div className="flex items-center gap-2 overflow-hidden mr-2">
                    {fileName && (
                        <span className="text-[10px] font-medium text-[#F65353] truncate uppercase tracking-wider">
                            {fileName}
                        </span>
                    )}
                </div>
                
                <button
                    onClick={onAction}
                    className="flex items-center justify-center p-2 border border-[#D3D5DA] hover:bg-gray-50 transition-colors"
                >
                    {type === "upload" ? (
                        <div className="flex items-center gap-2 px-1">
                            <span className="text-[10px] font-bold text-[#1F1F1F] uppercase">Upload</span>
                        </div>
                    ) : (
                        <Download className="w-4 h-4 text-[#1F1F1F]" />
                    )}
                </button>
            </div>
        </div>
    );
}
