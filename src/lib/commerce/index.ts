import { PRODUCTS } from "./mock";
import type { Money, Product } from "./types";

// Single entry point for catalog data. When the Shopify store is live, swap
// these implementations for Storefront API calls; the signatures stay the same.

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function formatMoney(value: Money | number): string {
  const amount = typeof value === "number" ? value : value.amount;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(amount);
}

export type { Product, ProductColor, CartLine, Money } from "./types";
