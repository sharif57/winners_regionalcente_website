"use client";

import { cn } from "@/lib/utils";
import CheckIcon from "../icon/check";
import BadgeIcon from "../icon/badge";
import BuildingIcon from "../icon/building";
import FileIcon from "../icon/file";

const certificates = [
    {
        icon: CheckIcon,
        label: "USCIS Approved Program",
    },
    {
        icon: BadgeIcon,
        label: "Black Chamber of Commerce",
    },
    {
        icon: BuildingIcon,
        label: "African Chamber of Commerce",
    },
    {
        icon: FileIcon,
        label: "SEC Compliant",
    },
];

export default function CertificationsBar() {
    return (
        <section className="w-full bg-[#E8E9EC80] py-8 lg:py-10">
            <div className="container mx-auto ">
                <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-4 lg:divide-x lg:divide-gray-300">
                    {certificates.map((cert) => (
                        <div
                            key={cert.label}
                            className={cn(
                                "flex items-center gap-3 px-4 lg:flex-1 justify-center cursor-pointer",
                                "transition-all duration-300 hover:scale-105 group"
                            )}
                        >
                            <cert.icon />
                            <span className="text-secondary text-sm lg:text-xl font-normal whitespace-nowrap lg:whitespace-normal xl:whitespace-nowrap">
                                {cert.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
