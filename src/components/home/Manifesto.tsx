"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "A gente não espera a sexta-feira. A gente constrói ela. No treino antes do sol nascer. Na entrega que ninguém viu. No décimo quinto dia seguido. E quando o trabalho tá feito, a sexta chega, seja ela que dia for. Um vinho numa terça. Uma viagem paga com o próprio esforço. Descanso na medida certa, porque amanhã tem mais.";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll(".word"),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: el.querySelector("p"), start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="manifesto" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-32 sm:px-8 sm:py-48">
      <p className="eyebrow mb-10 text-ink/50">Manifesto · por que a gente existe</p>
      <p className="text-[clamp(1.75rem,4.6vw,3.75rem)] font-medium leading-[1.08] tracking-tight">
        {TEXT.split(" ").map((w, i) => (
          <span key={i} className="word">
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
