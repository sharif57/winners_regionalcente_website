"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function SupportPage() {
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!message.trim()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            setMessage("");
            setIsSubmitting(false);
            toast.success("Support message sent successfully!");
        }, 1000);
    };

    return (
        <section className="w-full bg-white p-6">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-center xl:gap-10"
            >
                <div className="flex min-w-0 flex-col justify-center">
                    <label
                        htmlFor="support-message"
                        className="mb-3 block text-[18px] font-medium leading-none text-[#1F1F1F]"
                    >
                        Message
                    </label>

                    <textarea
                        id="support-message"
                        name="message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Type your support message here..."
                        className="min-h-[170px] w-full resize-none rounded-[2px] bg-[#E8E9EC52] px-6 py-6 text-[18px] leading-[1.45] text-[#1F1F1F] outline-none transition placeholder:text-[#6C6C6C] focus:ring-1 focus:ring-[#C91E1E]/25 sm:min-h-[185px] sm:px-7 sm:py-7"
                        spellCheck={false}
                        autoComplete="off"
                        required
                    />

                    <p className="mt-3 text-right text-[16px] font-medium text-[#60708A]">
                        {message.length} characters
                    </p>
                </div>

                <div className="flex items-center justify-center xl:justify-end">
                    <button
                        type="submit"
                        disabled={!message.trim() || isSubmitting}
                        className="flex min-h-[52px] w-full items-center justify-center bg-[#C91E1E] px-8 py-3 text-[17px] font-bold uppercase tracking-[0.03em] text-white transition-colors hover:bg-[#AD1717] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[170px]"
                    >
                        {isSubmitting ? "Sending..." : "Send Now"}
                    </button>
                </div>
            </form>
        </section>
    );
}