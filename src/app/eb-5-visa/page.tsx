import VisaBanner from "@/components/visa/visa-banner";
import ReusableHeader from "@/hook/resuable-header";
import Family from "@/components/visa/Family";

export default function EB5VisaPage() {
    return (
        <main className="">
            <VisaBanner />

            <section className="py-[32px] bg-white">
                {/* Section Header */}
                <ReusableHeader
                    title="What Is The EB-5 Visa Program?"
                    description="The EB-5 Immigrant Investor Program is a U.S. government initiative that allows foreign nationals to obtain lawful permanent residency (a Green Card) by making a qualifying investment in the United States. The program aims to stimulate economic growth by creating jobs for U.S. workers while providing investors and their families an opportunity to live, work, and study in the United States."
                    className="pb-16"
                />
            </section>

            <Family />

        </main>
    );
}