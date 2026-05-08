import Link from "next/link";

const SHOP_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/collection", label: "المجموعة" },
  { href: "/products/hams", label: "هَمْس" },
  { href: "/products/hidn", label: "حِضْن" },
  { href: "/products/subaat", label: "سُبَات" },
];

const SUPPORT_LINKS = [
  { href: "/contact", label: "تواصلي" },
  { href: "https://wa.me/966500000000", label: "واتساب", external: true },
  { href: "/returns", label: "الإرجاع" },
  { href: "/shipping", label: "الشحن" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "الخصوصية" },
  { href: "/terms", label: "الشروط" },
  { href: "/payment-policy", label: "سياسة الدفع" },
];

function TikTokIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.82 1.54V6.78a4.85 4.85 0 01-1.05-.09z" />
    </svg>
  );
}

function SnapchatIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.317 4.837l-.002.038c-.004.067-.005.134-.006.2.024.018.123.074.299.086.57.042 1.24-.095 2.14-.424.218-.087.448-.118.662-.079.498.113.887.557.899 1.053.011.52-.36.952-.997 1.142-.374.113-1.099.263-2.177.449-.03.22-.058.44-.083.66a.56.56 0 01-.058.2c-.4.855-1.516 1.518-2.44 1.518-.253 0-.49-.039-.704-.123-.45-.173-.872-.524-1.305-.887-.498-.415-1.001-.844-1.61-.844-.619 0-1.17.448-1.678.878-.434.363-.856.714-1.305.887-.214.084-.45.123-.704.123-.924 0-2.04-.663-2.44-1.518a.56.56 0 01-.058-.2c-.025-.22-.053-.44-.083-.66-1.078-.186-1.803-.336-2.177-.449-.637-.19-1.008-.622-.997-1.142.012-.496.401-.94.899-1.053.214-.039.444-.008.662.079.9.329 1.57.466 2.14.424.176-.012.275-.068.299-.086l-.006-.2-.002-.038c-.086-1.618-.212-3.644.317-4.837C7.853 1.069 11.21.793 12.206.793z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy text-gold/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <span className="text-navy font-bold text-lg leading-none">س</span>
              </div>
              <div>
                <div className="font-bold text-gold text-base leading-tight">سَجَى</div>
                <div className="text-[10px] text-gold/50 tracking-widest font-latin uppercase">
                  Sajaa Sleep
                </div>
              </div>
            </div>
            <p className="text-sm text-gold/70 leading-relaxed max-w-xs">
              سَجَى — طقوس نوم فاخرة للمرأة السعودية. الدفع عند الاستلام داخل المملكة.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-navy-light/30 hover:bg-gold hover:text-navy transition-all text-gold/70"
                aria-label="تيك توك"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://www.snapchat.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-navy-light/30 hover:bg-gold hover:text-navy transition-all text-gold/70"
                aria-label="سناب شات"
              >
                <SnapchatIcon />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-navy-light/30 hover:bg-gold hover:text-navy transition-all text-gold/70"
                aria-label="إنستغرام"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-gold font-semibold text-sm mb-4 uppercase tracking-wide">
              المتجر
            </h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gold/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gold font-semibold text-sm mb-4 uppercase tracking-wide">
              الدعم
            </h3>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold/70 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gold/70 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gold font-semibold text-sm mb-4 uppercase tracking-wide">
              قانوني
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gold/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-light/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gold/50">
            جميع الحقوق محفوظة © ٢٠٢٦ سَجَى
          </p>
          <p className="text-xs text-gold/40">
            مصنوعة بعناية للمرأة السعودية
          </p>
        </div>
      </div>
    </footer>
  );
}
