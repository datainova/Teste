import { BIRD, toPoints } from "@/lib/bird";

export type TeePrint = "bird" | "statement";

// Flat-lay illustration used until real product photos exist.
export function Tee({
  color,
  ink,
  print = "bird",
  className,
}: {
  color: string;
  ink: string;
  print?: TeePrint;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 400 440" className={className} aria-hidden>
      <defs>
        <linearGradient id="tee-shade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <g style={{ transition: "fill 600ms cubic-bezier(.2,.7,.2,1)" }} fill={color}>
        <path d="M140 38 Q200 72 260 38 L338 66 Q362 76 372 98 L398 158 L334 186 L314 162 L316 418 Q200 430 84 418 L86 162 L66 186 L2 158 L28 98 Q38 76 62 66 Z" />
      </g>
      <path
        d="M140 38 Q200 72 260 38 L338 66 Q362 76 372 98 L398 158 L334 186 L314 162 L316 418 Q200 430 84 418 L86 162 L66 186 L2 158 L28 98 Q38 76 62 66 Z"
        fill="url(#tee-shade)"
      />
      <path d="M140 38 Q200 84 260 38" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="3" />
      <path d="M86 162 L84 120 M314 162 L316 120" stroke="#000" strokeOpacity="0.08" strokeWidth="2" />
      {print === "bird" ? (
        // Printed bird on the wearer's left chest
        <g transform="translate(246 104) scale(0.055) translate(-200 -210)" style={{ transition: "fill 600ms" }} fill={ink}>
          {BIRD.map((t, i) => (
            <polygon key={i} points={toPoints(t)} />
          ))}
        </g>
      ) : (
        // Tagline centred on the chest
        <text
          x="200"
          y="120"
          textAnchor="middle"
          fontSize="9"
          fontWeight="500"
          letterSpacing="-0.18"
          fill={ink}
          style={{ fontFamily: "var(--font-geist-sans), sans-serif", transition: "fill 600ms" }}
        >
          work hard. feel friday.
        </text>
      )}
    </svg>
  );
}
