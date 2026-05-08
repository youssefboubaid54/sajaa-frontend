"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COPY } from "@/data/copy";

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-navy mb-4">
            أسئلة شائعة
          </h2>
          <p className="text-navy/60 text-lg">
            كل ما تودين معرفته عن سَجَى
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {COPY.faq.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-beige bg-ivory overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-4 text-right hover:bg-beige/50 transition-colors"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-navy text-base">
                  {item.q}
                </span>
                <span
                  className={[
                    "flex-shrink-0 w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center transition-transform duration-200",
                    openIndex === i ? "rotate-45" : "",
                  ].join(" ")}
                >
                  <svg
                    className="w-4 h-4 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pt-1 border-t border-beige">
                      <p className="text-navy/70 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
