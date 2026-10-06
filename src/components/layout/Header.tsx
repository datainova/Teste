"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Wordmark } from "@/components/BirdMark";
import { cartCount, useCart } from "@/lib/cart";
import { PRELAUNCH } from "@/lib/site";

export function Header() {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  // Cart lives in localStorage, so only show the count after hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const count = mounted ? cartCount(lines) : 0;

  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
        <Link href="/" aria-label="Friday Feelings, início">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-5 text-sm sm:gap-8">
          <Link href="/#manifesto" className="link-underline hidden sm:inline">
            Manifesto
          </Link>
          <Link href="/#historia" className="link-underline hidden sm:inline">
            A marca
          </Link>
          {PRELAUNCH ? (
            <Link href="/#drop" className="link-underline">
              Drop 001
            </Link>
          ) : (
            <>
              <Link href="/loja" className="link-underline">
                Loja
              </Link>
              <button onClick={() => setOpen(true)} className="link-underline" aria-label={`Abrir carrinho, ${count} itens`}>
                Carrinho ({count})
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
