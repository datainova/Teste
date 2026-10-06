"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "./commerce/types";

type CartState = {
  lines: CartLine[];
  open: boolean;
  add: (line: CartLine) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  setOpen: (open: boolean) => void;
};

export const lineKey = (l: Pick<CartLine, "productHandle" | "colorId" | "size">) =>
  `${l.productHandle}:${l.colorId}:${l.size}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (line) =>
        set((s) => {
          const key = lineKey(line);
          const existing = s.lines.find((l) => lineKey(l) === key);
          const lines = existing
            ? s.lines.map((l) => (lineKey(l) === key ? { ...l, quantity: l.quantity + line.quantity } : l))
            : [...s.lines, line];
          return { lines, open: true };
        }),
      setQuantity: (key, quantity) =>
        set((s) => ({
          lines:
            quantity <= 0
              ? s.lines.filter((l) => lineKey(l) !== key)
              : s.lines.map((l) => (lineKey(l) === key ? { ...l, quantity } : l)),
        })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => lineKey(l) !== key) })),
      setOpen: (open) => set({ open }),
    }),
    { name: "ff-cart", partialize: (s) => ({ lines: s.lines }) },
  ),
);

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.quantity, 0);
export const cartTotal = (lines: CartLine[]) => lines.reduce((n, l) => n + l.quantity * l.unitPrice, 0);
