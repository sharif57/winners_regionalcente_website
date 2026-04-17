import Banner from "@/components/home/banner";
import ReusableHeader from "@/hook/resuable-header";
import NewsSection from "@/components/home/news-section";
import FeaturesSection from "@/components/home/features-section";
import JourneyFeatures from "@/components/home/journey-features";
import HowItWorks from "@/components/home/how-it-works";
import WealthManagement from "@/components/home/wealth-management";
import ProjectsSection from "@/components/home/projects-section";
import FaqSection from "@/components/home/faq-section";
import ContactSection from "@/components/home/contact-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-white space-y-[32px]">
      <Banner />

      {/* <section className="py-20"> */}
      <ReusableHeader
        badge="ABOUT US"
        title="Where Global Ambition Meets American Opportunity"
        description="At Winners Regional Center, we combine the stability of a USCIS-Approved framework with the ambition of global investors. We don't just facilitate visas, we bridge the gap between international capital and the booming Texas economy. Our mission is simple: Where Global Ambition Meets American Opportunity."
      />
      {/* </section> */}
      <NewsSection />

      <FeaturesSection />

      <JourneyFeatures />

      <HowItWorks />

      <WealthManagement />

      <ProjectsSection />



      <ContactSection />

      <FaqSection />
    </main>
  );
}
