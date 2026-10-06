import Link from "next/link";
import { BirdMark } from "@/components/BirdMark";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-8">
        <p className="max-w-4xl text-[clamp(2.5rem,8vw,7rem)] font-medium leading-[0.95] tracking-tighter lowercase">
          work hard.
          <br />
          <span className="text-paper/40">feel friday.</span>
        </p>
        <div className="mt-24 flex flex-col gap-8 border-t border-paper/15 pt-8 text-sm sm:flex-row sm:items-end sm:justify-between">
          <BirdMark className="h-10 w-auto" />
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-paper/70">
            <Link href="/loja" className="link-underline">Loja</Link>
            <Link href="/#manifesto" className="link-underline">Manifesto</Link>
            <a href="https://www.instagram.com/" className="link-underline">Instagram</a>
            <a href="https://www.linkedin.com/" className="link-underline">LinkedIn</a>
          </nav>
          <p className="text-paper/50">© {new Date().getFullYear()} Friday Feelings</p>
        </div>
      </div>
    </footer>
  );
}
