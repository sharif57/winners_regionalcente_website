"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    PlusCircle,
    Bell,
    Settings,
    Headphones,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { label: "My Project", icon: Briefcase, href: "/dashboard/my-project" },
    { label: "Explore Project", icon: PlusCircle, href: "/dashboard/explore-project" },
    { label: "Notification", icon: Bell, href: "/dashboard/notifications" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    { label: "Support", icon: Headphones, href: "/dashboard/support" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-50">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100 mb-4">
                <Image
                    src="/image/authlogo.svg"
                    alt="Winners Regional Center"
                    width={180}
                    height={40}
                    className="mx-auto"
                />
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1  space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 px-4 py-4 text-sm font-bold tracking-tight transition-all ",
                                isActive
                                    ? "bg-[#434D64] text-white shadow-lg"
                                    : "text-[#696969] hover:bg-gray-50 hover:text-[#121E38]"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400")} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Section */}
            <div className="p-4 border-t border-gray-100">
                <button
                    className="w-full flex items-center gap-4 px-4 py-4 text-sm font-bold text-[#696969] hover:text-[#F65353] hover:bg-red-50 transition-all rounded-sm group"
                >
                    <LogOut className="w-5 h-5 group-hover:text-[#F65353]" />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
}
