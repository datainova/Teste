import { BIRD, BIRD_VIEWBOX, toPoints } from "@/lib/bird";

export function BirdMark({ className, title = "Friday Feelings" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={BIRD_VIEWBOX} className={className} role="img" aria-label={title} fill="currentColor">
      {BIRD.map((t, i) => (
        <polygon key={i} points={toPoints(t)} />
      ))}
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-medium lowercase leading-none tracking-tight ${className ?? ""}`}>
      <BirdMark className="h-6 w-auto" />
      <span className="flex flex-col text-[0.95rem] leading-[0.9]">
        <span>friday</span>
        <span>feelings</span>
      </span>
    </span>
  );
}
