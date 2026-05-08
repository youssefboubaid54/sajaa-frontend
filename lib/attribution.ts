"use client";

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  ttclid?: string;
  ScCid?: string;
  _fbp?: string;
  _fbc?: string;
  _ttp?: string;
  landing_url?: string;
  referrer?: string;
}

const STORAGE_KEY = "sajaa_attribution";

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Attribution;
    } catch {
      // ignore parse errors
    }
  }

  const params = new URLSearchParams(window.location.search);

  const attr: Attribution = {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
    fbclid: params.get("fbclid") || undefined,
    ttclid: params.get("ttclid") || undefined,
    ScCid: params.get("ScCid") || undefined,
    _fbp: getCookie("_fbp"),
    _fbc: getCookie("_fbc"),
    _ttp: getCookie("_ttp"),
    landing_url: window.location.href,
    referrer: document.referrer || undefined,
  };

  const cleaned = Object.fromEntries(
    Object.entries(attr).filter(([, v]) => v !== undefined)
  ) as Attribution;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  } catch {
    // ignore storage errors
  }

  return cleaned;
}

export function getStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Attribution) : {};
  } catch {
    return {};
  }
}
