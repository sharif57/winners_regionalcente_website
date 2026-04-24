"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Menu } from "lucide-react";

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#E8E9EC]">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex min-h-screen flex-1 flex-col lg:ml-64">
                {/* Mobile Top Bar */}
                <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-md border border-gray-200 bg-white p-2 text-[#121E38]"
                        aria-label="Open sidebar"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <h1 className="text-sm font-semibold text-[#121E38]">
                        Dashboard
                    </h1>
                </div>

                <DashboardHeader />

                <main className="flex-1 p-4 sm:p-6 lg:p-[28px]">
                    {children}
                </main>
            </div>
        </div>
    );
}