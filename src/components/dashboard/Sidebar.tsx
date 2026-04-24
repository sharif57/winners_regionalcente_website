"use client";

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
    LogOut,
    X,
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

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out",
                "lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            {/* Logo Section */}
            <div className="relative border-b border-gray-100">
                <Link
                    href="/"
                    onClick={onClose}
                    className="block p-6"
                >
                    <Image
                        src="/image/authlogo.svg"
                        alt="Winners Regional Center"
                        width={400}
                        height={400}
                        className="mx-auto size-[120px] h-auto"
                    />
                </Link>

                {/* Mobile Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-[#121E38] lg:hidden"
                    aria-label="Close sidebar"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 space-y-1 pt-4">
                {menuItems.map((item) => {
                    const isActive =
                        item.href === "/dashboard"
                            ? pathname === "/dashboard"
                            : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "group relative flex items-center gap-4 px-6 py-4 text-sm font-semibold tracking-tight transition-all duration-300",
                                isActive
                                    ? "text-white"
                                    : "text-[#696969] hover:bg-gray-50 hover:text-[#121E38]"
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-[#434D64] shadow-lg animate-in fade-in slide-in-from-left-2 duration-300" />
                            )}

                            <div className="relative z-10 flex w-full items-center gap-4">
                                <item.icon
                                    className={cn(
                                        "h-5 w-5 transition-all duration-300",
                                        isActive
                                            ? "scale-110 text-white"
                                            : "text-gray-400 group-hover:text-[#121E38]"
                                    )}
                                />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Section */}
            <div className="border-t border-gray-100 p-4">
                <button
                    className="group flex w-full items-center gap-4 rounded-sm px-4 py-4 text-sm font-bold text-[#696969] transition-all hover:bg-red-50 hover:text-[#F65353]"
                >
                    <LogOut className="h-5 w-5 group-hover:text-[#F65353]" />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
}
