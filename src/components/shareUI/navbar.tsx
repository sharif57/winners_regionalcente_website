"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUserProfileQuery } from "@/redux/feature/userSlice";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/feature/authSlice";
import baseApi from "@/redux/Api/baseApi";

type ProfileData = {
    name?: string;
    email?: string;
    profile_image?: string;
};

type NavItem = {
    label: string;
    href: string;
    active?: boolean;
    dropdown?: Array<{ label: string; href: string }>;
};

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        href: "/#about",
        dropdown: [
            { label: "About Us", href: "/#about" },
            { label: "News & Insights", href: "/#news-insights" },
        ],
    },
    {
        label: "EB-5 Immigration",
        href: "#",
        dropdown: [
            { label: "EB-5 Immigration", href: "/eb-5-visa" },
            { label: "Our Projects", href: "/eb-5-visa/our-project" },
            { label: "Job Creation", href: "/eb-5-visa/job-creation" },
        ],
    },
    { label: "Wealth Management", href: "/wealth-management" },
    { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const hasToken = typeof window !== "undefined" && Boolean(localStorage.getItem("accessToken"));

    const { data: userProfile } = useUserProfileQuery(undefined, {
        skip: !hasToken,
    });

    console.log(userProfile, '=============')

    const profile = ((userProfile as { data?: ProfileData } | undefined)?.data ?? userProfile) as ProfileData | undefined;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileDropdown = (label: string) => {
        setMobileExpanded((current) => (current === label ? null : label));
    };

    const isLinkActive = (href: string) => {
        if (href === "#") return false;
        if (href === "/" && pathname === "/") return true;
        if (href !== "/" && pathname.startsWith(href)) return true;
        return false;
    };

    const isLoggedIn = hasToken && Boolean(profile?.name || profile?.email || profile?.profile_image);

    const handleLogout = () => {
        dispatch(logoutAction());
        dispatch(baseApi.util.invalidateTags(["User"]));
        setProfileMenuOpen(false);
        setMenuOpen(false);
        router.push("/");
    };

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-100 w-full transition-all duration-300 border-b",
            isScrolled
                ? "bg-white/95 backdrop-blur-md shadow-sm border-[#e9e9e9] py-0"
                : "bg-white border-transparent py-1"
        )}>
            <div className="mx-auto flex h-19 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="shrink-0" aria-label="The Winners Regional Center">
                    <Image
                        src="/image/logo.svg"
                        alt="The Winners Regional Center"
                        width={178}
                        height={52}
                        priority
                        className="h-auto w-36.5 sm:w-40 lg:w-44.5"
                    />
                </Link>

                <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
                    {navItems.map((item) => {
                        const isActive = isLinkActive(item.href) ||
                            (item.dropdown?.some(sub => isLinkActive(sub.href)));

                        if (!item.dropdown) {
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "relative inline-flex items-center gap-1 text-[16px] leading-none transition-all duration-300 py-2",
                                        isActive
                                            ? "font-bold text-[#b91d1d]"
                                            : "font-normal text-[#1f1f1f] hover:text-[#b91d1d]"
                                    )}
                                >
                                    <span>{item.label}</span>
                                    {isActive && (
                                        <span className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-[#b91d1d]" />
                                    )}
                                </Link>
                            );
                        }

                        return (
                            <div key={item.label} className="group relative">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "inline-flex items-center gap-1 text-[16px] font-normal leading-none transition-colors py-2",
                                        isActive ? "font-bold text-[#b91d1d]" : "text-[#1f1f1f] hover:text-[#b91d1d]"
                                    )}
                                >
                                    <span>{item.label}</span>
                                    <ChevronDown className={cn("mt-px h-4 w-4 transition-transform", isActive && "text-[#b91d1d]")} />
                                </Link>

                                <div className="invisible absolute left-1/2 top-full z-30 mt-4 w-64 -translate-x-1/2 rounded-md border border-[#ececec] bg-white p-2 opacity-0 shadow-[0_18px_40px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                                    {item.dropdown.map((subItem) => (
                                        <Link
                                            key={subItem.label}
                                            href={subItem.href}
                                            className="block rounded-md px-3 py-2.5 text-[15px] text-[#1f1f1f] transition-colors hover:bg-[#f6f6f6] hover:text-[#b91d1d]"
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-4 lg:flex">
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileMenuOpen((current) => !current)}
                                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#d9d9d9] bg-white shadow-sm transition-transform hover:scale-[1.02]"
                                aria-label="Open profile menu"
                                aria-expanded={profileMenuOpen}
                            >
                                {profile?.profile_image ? (
                                    <Image
                                        src={profile.profile_image}
                                        alt={profile?.name ?? "User profile"}
                                        width={48}
                                        height={48}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-[14px] font-bold uppercase text-[#1f1f1f]">
                                        {(profile?.name ?? "U").charAt(0)}
                                    </span>
                                )}
                            </button>

                            {profileMenuOpen && (
                                <div className="absolute right-0 top-full z-40 mt-3 w-64 rounded-md border border-[#ececec] bg-white p-4 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                                    <div className="mb-3 border-b border-[#f0f0f0] pb-3">
                                        <p className="text-[15px] font-bold text-[#1f1f1f]">{profile?.name ?? "User"}</p>
                                        <p className="text-[13px] text-[#6b6b6b]">{profile?.email ?? ""}</p>
                                    </div>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setProfileMenuOpen(false)}
                                        className="block rounded-md px-3 py-2 text-[14px] font-medium text-[#1f1f1f] transition-colors hover:bg-[#f6f6f6] hover:text-[#b91d1d]"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="mt-2 block w-full rounded-md px-3 py-2 text-left text-[14px] font-medium text-[#b91d1d] transition-colors hover:bg-[#fff5f5]"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/auth/login" className="hidden lg:block">
                            <button className="h-12 border border-primary px-7 text-[15px] font-bold uppercase tracking-[0.01em] text-primary transition-colors ">
                                Log In
                            </button>
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <Link href="/request-evaluation" className="hidden lg:block">
                            <button className="h-12 min-w-52.5 bg-[#b91d1d] px-7 text-[15px] font-bold uppercase tracking-[0.01em] text-white transition-colors hover:bg-[#9f1717]">
                                Request Evaluation
                            </button>
                        </Link>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#d9d9d9] text-[#1f1f1f] lg:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {menuOpen && (
                <div className="border-t border-[#ededed] bg-white lg:hidden">
                    <nav
                        className="mx-auto flex w-full max-w-300 flex-col px-4 py-3 sm:px-6"
                        aria-label="Mobile Primary"
                    >
                        {navItems.map((item) => {
                            const isActive = isLinkActive(item.href) ||
                                (item.dropdown?.some(sub => isLinkActive(sub.href)));

                            if (!item.dropdown) {
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between py-4 text-[16px] border-b border-gray-50",
                                            isActive ? "font-bold text-[#b91d1d]" : "font-normal text-[#1f1f1f]"
                                        )}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            }

                            const expanded = mobileExpanded === item.label;

                            return (
                                <div key={item.label} className="border-b border-gray-50">
                                    <button
                                        type="button"
                                        onClick={() => toggleMobileDropdown(item.label)}
                                        className={cn(
                                            "flex w-full items-center justify-between py-4 text-left text-[16px] font-normal transition-colors",
                                            isActive ? "text-[#b91d1d]" : "text-[#1f1f1f]"
                                        )}
                                        aria-expanded={expanded}
                                    >
                                        <span>{item.label}</span>
                                        <ChevronDown
                                            className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
                                        />
                                    </button>

                                    {expanded && (
                                        <div className="flex flex-col bg-[#fafafa] px-4 py-2 space-y-3">
                                            {item.dropdown.map((subItem) => {
                                                const isSubActive = isLinkActive(subItem.href);
                                                return (
                                                    <Link
                                                        key={subItem.label}
                                                        href={subItem.href}
                                                        className={cn(
                                                            "text-[14px] transition-colors py-1",
                                                            isSubActive ? "font-bold text-[#b91d1d]" : "text-[#1f1f1f] hover:text-[#b91d1d]"
                                                        )}
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {isLoggedIn && (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="flex items-center justify-between py-4 text-[16px] border-b border-gray-50 font-medium text-[#1f1f1f]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <span>Dashboard</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="mt-2 h-11 w-full border border-[#b91d1d] px-4 text-[14px] font-bold uppercase tracking-[0.01em] text-[#b91d1d]"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                        {!isLoggedIn && (
                            <Link href="/request-evaluation">
                                <button className="mt-2 h-11 w-full bg-[#b91d1d] px-4 text-[14px] font-bold uppercase tracking-[0.01em] text-white">
                                    Request Evaluation
                                </button>
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
