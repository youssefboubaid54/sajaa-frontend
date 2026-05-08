"use client";

import { create } from "zustand";

export type CheckoutStep = "idle" | "checkout" | "upsell" | "done";

interface CheckoutState {
  step: CheckoutStep;
  orderIntentId?: string;
  customerName: string;
  phoneRaw: string;
  phoneE164?: string;
  phoneDigits?: string;
  upsellShown: boolean;
  upsellAccepted: boolean;
  upsellProduct?: string;
  webEventIds: Record<string, string>;
  attribution: Record<string, string>;
  lastOrderId?: string;
  setStep: (step: CheckoutStep) => void;
  setCustomer: (
    name: string,
    phoneRaw: string,
    phoneE164: string,
    phoneDigits: string
  ) => void;
  setOrderIntentId: (id: string) => void;
  setUpsellProduct: (slug: string) => void;
  acceptUpsell: () => void;
  skipUpsell: () => void;
  setEventId: (key: string, id: string) => void;
  setAttribution: (attrs: Record<string, string>) => void;
  setLastOrderId: (id: string) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  step: "idle",
  customerName: "",
  phoneRaw: "",
  upsellShown: false,
  upsellAccepted: false,
  webEventIds: {},
  attribution: {},
  setStep: (step) => set({ step }),
  setCustomer: (name, phoneRaw, phoneE164, phoneDigits) =>
    set({ customerName: name, phoneRaw, phoneE164, phoneDigits }),
  setOrderIntentId: (id) => set({ orderIntentId: id }),
  setUpsellProduct: (slug) => set({ upsellProduct: slug }),
  acceptUpsell: () => set({ upsellAccepted: true, upsellShown: true }),
  skipUpsell: () => set({ upsellAccepted: false, upsellShown: true }),
  setEventId: (key, id) =>
    set((state) => ({ webEventIds: { ...state.webEventIds, [key]: id } })),
  setAttribution: (attrs) => set({ attribution: attrs }),
  setLastOrderId: (id) => set({ lastOrderId: id }),
  reset: () =>
    set({
      step: "idle",
      orderIntentId: undefined,
      customerName: "",
      phoneRaw: "",
      phoneE164: undefined,
      phoneDigits: undefined,
      upsellShown: false,
      upsellAccepted: false,
      upsellProduct: undefined,
      webEventIds: {},
      lastOrderId: undefined,
    }),
}));
