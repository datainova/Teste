"use client";

import { useEffect, useState } from "react";
import { msUntilFriday } from "@/lib/friday";

function parts(ms: number) {
  const s = Math.floor(ms / 1000);
  return [
    { label: "dias", value: Math.floor(s / 86400) },
    { label: "horas", value: Math.floor((s % 86400) / 3600) },
    { label: "min", value: Math.floor((s % 3600) / 60) },
    { label: "seg", value: s % 60 },
  ];
}

export function FridayCountdown() {
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("friday");
    const read = () => (forced === "1" ? 0 : msUntilFriday());
    const tick = () => setMs(read());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  const friday = ms === 0;

  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-28 text-center sm:px-8">
        {friday ? (
          <>
            <p className="eyebrow mb-6 text-accent">É hoje</p>
            <h2 className="text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.9] tracking-tighter">É sexta. Desliga.</h2>
            <p className="mx-auto mt-6 max-w-md text-paper/60">Você mereceu. A gente só veio lembrar.</p>
          </>
        ) : (
          <>
            <p className="eyebrow mb-10 text-paper/50">Faltam pra sexta, 18h</p>
            <div className="flex justify-center gap-4 sm:gap-10" aria-live="off">
              {(ms === null ? parts(0).map((p) => ({ ...p, value: NaN })) : parts(ms)).map((p) => (
                <div key={p.label} className="min-w-[4.5rem] sm:min-w-[8rem]">
                  <p className="text-[clamp(3rem,10vw,8rem)] font-medium leading-none tracking-tighter tabular-nums">
                    {Number.isNaN(p.value) ? "--" : String(p.value).padStart(2, "0")}
                  </p>
                  <p className="eyebrow mt-3 text-paper/40">{p.label}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-md text-paper/60">Segura firme. Toda semana termina.</p>
          </>
        )}
      </div>
    </section>
  );
}
