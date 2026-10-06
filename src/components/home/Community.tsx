import { BirdMark } from "@/components/BirdMark";
import { BIRDS_FOLDED, BIRDS_GOAL, INSTAGRAM_URL } from "@/lib/site";

// Every order ships with origami paper; customers fold their own bird and post it.
// The goal of a thousand birds comes from senbazuru, the legend of the thousand paper cranes.
export function Community() {
  const progress = Math.min(1, BIRDS_FOLDED / BIRDS_GOAL);

  return (
    <section className="mx-auto max-w-7xl px-4 py-32 sm:px-8">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-6 text-ink/50">Mil pássaros</p>
          <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-medium leading-[0.95] tracking-tighter">
            Dobre a sua
            <br />
            sexta-feira.
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink/70">
            Toda peça chega com um papel de origami. Você dobra o próprio pássaro, dobra por dobra, e posta com{" "}
            <a href={INSTAGRAM_URL} className="font-medium text-accent link-underline">
              #feelfriday
            </a>
            .
          </p>
          <p className="mt-4 max-w-md text-ink/55">
            Diz a lenda japonesa que quem dobra mil pássaros de papel tem um desejo realizado. A gente quer chegar nos
            mil juntos.
          </p>
        </div>

        <div className="rounded-3xl bg-ink p-10 text-paper">
          <BirdMark className="h-12 w-auto text-accent" />
          <p className="mt-10 text-[clamp(3.5rem,8vw,6rem)] font-medium leading-none tracking-tighter tabular-nums">
            {BIRDS_FOLDED.toLocaleString("pt-BR")}
            <span className="text-paper/30"> / {BIRDS_GOAL.toLocaleString("pt-BR")}</span>
          </p>
          <div className="mt-6 h-1 w-full rounded-full bg-paper/15">
            <div className="h-1 rounded-full bg-accent" style={{ width: `${Math.max(progress * 100, 1)}%` }} />
          </div>
          <p className="mt-4 text-paper/60">
            {BIRDS_FOLDED === 0 ? "A contagem começa com o Drop 001." : "pássaros dobrados até agora."}
          </p>
        </div>
      </div>
    </section>
  );
}
