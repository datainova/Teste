"use client";

import Link from "next/link";
import { useState } from "react";
import { Tee } from "@/components/product/Tee";
import { WaitlistForm } from "@/components/WaitlistForm";
import type { Product } from "@/lib/commerce";

function DropCard({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);

  return (
    <article>
      <Link
        href={`/produto/${product.handle}?cor=${color.id}`}
        className="group mb-5 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl transition-colors duration-700"
        style={{ backgroundColor: color.mood }}
      >
        <Tee
          color={color.hex}
          ink={color.ink}
          print={product.print}
          className="w-3/4 drop-shadow-[0_24px_24px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-2"
        />
      </Link>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-medium tracking-tight">{product.title}</h3>
          <p className="mt-1 text-ink/60">{product.tagline}</p>
        </div>
        <div className="flex gap-2 pt-1" role="radiogroup" aria-label={`Cor da ${product.title}`}>
          {product.colors.map((c) => (
            <button
              key={c.id}
              role="radio"
              aria-checked={c.id === color.id}
              aria-label={c.name}
              onClick={() => setColor(c)}
              className={`h-8 w-8 rounded-full border border-black/15 transition-transform duration-300 hover:scale-110 ${
                c.id === color.id ? "ring-2 ring-ink ring-offset-2 ring-offset-paper" : ""
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

// "What": the first small batch, sold through a waitlist while the brand is in pre-launch.
export function Drop({ products }: { products: Product[] }) {
  return (
    <section id="drop" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-32 sm:px-8">
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="eyebrow mb-6 text-ink/50">Drop 001 · o que a gente faz</p>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-tighter">
            Primeiro lote.
            <br />
            <span className="text-ink/40">Poucas peças.</span>
          </h2>
        </div>
        <p className="max-w-md text-lg text-ink/65 md:justify-self-end">
          Duas camisetas, feitas em pequena quantidade pra quem quer vestir a ideia desde o começo. Entre na lista e
          seja avisado antes de todo mundo.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {products.map((p) => (
          <DropCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-xl text-center">
        <p className="mb-6 text-lg font-medium">Quero saber quando o Drop 001 abrir.</p>
        <WaitlistForm />
      </div>
    </section>
  );
}
