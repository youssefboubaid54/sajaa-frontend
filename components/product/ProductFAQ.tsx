"use client";

import { useState } from "react";
import { FAQItem } from "@/data/products";

interface ProductFAQProps {
  faqItems: FAQItem[];
}

export default function ProductFAQ({ faqItems }: ProductFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqItems.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-beige shadow-soft overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between gap-3 px-5 py-4 text-right"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-navy text-sm">{item.questionAr}</span>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full bg-beige flex items-center justify-center transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4">
                <p className="text-muted text-sm leading-relaxed">{item.answerAr}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
