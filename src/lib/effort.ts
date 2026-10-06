// "A conta do esforço": the hero adds up the effort and collapses it into one reward.
// The effort is the same for everyone; the reward changes on every visit, because
// everyone spends their Friday differently.

export type EffortLine = { from: number; to: number; unit: string };

export const EFFORT: EffortLine[] = [
  { from: 0, to: 312, unit: "treinos" },
  { from: 0, to: 1480, unit: "horas de trabalho" },
  { from: 0, to: 4212, unit: "km" },
  { from: 47, to: 0, unit: "desculpas" },
];

export type Reward = { title: string; detail: string };

export const REWARDS: Reward[] = [
  { title: "1 viagem.", detail: "Paga com o próprio esforço." },
  { title: "1 terça com vinho.", detail: "Uma taça. Amanhã tem treino." },
  { title: "1 domingo de praia.", detail: "Pé na areia, celular na bolsa." },
  { title: "1 jantar a dois.", detail: "Sem pressa e sem notificação." },
  { title: "1 happy hour.", detail: "Com quem torceu por você." },
  { title: "1 medalha.", detail: "E um hambúrguer na mão." },
  { title: "1 tarde livre.", detail: "Numa quarta-feira qualquer." },
  { title: "1 churrasco.", detail: "Com a família, sem olhar o relógio." },
  { title: "1 roda de samba.", detail: "Cerveja gelada e os amigos de sempre." },
  { title: "1 pôr do sol.", detail: "Visto de cima da prancha." },
  { title: "1 noite de sofá.", detail: "Série boa, pipoca. E tá tudo certo." },
  { title: "1 trilha.", detail: "Cachoeira e silêncio." },
];

export const formatCount = (n: number) => new Intl.NumberFormat("pt-BR").format(Math.round(n));

const LAST_KEY = "ff-last-reward";
let picked: number | undefined;

/**
 * Picks this page view's reward once: `?recompensa=N` (1-based) forces one for previews,
 * otherwise a random reward different from the one shown on the previous visit.
 */
export function pickReward(): number {
  if (picked !== undefined) return picked;
  const forced = Number(new URLSearchParams(window.location.search).get("recompensa"));
  if (Number.isInteger(forced) && forced >= 1 && forced <= REWARDS.length) {
    picked = forced - 1;
    return picked;
  }
  let last = -1;
  try {
    last = Number(localStorage.getItem(LAST_KEY) ?? -1);
  } catch {}
  let next = Math.floor(Math.random() * REWARDS.length);
  if (next === last) next = (next + 1) % REWARDS.length;
  try {
    localStorage.setItem(LAST_KEY, String(next));
  } catch {}
  picked = next;
  return picked;
}
