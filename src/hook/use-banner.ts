"use client";

export const useBanner = () => {
  const bannerData = {
    tagline: "ESTABLISHED & USCIS APPROVED",
    description: "A USCIS - Approved gateway connecting global investors to premier Texas development projects through EB-5 Program (Green Card) leading to permanent residency and a pathway to US Citizenship.",
    primaryButton: {
      label: "JOIN NOW",
      href: "/join",
    },
    secondaryButton: {
      label: "EXPLORE TEXAS PROJECTS",
      href: "/projects",
    },
    backgroundImage: "/image/background1.png",
  };

  return bannerData;
};
