"use client";

import { useState } from "react";
import { joinWaitlist } from "@/lib/waitlist";

export function WaitlistForm({ product, dark = false }: { product?: string; dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await joinWaitlist(email, product);
    setDone(true);
  }

  if (done) {
    return (
      <p className={`rounded-full px-6 py-4 text-center font-medium ${dark ? "bg-paper/10" : "bg-ink/5"}`}>
        Feito. Você vai ser avisado antes de todo mundo.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor={`email-${product ?? "drop"}`} className="sr-only">
        Seu e-mail
      </label>
      <input
        id={`email-${product ?? "drop"}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        className={`min-w-0 flex-1 rounded-full border bg-transparent px-6 py-4 outline-none transition-colors ${
          dark ? "border-paper/25 placeholder:text-paper/40 focus:border-paper" : "border-ink/20 placeholder:text-ink/40 focus:border-ink"
        }`}
      />
      <button type="submit" className="btn-primary whitespace-nowrap">
        Entrar na lista
      </button>
    </form>
  );
}
