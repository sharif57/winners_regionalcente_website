"use client";

import React from "react";
import { Settings, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface InvestmentSuccessProps {
    projectData: {
        name: string;
        amount: string;
        roi: string;
    };
}

export default function InvestmentSuccess({ projectData }: InvestmentSuccessProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 animate-in fade-in zoom-in duration-500">
            <div className="mb-8">
                <h1 className="text-[28px] md:text-[36px] font-semibold italic text-secondary text-center leading-tight">
                    Investment Request Submitted
                </h1>
                <p className="mt-4 text-[#6A6A6A] text-center max-w-[500px] mx-auto text-sm leading-relaxed">
                    Our team will review your submission and contact you shortly with next steps
                </p>
            </div>

            <div className=" mb-12">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M102.583 28.1956L92.4858 18.098C91.5811 17.1932 90.1559 17.0786 89.121 17.8284L79.7701 24.5767C79.0048 25.1282 77.9978 25.2304 77.1458 24.8307C75.9529 24.2699 74.7383 23.7742 73.5052 23.3404C72.5974 23.0213 71.9467 22.2219 71.8042 21.2707L70.0908 9.72306C69.9018 8.44653 68.805 7.50153 67.516 7.50153H53.2356C51.9591 7.50153 50.8685 8.42794 50.664 9.68898L48.7647 21.4349C48.6129 22.3706 47.9622 23.1452 47.073 23.4705C45.9638 23.8733 44.87 24.3257 43.7918 24.8307C42.9212 25.2397 41.8987 25.1437 41.1241 24.5705L31.4758 17.4132C30.4378 16.6448 28.9971 16.7502 28.083 17.6642L17.9823 27.7587C17.0776 28.6634 16.963 30.0887 17.7128 31.1235L24.7647 40.8989C25.3224 41.6735 25.4091 42.6867 25.0002 43.548C24.5106 44.5798 24.0707 45.627 23.6772 46.6898C23.3456 47.5852 22.5586 48.2327 21.6136 48.3722L9.60435 50.1537C8.32782 50.3427 7.38281 51.4396 7.38281 52.7285V67.0089C7.38281 68.2854 8.30923 69.376 9.57026 69.5805L21.3441 71.486C22.2953 71.6409 23.0761 72.3071 23.3921 73.2149C23.7794 74.3303 24.2163 75.4334 24.7058 76.5178C25.0962 77.3822 24.994 78.3892 24.4301 79.1483L17.2945 88.7688C16.5261 89.8067 16.6315 91.2475 17.5455 92.1615L27.6431 102.259C28.5478 103.164 29.9731 103.278 31.0079 102.529L40.4022 95.7494C41.1799 95.1886 42.2054 95.0956 43.0668 95.5201C44.2504 96.1057 45.4587 96.6293 46.6857 97.0879C47.5687 97.4194 48.1946 98.2064 48.334 99.139L50.0381 110.634C50.2271 111.911 51.3239 112.856 52.6129 112.856H66.8933C68.1698 112.856 69.2604 111.929 69.4649 110.668L71.2589 99.5759C71.4138 98.6216 72.0892 97.8377 73.0064 97.5279C74.3387 97.0786 75.6524 96.5581 76.9413 95.9632C77.8119 95.5604 78.8282 95.6564 79.5997 96.2296L88.6562 102.947C89.6942 103.715 91.1349 103.61 92.049 102.696L102.147 92.5984C103.051 91.6936 103.166 90.2684 102.416 89.2335L95.9436 80.2606C95.3797 79.4767 95.2992 78.4481 95.7236 77.5805C96.3681 76.2637 96.932 74.919 97.4184 73.5526C97.7438 72.6417 98.5369 71.9787 99.4943 71.8361L110.528 70.2002C111.804 70.0112 112.749 68.9144 112.749 67.6255V53.3451C112.749 52.0685 111.823 50.9779 110.562 50.7734L99.5129 48.9856C98.5679 48.8338 97.7871 48.1708 97.468 47.266C97.0002 45.943 96.461 44.6417 95.8476 43.3652C95.4262 42.4884 95.516 41.4535 96.0954 40.6727L102.838 31.5821C103.603 30.5534 103.497 29.1096 102.583 28.1956ZM89.372 60.1801C89.372 76.366 76.2504 89.4876 60.0645 89.4876C43.8785 89.4876 30.7569 76.366 30.7569 60.1801C30.7569 43.9942 43.8785 30.8726 60.0645 30.8726C76.2504 30.8726 89.372 43.9942 89.372 60.1801Z" fill="#038862" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M50.9075 73.1406L44.0384 66.2715C42.232 64.4652 42.232 61.5372 44.0384 59.7309C45.8447 57.9245 48.7727 57.9245 50.579 59.7309L53.8695 63.0213L69.5411 47.3498C71.3474 45.5434 74.2754 45.5434 76.0817 47.3498C77.8881 49.1561 77.8881 52.0841 76.0817 53.8904L56.8315 73.1406C55.1956 74.7766 52.5434 74.7766 50.9075 73.1406Z" fill="#038862" />
                </svg>

            </div>

            <div className="w-full max-w-[600px] bg-[#E8E9EC52] p-6 md:p-8 rounded-sm mb-10">
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                        <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Project Name</span>
                        <span className="text-sm font-bold italic text-secondary">{projectData.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                        <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Investment Amount</span>
                        <span className="text-sm font-bold text-secondary">{projectData.amount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200/50">
                        <span className="text-xs font-medium text-[#6A6A6A] uppercase tracking-wider">Estimate ROI</span>
                        <div className="text-right">
                            <span className="text-sm font-bold text-[#F65353]">{projectData.roi}</span>
                            <span className="text-xs text-[#6A6A6A] italic ml-1">(annually)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[600px]">
                <button className="flex-1 border border-[#E0E2E7] bg-white py-3.5 text-xs font-bold text-secondary uppercase tracking-widest hover:bg-gray-50 transition-colors">
                    VIEW MY PROJECT
                </button>
                <Link href="/dashboard" className="flex-1">
                    <button className="w-full bg-[#C91E1E] py-3.5 text-xs font-bold text-white uppercase tracking-widest hover:bg-[#AD1717] transition-colors">
                        GO TO DASHBOARD
                    </button>
                </Link>
            </div>
        </div>
    );
}
