"use client";

import type { CartItem } from "@/store/cart-store";

function w(): Record<string, unknown> | null {
  return typeof window !== "undefined"
    ? (window as unknown as Record<string, unknown>)
    : null;
}

const eventQueue: Array<() => void> = [];
let pixelsReady = false;

export function setPixelsReady() {
  pixelsReady = true;
  eventQueue.forEach((fn) => fn());
  eventQueue.length = 0;
}

function queue(fn: () => void) {
  if (pixelsReady) {
    fn();
  } else {
    eventQueue.push(fn);
  }
}

function safeCall(fn: () => void) {
  try {
    fn();
  } catch {
    // ignore pixel errors
  }
}

export function firePageView(eventId: string) {
  queue(() => {
    safeCall(() => {
      const win = w();
      if (!win) return;
      const fbq = win.fbq as ((...args: unknown[]) => void) | undefined;
      const ttq = win.ttq as ({ track: (...args: unknown[]) => void }) | undefined;
      const snaptr = win.snaptr as ((...args: unknown[]) => void) | undefined;
      if (fbq) fbq("track", "PageView", {}, { eventID: eventId });
      if (ttq) ttq.track("Pageview", {}, { event_id: eventId });
      if (snaptr) snaptr("track", "PAGE_VIEW", { client_dedup_id: eventId });
    });
  });
}

export function fireViewContent(
  eventId: string,
  product: { nameAr: string; slug: string; priceSar: number }
) {
  queue(() => {
    safeCall(() => {
      const win = w();
      if (!win) return;
      const fbq = win.fbq as ((...args: unknown[]) => void) | undefined;
      const ttq = win.ttq as ({ track: (...args: unknown[]) => void }) | undefined;
      const snaptr = win.snaptr as ((...args: unknown[]) => void) | undefined;
      const data = {
        content_ids: [product.slug],
        content_name: product.nameAr,
        value: product.priceSar,
        currency: "SAR",
        content_type: "product",
      };
      if (fbq) fbq("track", "ViewContent", data, { eventID: eventId });
      if (ttq)
        ttq.track("ViewContent", { content_id: product.slug, value: product.priceSar, currency: "SAR" }, { event_id: eventId });
      if (snaptr)
        snaptr("track", "VIEW_CONTENT", { item_ids: [product.slug], price: product.priceSar, currency: "SAR", client_dedup_id: eventId });
    });
  });
}

export function fireAddToCart(eventId: string, item: CartItem) {
  queue(() => {
    safeCall(() => {
      const win = w();
      if (!win) return;
      const fbq = win.fbq as ((...args: unknown[]) => void) | undefined;
      const ttq = win.ttq as ({ track: (...args: unknown[]) => void }) | undefined;
      const snaptr = win.snaptr as ((...args: unknown[]) => void) | undefined;
      const data = { content_ids: [item.productSlug], value: item.offerPriceSar, currency: "SAR", content_type: "product" };
      if (fbq) fbq("track", "AddToCart", data, { eventID: eventId });
      if (ttq) ttq.track("AddToCart", { content_id: item.productSlug, value: item.offerPriceSar, currency: "SAR" }, { event_id: eventId });
      if (snaptr) snaptr("track", "ADD_CART", { item_ids: [item.productSlug], price: item.offerPriceSar, currency: "SAR", client_dedup_id: eventId });
    });
  });
}

export function fireInitiateCheckout(eventId: string, items: CartItem[], total: number) {
  queue(() => {
    safeCall(() => {
      const win = w();
      if (!win) return;
      const fbq = win.fbq as ((...args: unknown[]) => void) | undefined;
      const ttq = win.ttq as ({ track: (...args: unknown[]) => void }) | undefined;
      const snaptr = win.snaptr as ((...args: unknown[]) => void) | undefined;
      const content_ids = items.map((i) => i.productSlug);
      if (fbq) fbq("track", "InitiateCheckout", { content_ids, value: total, currency: "SAR", num_items: items.length }, { eventID: eventId });
      if (ttq) ttq.track("InitiateCheckout", { content_id: content_ids[0], value: total, currency: "SAR" }, { event_id: eventId });
      if (snaptr) snaptr("track", "START_CHECKOUT", { item_ids: content_ids, price: total, currency: "SAR", client_dedup_id: eventId });
    });
  });
}

export function firePurchase(eventId: string, orderId: string, total: number, items: CartItem[]) {
  queue(() => {
    safeCall(() => {
      const win = w();
      if (!win) return;
      const fbq = win.fbq as ((...args: unknown[]) => void) | undefined;
      const ttq = win.ttq as ({ track: (...args: unknown[]) => void }) | undefined;
      const snaptr = win.snaptr as ((...args: unknown[]) => void) | undefined;
      const content_ids = items.map((i) => i.productSlug);
      if (fbq) fbq("track", "Purchase", { content_ids, value: total, currency: "SAR", num_items: items.length }, { eventID: eventId });
      if (ttq) ttq.track("CompletePayment", { content_id: content_ids[0], value: total, currency: "SAR" }, { event_id: eventId });
      if (snaptr) snaptr("track", "PURCHASE", { transaction_id: orderId, item_ids: content_ids, price: total, currency: "SAR", client_dedup_id: eventId });
    });
  });
}
