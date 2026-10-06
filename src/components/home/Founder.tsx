"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The founder's path so far, told as folds: still being folded, like the brand.
const FOLDS = [
  "A primeira corrida.",
  "Do emprego CLT pra empresa própria.",
  "As primeiras meias maratonas.",
  "O primeiro treino de triathlon.",
  "Friday Feelings.",
];

// Recreates the Instagram stories where "Friday Feelings" was born: a landscape, the phrase in the middle.
function Story() {
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[2rem] shadow-2xl">
      <svg viewBox="0 0 300 533" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7dcc0" />
            <stop offset="0.55" stopColor="#f6c38f" />
            <stop offset="1" stopColor="#e9774a" />
          </linearGradient>
        </defs>
        <rect width="300" height="533" fill="url(#sky)" />
        <circle cx="150" cy="330" r="46" fill="#fff4e6" opacity="0.85" />
        <path d="M0 360 L70 300 L120 340 L190 270 L260 330 L300 300 V533 H0 Z" fill="#c4602f" opacity="0.55" />
        <path d="M0 410 L60 370 L140 400 L210 360 L300 395 V533 H0 Z" fill="#8e3f1c" opacity="0.65" />
        <path d="M0 460 Q150 430 300 460 V533 H0 Z" fill="#3b1a0b" opacity="0.8" />
      </svg>
      <div className="absolute inset-x-0 top-4 flex gap-1 px-4">
        <span className="h-0.5 flex-1 rounded bg-white/90" />
        <span className="h-0.5 flex-1 rounded bg-white/40" />
        <span className="h-0.5 flex-1 rounded bg-white/40" />
      </div>
      <p className="absolute inset-x-0 top-[38%] text-center text-2xl font-medium tracking-tight text-white drop-shadow">
        Friday Feelings
      </p>
    </div>
  );
}

export function Founder() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.querySelectorAll(".fold"), {
        opacity: 0,
        x: -24,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector("ol"), start: "top 80%" },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="historia" className="scroll-mt-24 bg-ink/[0.04]">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-32 sm:px-8 md:grid-cols-[1fr_1.3fr] md:items-center">
        <div>
          <Story />
          <p className="mt-5 text-center text-sm text-ink/50">
            Muito antes da camiseta, a frase já estava nos stories.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-6 text-ink/50">Uma marca em construção</p>
          <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[0.95] tracking-tighter">
            Ninguém começa pronto.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
            <p>
              Eu não sou atleta de elite. Comecei a correr há dois anos. No caminho, deixei o emprego CLT e abri uma
              empresa de tecnologia. Vieram as primeiras meias maratonas e, há pouco tempo, o triathlon.
            </p>
            <p>
              Muito antes de existir camiseta, &ldquo;Friday Feelings&rdquo; era a frase que eu escrevia em cima de uma
              paisagem nos stories, quando batia aquela sensação. Às vezes numa sexta. Muitas vezes, não.
            </p>
            <p>
              A Friday Feelings está sendo feita do mesmo jeito que eu estou me fazendo: dobra por dobra. É pra quem
              também está se construindo.
            </p>
          </div>

          <ol className="mt-10 border-l border-ink/15">
            {FOLDS.map((f, i) => (
              <li key={f} className="fold relative py-2 pl-6">
                <span
                  className={`absolute -left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
                    i === FOLDS.length - 1 ? "bg-accent" : "bg-ink"
                  }`}
                />
                <span className="eyebrow mr-3 text-ink/40">Dobra {i + 1}</span>
                <span className={i === FOLDS.length - 1 ? "font-medium" : ""}>{f}</span>
              </li>
            ))}
            <li className="relative py-2 pl-6 text-ink/45">
              <span className="absolute -left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-ink/40 bg-paper" />
              <span className="eyebrow mr-3">Dobra 6</span>
              Em construção.
            </li>
          </ol>
          <p className="mt-8 text-sm text-ink/50">— Fundador da Friday Feelings</p>
        </div>
      </div>
    </section>
  );
}
