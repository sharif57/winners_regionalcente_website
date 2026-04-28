"use client";

import { FormEvent, useState } from "react";

const initialTemplate = `
Hi [First Name]

Thanks for contacting the Winners Regional Center, Dallas, Texas about growing your investments in the near future. 


May I remind you that several potential possibilities are potential pathways offered by the Winners Regional Center from this moment on and we are happy to explore them together with you.

Regarding the EB5 Green Card pathway, the basic criteria is your ability to show that your net worth is more than $1 Million USD excluding your primary residence or that you command an annual income of $200K USD or more. These funds must be legally traceable.

Even then, in a case that you need to develop the $1 Million USD Winners Regional Center has facilities to help you build your portfolio to qualify quicker than our competition. Starting with $200K USD, we are able to help you rapidly reach your goal of $800k or $1.05 Million USD.

We are in fact a wealth management firm. Therefore, if immigration to the USA is not your objective at this time, our fund managers can show you higher yielding vehicles that we employ to boost your wealth status with an investment of $200K USD or more. 

Finally, to proceed with an EB5 application, you need to secure an immigration attorney. This is purely your responsibility. However, we are open to sharing our panel of qualified attorneys with you to contact directly or through us.

If you have any questions, please do not hesitate to let us know. Better still, if you are ready to proceed, I await your confirmation. 

You may reach out to me directly at wrc@winnersregionalcenter.com

Looking forward to your response!


`;

export default function Page() {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");
    const message = initialTemplate;
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate request - replace with real API integration
        await new Promise((r) => setTimeout(r, 900));
        console.log({ fullName, phone, email, question });
        setSubmitting(false);
        setSubmitted(true);
        setFullName("");
        setPhone("");
        setEmail("");
        setQuestion("");
    };

    return (
        <main className="min-h-screen bg-[#efefef] px-4 py-8 sm:px-6 md:py-10 lg:px-8 mt-14">
            <section className="mx-auto w-full max-w-6xl">
                <h1 className="mb-4 inline-block px-3 py-2 text-base font-medium italic text-[#1F1F1F] sm:mb-5 sm:text-[20px] md:text-[24px]">
                    Request Evaluation
                </h1>

                <div className=" border  bg-white p-4  sm:p-6 md:p-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 border">
                        <div className="order-2 md:order-1">
                            <div className="h-full  bg-white p-6">
                                <div className="prose max-w-none text-lg font-normal text-[#4C4C4C] leading-relaxed">
                                    {message.split("\n\n").map((para, idx) => (
                                        <p key={idx} className="mb-4">{para}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <aside className="order-1 md:order-2 border-l  ">
                            <div className="h-full  bg-white p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="h-4 w-4 rounded-full bg-[#F65353]" />
                                    <span className="text-base font-medium  text-[#F65353]">INVESTMENT STRATEGY</span>
                                </div>

                                <h2 className="mb-4 text-2xl sm:text-4xl font-semibold leading-tight text-[#1F1F1F] italic">Start Your EB-5 Journey Today</h2>
                                <p className="mb-4 text-base text-[#4C4C4C] font-normal">Our immigration experts and financial advisors will evaluate your eligibility and provide a custom investment road map for your family.</p>

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
                                        disabled={submitting}
                                        className="mt-3 w-full  bg-[#b91d1d] px-4 py-3 text-sm font-semibold text-white hover:bg-[#9f1717] disabled:opacity-60"
                                    >
                                        {submitting ? "Submitting..." : "SUBMIT YOUR EVALUATION REQUEST"}
                                    </button>

                                    {submitted && (
                                        <p className="mt-2 text-sm text-green-700">Thank you — your request has been submitted.</p>
                                    )}
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* Full-width submit bar below content */}
                <div className="mt-6">
                    <button
                        type="button"
                        onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                        className="w-full  bg-[#b91d1d] px-4 py-3 text-sm font-semibold text-white hover:bg-[#9f1717]"
                    >
                        SUBMIT
                    </button>
                </div>
            </section>
        </main>
    );
}
