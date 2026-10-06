"use client";

import { useState } from "react";

// Friday is earned, not scheduled: the visitor decides when they've done the work,
// and the whole site warms up (<html data-friday>, see globals.css).
export function EarnedFriday() {
  const [earned, setEarned] = useState(false);

  function toggle(on: boolean) {
    setEarned(on);
    document.documentElement.toggleAttribute("data-friday", on);
  }

  return (
    <section
      className="relative overflow-hidden text-paper transition-colors duration-1000"
      style={{ backgroundColor: earned ? "var(--sunset-to)" : "var(--ink)" }}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${earned ? "opacity-100" : "opacity-0"}`}
        style={{ background: "radial-gradient(120% 100% at 50% 110%, var(--sunset-to), var(--sunset-from) 60%, #f7dcc0)" }}
      />
      <div className="relative mx-auto max-w-5xl px-4 py-32 text-center sm:px-8 sm:py-40">
        {earned ? (
          <div key="earned" className="text-ink">
            <p className="eyebrow mb-6 text-ink/60">Friday feeling desbloqueado</p>
            <h2 className="text-[clamp(3rem,10vw,8.5rem)] font-medium leading-[0.9] tracking-tighter">Então é sexta.</h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-ink/70">
              Não importa o dia. Aproveita, na medida certa. Amanhã tem treino.
            </p>
            <button onClick={() => toggle(false)} className="mt-10 text-sm text-ink/70 link-underline">
              Voltar pro corre
            </button>
          </div>
        ) : (
          <div key="grind">
            <p className="eyebrow mb-6 text-paper/50">Sexta-feira não é um dia</p>
            <h2 className="text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.92] tracking-tighter">
              Hoje você cumpriu?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-paper/60">
              Treino feito, trabalho entregue. Só você sabe quando conquistou.
            </p>
            <button
              onClick={() => toggle(true)}
              className="mt-12 rounded-full border border-paper/30 px-10 py-5 text-xl font-medium transition-all duration-300 hover:scale-105 hover:border-transparent hover:bg-paper hover:text-ink"
            >
              Cumpri.
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
