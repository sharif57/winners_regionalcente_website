/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "sonner";

const messageText = `Hi,

Welcome to our network of job creators dedicated to the economic revitalization of Texas through strategic international investment.

Our mission at Winners Regional Center is to facilitate transparent, high-impact development.

We hope to do this together by creating at least 10 fulltime Texas jobs and maintain integrity policies, background checks, and fund administration oversight required by the 2022 Reform and Integrity Act (RIA) to ensure successful outcomes for your dreams and the dreams of our international investors.

We are excited by your interest. To move on, please create your account with us by filling the form adjacent in order to review more details about expected opportunities and our joint roles and responsibilities.

Be sure that our servers utilize bank level multi-layered data protection standards to secure your data by law.

If there are any questions, don't hesitate to reach out to wrc@winnersregionalcenter.com and we try to respond as promptly as we can.

Once again, welcome to The Winners Regional Center
'Where Global Ambition Meets American Opportunity'`;

export default function JobCreator() {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {



            toast.success("Your request has been submitted successfully!");
            setFullName("");
            setPhone("");
            setEmail("");
            setQuestion("");
        } catch (error: any) {
            toast.error("Failed to submit. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#efefef] px-4 py-8 sm:px-6 md:py-10 lg:px-8 mt-14">
            <title>Winners Regional Center - Job Creator</title>
            <section className="mx-auto w-full max-w-6xl">
                <h1 className="mb-4 inline-block px-3 py-2 text-base font-medium italic text-[#1F1F1F] sm:mb-5 sm:text-[20px] md:text-[24px]">
                    New Job Creator Sign Up
                </h1>

                <div className="border bg-white p-4 sm:p-6 md:p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 border">

                        <div className="order-2 md:order-1">
                            <div className="h-full bg-white p-6">
                                <div className="prose max-w-none text-lg font-normal text-[#4C4C4C] leading-relaxed">
                                    {messageText.split("\n\n").map((para, idx) => (
                                        <p key={idx} className="mb-4">{para}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <aside className="order-1 md:order-2 border-l">
                            <div className="h-full bg-white p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="h-4 w-4 rounded-full bg-[#F65353]" />
                                    <span className="text-base font-medium text-[#F65353]">
                                        New Job Creator Sign Up
                                    </span>
                                </div>

                                <h2 className="mb-4 text-2xl sm:text-4xl font-semibold leading-tight text-[#1F1F1F] italic">
                                    Job Creator Form
                                </h2>
                                <p className="mb-4 text-base text-[#4C4C4C] font-normal">
                                    Our team will get back to you as soon as possible
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            placeholder="Full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full rounded-sm border border-[#d7d7d7] bg-white px-3 py-2 text-sm text-[#222] outline-none focus:border-[#e64040]"
                                            required
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full rounded-sm border border-[#d7d7d7] bg-white px-3 py-2 text-sm text-[#222] outline-none focus:border-[#e64040]"
                                        />
                                    </div>

                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-sm border border-[#d7d7d7] bg-white px-3 py-2 text-sm text-[#222] outline-none focus:border-[#e64040]"
                                        required
                                    />

                                    <textarea
                                        placeholder="Any question? Write here"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        rows={4}
                                        className="w-full resize-y rounded-sm border border-[#d7d7d7] bg-white px-3 py-2 text-sm text-[#222] outline-none focus:border-[#e64040]"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="mt-3 w-full bg-[#b91d1d] px-4 py-3 text-sm font-semibold text-white hover:bg-[#9f1717] disabled:opacity-60"
                                    >
                                        {isLoading ? "Processing..." : "Click To Proceed"}
                                    </button>
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}