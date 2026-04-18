"use client";

import Image from "next/image";
import type { ChangeEvent, ComponentType } from "react";
import { useEffect, useRef, useState } from "react";
import {
    Check,
    Eye,
    EyeOff,
    ImageUp,
    Info,
    Lock,
    Pencil,
    Shield,
    UserRound,
} from "lucide-react";

type SettingsTab = "personal" | "password" | "about" | "terms";

type PersonalInfoState = {
    name: string;
    phone: string;
    country: string;
};

type PasswordState = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

type NavItem = {
    id: SettingsTab;
    label: string;
    icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
    { id: "personal", label: "Personal Information", icon: UserRound },
    { id: "password", label: "Change Password", icon: Lock },
    { id: "about", label: "About Us", icon: Info },
    { id: "terms", label: "Terms & Policy", icon: Shield },
];

const defaultPersonalInfo: PersonalInfoState = {
    name: "Mr. John",
    phone: "01772968958",
    country: "Bangladesh",
};

const defaultPasswordState: PasswordState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type MenuButtonProps = {
    active: boolean;
    icon: NavItem["icon"];
    label: string;
    onClick: () => void;
};

function MenuButton({ active, icon: Icon, label, onClick }: MenuButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-4 rounded-sm border bg-[#E8E9EC52] px-7 py-5 text-left text-[18px] font-medium text-[#4B4B4B] transition-colors",
                active ? "border-primary bg-white" : "border-transparent hover:border-[#E8B4B4]/60"
            )}
        >
            <Icon className="h-5 w-5 shrink-0 text-[#4B4B4B]" />
            <span>{label}</span>
        </button>
    );
}

type FieldCardProps = {
    label: string;
    value: string;
    icon: "edit" | "check";
    onChange: (value: string) => void;
};

function FieldCard({ label, value, icon, onChange }: FieldCardProps) {
    return (
        <div className="flex items-center gap-4 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5">
            <div className="min-w-0 flex-1">
                <p className="text-[14px] leading-none font-normal text-[#6C6C6C]">{label}</p>
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="mt-2 w-full border-none bg-transparent p-0 text-[20px] leading-tight font-normal text-[#5A5A5A] outline-none sm:text-[18px]"
                />
            </div>

            <span className="shrink-0 text-[#4B4B4B]">
                {icon === "edit" ? <Pencil className="h-5 w-5" /> : <Check className="h-6 w-6" />}
            </span>
        </div>
    );
}

type PasswordFieldProps = {
    id: keyof PasswordState;
    label: string;
    value: string;
    visible: boolean;
    onChange: (value: string) => void;
    onToggle: () => void;
};

function PasswordField({ id, label, value, visible, onChange, onToggle }: PasswordFieldProps) {
    return (
        <div className="relative bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5">
            <label htmlFor={id} className="block text-[14px] leading-none font-normal text-[#6C6C6C]">
                {label}
            </label>
            <input
                id={id}
                type={visible ? "text" : "password"}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2 w-full border-none bg-transparent p-0 pr-10 text-[20px] leading-tight font-normal text-[#5A5A5A] outline-none sm:text-[18px]"
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#4B4B4B] sm:right-5"
                aria-label={visible ? `Hide ${label}` : `Show ${label}`}
            >
                {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
        </div>
    );
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("personal");
    const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
    const [savedPersonalInfo, setSavedPersonalInfo] = useState(defaultPersonalInfo);
    const [passwords, setPasswords] = useState(defaultPasswordState);
    const [savedPasswords, setSavedPasswords] = useState(defaultPasswordState);
    const [showPasswords, setShowPasswords] = useState<Record<keyof PasswordState, boolean>>({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [photoPreview, setPhotoPreview] = useState("/image/men.png");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const objectUrlRef = useRef<string | null>(null);

    useEffect(() => {
        return () => {
            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }
        };
    }, []);

    const handleUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
        }

        const nextUrl = URL.createObjectURL(file);
        objectUrlRef.current = nextUrl;
        setPhotoPreview(nextUrl);
    };

    const handleCancel = () => {
        if (activeTab === "personal") {
            setPersonalInfo(savedPersonalInfo);
            return;
        }

        if (activeTab === "password") {
            setPasswords(savedPasswords);
        }
    };

    const handleSave = () => {
        if (activeTab === "personal") {
            setSavedPersonalInfo(personalInfo);
            return;
        }

        if (activeTab === "password") {
            setSavedPasswords(passwords);
        }
    };

    const renderPanel = () => {
        if (activeTab === "personal") {
            return (
                <>
                    <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
                        Personal Information
                    </h1>

                    <div className="mt-8 flex flex-col items-center ">
                        <div className="relative h-[170px] w-[170px] overflow-hidden rounded-full bg-[#ECEDEF] sm:h-[200px] sm:w-[200px]">
                            <Image
                                src={photoPreview}
                                alt="Profile photo"
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 170px, 200px"
                            />
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleUploadPhoto}
                            className="hidden"
                        />

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-5 inline-flex items-center gap-3 border border-[#D8D8D8] bg-white px-5 py-3 text-[16px] font-medium text-[#1F1F1F] transition-colors hover:bg-[#F8F8F8]"
                        >
                            <ImageUp className="h-5 w-5" />
                            <span>Upload Photo</span>
                        </button>
                    </div>

                    <div className="mt-8 rounded-sm bg-[#E8E9EC52] p-4 sm:p-6">
                        <div className="space-y-5">
                            <FieldCard
                                label="Your name"
                                value={personalInfo.name}
                                icon="edit"
                                onChange={(value) => setPersonalInfo((current) => ({ ...current, name: value }))}
                            />
                            <FieldCard
                                label="Phone number"
                                value={personalInfo.phone}
                                icon="edit"
                                onChange={(value) => setPersonalInfo((current) => ({ ...current, phone: value }))}
                            />
                            <FieldCard
                                label="Country"
                                value={personalInfo.country}
                                icon="check"
                                onChange={(value) => setPersonalInfo((current) => ({ ...current, country: value }))}
                            />
                        </div>
                    </div>
                </>
            );
        }

        if (activeTab === "password") {
            return (
                <>
                    <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
                        Change Password
                    </h1>

                    <div className="mt-10 rounded-sm bg-[#E8E9EC52] p-4 sm:p-6">
                        <div className="space-y-4">
                            <PasswordField
                                id="oldPassword"
                                label="Old password"
                                value={passwords.oldPassword}
                                visible={showPasswords.oldPassword}
                                onChange={(value) => setPasswords((current) => ({ ...current, oldPassword: value }))}
                                onToggle={() =>
                                    setShowPasswords((current) => ({
                                        ...current,
                                        oldPassword: !current.oldPassword,
                                    }))
                                }
                            />
                            <PasswordField
                                id="newPassword"
                                label="New password"
                                value={passwords.newPassword}
                                visible={showPasswords.newPassword}
                                onChange={(value) => setPasswords((current) => ({ ...current, newPassword: value }))}
                                onToggle={() =>
                                    setShowPasswords((current) => ({
                                        ...current,
                                        newPassword: !current.newPassword,
                                    }))
                                }
                            />
                            <PasswordField
                                id="confirmPassword"
                                label="Confirm new password"
                                value={passwords.confirmPassword}
                                visible={showPasswords.confirmPassword}
                                onChange={(value) =>
                                    setPasswords((current) => ({ ...current, confirmPassword: value }))
                                }
                                onToggle={() =>
                                    setShowPasswords((current) => ({
                                        ...current,
                                        confirmPassword: !current.confirmPassword,
                                    }))
                                }
                            />
                        </div>
                    </div>
                </>
            );
        }

        if (activeTab === "about") {
            return (
                <>
                    <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
                        About Us
                    </h1>

                    <div className="mt-8 bg-[#E8E9EC52] p-5 sm:p-6">
                        <p className="max-w-[960px] text-[16px] leading-[1.45] font-normal text-[#5E5E5E] sm:text-[17px]">
                            At Winners Regional Center (WRC), we are committed to connecting global investors with
                            high-quality, secure, and growth-driven investment opportunities. Our platform is designed
                            to simplify the investment process by offering transparent project insights, seamless
                            communication, and reliable support at every stage. With a focus on trust, innovation, and
                            long-term value, we empower investors to make informed decisions while helping projects
                            achieve sustainable success. Our dedicated team ensures a smooth experience through advanced
                            technology, expert evaluation, and continuous monitoring, making WRC a trusted partner in
                            your investment journey.
                        </p>
                    </div>
                </>
            );
        }

        return (
            <>
                <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
                    Terms & Policy
                </h1>

                <div className="mt-8 bg-[#E8E9EC52] p-5 sm:p-6">
                    <div className="space-y-4 text-[16px] leading-[1.5] text-[#5E5E5E] sm:text-[17px]">
                        <p>
                            By using Winners Regional Center, you agree to provide accurate information, protect your
                            account credentials, and use the platform only for lawful investment-related activities.
                        </p>
                        <p>
                            We collect and store personal information solely to support onboarding, identity
                            verification, investor communication, and project administration. Your information is
                            managed with confidentiality and operational safeguards.
                        </p>
                        <p>
                            Project information, timelines, and performance targets are presented for informational
                            purposes and may change based on regulatory, financial, or market conditions. You should
                            review all relevant documents before making investment decisions.
                        </p>
                    </div>
                </div>
            </>
        );
    };

    return (
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[460px_minmax(0,1fr)]">
            <aside className="rounded-[20px] border border-[#E2E7F1] bg-white p-5 sm:p-6">
                <div className="space-y-4">
                    {navItems.map((item) => (
                        <MenuButton
                            key={item.id}
                            active={activeTab === item.id}
                            icon={item.icon}
                            label={item.label}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </div>
            </aside>

            <section className="rounded-[20px] border border-[#E2E7F1] bg-white p-5 sm:p-6 lg:p-7">
                {renderPanel()}

                {(activeTab === "personal" || activeTab === "password") && (
                    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex min-h-[58px] items-center justify-center border border-[#D7D7D7] bg-white px-6 py-3 text-[16px] font-bold uppercase text-[#4B4B4B] transition-colors hover:bg-[#F8F8F8]"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex min-h-[58px] items-center justify-center bg-[#C91E1E] px-6 py-3 text-[16px] font-bold uppercase text-white transition-colors hover:bg-[#AD1717]"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </section>
        </section>
    );
}
