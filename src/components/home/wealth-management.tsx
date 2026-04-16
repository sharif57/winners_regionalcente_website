"use client";

import React from "react";
import Image from "next/image";
import { TrendingUp, Wallet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <TrendingUp className="w-6 h-6 text-[#1A1A1A]" />,
    title: "Capital Builder",
    description: "Strategies for clients accumulating funds for future EB-5 investment.",
  },
  {
    icon: <Wallet className="w-6 h-6 text-[#1A1A1A]" />,
    title: "Wealth Preservation",
    description: "General investment services for net-worth growth.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#1A1A1A]" />,
    title: "Financial Planning",
    description: "Services for individuals not pursuing immigration.",
  },
];

export default function WealthManagement() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Hero Image */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] overflow-hidden group">
            <Image
              src="/image/wealth-planning.png"
              alt="Strategic Wealth Planning"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-primary text-sm font-bold tracking-widest uppercase">
                WEALTH MANAGEMENT
              </span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold italic text-[#1A1A1A] leading-tight">
              Strategic Wealth Planning for Global Investor
            </h2>

            <p className="text-[#666666] text-sm md:text-base leading-relaxed max-w-xl">
              Our wealth management services are designed to help investors build, protect, and optimize capital—whether preparing for EB-5 or long-term financial growth.
            </p>

            {/* Feature Items */}
            <div className="space-y-8 py-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#F3F4F6] flex items-center justify-center transition-all duration-300 group-hover:bg-primary/10">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold italic text-[#1A1A1A]">
                      {item.title}
                    </h4>
                    <p className="text-[#666666] text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                className="w-full sm:w-auto bg-[#C51D1D] hover:bg-[#A31818] text-white px-12 py-7 text-base font-bold rounded-none transition-all duration-300 transform hover:scale-105"
              >
                REQUEST EVALUATION
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
