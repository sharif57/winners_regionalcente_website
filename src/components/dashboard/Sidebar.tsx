"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    PlusCircle,
    Bell,
    Settings,
    Headphones,
    LogOut,
    X,
    Loader2,
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
    const router = useRouter();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const openLogoutModal = () => {
        onClose();
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        if (isLoggingOut) return;
        setShowLogoutModal(false);
    };

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);

            localStorage.removeItem("token");
            localStorage.removeItem("user");


            await new Promise((resolve) => setTimeout(resolve, 800));

            router.replace("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
            setIsLoggingOut(false);
        }
    };

    return (
        <>
            <aside
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out",
                    "lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Section */}
                <div className="relative border-b border-gray-100">
                    <Link href="/" onClick={onClose} className="block p-6">
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
                        type="button"
                        onClick={openLogoutModal}
                        className="group flex w-full items-center gap-4 rounded-sm px-4 py-4 text-sm font-bold text-[#696969] transition-all hover:bg-red-50 hover:text-[#F65353]"
                    >
                        <LogOut className="h-5 w-5 group-hover:text-[#F65353]" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4">
                    <div className="w-full max-w-[420px] rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-[#121E38]">
                                    Confirm Logout
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-[#696969]">
                                    Are you sure you want to logout from your account?
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeLogoutModal}
                                disabled={isLoggingOut}
                                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Close logout modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={closeLogoutModal}
                                disabled={isLoggingOut}
                                className="min-h-[44px] rounded-md border border-gray-200 px-5 text-sm font-semibold text-[#121E38] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#C91E1E] px-5 text-sm font-semibold text-white transition hover:bg-[#AD1717] disabled:cursor-not-allowed disabled:opacity-80"
                            >
                                {isLoggingOut && <Loader2 className="h-4 w-4 animate-spin" />}
                                {isLoggingOut ? "Logging out..." : "Yes, Logout"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

