"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type ProductSlug = "hams" | "hidn" | "subaat";

export interface CartItem {
  id: string;
  productSlug: ProductSlug;
  productNameAr: string;
  productNameEn: string;
  quantity: 1 | 2 | 3;
  offerPriceSar: 199 | 279 | 349;
  unitAnchorPriceSar: 199;
  image: string;
  addedFrom: "product_page" | "collection" | "cart_cross_sell" | "upsell";
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productSlug === item.productSlug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productSlug === item.productSlug ? { ...item, id: i.id } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...item, id: uuidv4() }],
            isOpen: true,
          };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    { name: "sajaa-cart" }
  )
);
