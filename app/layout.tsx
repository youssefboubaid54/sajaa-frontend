import type { Metadata } from "next";
import "./globals.css";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import CartDrawer from "@/components/cart/CartDrawer";
import PixelScripts from "@/components/pixels/PixelScripts";
import CheckoutPopup from "@/components/checkout/CheckoutPopup";
import UpsellPopup from "@/components/checkout/UpsellPopup";

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const latinFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "سَجَى | طقوس نوم فاخرة للمرأة السعودية",
  description:
    "منتجات نوم مصممة للمرأة السعودية: رائحة هادئة، ظلام ناعم، ودعم لطيف قبل النوم. الدفع عند الاستلام.",
  keywords: "نوم, سَجَى, هَمْس, حِضْن, سُبَات, منتجات نوم, السعودية",
  openGraph: {
    title: "سَجَى | طقوس نوم فاخرة للمرأة السعودية",
    description: "منتجات نوم مصممة للمرأة السعودية",
    url: "https://sajaa.health",
    siteName: "سَجَى",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arabicFont.variable} ${latinFont.variable}`}
    >
      <body className="font-arabic bg-ivory text-ink antialiased">
        <PixelScripts />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <CheckoutPopup />
        <UpsellPopup />
      </body>
    </html>
  );
}
