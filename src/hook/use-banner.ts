"use client";

export interface BannerData {
  tagline: string;
  title?: string;
  description: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
  backgroundImage: string;
}

export type BannerType = "home" | "eb5";

export const useBanner = (type: BannerType = "home"): BannerData => {
  const banners: Record<BannerType, BannerData> = {
    home: {
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
    },
    eb5: {
      tagline: "EB-5 Immigration",
      title: "What is eb-5 visa?",
      description: "A step-by-step guide to securing U.S. permanent residency through investment",
      primaryButton: {
        label: "DOWNLOAD THE EB-5 PROCESS",
        href: "#",
      },
      secondaryButton: {
        label: "GET THE EB-5 PROCESS",
        href: "#",
      },
      backgroundImage: "/image/background2.png",
    },
  };

  return banners[type];
};
