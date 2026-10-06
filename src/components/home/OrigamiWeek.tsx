"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BIRD, BIRD_VIEWBOX, DIAMOND, HALF_FOLD, SHEET, inset, toPoints } from "@/lib/bird";

gsap.registerPlugin(ScrollTrigger);

const DAYS = [
  { short: "Seg", title: "Segunda.", line: "8h. Reunião pra alinhar a reunião." },
  { short: "Ter", title: "Terça.", line: "Deploy. Bug. Deploy de novo." },
  { short: "Qua", title: "Quarta.", line: "Metade do caminho. Quarto café." },
  { short: "Qui", title: "Quinta.", line: "Quase lá. Dá pra sentir." },
  { short: "Sex", title: "Sexta.", line: "Desliga." },
];

const PINGS = [
  { text: "14 e-mails não lidos", x: "8%", y: "22%" },
  { text: "Reunião em 5 min", x: "64%", y: "16%" },
  { text: "Build failed ✕", x: "70%", y: "70%" },
  { text: "@você consegue ver isso hoje?", x: "4%", y: "68%" },
  { text: "Prazo: hoje, 18h", x: "48%", y: "26%" },
  { text: "3 chamadas perdidas", x: "26%", y: "76%" },
  { text: "Sprint review às 17h", x: "40%", y: "82%" },
  { text: "Relatório pendente", x: "36%", y: "10%" },
];

const STAGES = [SHEET, DIAMOND, HALF_FOLD].map((s) => s.map((t) => toPoints(inset(t))));
const BIRD_POINTS = BIRD.map(toPoints);

export function OrigamiWeek() {
  const root = useRef<HTMLElement>(null);
  const [day, setDay] = useState(0);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const pieces = gsap.utils.toArray<SVGPolygonElement>(".piece", el);
      const pings = gsap.utils.toArray<HTMLElement>(".ping", el);
      const days = gsap.utils.toArray<HTMLElement>(".day", el);

      gsap.set(pings, { autoAlpha: 0, y: 20, scale: 0.9 });
      gsap.set(days.slice(1), { autoAlpha: 0, y: 40 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=500%",
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => setDay(Math.min(4, Math.floor(self.progress * 5.6))),
        },
      });

      // Mon → Thu: the sheet gets folded and the notifications pile up.
      for (let d = 0; d < 4; d++) {
        const at = d;
        if (d > 0) {
          tl.to(days[d - 1], { autoAlpha: 0, y: -40, duration: 0.3 }, at)
            .to(days[d], { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.15);
        }
        const target = d < 3 ? STAGES[d] : BIRD_POINTS;
        if (d > 0) {
          pieces.forEach((p, i) => {
            tl.to(p, { attr: { points: target[i] }, duration: 0.8 }, at + i * 0.03);
          });
        }
        tl.to(pings.slice(d * 2, d * 2 + 2), { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.2 }, at + 0.3);
      }
      tl.to(".bird", { scale: 0.82, rotate: -6, duration: 0.8, transformOrigin: "50% 50%" }, 3);

      // Friday: release.
      tl.to(days[3], { autoAlpha: 0, y: -40, duration: 0.3 }, 4)
        .to(".sunset", { autoAlpha: 1, duration: 0.6 }, 4)
        .to(
          pings,
          {
            autoAlpha: 0,
            x: () => gsap.utils.random(-300, 300),
            y: () => gsap.utils.random(-400, -150),
            rotate: () => gsap.utils.random(-30, 30),
            duration: 0.5,
            stagger: 0.03,
          },
          4,
        )
        .to(".bird", { scale: 1.08, rotate: 0, y: -30, duration: 0.8, ease: "power3.out" }, 4.1)
        .to(".piece", { fill: "#fffaf3", duration: 0.5 }, 4.1)
        .to(days[4], { autoAlpha: 1, y: 0, duration: 0.4 }, 4.3)
        .to(".friday-tag", { autoAlpha: 1, y: 0, duration: 0.4 }, 4.6)
        .to(".scroll-hint", { autoAlpha: 0, duration: 0.2 }, 0)
        .to({}, { duration: 0.6 });

      return () => setDay(0);
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh overflow-hidden bg-paper" aria-label="Uma semana em cinco dobras">
      <div
        className="sunset invisible absolute inset-0 opacity-0"
        style={{ background: "radial-gradient(120% 90% at 50% 100%, var(--sunset-to), var(--sunset-from) 55%, #f7dcc0)" }}
      />

      {PINGS.map((p) => (
        <div
          key={p.text}
          className="ping absolute z-10 hidden rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs shadow-sm backdrop-blur sm:block sm:text-sm motion-reduce:hidden"
          style={{ left: p.x, top: p.y }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
          {p.text}
        </div>
      ))}

      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_auto] content-center items-center gap-8 px-4 pb-24 pt-20 sm:px-8 md:grid-cols-2 md:grid-rows-1 md:pb-0">
        <div className="relative order-2 h-52 md:order-1 md:h-72">
          {DAYS.map((d, i) => (
            <div key={d.short} className="day absolute inset-x-0 top-0 motion-reduce:hidden">
              <p className="eyebrow mb-4 text-ink/50">{String(i + 1).padStart(2, "0")} / 05</p>
              <h1 className="text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-tighter">{d.title}</h1>
              <p className="mt-4 text-lg text-ink/70 sm:text-2xl">{d.line}</p>
              {i === 4 && (
                <p className="friday-tag invisible mt-6 translate-y-4 text-xl font-medium lowercase opacity-0 sm:text-3xl">
                  work hard. feel friday.
                </p>
              )}
            </div>
          ))}
          <div className="hidden motion-reduce:block">
            <h1 className="text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-tighter">Sexta.</h1>
            <p className="mt-4 text-2xl lowercase">work hard. feel friday.</p>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center md:order-2">
          <svg viewBox={BIRD_VIEWBOX} className="bird w-[min(72vw,520px)] overflow-visible" aria-hidden>
            {STAGES[0].map((pts, i) => (
              <polygon key={i} className="piece motion-reduce:hidden" points={pts} fill="var(--ink)" />
            ))}
            {BIRD_POINTS.map((pts, i) => (
              <polygon key={`r${i}`} className="hidden motion-reduce:block" points={pts} fill="var(--ink)" />
            ))}
          </svg>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 mx-auto flex max-w-7xl items-end justify-between px-4 sm:px-8">
        <ol className="flex gap-3 text-sm sm:gap-6" aria-label="Dia da semana">
          {DAYS.map((d, i) => (
            <li
              key={d.short}
              className={`border-b pb-1 transition-all duration-500 ${i === day ? "border-ink text-ink" : "border-transparent text-ink/35"}`}
            >
              {d.short}
            </li>
          ))}
        </ol>
        <p className="scroll-hint eyebrow text-ink/50">Role pra viver a semana ↓</p>
      </div>
    </section>
  );
}
