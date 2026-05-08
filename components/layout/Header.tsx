"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { getCartItemCount } from "@/lib/pricing";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المنتجات" },
  { href: "/about", label: "عن سَجَى" },
  { href: "/contact", label: "تواصلي معنا" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const itemCount = getCartItemCount(items);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-40 w-full bg-ivory/95 border-b border-beige transition-all duration-300",
          scrolled ? "backdrop-blur-md shadow-soft" : "",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo — right side in RTL */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shadow-soft">
                <span className="text-gold font-bold text-lg leading-none">س</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-navy text-base">سَجَى</span>
                <span className="text-[10px] text-muted tracking-widest font-latin uppercase">
                  Sajaa Sleep
                </span>
              </div>
            </Link>

            {/* Desktop nav — center */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="التنقل الرئيسي">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-navy/80 hover:text-navy text-sm font-medium transition-colors duration-150 relative after:absolute after:bottom-0 after:right-0 after:w-0 after:h-px after:bg-gold after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Left side: cart + hamburger */}
            <div className="flex items-center gap-3">
              {/* Cart button */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-full hover:bg-beige transition-colors"
                aria-label={`سلة التسوق${itemCount > 0 ? ` (${itemCount} منتج)` : ""}`}
              >
                <svg
                  className="w-6 h-6 text-navy"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-gold text-navy-dark text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-beige transition-colors"
                aria-label="فتح القائمة"
                aria-expanded={mobileOpen}
              >
                <svg
                  className="w-6 h-6 text-navy"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu — dynamically imported to avoid SSR issues with framer-motion */}
      {mobileOpen && (
        <MobileMenuWrapper onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}

function MobileMenuWrapper({ onClose }: { onClose: () => void }) {
  // Dynamic import to keep framer-motion client-only
  const MobileMenu = require("@/components/layout/MobileMenu").default;
  return <MobileMenu onClose={onClose} />;
}
