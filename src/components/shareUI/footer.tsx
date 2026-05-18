/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSendEvaluationRequestMutation } from "@/redux/feature/evaluationSlice";
import { useGetSettingsQuery } from "@/redux/feature/settingSlice";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CiFacebook, CiYoutube } from "react-icons/ci";
import { FaLinkedin, FaTiktok } from "react-icons/fa";
import { toast } from "sonner";

export default function Footer() {
    const [formData, setFormData] = useState({ name: "", email: "", note: "" });
    const { data } = useGetSettingsQuery(undefined);
    console.log(data?.data, 'footer');


    const nameInputRef = useRef<HTMLInputElement | null>(null);

    const [sendEvaluationRequest, { isLoading }] = useSendEvaluationRequestMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            //   "email": "vt-cV37LYgJzOnX@HnI.jjo",
            //   "full_name": "string",
            //   "message": "string",
            const data = {
                full_name: formData.name,
                email: formData.email,
                message: formData.note,
            }
            const response = await sendEvaluationRequest(data).unwrap();
            toast.success(response?.message || "Evaluation request submitted successfully!");
        } catch (error: any) {
            toast.error(error?.message || "Failed to submit evaluation request.");
        }
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <footer id="reachout" className="w-full bg-[#121E38]">

            {/* ── Main Content ── */}
            <div className="mx-auto w-full container     px-5 py-14 sm:px-8 lg:px-12">
                <div className="flex flex-wrap gap-10 lg:gap-50">

                    {/* ── Col 1: Brand Info ── */}
                    <div className="flex w-full flex-col gap-5 sm:w-auto sm:flex-1 sm:basis-60">
                        <Image
                            src="/image/Frame 12.png"
                            alt="The Winners Regional Center"
                            width={178}
                            height={52}
                            priority
                            className="h-auto w-36.5 sm:w-40 lg:w-44.5"
                        />

                        <p className="text-sm leading-relaxed text-white">
                            We are a United States Immigration Services (USCIS) approved
                            Employment-Based Fifth Preference (EB-5) immigration investor
                            regional center for the State of Texas.
                        </p>

                        <div className="flex flex-col gap-1">
                            <h3 className="font-['Playfair_Display'] text-base font-bold italic text-white">
                                Address
                            </h3>
                            <p className="text-sm text-white">
                                1709 Martin Luther King Jr Blvd, Dallas, TX 75215.
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <h3 className="font-['Playfair_Display'] text-base font-bold italic text-white">
                                Call Now
                            </h3>
                            <Link
                                href="tel:12149168282"
                                className="text-sm text-white transition-colors hover:text-[#b91d1d]"
                            >
                                1-214-916-8282
                            </Link>
                        </div>
                    </div>

                    {/* ── Col 2: Evaluation Form ── */}
                    <div className="flex w-full flex-col gap-4 sm:flex-1 sm:basis-72 lg:order-0">
                        <h2 className="text-center font-['Playfair_Display'] text-[26px] font-normal italic text-white">
                            Request an Evaluation
                        </h2>
                        <div className="mx-auto h-0.75 w-14 rounded-full bg-[#b91d1d]" />

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            {/* Name + Email row */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    className="h-12 w-full rounded-lg border border-white/25 bg-transparent px-4 text-sm text-white placeholder-[#8fa3bf] outline-none transition-all focus:border-[#b91d1d] focus:ring-2 focus:ring-[#b91d1d]/20"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    className="h-12 w-full rounded-lg border border-white/25 bg-transparent px-4 text-sm text-white placeholder-[#8fa3bf] outline-none transition-all focus:border-[#b91d1d] focus:ring-2 focus:ring-[#b91d1d]/20"
                                    required
                                />
                            </div>

                            {/* Textarea */}
                            <textarea
                                name="note"
                                placeholder="Add Note"
                                value={formData.note}
                                onChange={handleChange}
                                rows={4}
                                className="w-full resize-none rounded-lg border border-white/25 bg-transparent px-4 py-3 text-sm text-white placeholder-[#8fa3bf] outline-none transition-all focus:border-[#b91d1d] focus:ring-2 focus:ring-[#b91d1d]/20"
                                required
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                className={`h-12 w-full text-sm font-semibold uppercase tracking-widest text-white transition-all active:scale-[0.98] ${isLoading
                                    ? "bg-green-700 cursor-default"
                                    : "bg-[#b91d1d] hover:bg-[#9f1717]"
                                    }`}
                            >
                                {isLoading ? "✓ Message Sent!" : "Connect Now"}
                            </button>
                        </form>
                    </div>

                    {/* ── Col 3: Important Links ── */}
                    <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-1 sm:basis-44">
                        <h3 className="font-['Playfair_Display'] text-xl font-normal italic text-white">
                            Important Links
                        </h3>
                        <div className="h-0.5 w-10 rounded-full bg-[#b91d1d]" />

                        <nav className="flex flex-col gap-2">
                            {[
                                { label: "About Us", href: "/about-us" },
                                { label: "Privacy Policy", href: "/privacy-policy" },
                                { label: "Terms of Use", href: "/terms-of-use" },
                                { label: "Our Projects", href: "/explore-project" },
                                { label: "EB-5 Program", href: "/eb-5-visa" },
                                { label: "Contact Us", href: "/request-evaluation" },
                            ].map(({ label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="group flex items-center gap-2 text-sm text-white transition-colors hover:text-[#b91d1d]"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#b91d1d] opacity-0 transition-opacity group-hover:opacity-100" />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-col gap-1 space-y-5">
                            <h3 className="font-['Playfair_Display'] text-xl font-normal italic text-white">
                                Social
                            </h3>
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="https://www.facebook.com/profile.php?id=61582209998376"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-white transition-colors hover:text-[#b91d1d]"
                                >
                                    <CiFacebook size={24} className="transition-colors" />
                                    Facebook
                                </Link>
                                <Link
                                    href="https://www.youtube.com/@capitalfinancewinners"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-white transition-colors hover:text-[#b91d1d]"
                                >
                                    <CiYoutube size={24} className="transition-colors" />
                                    YouTube
                                </Link>
                                <Link
                                    href="https://www.tiktok.com/@winners6823"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-white transition-colors hover:text-[#b91d1d]"
                                >
                                    <FaTiktok size={24} className="transition-colors" />
                                    TikTok
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/winners-capital-finance-a46922405"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-white transition-colors hover:text-[#b91d1d]"
                                >
                                    <FaLinkedin size={24} className="transition-colors" />
                                    LinkedIn
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Copyright Bar ── */}
            <div className="border-t border-[#2a3f5f] bg-[#0e1a2e] py-4">
                <p className="text-center text-sm text-white">
                    © {new Date().getFullYear()} Where Global Ambition Meets American Opportunity. All Rights Reserved.
                </p>
            </div>

        </footer>
    );
}