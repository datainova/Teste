"use client";

import { useEffect } from "react";
import { Tee } from "@/components/product/Tee";
import { formatMoney } from "@/lib/commerce";
import { cartTotal, lineKey, useCart } from "@/lib/cart";

export function CartDrawer() {
  const { lines, open, setOpen, setQuantity, remove } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Carrinho"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper text-ink transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${open ? "translate-x-0 shadow-2xl" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="text-lg font-medium">Carrinho</h2>
          <button onClick={() => setOpen(false)} className="text-sm link-underline">
            Fechar
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-2xl font-medium tracking-tight">Ainda não é sexta aqui.</p>
            <p className="text-ink/60">Seu carrinho está vazio.</p>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
            {lines.map((l) => {
              const key = lineKey(l);
              return (
                <li key={key} className="flex gap-4 py-5">
                  <div className="w-20 shrink-0 rounded-lg bg-ink/5 p-2">
                    <Tee color={l.colorHex} ink={l.inkHex} />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium">{l.title}</p>
                      <p>{formatMoney(l.unitPrice * l.quantity)}</p>
                    </div>
                    <p className="text-sm text-ink/60">
                      {l.colorName} · {l.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3 text-sm">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button className="px-3 py-1" onClick={() => setQuantity(key, l.quantity - 1)} aria-label="Diminuir">
                          −
                        </button>
                        <span className="w-6 text-center tabular-nums">{l.quantity}</span>
                        <button className="px-3 py-1" onClick={() => setQuantity(key, l.quantity + 1)} aria-label="Aumentar">
                          +
                        </button>
                      </div>
                      <button onClick={() => remove(key)} className="text-ink/60 link-underline">
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="border-t border-ink/10 px-6 py-6">
          <div className="mb-1 flex justify-between text-lg">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatMoney(cartTotal(lines))}</span>
          </div>
          <p className="mb-5 text-sm text-ink/60">Frete calculado no checkout. Pix, cartão em até 6x ou boleto.</p>
          <button
            disabled={lines.length === 0}
            onClick={() => alert("O checkout será conectado ao Shopify assim que a loja estiver criada.")}
            className="btn-primary w-full disabled:opacity-40"
          >
            Finalizar compra
          </button>
        </div>
      </aside>
    </div>
  );
}
