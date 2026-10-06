"use client";

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BIRD, BIRD_VIEWBOX, DIAMOND, HALF_FOLD, SHEET, inset, toPoints } from "@/lib/bird";
import { STEP_LABEL, STORIES, pickStory, pingsFor } from "@/lib/stories";

gsap.registerPlugin(ScrollTrigger);

const PING_SPOTS = [
  { x: "8%", y: "22%" },
  { x: "64%", y: "16%" },
  { x: "70%", y: "70%" },
  { x: "4%", y: "68%" },
  { x: "48%", y: "26%" },
  { x: "26%", y: "76%" },
  { x: "40%", y: "82%" },
  { x: "36%", y: "10%" },
];

const noopSubscribe = () => () => {};

const STAGES = [SHEET, DIAMOND, HALF_FOLD].map((s) => s.map((t) => toPoints(inset(t))));
const BIRD_POINTS = BIRD.map(toPoints);

// Each effort in the story is a fold; the bird is the reward, on whatever day it lands.
export function OrigamiStory() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  // Drawn on the client so every visit gets a different story; null while server-rendering.
  const storyIndex = useSyncExternalStore(noopSubscribe, pickStory, () => null);
  const story = STORIES[storyIndex ?? 0];
  const pings = pingsFor(storyIndex ?? 0);

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
          onUpdate: (self) => {
            setStep(Math.min(4, Math.floor(self.progress * 5.6)));
            setProgress(Math.min(1, (self.progress * 5.6) / 5));
          },
        },
      });

      // Every effort folds the sheet a bit more, and the wins pile up.
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

      // The reward: switch off, whatever day it is.
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

      return () => {
        setStep(0);
        setProgress(0);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh overflow-hidden bg-paper" aria-label="Uma história de quem rala, em cinco dobras">
      <div
        className="sunset invisible absolute inset-0 opacity-0"
        style={{ background: "radial-gradient(120% 90% at 50% 100%, var(--sunset-to), var(--sunset-from) 55%, #f7dcc0)" }}
      />

      {PING_SPOTS.map((p, i) => (
        <div
          key={i}
          className="ping absolute z-10 hidden rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-xs shadow-sm backdrop-blur sm:block sm:text-sm motion-reduce:hidden"
          style={{ left: p.x, top: p.y }}
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
          {pings[i]}
        </div>
      ))}

      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_auto] content-center items-center gap-8 px-4 pb-24 pt-20 sm:px-8 md:grid-cols-2 md:grid-rows-1 md:pb-0">
        <div
          className={`relative order-2 h-52 transition-opacity duration-500 md:order-1 md:h-72 ${storyIndex === null ? "opacity-0" : "opacity-100"}`}
        >
          {story.map((d, i) => (
            <div key={i} className="day absolute inset-x-0 top-0 motion-reduce:hidden">
              <p className="eyebrow mb-4 text-ink/50">
                {String(i + 1).padStart(2, "0")} / 05 · {STEP_LABEL[d.kind].eyebrow}
              </p>
              <h1 className="whitespace-nowrap text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[0.9] tracking-tighter">{d.title}</h1>
              <p className="mt-4 text-lg text-ink/70 sm:text-2xl">{d.line}</p>
              {i === 4 && (
                <p className="friday-tag invisible mt-6 translate-y-4 text-xl font-medium lowercase opacity-0 sm:text-3xl">
                  work hard. feel friday.
                </p>
              )}
            </div>
          ))}
          <div className="hidden motion-reduce:block">
            <h1 className="text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-tighter">Sexta-feira não é um dia.</h1>
            <p className="mt-4 text-2xl">É o que você sente quando cumpre.</p>
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
        <div className="w-[min(60vw,320px)]" aria-hidden>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-ink">{STEP_LABEL[story[step].kind].label}</span>
            <span className="tabular-nums text-ink/50">{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-px w-full bg-ink/15">
            <div className="h-px origin-left bg-ink" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
        <p className="scroll-hint eyebrow text-ink/50">Role pra viver a história ↓</p>
      </div>
    </section>
  );
}
