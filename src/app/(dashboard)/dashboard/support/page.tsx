"use client";

import { useState } from "react";

export default function SupportPage() {
    const [message, setMessage] = useState("");

    return (
        <section className="w-full bg-[#FFFFFF] p-6">
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-center xl:gap-10">
                <div className="flex min-w-0 flex-col justify-center">
                    <label
                        htmlFor="support-message"
                        className="mb-3 block text-[18px] leading-none font-medium text-[#1F1F1F]"
                    >
                        Message
                    </label>

                    <textarea
                        id="support-message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Type your notification message here..."
                        className="min-h-[170px] w-full resize-none rounded-[2px] bg-[#E8E9EC52] px-6 py-6 text-[18px] leading-[1.45] text-[#1F1F1F] outline-none transition placeholder:text-[#6C6C6C] focus:ring-1 focus:ring-[#C91E1E]/25 sm:min-h-[185px] sm:px-7 sm:py-7"
                    />

                    <p className="mt-3 text-right text-[16px] font-medium text-[#60708A]">
                        {message.length} characters
                    </p>
                </div>

                <div className="flex items-center justify-center xl:justify-end">
                    <button
                        type="button"
                        className="flex min-h-[52px] w-full items-center justify-center bg-[#C91E1E] px-8 py-3 text-[17px] font-bold uppercase tracking-[0.03em] text-white transition-colors hover:bg-[#AD1717] sm:w-[170px]"
                    >
                        Send Now
                    </button>
                </div>
            </div>
        </section>
    );
}
