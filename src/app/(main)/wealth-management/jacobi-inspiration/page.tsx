/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Play,
  Zap,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Currency Formatter
const formatCurrency = (value: number) => {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function JacobiInspirationPage() {
  // Return Calculator State
  const [depositAmount, setDepositAmount] = useState<number>(200000);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleVideoToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Calculation Logic: 25% yield over 14 days (approx 2 weeks)
  const returnRate = 0.25; // 25%
  const projectedReturn = depositAmount * returnRate;
  const totalProjectedSum = depositAmount + projectedReturn;

  // Generate 14-day progression data for visual chart
  const generateChartData = () => {
    const data: Array<{ day: string; principal: number; profit: number; total: number }> = [];
    const days = [0, 2, 4, 7, 10, 14];
    days.forEach((day) => {
      const progress = day / 14;
      const currentProfit = projectedReturn * Math.pow(progress, 1.1);
      const currentBalance = depositAmount + currentProfit;
      data.push({
        day: `Day ${day}`,
        principal: Math.round(depositAmount),
        profit: Math.round(currentProfit),
        total: Math.round(currentBalance),
      });
    });
    return data;
  };

  const chartData = generateChartData();

  const handleQuickPreset = (amount: number) => {
    setDepositAmount(amount);
  };

  return (
    <div className="pt-20 bg-[#fafafa] min-h-screen text-[#1f1f1f]">
      {/* ── Banner Section (ADSA Style) ── */}
      <section className="relative w-full min-h-[450px] lg:min-h-[550px] flex items-center overflow-hidden bg-secondary">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-102"
          style={{ backgroundImage: "url('/image/background3.png')" }}
        >
          <div className="absolute inset-0 bg-black/70 lg:bg-gradient-to-r lg:from-black/85 lg:to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold text-sm lg:text-base tracking-[0.2em]">
              <span className="h-2 w-2 rounded-full bg-primary" />
              WEALTH MANAGEMENT
            </div>

            <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-extrabold italic leading-tight">
              The Jacobi Inspiration<sup className="text-xl lg:text-3xl text-primary font-normal">TM</sup>
            </h1>

            <p className="text-primary font-bold text-xl md:text-2xl lg:text-3xl italic -mt-2">
              Unlocking Unprecedented Capital Velocity
            </p>

            <div className="border-l-4 border-primary pl-6 max-w-3xl">
              <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed">
                Introducing The Jacobi Inspiration<sup className="text-sm">TM</sup>—an exclusive, in-house innovative solution developed by the Finance Department of The Winners Regional Center.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 w-full sm:w-auto">
              <Link href="#calculator" className="w-full sm:w-auto">
                <Button className="w-full h-12 bg-primary hover:bg-[#9f1717] text-white px-8 text-base font-bold rounded-none transition-all duration-300">
                  CALCULATE YOUR RETURNS
                </Button>
              </Link>
              <Link href="/request-evaluation" className="w-full sm:w-auto">
                <Button className="w-full h-12 border border-white text-white hover:bg-white hover:text-secondary px-8 text-base font-bold rounded-none transition-all duration-300">
                  REQUEST EVALUATION
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Player Section ── */}
      <section className="py-12 lg:py-16 bg-[#121E38] text-white border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest rounded-full">
                <span>Official Video Presentation</span>
              </div>
              <h2 className="text-2xl lg:text-4xl font-bold italic text-white">
                The Jacobi Inspiration<sup className="text-base font-normal">TM</sup> Overview
              </h2>
            </div>

            <div className="relative border border-white/15 p-2 bg-[#0e1a2e] shadow-2xl rounded-2xl overflow-hidden group">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                <video
                  ref={videoRef}
                  src="/jacobi_inspiration.mp4"
                  className="w-full h-full object-contain"
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />

                {!isPlaying && (
                  <div
                    onClick={handleVideoToggle}
                    className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/30"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-xl transition-transform duration-300 transform group-hover:scale-110 pl-1">
                      <Play className="h-10 w-10 fill-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Figure 1 & Strategic Compliance Section ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full">
                <span>Strategic Wealth Engine</span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-bold text-secondary italic leading-tight">
                From Strategic Compliance to a Veritable Wealth Engine
              </h2>

              <div className="space-y-4 text-base md:text-lg text-[#4c4c4c] leading-relaxed font-normal">
                <p>
                  <strong className="text-secondary font-bold">The Jacobi Inspiration<sup className="text-sm">TM</sup></strong> was originally engineered with a highly specialized purpose: to generate quick, legally traceable boosters for investors needing to satisfy rigorous USCIS EB-5 requirements. Navigating the complexities of immigration finance requires absolute precision, transparency, and speed.
                </p>
                <p>
                  By mastering these strict financial parameters, the Winners Regional Center’s Finance Department created a framework so efficient that it quickly outgrew its original mandate. Today, it has evolved into a veritable wealth engine for high-net-worth individuals and corporate partners.
                </p>
              </div>
            </div>

            {/* Right Side: Image (Figure 1) */}
            <div className="lg:col-span-5 w-full max-w-[480px] mx-auto">
              <div className="relative border border-[#ececec] p-4 bg-[#fafafa] shadow-[0_12px_24px_rgba(0,0,0,0.04)] rounded-2xl group overflow-hidden">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/image/jacobi_regional.jpg"
                    alt="Our Wealth Engine: Catalyzing Regional Impact"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                    priority
                  />
                </div>
                <div className="mt-4 text-center text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                  Figure 1: Catalyzing Regional Impact & Investor Prosperity
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Figure 2 & Ultra-Short Horizons Section ── */}
      <section className="py-16 lg:py-24 bg-[#fcfcfc] border-y border-[#f0f0f0]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Image (Figure 2) */}
            <div className="lg:col-span-5 order-last lg:order-first w-full max-w-[480px] mx-auto">
              <div className="relative border border-[#ececec] p-4 bg-white shadow-[0_12px_24px_rgba(0,0,0,0.04)] rounded-2xl group overflow-hidden">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-secondary/5">
                  <Image
                    src="/image/jacobi_velocity.jpg"
                    alt="Unmatched Capital Velocity & Compounding Growth"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                </div>
                <div className="mt-4 text-center text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                  Figure 2: Unmatched Capital Velocity & Accelerated Compounding
                </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full">
                <span>Accelerated Timelines</span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-bold text-secondary italic leading-tight">
                The Power of Ultra-Short Horizons
              </h2>

              <div className="space-y-4 text-base md:text-lg text-[#4c4c4c] leading-relaxed">
                <p>
                  While traditional short-term investments measure their lifespans in months or years, <strong className="text-secondary font-bold">The Jacobi Inspiration<sup className="text-sm">TM</sup></strong> operates on an exponentially accelerated timeline, allowing for rapid compounding.
                </p>
              </div>

              {/* Key Benefits Grid */}
              <div className="grid grid-cols-1 gap-4 pt-2">
                <div className="flex gap-4 p-5 bg-white border border-[#eaeaea] rounded-xl shadow-sm">
                  <div className="flex-shrink-0 h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-base mb-1">Unmatched Capital Velocity</h4>
                    <p className="text-sm text-[#696969] leading-relaxed">
                      Deploy large deposits and see turnaround returns of <strong className="text-primary font-bold">more than 25%</strong> in approximately two weeks for deposits larger than <span className="font-bold text-secondary">$200,000</span>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white border border-[#eaeaea] rounded-xl shadow-sm">
                  <div className="flex-shrink-0 h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-base mb-1">Traceable and Transparent</h4>
                    <p className="text-sm text-[#696969] leading-relaxed">
                      Built on a strict EB-5 compliance foundation, providing unparalleled visibility and legal confidence.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white border border-[#eaeaea] rounded-xl shadow-sm">
                  <div className="flex-shrink-0 h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-base mb-1">Rapid Reinvestment</h4>
                    <p className="text-sm text-[#696969] leading-relaxed">
                      Realize gains quickly and pivot your highly liquid capital toward new market opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Figure 3 & Structural Protections Section ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full">
                <span>Maximum Protection</span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-bold text-secondary italic leading-tight">
                Structured for Absolute Peace of Mind
              </h2>

              <div className="space-y-4 text-base md:text-lg text-[#4c4c4c] leading-relaxed">
                <p>
                  A high-velocity yield is only as strong as the structural protections backing it. When evaluating any wealth management vehicle, clarity and capital security must remain the ultimate deciding factors.
                </p>
                <p>
                  <strong className="text-secondary font-bold">The Jacobi Inspiration<sup className="text-sm">TM</sup></strong> is built on a meticulously designed foundation that prioritizes your capital first. The vehicle's architecture ensures a <strong className="text-secondary font-bold">Primary Senior Position for Maximum Protection</strong> within the capital stack, meaning investors are consistently first in line.
                </p>
                <p>
                  Furthermore, the integrity of the vehicle is anchored by a design where <strong className="text-secondary font-bold">Developer Equity Aligns Interest</strong>. This ensures that the management and development teams have significant "skin in the game," guaranteeing flawless execution and rapid capital returns.
                </p>
              </div>
            </div>

            {/* Right Side: Image (Figure 3) */}
            <div className="lg:col-span-5 w-full max-w-[480px] mx-auto">
              <div className="relative border border-[#ececec] p-4 bg-[#fafafa] shadow-[0_12px_24px_rgba(0,0,0,0.04)] rounded-2xl group overflow-hidden">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/image/jacobi_secure.jpg"
                    alt="Trusted Structure, Secure Growth"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                </div>
                <div className="mt-4 text-center text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                  Figure 3: Primary Senior Position & Capital Protection
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Figure 4: Return Projection Calculator (Interactive Section) ── */}
      <section id="calculator" className="py-16 lg:py-24 bg-[#f4f4f6] border-t border-[#eaeaea]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-primary text-sm font-bold tracking-wider uppercase">
              Interactive Website Feature
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary italic">
              Return Projection Calculator
            </h2>
            <p className="text-[#696969] text-base md:text-lg max-w-2xl mx-auto">
              Estimate your potential growth based on a <strong className="text-primary font-bold">25% return over a two-week (14-day) period</strong>.
            </p>
          </div>

          <div className="max-w-6xl mx-auto bg-white border border-[#e1e1e1] rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Side: Sliders / Inputs (5 Cols) */}
              <div className="lg:col-span-5 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#ececec] space-y-8">
                <div className="flex items-center gap-3 border-b border-[#f0f0f0] pb-4">
                  <Calculator className="h-6 w-6 text-primary" />
                  <h3 className="font-extrabold text-secondary text-lg">Calculator Settings</h3>
                </div>

                {/* Preset Quick Selection Buttons */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider block">
                    Quick Preset Amounts
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[200000, 500000, 1000000, 2000000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => handleQuickPreset(amt)}
                        className={`py-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                          depositAmount === amt
                            ? "bg-[#b91d1d] text-white shadow-sm"
                            : "bg-[#f4f4f6] text-secondary hover:bg-[#e8e8ea]"
                        }`}
                      >
                        {formatCurrency(amt)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contribution Amount Slider & Input */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">
                      Enter Deposit Amount
                    </label>
                    <span className="font-extrabold text-primary text-xl">
                      {formatCurrency(depositAmount)}
                    </span>
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      min={50000}
                      max={5000000}
                      step={10000}
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full h-11 pl-8 pr-4 border border-[#d9d9d9] rounded-xl text-base font-bold text-secondary focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <input
                    type="range"
                    min={50000}
                    max={3000000}
                    step={25000}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full h-2 bg-[#eaeaea] rounded-lg appearance-none cursor-pointer accent-[#b91d1d]"
                  />
                  <div className="flex justify-between text-xs text-[#a0a0a0] font-medium">
                    <span>$50,000</span>
                    <span>$3,000,000+</span>
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="p-4 bg-yellow-50/50 border border-yellow-100 rounded-2xl flex gap-3 text-sm text-[#7a652e]">
                  <HelpCircle className="h-5 w-5 flex-shrink-0 text-yellow-600 mt-0.5" />
                  <p className="leading-relaxed">
                    Returns of <strong>more than 25%</strong> in approximately two weeks apply to deposits larger than $200,000 built on strict USCIS EB-5 compliance parameters.
                  </p>
                </div>
              </div>

              {/* Right Side: Charts & Results (7 Cols) */}
              <div className="lg:col-span-7 bg-[#fafafa] p-8 lg:p-12 flex flex-col justify-between space-y-8">
                {/* Results Metrics Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 border border-[#ececec] rounded-2xl shadow-sm space-y-1">
                    <span className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider">Initial Deposit</span>
                    <p className="text-xl font-extrabold text-secondary">{formatCurrency(depositAmount)}</p>
                  </div>
                  <div className="bg-white p-5 border border-[#ececec] rounded-2xl shadow-sm space-y-1">
                    <span className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider">Projected Return (25%)</span>
                    <p className="text-xl font-extrabold text-emerald-600">+{formatCurrency(projectedReturn)}</p>
                  </div>
                  <div className="bg-white p-5 border border-primary/20 bg-red-50/10 rounded-2xl shadow-sm space-y-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Projected Total (14 Days)</span>
                    <p className="text-2xl font-black text-primary">{formatCurrency(totalProjectedSum)}</p>
                  </div>
                </div>

                {/* Chart Visualization */}
                <div className="h-72 w-full mt-4">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#b91d1d" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#b91d1d" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#8a8a8a", fontSize: 11, fontWeight: "bold" }}
                        />
                        <YAxis
                          tickFormatter={formatCurrency}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#8a8a8a", fontSize: 11, fontWeight: "bold" }}
                        />
                        <Tooltip
                          formatter={(value: any, name: any) => [
                            formatCurrency(Number(value)),
                            name === "total" ? "Total Portfolio Value" : "Compounded Gain"
                          ]}
                          labelFormatter={(label) => `${label}`}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e1e1e1",
                            borderRadius: "12px",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.05)"
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="total"
                          stroke="#b91d1d"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorBalance)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full bg-[#f0f0f0] animate-pulse rounded-2xl flex items-center justify-center text-sm font-semibold text-[#8a8a8a]">
                      Loading Growth Chart...
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-[#8a8a8a] border-t border-[#ececec] pt-4 gap-2 font-medium">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-4 bg-[#b91d1d] rounded-sm inline-block" /> 14-Day Growth Cycle
                    </span>
                  </div>
                  <div>
                    Horizon: <span className="font-bold text-[#1f1f1f]">2 Weeks (~14 Days)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Figure 5 & Call to Action Section (Matching ADSA Style) ── */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#f0f0f0]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Image (Figure 5) */}
            <div className="lg:col-span-5 w-full max-w-[480px] mx-auto">
              <div className="relative border border-[#ececec] p-4 bg-[#fafafa] shadow-[0_12px_24px_rgba(0,0,0,0.04)] rounded-2xl group overflow-hidden">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    src="/image/adsa-discussion.jpg"
                    alt="Wealth Management Advisor Discussion"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                </div>
                <div className="mt-4 text-center text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                  Figure 4: Professional Wealth Strategy Consultation
                </div>
              </div>
            </div>

            {/* Right Side: Content & CTA Button */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full">
                  <span>Start Compounding Today</span>
                </div>
                <h2 className="text-3xl lg:text-[40px] font-bold text-secondary italic leading-tight">
                  Talk To Us now, and let us show you how we do it!
                </h2>
                <p className="text-base md:text-lg text-[#4c4c4c] leading-relaxed">
                  Discover how The Winners Regional Center’s Finance Department can accelerate your capital velocity while maintaining strict legal and structural protections.
                </p>
                <p className="text-base md:text-lg text-[#4c4c4c] leading-relaxed font-semibold text-secondary">
                  Take control of your capital strategy today. Let's show you how our ultra-short horizon wealth engine works.
                </p>
              </div>

              {/* Large CTA Button matching ADSA */}
              <div className="pt-2">
                <Link href="/request-evaluation" className="block sm:inline-block group">
                  <Button className="w-full sm:w-auto h-auto min-h-16 py-4 px-6 sm:px-10 text-sm sm:text-base lg:text-lg font-extrabold uppercase tracking-wide rounded-none bg-primary hover:bg-[#9f1717] text-white shadow-[0_8px_20px_rgba(185,29,29,0.2)] hover:shadow-[0_8px_24px_rgba(185,29,29,0.3)] transition-all duration-300 transform group-hover:scale-[1.02] whitespace-normal text-center flex items-center justify-center">
                    <span>Contact Us Now</span>
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
