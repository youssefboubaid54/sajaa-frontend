"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المجموعة" },
  { href: "/products/hams", label: "هَمْس" },
  { href: "/products/hidn", label: "حِضْن" },
  { href: "/products/subaat", label: "سُبَات" },
  { href: "/about", label: "عن سَجَى" },
  { href: "/contact", label: "تواصلي" },
];

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="القائمة">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Slide-in panel from right */}
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 35 }}
          className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-navy shadow-large flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-navy-light/30">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center">
                <span className="text-navy font-bold text-base leading-none">س</span>
              </div>
              <span className="font-bold text-gold text-base">سَجَى</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-navy-light/30 hover:bg-navy-light/50 transition-colors text-gold"
              aria-label="إغلاق القائمة"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="التنقل">
            <ul className="space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-gold/90 hover:text-gold hover:bg-navy-light/30 transition-all duration-150 font-medium text-lg group"
                  >
                    {link.label}
                    <svg
                      className="w-4 h-4 text-gold/40 group-hover:text-gold/80 transition-colors rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Footer note */}
          <div className="px-6 py-5 border-t border-navy-light/30">
            <p className="text-gold/50 text-xs text-center">
              الدفع عند الاستلام داخل السعودية
            </p>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
}
