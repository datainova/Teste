import type { Metadata } from "next";
import Link from "next/link";
import { Tee } from "@/components/product/Tee";
import { formatMoney, getProducts } from "@/lib/commerce";

export const metadata: Metadata = { title: "Loja" };

export default async function Shop() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-32 pt-32 sm:px-8 sm:pt-40">
      <p className="eyebrow mb-6 text-ink/50">Loja</p>
      <h1 className="mb-16 text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.9] tracking-tighter">
        Drop 001.
        <br />
        <span className="text-ink/40">Poucas peças.</span>
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.flatMap((product) =>
          product.colors.map((c) => (
            <Link key={c.id} href={`/produto/${product.handle}?cor=${c.id}`} className="group">
              <div
                className="mb-4 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl transition-colors duration-500"
                style={{ backgroundColor: c.mood }}
              >
                <Tee
                  color={c.hex}
                  ink={c.ink}
                  print={product.print}
                  className="w-3/4 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:-translate-y-2 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-ink/60">{c.name}</p>
                </div>
                <p>{formatMoney(product.price)}</p>
              </div>
            </Link>
          )),
        )}
      </div>
    </div>
  );
}
