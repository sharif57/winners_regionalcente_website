import React from "react";
import ManagementBanner from "@/components/wealth-management/management--banner";
import InstitutionalSection from "@/components/wealth-management/InstitutionalSection";
import Onboarding from "@/components/wealth-management/Onboarding";
import Practices from "@/components/wealth-management/Practices";
import PartnerCTA from "@/components/wealth-management/PartnerCTA";

export default function WealthManagement() {
  return (
    <div className="pt-20 bg-[#fafafa] space-y-6 lg:space-y-12">
      {/* Hero Banner (Untouched) */}
      <ManagementBanner />

      {/* New Section: Master Your Wealth with Institutional Precision */}
      <InstitutionalSection />

      {/* Onboarding Process (Untouched) */}
      <Onboarding />

      {/* Operational Best Practices (Enhanced with Summary Diagrams + Detailed Explanations) */}
      <Practices />

      {/* New Section: Partner with Uncompromising Excellence CTA */}
      <PartnerCTA />
    </div>
  );
}