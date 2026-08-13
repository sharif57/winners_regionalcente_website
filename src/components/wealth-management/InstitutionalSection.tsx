"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Sparkles, Shield, Compass, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstitutionalSection() {
  return (
    <section className="py-16 lg:py-24 bg-white text-[#1f1f1f] relative overflow-hidden border-b border-gray-100">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-red-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Badge & Title */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-primary text-xs lg:text-sm font-bold tracking-wider uppercase">
            <Shield className="w-4 h-4 text-primary" />
            <span>Institutional Wealth Management</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold italic text-secondary leading-tight">
            Master Your Wealth with Institutional Precision
          </h2>
        </div>

        {/* Core Paragraphs */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-[#4c4c4c] leading-relaxed font-normal">
            <p className="border-l-4 border-primary pl-4 text-secondary font-medium">
              At Winners Regional Center, we understand that for high-net-worth investors, true wealth management goes beyond standard asset allocation—it demands institutional-grade precision, unyielding security, and a frictionless operational experience.
            </p>
            <p>
              We know that your time and privacy are just as valuable as your capital. That is why we have engineered a premier wealth management ecosystem designed to not only protect your legacy but to actively accelerate your portfolio's growth.
            </p>
            <p>
              Anchoring this approach are our premier financial offerings, including the{" "}
              <Link href="/wealth-management/adsa" className="text-primary font-bold hover:underline inline-flex items-center gap-1">
                Aggressive Daily Savings Account (ADSA)
                <ArrowRight className="w-4 h-4 inline" />
              </Link>
              —built to dynamically optimize the yield on your liquid assets—and{" "}
              <Link href="/wealth-management/jacobi-inspiration" className="text-secondary font-bold hover:underline inline-flex items-center gap-1">
                The Jacobi Inspiration
                <ArrowRight className="w-4 h-4 inline" />
              </Link>{" "}
              vehicle, a sophisticated investment strategy crafted for targeted, high-impact wealth generation.
            </p>
            <p>
              By merging these exclusive opportunities with state-of-the-art technology, we eliminate administrative drag, providing you with the absolute clarity and speed necessary to let your capital work harder, faster, and smarter.
            </p>
          </div>

          {/* Side Graphic / Highlight Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-secondary to-[#120517] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Compass className="w-48 h-48 text-white" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white/90">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Premier Ecosystem Highlights</span>
              </div>

              <h3 className="text-2xl font-bold italic text-white leading-snug">
                Architected for High-Impact Capital Acceleration
              </h3>

              <ul className="space-y-4 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Military-Grade Security:</strong> Unyielding cryptographic protection for institutional privacy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>Zero Administrative Friction:</strong> Pre-filled data protocols & automated execution.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span><strong>High-Yield Vehicles:</strong> Targeted strategies including ADSA and Jacobi Inspiration.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Cards for ADSA and Jacobi */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ADSA Card */}
          <div className="group relative bg-[#fafafa] border border-gray-200 hover:border-primary/40 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold text-primary tracking-widest uppercase block">
                Flagship Savings Vehicle
              </span>

              <h3 className="text-2xl font-bold text-secondary italic group-hover:text-primary transition-colors">
                Aggressive Daily Savings Account (ADSA)
              </h3>

              <p className="text-[#696969] text-sm md:text-base leading-relaxed">
                Dynamically optimize yields on liquid assets through strategic compounding and daily disciplined accumulation engineered for long-term generational wealth.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200/60 mt-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">14% Target Return Strategy</span>
              <Link href="/wealth-management/adsa">
                <Button className="bg-secondary hover:bg-primary text-white text-xs font-bold px-5 py-2 rounded-none transition-colors duration-300 flex items-center gap-2">
                  <span>EXPLORE ADSA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Jacobi Inspiration Card */}
          <div className="group relative bg-[#fafafa] border border-gray-200 hover:border-secondary/40 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <Sparkles className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold text-secondary tracking-widest uppercase block">
                Targeted Investment Vehicle
              </span>

              <h3 className="text-2xl font-bold text-secondary italic group-hover:text-primary transition-colors">
                The Jacobi Inspiration
              </h3>

              <p className="text-[#696969] text-sm md:text-base leading-relaxed">
                Sophisticated investment strategy designed for targeted, high-impact returns over 14-day cycles, removing operational friction for modern institutional portfolios.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200/60 mt-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">25% Yield Growth Strategy</span>
              <Link href="/wealth-management/jacobi-inspiration">
                <Button className="bg-primary hover:bg-[#9f1717] text-white text-xs font-bold px-5 py-2 rounded-none transition-colors duration-300 flex items-center gap-2">
                  <span>DISCOVER JACOBI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
