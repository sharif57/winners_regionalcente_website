"use client";

import { clearFocus } from "@/redux/features/helper/focusSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Footer() {
    const [formData, setFormData] = useState({ name: "", email: "", note: "" });
    const [submitted, setSubmitted] = useState(false);

    const { target, requestId } = useAppSelector((state) => state.focus);
    const dispatch = useAppDispatch();

    const nameInputRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if (!target) return;

        const timer = window.setTimeout(() => {
            if (target === "reachout") {
                nameInputRef.current?.focus();
            }

            dispatch(clearFocus());
        }, 400);

        return () => window.clearTimeout(timer);
    }, [target, requestId, dispatch]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", note: "" });
        }, 2500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <footer id="reachout" className="w-full bg-[#121E38]">

            {/* ── Main Content ── */}
            <div className="mx-auto w-full container     px-5 py-14 sm:px-8 lg:px-12">
                <div className="flex flex-wrap gap-10 lg:gap-[200px]">

                    {/* ── Col 1: Brand Info ── */}
                    <div className="flex w-full flex-col gap-5 sm:w-auto sm:flex-1 sm:basis-60">
                        <Image
                            src="/image/Frame 12.png"
                            alt="The Winners Regional Center"
                            width={178}
                            height={52}
                            priority
                            className="h-auto w-[146px] sm:w-[160px] lg:w-[178px]"
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
                    <div className="flex w-full flex-col gap-4 sm:flex-1 sm:basis-72 lg:order-none">
                        <h2 className="text-center font-['Playfair_Display'] text-[26px] font-normal italic text-white">
                            Request an Evaluation
                        </h2>
                        <div className="mx-auto h-[3px] w-14 rounded-full bg-[#b91d1d]" />

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
                                className={`h-12 w-full text-sm font-semibold uppercase tracking-widest text-white transition-all active:scale-[0.98] ${submitted
                                    ? "bg-green-700 cursor-default"
                                    : "bg-[#b91d1d] hover:bg-[#9f1717]"
                                    }`}
                            >
                                {submitted ? "✓ Message Sent!" : "Connect Now"}
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
                                { label: "About Us", href: "#" },
                                { label: "How it works", href: "#" },
                                { label: "Our Projects", href: "#" },
                                { label: "EB-5 Program", href: "#" },
                                { label: "Contact Us", href: "#" },
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
                            <Image
                                src="/image/Frame 12 (1).svg"
                                alt="The Winners Regional Center"
                                width={178}
                                height={52}
                                priority
                                className="h-auto w-[146px] sm:w-[160px] lg:w-[178px]"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Copyright Bar ── */}
            <div className="border-t border-[#2a3f5f] bg-[#0e1a2e] py-4">
                <p className="text-center text-sm text-white">
                    © {new Date().getFullYear()} The Winners Regional Center. All Rights Reserved.
                </p>
            </div>

        </footer>
    );
}