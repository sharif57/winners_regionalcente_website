import React from "react";
import DashboardShell from "@/components/dashboard/sidebar/DashboardSidebar";
export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardShell>{children}</DashboardShell>;
}

