/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, Wallet, ShieldCheck, ChevronRight, Calculator, Calendar, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

export default function ADSAPage() {
  const [isDaily, setIsDaily] = useState(true);
  const [contribution, setContribution] = useState(10); // $10 per day or $200 per month
  const [rate, setRate] = useState(14); // 14% default
  const [years, setYears] = useState(50); // 50 years default
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculation Logic
  // Compound Interest Formula: A = PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
  const calculateData = () => {
    const data = [];
    const r = rate / 100;
    const n = isDaily ? 365 : 12;
    const pmt = contribution;

    // Calculate values year by year for the chart
    let balance = 0;
    let totalContributed = 0;

    // Add starting year (Year 0)
    data.push({
      year: 0,
      balance: 0,
      contributed: 0,
      interest: 0,
    });

    for (let y = 1; y <= years; y++) {
      const periods = y * n;
      const ratePerPeriod = r / n;

      // Calculate future value of an ordinary annuity
      balance = pmt * ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod);
      totalContributed = pmt * periods;
      const interestEarned = Math.max(0, balance - totalContributed);

      data.push({
        year: y,
        balance: Math.round(balance),
        contributed: Math.round(totalContributed),
        interest: Math.round(interestEarned),
      });
    }

    return {
      chartData: data,
      finalBalance: balance,
      finalContributed: totalContributed,
      finalInterest: Math.max(0, balance - totalContributed),
    };
  };

  const { chartData, finalBalance, finalContributed, finalInterest } = calculateData();

  return (
    <div className="pt-20 bg-[#fafafa] min-h-screen text-[#1f1f1f]">
      {/* Banner Section */}
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
              Aggressive Daily Savings Account (ADSA)
            </h1>

            <div className="border-l-4 border-primary pl-6 max-w-3xl">
              <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed">
                A trademark solution of The Winners Regional Center designed for young adults. Turn small daily savings into generational wealth through the power of early starting and compounding.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 w-full sm:w-auto">
              <Link href="#calculator" className="w-full sm:w-auto">
                <Button className="w-full h-12 bg-primary hover:bg-[#9f1717] text-white px-8 text-base font-bold rounded-none transition-all duration-300">
                  RUN THE NUMBERS
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

      {/* Figure 1 & Intro Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Side: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full">
                <span>Own Your Future</span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-bold text-secondary italic leading-tight">
                The Power of Starting Early
              </h2>

              <div className="space-y-4 text-base md:text-lg text-[#4c4c4c] leading-relaxed font-normal">
                <p>
                  Retirement might seem a lifetime away, but right now, you possess the most powerful financial asset in the world: <strong className="text-secondary font-bold">Time</strong>.
                </p>
                <p>
                  For young adults between <span className="text-primary font-bold">14 and 21</span>, the decisions made today with small amounts of money can completely redefine what your future looks like. You don't need a massive salary to build generational wealth—you just need consistency, strategy, and a head start.
                </p>
                <p>
                  This is what the innovative <strong className="text-secondary font-semibold">Aggressive Daily Savings Account (ADSA)</strong> trademark of The Winners Regional Center offers you.
                </p>
              </div>
            </div>

            {/* Right Side: Comic Image (Figure 1) */}
            <div className="lg:col-span-5 w-full max-w-[480px] mx-auto">
              <div className="relative border border-[#ececec] p-4 bg-[#fafafa] shadow-[0_12px_24px_rgba(0,0,0,0.04)] rounded-2xl group overflow-hidden">
                <div className="relative aspect-[9/13] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/image/adsa-comic.jpg"
                    alt="Aggressive Daily Savings Account Comic Panel"
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-102"
                    priority
                  />
                </div>
                <div className="mt-4 text-center text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                  Figure 1: ADSA Daily Compounding Power
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Figure 2 & Reality Section */}
      <section className="py-16 lg:py-24 bg-[#fcfcfc] border-y border-[#f0f0f0]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Side: Stool Diagram (Figure 2) */}
            <div className="lg:col-span-5 order-last lg:order-first w-full max-w-[480px] mx-auto">
              <div className="relative border border-[#ececec] p-4 bg-white shadow-[0_12px_24px_rgba(0,0,0,0.04)] rounded-2xl group overflow-hidden">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#2e153b] flex items-center justify-center p-2">
                  <Image
                    src="/image/adsa-stool.jpg"
                    alt="Three-Legged Stool of Financial Security"
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-102"
                  />
                </div>
                <div className="mt-4 text-center text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                  Figure 2: Changing Future of Self-Security
                </div>
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full">
                <span>The Reality of Tomorrow's Economy</span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-bold text-secondary italic leading-tight">
                Self-Security in a Changing Landscape
              </h2>

              <div className="space-y-4 text-base md:text-lg text-[#4c4c4c] leading-relaxed">
                <p>
                  The story of 60-year-olds quitting their jobs prematurely to personally care for their 87-year-old parents is commonplace today because they cannot afford to pay someone else to do it.
                </p>
                <p>
                  This arrangement, whereby the caregiver loses their own source of income just to make sure their loved one gets help, can be financially challenging. With hindsight, you can ease that challenge today using the ADSA trademark of The Winners Regional Center when you still have time on your side.
                </p>
                <p>
                  Relying on traditional safety nets is no longer a guaranteed strategy for a secure future:
                </p>
              </div>

              {/* Economic Realities List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4 p-5 bg-white border border-[#eaeaea] rounded-xl shadow-sm">
                  <div className="flex-shrink-0 h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-base mb-1">Social Security Outlook</h4>
                    <p className="text-sm text-[#696969] leading-relaxed">
                      As demographic structures shift, the long-term viability and payout rates of government social security systems remain highly uncertain.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 bg-white border border-[#eaeaea] rounded-xl shadow-sm">
                  <div className="flex-shrink-0 h-10 w-10 bg-red-50 rounded-lg flex items-center justify-center text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary text-base mb-1">Disappearance of Pensions</h4>
                    <p className="text-sm text-[#696969] leading-relaxed">
                      Guaranteed corporate pensions and fringe benefits are largely things of the past. Funding your retirement is now entirely your responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Figure 3 & Formula Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Side: Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full">
                <span>The Snowball Effect</span>
              </div>
              <h2 className="text-3xl lg:text-[40px] font-bold text-secondary italic leading-tight">
                The $25 Million Formula
              </h2>

              <div className="space-y-4 text-base md:text-lg text-[#4c4c4c] leading-relaxed">
                <p>
                  The secret to massive wealth isn't getting lucky; it's <strong className="text-secondary font-bold">compound interest</strong>. When you invest money in a tax-deferred account, your interest earns interest, creating a compounding snowball effect over time.
                </p>
                <p>
                  Because you have a 50-year horizon ahead of you, you can afford to take an aggressive investment approach.
                </p>

                <div className="mt-6 p-6 bg-[#2e153b]/5 border-l-4 border-secondary rounded-r-xl space-y-3">
                  <h4 className="font-extrabold text-secondary text-xl italic">Consider this:</h4>
                  <p className="text-[#3c3c3c]">
                    If you simply redirect the cost of a daily fast-food meal—just <span className="font-bold text-primary">$10 a day</span>—into an aggressive compounding investment averaging a <span className="font-bold text-[#2e153b]">14% annual return</span>, you wouldn't just be comfortable by the time you retire.
                  </p>
                  <p className="font-extrabold text-secondary text-2xl lg:text-3xl mt-2">
                    You could accumulate up to $25 Million in 50 years.
                  </p>
                </div>

                <p className="pt-2">
                  No inheriting money. No relying on social security. Just $10 a day and the patience to let time do the heavy lifting.
                </p>
              </div>
            </div>

            {/* Right Side: Couple Image (Figure 3) */}
            <div className="lg:col-span-5 w-full max-w-[480px] mx-auto">
              <div className="relative border border-[#ececec] p-4 bg-[#fafafa] shadow-[0_12px_24px_rgba(0,0,0,0.04)] rounded-2xl group overflow-hidden">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    src="/image/adsa-couple.jpg"
                    alt="Start Early Compound Savings to $25 Million"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                </div>
                <div className="mt-4 text-center text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                  Figure 3: Young Adults Owning Their Future
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Calculator Section (Figure 4) */}
      <section id="calculator" className="py-16 lg:py-24 bg-[#f4f4f6] border-t border-[#eaeaea]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-primary text-sm font-bold tracking-wider uppercase">
              Interactive Tool
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary italic">
              Run the Numbers
            </h2>
            <p className="text-[#696969] text-base md:text-lg max-w-2xl mx-auto">
              See how small daily or monthly contributions can snowball over time. Adjust the sliders below to explore your personal savings strategy.
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

                {/* Savings Frequency Toggle */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-secondary uppercase tracking-wider block">
                    Savings Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-[#f4f4f6] p-1 rounded-xl">
                    <button
                      onClick={() => {
                        setIsDaily(true);
                        setContribution(10);
                      }}
                      className={`py-3 rounded-lg text-sm font-bold transition-all duration-200 ${isDaily
                        ? "bg-white text-secondary shadow-sm"
                        : "text-[#696969] hover:text-secondary"
                        }`}
                    >
                      Daily Contribution
                    </button>
                    <button
                      onClick={() => {
                        setIsDaily(false);
                        setContribution(200);
                      }}
                      className={`py-3 rounded-lg text-sm font-bold transition-all duration-200 ${!isDaily
                        ? "bg-white text-secondary shadow-sm"
                        : "text-[#696969] hover:text-secondary"
                        }`}
                    >
                      Monthly Contribution
                    </button>
                  </div>
                </div>

                {/* Contribution Amount Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">
                      {isDaily ? "Daily Contribution" : "Monthly Contribution"}
                    </label>
                    <span className="font-extrabold text-primary text-xl">
                      {formatCurrency(contribution)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={isDaily ? 1 : 10}
                    max={isDaily ? 100 : 3000}
                    step={isDaily ? 1 : 10}
                    value={contribution}
                    onChange={(e) => setContribution(Number(e.target.value))}
                    className="w-full h-2 bg-[#eaeaea] rounded-lg appearance-none cursor-pointer accent-[#b91d1d]"
                  />
                  <div className="flex justify-between text-xs text-[#a0a0a0] font-medium">
                    <span>{isDaily ? "$1" : "$10"}</span>
                    <span>{isDaily ? "$100" : "$3,000"}</span>
                  </div>
                </div>

                {/* Expected Return Rate Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">
                      Expected Annual Return
                    </label>
                    <span className="font-extrabold text-primary text-xl">
                      {rate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-2 bg-[#eaeaea] rounded-lg appearance-none cursor-pointer accent-[#b91d1d]"
                  />
                  <div className="flex justify-between text-xs text-[#a0a0a0] font-medium">
                    <span>1%</span>
                    <span>25%</span>
                  </div>
                </div>

                {/* Years Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-secondary uppercase tracking-wider">
                      Compounding Timeframe
                    </label>
                    <span className="font-extrabold text-primary text-xl">
                      {years} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full h-2 bg-[#eaeaea] rounded-lg appearance-none cursor-pointer accent-[#b91d1d]"
                  />
                  <div className="flex justify-between text-xs text-[#a0a0a0] font-medium">
                    <span>1 Year</span>
                    <span>60 Years</span>
                  </div>
                </div>

                {/* Quick Info Box */}
                <div className="p-4 bg-yellow-50/50 border border-yellow-100 rounded-2xl flex gap-3 text-sm text-[#7a652e]">
                  <HelpCircle className="h-5 w-5 flex-shrink-0 text-yellow-600 mt-0.5" />
                  <p className="leading-relaxed">
                    This calculator compounding assumes {isDaily ? "daily savings compounding daily" : "monthly savings compounding monthly"} over the selected horizon, showing the impact of tax-deferred compounding.
                  </p>
                </div>
              </div>

              {/* Right Side: Charts & Results (7 Cols) */}
              <div className="lg:col-span-7 bg-[#fafafa] p-8 lg:p-12 flex flex-col justify-between space-y-8">

                {/* Results Metrics Panel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 border border-[#ececec] rounded-2xl shadow-sm space-y-1">
                    <span className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider">Total Invested</span>
                    <p className="text-xl font-extrabold text-secondary">{formatCurrency(finalContributed)}</p>
                  </div>
                  <div className="bg-white p-5 border border-[#ececec] rounded-2xl shadow-sm space-y-1">
                    <span className="text-xs font-bold text-[#8a8a8a] uppercase tracking-wider">Interest Earned</span>
                    <p className="text-xl font-extrabold text-emerald-600">{formatCurrency(finalInterest)}</p>
                  </div>
                  <div className="bg-white p-5 border border-primary/20 bg-red-50/10 rounded-2xl shadow-sm space-y-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Accumulated Wealth</span>
                    <p className="text-2xl font-black text-primary">{formatCurrency(finalBalance)}</p>
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
                          <linearGradient id="colorContributed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6b7280" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#6b7280" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                          dataKey="year"
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#8a8a8a", fontSize: 11, fontWeight: "bold" }}
                          unit=" Yr"
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
                            name === "balance" ? "Total Balance" : name === "contributed" ? "Contributions" : "Interest"
                          ]}
                          labelFormatter={(label) => `Year ${label}`}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e1e1e1",
                            borderRadius: "12px",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.05)"
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          stroke="#b91d1d"
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#colorBalance)"
                        />
                        <Area
                          type="monotone"
                          dataKey="contributed"
                          stroke="#6b7280"
                          strokeWidth={2}
                          strokeDasharray="4 4"
                          fillOpacity={1}
                          fill="url(#colorContributed)"
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
                      <span className="h-2 w-4 bg-[#b91d1d] rounded-sm inline-block" /> Total Balance
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-4 border border-[#6b7280] border-dashed rounded-sm inline-block" /> Contributions
                    </span>
                  </div>
                  <div>
                    Compound Interval: <span className="font-bold text-[#1f1f1f]">{isDaily ? "Daily" : "Monthly"}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Figure 5 & Call to Action Section */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#f0f0f0]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Side: Image (Figure 5) */}
            <div className="lg:col-span-5 w-full max-w-[480px] mx-auto">
              <div className="relative border border-[#ececec] p-4 bg-[#fafafa] shadow-[0_12px_24px_rgba(0,0,0,0.04)] rounded-2xl group overflow-hidden">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    src="/image/adsa-discussion.jpg"
                    alt="Wealth Management Advisor Student Discussion"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                </div>
                <div className="mt-4 text-center text-xs font-semibold text-[#8a8a8a] uppercase tracking-wider">
                  Figure 5: Professional Wealth Guidance
                </div>
              </div>
            </div>

            {/* Right Side: Content & CTA Button */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-primary text-sm font-semibold rounded-full">
                  <span>Start Today</span>
                </div>
                <h2 className="text-3xl lg:text-[40px] font-bold text-secondary italic leading-tight">
                  Ready to Build Your Strategy?
                </h2>
                <p className="text-base md:text-lg text-[#4c4c4c] leading-relaxed">
                  You don't need to be a financial expert to get started, but having the right guidance ensures you set up the correct tax-deferred vehicles early on.
                </p>
                <p className="text-base md:text-lg text-[#4c4c4c] leading-relaxed font-semibold text-secondary">
                  Take control of your future today. Let's build a culture of savings that ensures your financial independence.
                </p>
              </div>

              {/* Large CTA Button */}
              <div className="pt-2">
                <Link href="/request-evaluation" className="block sm:inline-block group">
                  <Button className="w-full sm:w-auto h-auto min-h-16 py-4 px-6 sm:px-10 text-sm sm:text-base lg:text-lg font-extrabold uppercase tracking-wide rounded-none shadow-[0_8px_20px_rgba(185,29,29,0.2)] hover:shadow-[0_8px_24px_rgba(185,29,29,0.3)] transition-all duration-300 transform group-hover:scale-[1.02] whitespace-normal text-center flex items-center justify-center">
                    <span>Request Your Personal Financial Evaluation</span>
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
