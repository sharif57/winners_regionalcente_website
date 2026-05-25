"use client";

import { useBanner } from "@/hook/use-banner";
import { Button } from "@/components/ui/button";

export default function VisaBanner() {
    const {
        tagline,
        title,
        description,
        primaryButton,
        backgroundImage,
    } = useBanner("eb5");

    const handleDownloadProcessImage = async () => {
        const imageUrl = "/images/EB5_Process.png";
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = objectUrl;
        downloadLink.download = "EB5_Process.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();
        URL.revokeObjectURL(objectUrl);
    };

    return (
        <section className="relative w-full min-h-125 lg:min-h-200 flex items-center overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                <div className="absolute inset-0 bg-black/60 lg:bg-linear-to-r lg:from-black/80 lg:to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
                <div className="max-w-4xl space-y-5 animate-in fade-in slide-in-from-left-10 duration-1000">

                    {/* Tagline */}
                    <p className="text-primary font-bold text-sm lg:text-base tracking-[0.2em] transform transition-all hover:translate-x-1">
                        {tagline}
                    </p>

                    {/* Title */}
                    <h1 className="text-white text-2xl lg:text-[60px] font-extrabold italic  leading-relaxed lg:leading-snug max-w-2xl lg:max-w-6xl">
                        {title}
                    </h1>

                    {/* Main Description with Red Vertical Border */}
                    <div className="border-l-4 border-primary pl-6 lg:pl-6">
                        <h1 className="text-white text-[22px]  leading-relaxed lg:leading-snug font-medium max-w-2xl lg:max-w-6xl">
                            {description}
                        </h1>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8 pt-4">
                        <Button
                            onClick={handleDownloadProcessImage}
                            className="w-full sm:w-auto bg-[#C51D1D] hover:bg-[#A31818] text-white px-10 py-7 text-base font-bold rounded-none transition-all duration-300 transform hover:scale-105 border-none"
                        >
                            {primaryButton.label}
                        </Button>

                    </div>
                </div>
            </div>
        </section>
    );
}
