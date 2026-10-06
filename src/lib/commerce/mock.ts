import type { Product, ProductColor } from "./types";

const COLORS: ProductColor[] = [
  { id: "preto", name: "Preto", hex: "#141414", ink: "#efebe4", mood: "#2a2a2a" },
  { id: "off-white", name: "Off-white", hex: "#efebe4", ink: "#141414", mood: "#f6f3ee" },
  { id: "mescla", name: "Cinza Mescla", hex: "#a3a3a0", ink: "#141414", mood: "#d9d9d6" },
  { id: "marinho", name: "Azul Marinho", hex: "#1f2a44", ink: "#efebe4", mood: "#3a4560" },
  { id: "oliva", name: "Verde Oliva", hex: "#5b6146", ink: "#efebe4", mood: "#8a8f74" },
  { id: "areia", name: "Areia", hex: "#cdba9a", ink: "#141414", mood: "#e8dcc6" },
  { id: "por-do-sol", name: "Pôr do Sol", hex: "#c4602f", ink: "#efebe4", mood: "#f0a273" },
];

const DETAILS = [
  {
    title: "Tecido",
    body: "Algodão penteado fio 30.1, toque macio e caimento que não deforma depois da lavagem. Feito pra durar mais do que a semana.",
  },
  {
    title: "Detalhes",
    body: "Pássaro bordado no peito esquerdo, etiqueta interna estampada (nada de coceira na nuca) e tag externa em tecido.",
  },
  {
    title: "Embalagem",
    body: "Chega dobrada à mão numa caixa minimalista com um cartão escrito: work hard. feel friday.",
  },
  {
    title: "Trocas",
    body: "Primeira troca grátis em até 30 dias. Se não serviu, a gente resolve.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "ff-essential-tee",
    handle: "essential-tee",
    title: "Essential Tee",
    tagline: "A camiseta da sexta-feira. Todo dia.",
    description:
      "A peça que começou tudo. Minimalista, pesada no tecido e leve no visual, com o pássaro pequeno no peito pra lembrar que toda semana termina.",
    price: { amount: 189, currencyCode: "BRL" },
    colors: COLORS,
    sizes: ["P", "M", "G", "GG", "XG"],
    details: DETAILS,
  },
];
