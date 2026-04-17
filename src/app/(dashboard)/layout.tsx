import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#F9FAFB] min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-64 flex flex-col ">
                <DashboardHeader />
                <main className="flex-1 p-6 lg:p-[28px] ">
                    {children}
                </main>
            </div>
        </div>
    );
}
