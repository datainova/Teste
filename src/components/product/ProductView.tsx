"use client";

import { useState } from "react";
import { Tee } from "@/components/product/Tee";
import { formatMoney, type Product } from "@/lib/commerce";
import { useCart } from "@/lib/cart";
import { PRELAUNCH } from "@/lib/site";
import { WaitlistForm } from "@/components/WaitlistForm";

export function ProductView({ product, initialColorId }: { product: Product; initialColorId?: string }) {
  const [color, setColor] = useState(product.colors.find((c) => c.id === initialColorId) ?? product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [openDetail, setOpenDetail] = useState(0);
  const add = useCart((s) => s.add);

  function addToCart() {
    if (!size) {
      setSizeError(true);
      return;
    }
    add({
      productHandle: product.handle,
      title: product.title,
      colorId: color.id,
      colorName: color.name,
      colorHex: color.hex,
      inkHex: color.ink,
      print: product.print,
      size,
      quantity: 1,
      unitPrice: product.price.amount,
    });
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 pt-24 sm:px-8 md:grid-cols-[1.2fr_1fr] md:gap-16 md:pt-32">
      <div
        className="flex aspect-square items-center justify-center rounded-3xl transition-colors duration-700 md:sticky md:top-28 md:aspect-[4/5]"
        style={{ backgroundColor: color.mood }}
      >
        <Tee color={color.hex} ink={color.ink} print={product.print} className="w-3/4 drop-shadow-[0_30px_30px_rgba(0,0,0,0.2)]" />
      </div>

      <div className="md:py-8">
        <p className="eyebrow mb-4 text-ink/50">Friday Feelings</p>
        <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.95] tracking-tighter">{product.title}</h1>
        <p className="mt-3 text-lg text-ink/60">{product.tagline}</p>
        <p className="mt-6 text-2xl">
          {formatMoney(product.price)}{" "}
          <span className="text-base text-ink/50">ou 6x de {formatMoney(product.price.amount / 6)} sem juros</span>
        </p>

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
                className={`h-10 w-10 rounded-full border border-black/15 transition-transform duration-300 hover:scale-110 ${
                  c.id === color.id ? "scale-110 ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex justify-between text-sm">
            <p>Tamanho</p>
            {sizeError && <p className="text-accent">Escolhe um tamanho primeiro</p>}
          </div>
          <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Tamanho">
            {product.sizes.map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={s === size}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className={`rounded-full border py-3 text-sm transition-colors ${
                  s === size ? "border-ink bg-ink text-paper" : "border-ink/15 hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {PRELAUNCH ? (
          <div className="mt-8">
            <p className="mb-3 text-sm text-ink/60">Drop 001 · poucas peças. Entre na lista pra ser avisado antes de todo mundo.</p>
            <WaitlistForm product={product.handle} />
          </div>
        ) : (
          <>
            <button onClick={addToCart} className="btn-primary mt-8 w-full">
              Adicionar ao carrinho
            </button>
            <p className="mt-4 text-center text-sm text-ink/50">Frete grátis acima de R$ 299 · Primeira troca grátis</p>
          </>
        )}

        <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {product.details.map((d, i) => (
            <div key={d.title}>
              <button
                onClick={() => setOpenDetail(openDetail === i ? -1 : i)}
                className="flex w-full items-center justify-between py-5 text-left"
                aria-expanded={openDetail === i}
              >
                <span className="font-medium">{d.title}</span>
                <span className={`transition-transform duration-300 ${openDetail === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
                  openDetail === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <p className="overflow-hidden text-ink/65">
                  <span className="block pb-5">{d.body}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
