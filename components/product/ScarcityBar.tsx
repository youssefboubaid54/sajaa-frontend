"use client";

import { useEffect, useState } from "react";

export default function ScarcityBar() {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gold text-navy py-2 px-4 text-center text-sm font-medium flex flex-col sm:flex-row items-center justify-center gap-2">
      <span>🔥 دفعة محدودة للتجربة الأولى. الطلبات المؤكدة لها أولوية التجهيز.</span>
      <span className="bg-navy text-white px-2 py-0.5 rounded-md font-latin tracking-widest text-xs">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}
