"use client";

import Image from "next/image";
import { useAllSupportMessagesQuery, useSubmitSupportMessageMutation } from "@/redux/feature/supportSlice";
import { useState } from "react";
import { toast } from "sonner";

type SupportReply = {
    id: number;
    message?: string;
    created_at?: string;
};

type SupportMessage = {
    id: number;
    message?: string;
    created_at?: string;
    user_name?: string;
    user_email?: string;
    user_profile_image?: string;
    replies?: SupportReply[];
};

const getSupportMessages = (response: unknown): SupportMessage[] => {
    if (Array.isArray(response)) {
        return response as SupportMessage[];
    }

    if (response && typeof response === "object" && "data" in response) {
        const data = (response as { data?: unknown }).data;

        if (Array.isArray(data)) {
            return data as SupportMessage[];
        }

        if (data && typeof data === "object" && "results" in data) {
            const results = (data as { results?: unknown }).results;
            return Array.isArray(results) ? (results as SupportMessage[]) : [];
        }
    }

    return [];
};

export default function SupportPage() {
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data: supportMessagesData, isLoading, isError } = useAllSupportMessagesQuery(undefined);
    const [submitSupportMessage] = useSubmitSupportMessageMutation();
    const supportMessages = getSupportMessages(supportMessagesData);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!message.trim()) return;

        setIsSubmitting(true);

        try {
            await submitSupportMessage({ subject: "Support Message", message }).unwrap();
            setMessage("");
            toast.success("Support message sent successfully!");
        } catch (err) {
            console.error("Support submit error:", err);
            toast.error("Failed to send support message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                        className="min-h-42.5 w-full resize-none rounded-xs bg-[#E8E9EC52] px-6 py-6 text-[18px] leading-[1.45] text-[#1F1F1F] outline-none transition placeholder:text-[#6C6C6C] focus:ring-1 focus:ring-[#C91E1E]/25 sm:min-h-46.25 sm:px-7 sm:py-7"
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
                        className="flex min-h-13 w-full items-center justify-center bg-[#C91E1E] px-8 py-3 text-[17px] font-bold uppercase tracking-[0.03em] text-white transition-colors hover:bg-[#AD1717] disabled:cursor-not-allowed disabled:opacity-60 sm:w-42.5"
                    >
                        {isSubmitting ? "Sending..." : "Send Now"}
                    </button>
                </div>
            </form>

            {/* Previous support messages */}
            <div className="mt-8">
                <h4 className="mb-4 text-lg font-semibold text-[#1F1F1F]">Previous Messages</h4>

                {isLoading ? (
                    <div className="rounded-sm bg-[#F9FAFB] p-4 text-sm text-[#696969]">Loading support messages...</div>
                ) : isError ? (
                    <div className="rounded-sm bg-[#F9FAFB] p-4 text-sm text-[#C91E1E]">Failed to load support messages.</div>
                ) : supportMessages.length === 0 ? (
                    <div className="rounded-sm bg-[#F9FAFB] p-4 text-sm text-[#696969]">No support messages yet.</div>
                ) : (
                    <div className="space-y-4">
                        {supportMessages.map((supportMessage) => (
                            <article key={supportMessage.id} className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
                                <div className="flex items-start gap-4">
                                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#E5E7EB]">
                                        {supportMessage.user_profile_image ? (
                                            <Image
                                                src={supportMessage.user_profile_image}
                                                alt={supportMessage.user_name ?? "Support user"}
                                                fill
                                                className="object-cover"
                                                sizes="48px"
                                            />
                                        ) : null}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-semibold text-[#1F1F1F]">
                                                    {supportMessage.user_name ?? "Support"}
                                                </p>
                                                {supportMessage.user_email ? (
                                                    <p className="text-xs text-[#6B7280]">{supportMessage.user_email}</p>
                                                ) : null}
                                            </div>

                                            <p className="text-xs text-[#9A9A9A]">
                                                {supportMessage.created_at ? new Date(supportMessage.created_at).toLocaleString() : ""}
                                            </p>
                                        </div>

                                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#374151]">
                                            {supportMessage.message}
                                        </p>

                                        <div className="mt-4 space-y-3">
                                            {(supportMessage.replies ?? []).length > 0 ? (
                                                <>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
                                                        Replies
                                                    </p>
                                                    {supportMessage.replies?.map((reply) => (
                                                        <div key={reply.id} className="rounded-md bg-white px-4 py-3 ring-1 ring-[#E5E7EB]">
                                                            <p className="whitespace-pre-line text-sm text-[#374151]">{reply.message}</p>
                                                            <p className="mt-2 text-xs text-[#9A9A9A]">
                                                                {reply.created_at ? new Date(reply.created_at).toLocaleString() : ""}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}