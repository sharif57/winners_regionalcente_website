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
import CertificationsBar from "@/components/home/certifications-bar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Banner />
      <CertificationsBar />

      {/* <section className="py-20"> */}
      <div id="about">
        <ReusableHeader
          badge="ABOUT US"
          title="Where Global Ambition Meets American Opportunity"
          description="At Winners Regional Center, we combine the stability of a USCIS-Approved framework with the ambition of global investors. We don't just facilitate visas, we bridge the gap between international capital and the booming Texas economy. Our mission is simple: Where Global Ambition Meets American Opportunity."
        />
      </div>
      {/* </section> */}
      <div id="news-insights">
        <NewsSection />
      </div>

      <FeaturesSection />

      <JourneyFeatures />

      <HowItWorks />

      <WealthManagement />

      <ProjectsSection />



      <ContactSection />

      <div id="faq">
        <FaqSection />
      </div>
    </main>
  );
}
