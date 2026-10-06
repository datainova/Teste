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
    body: "Algodão penteado fio 30.1. Pesado na mão, leve no corpo. Não deforma, não desbota, não te abandona na sexta.",
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
    title: "O bordado",
    body: "O pássaro de origami, pequeno, no peito esquerdo. Discreto pra quem vê. Um lembrete pra quem veste.",
    visual: (
      <div className="flex h-full w-full items-center justify-center">
        <BirdMark className="h-24 w-auto" />
      </div>
    ),
  },
  {
    n: "03",
    title: "A tag",
    body: "Etiqueta interna estampada, sem coceira. Tag externa em tecido, costurada à mão na barra.",
    visual: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-28 w-20 flex-col items-center justify-center gap-2 rounded-sm bg-ink text-paper shadow-lg">
          <BirdMark className="h-6 w-auto" />
          <span className="text-[0.55rem] lowercase leading-tight">friday<br />feelings</span>
        </div>
      </div>
    ),
  },
  {
    n: "04",
    title: "A caixa",
    body: "Dobrada à mão, como um origami. Abrir a caixa já é parte da sexta-feira.",
    visual: (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative h-28 w-40 rounded-sm bg-ink shadow-xl">
          <div className="absolute inset-x-0 top-0 h-6 rounded-t-sm bg-ink/80" />
          <p className="absolute inset-x-0 bottom-3 text-center text-[0.6rem] lowercase text-paper/80">work hard. feel friday.</p>
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
            Obsessão pelos detalhes que só você vai perceber.
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
