import type { Product, ProductColor } from "./types";

const COLOR: Record<string, ProductColor> = {
  preto: { id: "preto", name: "Preto", hex: "#141414", ink: "#efebe4", mood: "#2a2a2a" },
  offWhite: { id: "off-white", name: "Off-white", hex: "#efebe4", ink: "#141414", mood: "#f6f3ee" },
  areia: { id: "areia", name: "Areia", hex: "#cdba9a", ink: "#141414", mood: "#e8dcc6" },
};

const DETAILS = [
  {
    title: "Tecido",
    body: "Algodão penteado fio 30.1, toque macio e caimento que não deforma depois da lavagem. Aguenta a rotina inteira com você.",
  },
  {
    title: "Detalhes",
    body: "Etiqueta interna estampada (nada de coceira na nuca), com uma frase que só quem veste vê, e etiqueta tecida na barra.",
  },
  {
    title: "Embalagem",
    body: "Caixa preta por fora, pôr do sol por dentro. E um papel de origami pra você dobrar o próprio pássaro.",
  },
  {
    title: "Trocas",
    body: "Primeira troca grátis em até 30 dias. Se não serviu, a gente resolve.",
  },
];

// Drop 001: the first small batch, two models.
export const PRODUCTS: Product[] = [
  {
    id: "ff-essential-tee",
    handle: "essential-tee",
    print: "bird",
    title: "Essential Tee",
    tagline: "O pássaro no peito. Quem sabe, reconhece.",
    description:
      "A peça que começou tudo. Minimalista, pesada no tecido e leve no visual, com o pássaro bordado pequeno no peito esquerdo.",
    price: { amount: 189, currencyCode: "BRL" },
    colors: [COLOR.preto, COLOR.offWhite],
    sizes: ["P", "M", "G", "GG", "XG"],
    details: DETAILS,
  },
  {
    id: "ff-statement-tee",
    handle: "statement-tee",
    print: "statement",
    title: "Statement Tee",
    tagline: "A frase que explica a marca sozinha.",
    description:
      "work hard. feel friday. Centralizado no peito, em letra pequena. Pra quem gosta de dizer de onde vem a sexta-feira.",
    price: { amount: 189, currencyCode: "BRL" },
    colors: [COLOR.preto, COLOR.areia],
    sizes: ["P", "M", "G", "GG", "XG"],
    details: DETAILS,
  },
];
