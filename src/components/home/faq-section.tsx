"use client";

import { useState } from "react";
import ReusableHeader from "@/hook/resuable-header";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is the W.I.N. Standard in EB-5 investing?",
    answer: "The W.I.N. Standard is a safety-first investment framework created by Winners Regional Center. It stands for Wealth Protection, Immigration Success, and Negligible Risk. This standard guarantees that an EB-5 project is structured entirely without senior bank debt, eliminating bank foreclosure risks and protecting both your capital and your path to a U.S. Green Card.",
  },
  {
    question: "How does a loan-free project protect my EB-5 green card application?",
    answer: "In traditional EB-5 projects, construction relies heavily on senior bank loans. If a bank freezes funding due to market shifts, construction stalls. This halts the creation of the required 10 permanent jobs per investor, leading to a denial of your I-526E or I-829 petition. Because Winners Regional Center projects are loan-free, construction timelines are independent of bank volatility, ensuring stable job creation and immigration security.",
  },
  {
    question: "Why does Winners Regional Center build without senior bank loans?",
    answer: "We eliminate senior bank loans to remove foreclosure risk. In bank-led projects, the bank holds the first lien and can seize the property if financial covenants are missed, wiping out subordinate EB-5 investors. By funding projects exclusively through developer equity and EB-5 capital, our investors hold unmatched security over the project assets.",
  },
  {
    question: "What makes the Texas economy ideal for EB-5 job creators?",
    answer: "The Texas economy, particularly the Dallas-Fort Worth metroplex, leads the United States in job growth, corporate relocations, and population influx. This continuous economic expansion ensures that real estate developments like the Winners Tower enjoy high demand, stable valuations, and robust operational success, making it the safest environment for job creation.",
  },
  {
    question: "What happens to my EB-5 investment if the market downturns?",
    answer: "Because our loan-free framework operates without commercial bank debt, our projects face no pressure from sudden interest rate hikes, loan recalls, or strict refinancing deadlines. The project can weather economic cycles smoothly, protecting investor equity and ensuring construction reaches completion to secure your permanent green card.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-[32px] bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ReusableHeader
          badge="FAQ"
          title="FREQUENTLY ASKED QUESTIONS"
          description="Find answers to common questions about EB-5 investments, U.S. Immigration, and our Wealth Management services"
          className="pb-16"
        />

        {/* FAQ List Container */}
        <div className="bg-[#F9F9F9] p-4 md:p-12 lg:p-16  flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "bg-white transition-all duration-300",
                  isOpen ? "shadow-md" : "hover:bg-white/80"
                )}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 md:p-8 text-left group"
                >
                  <span className="text-lg md:text-xl font-bold italic text-[#1A1A1A] group-hover:text-primary transition-colors pr-8">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-6 h-6 text-primary" />
                    ) : (
                      <Plus className="w-6 h-6 text-[#A1A1A1]" />
                    )}
                  </div>
                </button>

                {/* Answer Content */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 md:px-8 pb-8 text-[#666666] text-sm md:text-base leading-relaxed border-t border-[#F1F1F1] pt-6">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
