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

const notificationGroups: NotificationGroup[] = [
    {
        label: "TODAY",
        accent: true,
        items: [
            {
                title: "Your Invested $200,00 in Winner Tower at Milk",
                description:
                    "Style: Modern Zen. View your newly generated backyard transformation and explore materials used.",
                time: "2 minutes ago",
                tone: "neutral",
            },
        ],
    },
    {
        label: "YESTERDAY",
        items: [
            {
                title: "Document Approved",
                description: "Your submitted document has been successfully verified.",
                time: "3.00 PM",
                tone: "success",
            },
            {
                title: "Document Required",
                description: "Additional documents are needed to complete your verification.",
                time: "3.00 PM",
                tone: "danger",
            },
        ],
    },
    {
        label: "EARLIER",
        items: [
            {
                title: "Project Progress Updated",
                description: "Your project has reached a new milestone in construction.",
                time: "19 March, 2025",
                tone: "success",
            },
            {
                title: "Password Changed",
                description: "Your account password was updated successfully.",
                time: "19 March, 2025",
                tone: "danger",
            },
            {
                title: "Investment Approved",
                description: "Your investment has been approved.",
                time: "19 March, 2025",
                tone: "muted",
            },
        ],
    },
];

const toneStyles: Record<NotificationTone, string> = {
    neutral: "bg-[#757D92]",
    success: "bg-[#129874]",
    danger: "bg-[#FF4D57]",
    muted: "bg-[#C8CDD8]",
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

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
    return (
        <section className="w-full  space-y-8 bg-[#FFFFFF] sm:space-y-10 p-6">
            {notificationGroups.map((group) => (
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
                        {group.items.map((item) => (
                            <NotificationCard
                                key={`${group.label}-${item.title}`}
                                title={item.title}
                                description={item.description}
                                time={item.time}
                                tone={item.tone}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </section>
    );
}
