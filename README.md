# Friday Feelings

> work hard. feel friday.

E-commerce da Friday Feelings. A gente não vende camiseta, vende a sensação de sexta-feira.

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

Pré-visualizar o **modo sexta-feira** em qualquer dia: `http://localhost:3000/?friday=1`

## Estrutura

```
src/
  app/
    page.tsx                 Home (Golden Circle: por quê → como → o quê)
    loja/                    Grade de produtos
    produto/[handle]/        Página de produto
  components/
    home/OrigamiWeek.tsx     Hero: a semana se dobra em origami até virar o pássaro
    home/Manifesto.tsx       Manifesto com revelação palavra a palavra
    home/ColorShowcase.tsx   Seletor de cor que muda o clima da seção
    home/Craft.tsx           Detalhes: tecido, bordado, tag, caixa
    home/FridayCountdown.tsx Contagem regressiva pra sexta 18h
    cart/CartDrawer.tsx      Carrinho em gaveta
  lib/
    bird.ts                  Geometria do pássaro (logo) e etapas da dobra
    commerce/                Camada de dados: hoje mock, depois Shopify
    cart.ts                  Estado do carrinho
    friday.ts                Lógica do modo sexta (horário de Brasília)
```

## Próximos passos

1. Criar a loja Shopify e trocar `src/lib/commerce/index.ts` por chamadas à Storefront API
2. Checkout Shopify com Mercado Pago/Pagar.me (Pix, cartão, boleto) e frete via Melhor Envio
3. Fotos reais de produto e lifestyle no lugar das ilustrações
4. Logo em vetor oficial (SVG), GA4, Meta Pixel e LinkedIn Insight Tag
5. Deploy na Vercel com domínio próprio
