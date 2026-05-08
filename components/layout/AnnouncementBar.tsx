"use client";

import { useState, useEffect } from "react";
import { COPY } from "@/data/copy";

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % COPY.announcement.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy text-gold text-sm py-2 text-center font-medium tracking-wide">
      <span>{COPY.announcement[index]}</span>
    </div>
  );
}
