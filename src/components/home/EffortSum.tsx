"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BIRD, BIRD_VIEWBOX, DIAMOND, HALF_FOLD, NEAR_BIRD, SHEET, inset, toPoints } from "@/lib/bird";
import { EFFORT, REWARDS, formatCount, pickReward } from "@/lib/effort";

gsap.registerPlugin(ScrollTrigger);

const STAGES = [SHEET, DIAMOND, HALF_FOLD, NEAR_BIRD].map((s) => s.map((t) => toPoints(inset(t))));
const BIRD_POINTS = BIRD.map(toPoints);
// Fold reached after each effort line; the bird only completes with the last one.
const FOLDS = [STAGES[1], STAGES[2], STAGES[3], BIRD_POINTS];

const noopSubscribe = () => () => {};

// The hero adds up the effort, line by line, folding the paper with every number,
// then collapses the sum into a single reward and lets the bird fly.
export function EffortSum() {
  const root = useRef<HTMLElement>(null);
  // Drawn on the client so every visit gets a different reward; null while server-rendering.
  const rewardIndex = useSyncExternalStore(noopSubscribe, pickReward, () => null);
  const reward = REWARDS[rewardIndex ?? 0];

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const pieces = gsap.utils.toArray<SVGPolygonElement>(".piece", el);
      const lines = gsap.utils.toArray<HTMLElement>(".sum-line", el);
      const counters = gsap.utils.toArray<HTMLElement>(".counter", el);

      counters.forEach((c, i) => (c.textContent = formatCount(EFFORT[i].from)));
      gsap.set(lines, { autoAlpha: 0, y: 24 });
      gsap.set([".sum-rule"], { scaleX: 0 });
      gsap.set([".sum-result", ".finale > *"], { autoAlpha: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: el, start: "top top", end: "+=600%", pin: true, scrub: 0.8 },
      });

      tl.to([".scroll-hint", ".intro"], { autoAlpha: 0, y: -30, duration: 0.25 }, 0.05);

      EFFORT.forEach((line, i) => {
        const at = i * 0.9 + 0.2;
        const value = { n: line.from };
        tl.to(lines[i], { autoAlpha: 1, y: 0, duration: 0.3 }, at)
          .to(
            value,
            {
              n: line.to,
              duration: 0.7,
              ease: "power1.out",
              onUpdate: () => {
                counters[i].textContent = formatCount(value.n);
              },
            },
            at + 0.1,
          );
        pieces.forEach((p, j) => {
          tl.to(p, { attr: { points: FOLDS[i][j] }, duration: 0.7 }, at + j * 0.03);
        });
      });
      tl.to(".bird", { scale: 0.8, rotate: -8, duration: 0.8, transformOrigin: "50% 50%" }, 2.9);

      // The total.
      tl.to(".sum-rule", { scaleX: 1, duration: 0.3, ease: "power3.out" }, 3.9)
        .to(".sum-result", { autoAlpha: 1, y: 0, duration: 0.3 }, 4.1);

      // Collapse the sum into the reward and release the bird.
      tl.to([...lines, ".sum-rule", ".sum-result"], { autoAlpha: 0, y: -40, duration: 0.4, stagger: 0.04 }, 4.8)
        .to(".sunset", { autoAlpha: 1, duration: 0.6 }, 4.9)
        .to(".bird", { scale: 1.08, rotate: 0, y: -30, duration: 0.8, ease: "power3.out" }, 5)
        .to(".piece", { fill: "#fffaf3", duration: 0.5 }, 5)
        .to(".finale > *", { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.25 }, 5.2)
        .to({}, { duration: 0.6 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="relative h-svh overflow-hidden bg-paper" aria-label="A conta do esforço">
      <div
        className="sunset invisible absolute inset-0 opacity-0"
        style={{ background: "radial-gradient(120% 90% at 50% 100%, var(--sunset-to), var(--sunset-from) 55%, #f7dcc0)" }}
      />

      <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_auto] content-center items-center gap-8 px-4 pb-16 pt-20 sm:px-8 md:grid-cols-2 md:grid-rows-1 md:pb-0">
        <div
          className={`relative order-2 h-[19rem] transition-opacity duration-500 sm:h-[22rem] md:order-1 ${rewardIndex === null ? "opacity-0" : "opacity-100"}`}
        >
          <p className="intro absolute inset-x-0 top-0 text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[0.92] tracking-tighter motion-reduce:hidden">
            Sexta-feira
            <br />
            se conquista.
          </p>

          <div className="absolute inset-x-0 top-0 motion-reduce:hidden" aria-hidden>
            <ul className="space-y-1 sm:space-y-2">
              {EFFORT.map((line) => (
                <li
                  key={line.unit}
                  className="sum-line flex items-baseline gap-3 text-[clamp(1.6rem,4.2vw,3.25rem)] font-medium leading-tight tracking-tight"
                >
                  <span className="counter tabular-nums">{formatCount(line.to)}</span>
                  <span className="text-ink/45">{line.unit}</span>
                </li>
              ))}
            </ul>
            <div className="sum-rule mt-4 h-0.5 w-full max-w-md origin-left bg-ink" />
            <p className="sum-result mt-4 text-[clamp(1.6rem,4.2vw,3.25rem)] font-medium leading-tight tracking-tight">
              = {reward.title}
            </p>
          </div>

          <div className="finale absolute inset-x-0 top-0">
            <h1 className="text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[0.92] tracking-tighter">{reward.title}</h1>
            <p className="mt-3 text-lg text-ink/70 sm:text-2xl">{reward.detail}</p>
            <p className="mt-8 text-xl font-medium leading-snug sm:text-3xl">
              Sexta-feira não é um dia.
              <br />É um sentimento.
            </p>
            <p className="mt-4 text-base lowercase text-ink/60 sm:text-lg">work hard. feel friday.</p>
          </div>
        </div>

        <div className="order-1 flex items-center justify-center md:order-2">
          <svg viewBox={BIRD_VIEWBOX} className="bird w-[min(62vw,520px)] overflow-visible" aria-hidden>
            {STAGES[0].map((pts, i) => (
              <polygon key={i} className="piece motion-reduce:hidden" points={pts} fill="var(--ink)" />
            ))}
            {BIRD_POINTS.map((pts, i) => (
              <polygon key={`r${i}`} className="hidden motion-reduce:block" points={pts} fill="var(--ink)" />
            ))}
          </svg>
        </div>
      </div>

      <p className="scroll-hint eyebrow absolute inset-x-0 bottom-6 text-center text-ink/50">A conta do esforço ↓</p>
    </section>
  );
}
