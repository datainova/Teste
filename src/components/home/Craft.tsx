"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BirdMark } from "@/components/BirdMark";

gsap.registerPlugin(ScrollTrigger);

// "How": the details. Visuals are placeholders until the product photo shoot.
const ITEMS = [
  {
    n: "01",
    title: "O tecido",
    body: "Algodão penteado fio 30.1. Pesado na mão, leve no corpo. Não deforma, não desbota. Vai do escritório ao jantar sem perder a forma.",
    visual: (
      <div
        className="h-full w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,0,0,.06) 0 2px, transparent 2px 6px), repeating-linear-gradient(-45deg, rgba(0,0,0,.05) 0 2px, transparent 2px 6px)",
        }}
      />
    ),
  },
  {
    n: "02",
    title: "Os detalhes",
    body: "Estampa com tinta à base d'água: macia, que quase não se sente e não racha. Sem etiqueta coçando a nuca. Lá dentro, estampada, uma frase que só quem veste vê.",
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink text-paper">
        <BirdMark className="h-8 w-auto" />
        <span className="text-3xl font-medium leading-none">M</span>
        <span className="text-xs text-[#f6c38f]">tudo feito? então é sexta.</span>
      </div>
    ),
  },
  {
    n: "03",
    title: "A caixa",
    body: "Preta por fora, como a semana. Pôr do sol por dentro, como a sexta. Fechada com um selo: abra quando estiver tudo feito.",
    visual: (
      <div className="flex h-full w-full flex-col items-center justify-center p-8">
        <div
          className="h-24 w-44 rounded-t-md"
          style={{ background: "radial-gradient(120% 120% at 50% 110%, var(--sunset-to), var(--sunset-from))" }}
        />
        <div className="relative h-20 w-44 rounded-b-md bg-ink shadow-xl">
          <span className="absolute -top-5 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent">
            <BirdMark className="h-5 w-auto text-ink" />
          </span>
        </div>
      </div>
    ),
  },
  {
    n: "04",
    title: "O papel de origami",
    body: "Junto com a peça, um papel com as linhas de dobra. Você dobra o próprio pássaro e posta com #feelfriday.",
    visual: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative h-36 w-36 rotate-[-6deg] bg-paper shadow-lg">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            <path
              d="M0 0 L100 100 M100 0 L0 100 M50 0 L50 100 M0 50 L100 50"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeDasharray="3 2"
              strokeWidth="0.6"
              fill="none"
            />
          </svg>
          <span className="absolute inset-x-2 top-1/2 -translate-y-1/2 bg-paper py-1 text-center text-[0.65rem] font-medium leading-tight">
            dobre a sua
            <br />
            sexta-feira.
          </span>
        </div>
      </div>
    ),
  },
];

export function Craft() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".craft-item", el).forEach((item) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="mx-auto max-w-7xl px-4 py-32 sm:px-8">
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-6 text-ink/50">Os detalhes · como a gente faz</p>
          <h2 className="max-w-2xl text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-tighter">
            Feito com o cuidado de quem não aceita meia entrega.
          </h2>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it) => (
          <article key={it.n} className="craft-item group">
            <div className="mb-5 aspect-[4/5] overflow-hidden rounded-2xl bg-ink/[0.06] transition-transform duration-700 group-hover:-translate-y-1">
              {it.visual}
            </div>
            <p className="eyebrow mb-2 text-ink/40">{it.n}</p>
            <h3 className="mb-2 text-xl font-medium">{it.title}</h3>
            <p className="text-ink/65">{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
