// Storefront-agnostic shapes. The mock catalog and the future Shopify adapter
// both return these, so pages never depend on where the data comes from.

export type Money = {
  amount: number; // in BRL, e.g. 189.0
  currencyCode: "BRL";
};

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
  // Colour of the printed bird or tagline on this fabric.
  ink: string;
  // Background tint the page fades to when this colour is selected.
  mood: string;
};

export type Product = {
  id: string;
  print: "bird" | "statement";
  handle: string;
  title: string;
  tagline: string;
  description: string;
  price: Money;
  colors: ProductColor[];
  sizes: string[];
  details: { title: string; body: string }[];
};

export type CartLine = {
  productHandle: string;
  title: string;
  colorId: string;
  colorName: string;
  colorHex: string;
  inkHex: string;
  print: "bird" | "statement";
  size: string;
  quantity: number;
  unitPrice: number;
};
