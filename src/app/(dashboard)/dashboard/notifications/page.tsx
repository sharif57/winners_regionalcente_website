'use client';
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNotificationListQuery } from "@/redux/feature/projectSlice";

type NotificationTone = "neutral" | "success" | "danger" | "muted";

type NotificationItem = {
    title: string;
    description: string;
    time: string;
    tone: NotificationTone;
};

type NotificationGroup = {
    label: string;
    accent?: boolean;
    items: NotificationItem[];
};

const toneStyles: Record<NotificationTone, string> = {
    neutral: "bg-[#757D92]",
    success: "bg-[#129874]",
    danger: "bg-[#FF4D57]",
    muted: "bg-[#C8CDD8]",
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

const getNotificationTone = (isRead: boolean): NotificationTone => {
    return isRead ? "muted" : "neutral";
};

const formatTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getDateGroup = (dateStr: string): string => {
    const date = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const notifDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (notifDate.getTime() === today.getTime()) {
        return "TODAY";
    } else if (notifDate.getTime() === yesterday.getTime()) {
        return "YESTERDAY";
    } else {
        return "EARLIER";
    }
};

function NotificationCard({ title, description, time, tone }: NotificationItem) {
    return (
        <article className="flex flex-col gap-4 bg-[#E8E9EC52] px-4 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-start rounded-lg lg:justify-between lg:px-8 lg:py-8">
            <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                <span
                    aria-hidden="true"
                    className={cn("mt-2 h-6 w-6 shrink-0 rounded-full sm:h-7 sm:w-7", toneStyles[tone])}
                />

                <div className="min-w-0">
                    <h2 className="text-[20px] leading-tight font-medium text-[#1F1F1F] sm:text-[26px] lg:text-[28px]">
                        {title}
                    </h2>
                    <p className="mt-3 max-w-[860px] text-[15px] leading-[1.45] text-[#696969] font-normal sm:text-[18px]">
                        {description}
                    </p>
                </div>
            </div>

            <p className="pl-10 text-left text-[16px] font-medium whitespace-nowrap text-[#4E4E4E] sm:pl-[52px] lg:pl-6 lg:pt-1 lg:text-right">
                {time}
            </p>
        </article>
    );
}

export default function NotificationsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError, isFetching } = useNotificationListQuery({
        page: currentPage,
    });

    const notifications = data?.data?.results ?? [];
    const totalCount = data?.data?.count ?? 0;
    const pageSize = 10;
    const totalPages = Math.ceil(totalCount / pageSize);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages || page === currentPage) {
            return;
        }
        setCurrentPage(page);
    };

    const groupedNotifications: Record<string, NotificationItem[]> = {
        TODAY: [],
        YESTERDAY: [],
        EARLIER: [],
    };

    notifications.forEach((notif) => {
        const group = getDateGroup(notif.created_at);
        groupedNotifications[group].push({
            title: notif.title,
            description: notif.message,
            time: formatTime(notif.created_at),
            tone: getNotificationTone(notif.is_read),
        });
    });

    const notificationGroups: NotificationGroup[] = [
        {
            label: "TODAY",
            accent: true,
            items: groupedNotifications["TODAY"],
        },
        {
            label: "YESTERDAY",
            items: groupedNotifications["YESTERDAY"],
        },
        {
            label: "EARLIER",
            items: groupedNotifications["EARLIER"],
        },
    ].filter((group) => group.items.length > 0);

    return (
        <section className="w-full space-y-8 bg-[#FFFFFF] sm:space-y-10 p-6">
            {isLoading && (
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={`skeleton-${index}`} className="bg-[#E8E9EC52] px-4 py-5 sm:px-6 sm:py-6 rounded-lg h-24 animate-pulse" />
                    ))}
                </div>
            )}

            {isError && (
                <p className="text-[#C91E1E] text-base">Failed to load notifications. Please try again.</p>
            )}

            {!isLoading && !isError && notifications.length === 0 && (
                <p className="text-[#696969] text-base">No notifications yet.</p>
            )}

            {!isLoading && !isError && notificationGroups.map((group) => (
                <section key={group.label}>
                    <h1
                        className={cn(
                            "text-[22px] font-medium italic text-secondary sm:text-[24px]",
                            group.accent && "text-primary"
                        )}
                    >
                        {group.label}
                    </h1>

                    <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-6">
                        {group.items.map((item, idx) => (
                            <NotificationCard
                                key={`${group.label}-${idx}`}
                                title={item.title}
                                description={item.description}
                                time={item.time}
                                tone={item.tone}
                            />
                        ))}
                    </div>
                </section>
            ))}

            {!isLoading && !isError && notifications.length > 0 && totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 mt-16 text-[#1A1A1A]">
                    <button
                        type="button"
                        className={cn(
                            "p-2 hover:text-primary transition-colors",
                            (currentPage === 1 || isFetching) && "opacity-50 cursor-not-allowed hover:text-[#1A1A1A]"
                        )}
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1 || isFetching}
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="flex gap-3">
                        {Array.from({ length: totalPages }).map((_, index) => {
                            const pageNumber = index + 1;

                            return (
                                <button
                                    key={pageNumber}
                                    type="button"
                                    onClick={() => goToPage(pageNumber)}
                                    disabled={isFetching}
                                    aria-label={`Page ${pageNumber}`}
                                    className={cn(
                                        "rounded-full transition-all duration-300",
                                        pageNumber === currentPage ? "bg-primary w-6 h-2.5" : "bg-[#D1D1D1] w-2.5 h-2.5",
                                        isFetching && "cursor-not-allowed"
                                    )}
                                />
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        className={cn(
                            "p-2 hover:text-primary transition-colors",
                            (currentPage === totalPages || isFetching) && "opacity-50 cursor-not-allowed hover:text-[#1A1A1A]"
                        )}
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages || isFetching}
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}
        </section>
    );
}
