"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-primary text-sm font-bold tracking-widest uppercase">
                INVESTMENT STRATEGY
              </span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold italic text-[#1A1A1A] leading-tight">
              Start Your EB-5 Journey Today
            </h2>

            <p className="text-[#666666] text-sm md:text-base leading-relaxed max-w-xl">
              Our immigration experts and financial advisors will evaluate your eligibility and provide a custom investment road map for your family.
            </p>

            {/* Form Fields */}
            <form className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-6 py-4 border border-[#E5E5E5] focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="w-full px-6 py-4 border border-[#E5E5E5] focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-6 py-4 border border-[#E5E5E5] focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <textarea
                  placeholder="Add Your Note"
                  rows={4}
                  className="w-full px-6 py-4 border border-[#E5E5E5] focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                />
              </div>

              <div className="pt-4">
                <Button
                  className="w-full bg-[#C51D1D] hover:bg-[#A31818] text-white py-8 text-sm font-bold tracking-widest uppercase rounded-none transition-all duration-300 transform"
                >
                  SUBMIT YOUR EVALUATION REQUEST
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Image with Quote Overlay */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[400px] md:h-[600px] lg:h-[700px] w-full overflow-hidden shadow-2xl">
              <Image
                src="/image/journey.png"
                alt="Start your journey"
                fill
                className="object-cover"
              />
              
              {/* Quote Overlay */}
              <div className="absolute bottom-10 left-6 right-6 md:left-12 md:right-12">
                <div className="bg-white p-8 md:p-10 border-l-[6px] border-[#E23E3E] shadow-xl">
                  <p className="text-[#1A1A1A] text-lg md:text-xl font-medium italic leading-relaxed mb-4">
                    “We focus on projects that meet the highest standards of USCIS Compliance and job creation.”
                  </p>
                  <p className="text-[#666666] text-sm font-bold tracking-wide">
                    - Winners Regional Center.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
