# Friday Feelings

> work hard. feel friday.

E-commerce da Friday Feelings. Sexta-feira não é um dia. É um sentimento.
Pra quem treina sério, entrega sério e aproveita na medida certa.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS 4
- **GSAP + ScrollTrigger** para as animações guiadas por scroll, **Lenis** para scroll suave
- **Zustand** para o carrinho (persistido no `localStorage`)
- **Shopify** (Storefront API) como backend de e-commerce: _a conectar_

## Rodando

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

O hero soma o esforço e o transforma numa recompensa, que muda a cada visita. Pra ver uma específica: `http://localhost:3000/?recompensa=3`

## Estrutura

```
src/
  app/
    page.tsx                 Home (Golden Circle: por quê → como → o quê)
    loja/                    Grade de produtos
    produto/[handle]/        Página de produto
  components/
    home/EffortSum.tsx       Hero "a conta do esforço": cada número é uma dobra até virar o pássaro
    home/Manifesto.tsx       Manifesto com revelação palavra a palavra
    home/Founder.tsx         "Ninguém começa pronto": a história do fundador
    home/Craft.tsx           Detalhes: tecido, etiquetas, caixa, papel de origami
    home/Drop.tsx            Drop 001 com lista de espera
    home/EarnedFriday.tsx    Botão "Feito.": a sexta acontece quando o dia está ganho
    home/Community.tsx       Mil pássaros: #feelfriday e a contagem da comunidade
    cart/CartDrawer.tsx      Carrinho em gaveta
  lib/
    bird.ts                  Geometria do pássaro (logo) e etapas da dobra
    effort.ts                Números do esforço e recompensas do hero
    commerce/                Camada de dados: hoje mock, depois Shopify
    cart.ts                  Estado do carrinho
    site.ts                  Pré-lançamento (PRELAUNCH), contagem dos mil pássaros, links
    waitlist.ts              Lista de espera (ainda não conectada a um serviço)
```

## Próximos passos

0. Conectar a lista de espera (`src/lib/waitlist.ts`) a um serviço de e-mail antes de divulgar o site

1. Criar a loja Shopify e trocar `src/lib/commerce/index.ts` por chamadas à Storefront API
2. Checkout Shopify com Mercado Pago/Pagar.me (Pix, cartão, boleto) e frete via Melhor Envio
3. Fotos reais de produto e lifestyle no lugar das ilustrações
4. Logo em vetor oficial (SVG), GA4, Meta Pixel e LinkedIn Insight Tag
5. Deploy na Vercel com domínio próprio
