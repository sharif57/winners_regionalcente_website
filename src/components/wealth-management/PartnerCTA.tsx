"use client";

import React from "react";
import Link from "next/link";
import { Phone, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartnerCTA() {
  return (
    <section className="py-16 lg:py-24 bg-[#fafafa] border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative bg-gradient-to-br from-secondary via-[#2b1236] to-[#14061a] rounded-3xl p-8 lg:p-16 text-white shadow-2xl overflow-hidden border border-purple-900/40">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Next Step</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold italic text-white leading-tight">
                Partner with Uncompromising Excellence
              </h2>

              <p className="text-base md:text-lg text-white/85 leading-relaxed font-normal max-w-3xl">
                Elevate your investment strategy with a team dedicated to precision, security, and exceptional returns. Join the visionary investors who trust their capital to our rigorous standards and seamless operational technology.
              </p>

              {/* Action Phone Box & Subtext */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span>Reach out today at</span>
                <a
                  href="tel:2149168282"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/15 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>214-916-8282</span>
                </a>
                <span>or access our secure portal to begin your onboarding.</span>
              </div>
            </div>

            {/* Right CTA Button Column */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
              <Link href="/request-evaluation" className="w-full sm:w-auto group">
                <Button className="w-full sm:w-auto h-auto py-5 px-8 bg-primary hover:bg-[#9f1717] text-white text-base font-bold rounded-none shadow-lg transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-wider">
                  <span>Access Secure Investor Portal</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <div className="text-xs text-white/50 flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Direct inquiry & evaluation request form</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
