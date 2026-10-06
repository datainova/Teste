"use client";

import Link from "next/link";
import { useState } from "react";
import { Tee } from "@/components/product/Tee";
import { formatMoney, type Product } from "@/lib/commerce";

function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

export function ColorShowcase({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const dark = isDark(color.mood);

  return (
    <section
      className={`transition-colors duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${dark ? "text-paper" : "text-ink"}`}
      style={{ backgroundColor: color.mood }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-8 md:grid-cols-2 md:py-32">
        <div className="relative flex justify-center">
          <Tee color={color.hex} ink={color.ink} className="w-[min(85vw,480px)] drop-shadow-[0_24px_24px_rgba(0,0,0,0.18)]" />
        </div>
        <div>
          <p className="eyebrow mb-6 opacity-60">O produto · o que a gente faz</p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-tighter">{product.title}</h2>
          <p className="mt-4 max-w-md text-lg opacity-75">{product.description}</p>

          <div className="mt-10">
            <p className="mb-3 text-sm">
              Cor: <span className="font-medium">{color.name}</span>
            </p>
            <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Cor">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  role="radio"
                  aria-checked={c.id === color.id}
                  aria-label={c.name}
                  onClick={() => setColor(c)}
                  className={`h-10 w-10 rounded-full border transition-transform duration-300 hover:scale-110 ${
                    c.id === color.id ? "scale-110 ring-2 ring-current ring-offset-2 ring-offset-transparent" : ""
                  } ${dark ? "border-white/30" : "border-black/15"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href={`/produto/${product.handle}?cor=${color.id}`} className="btn-primary">
              Quero a minha · {formatMoney(product.price)}
            </Link>
            <span className="text-sm opacity-60">ou 6x de {formatMoney(product.price.amount / 6)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
