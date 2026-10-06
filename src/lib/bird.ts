// Geometry of the Friday Feelings origami bird, traced from the original logo.
// Every piece is a triangle, which lets the hero animate a flat sheet of paper
// (the same six triangles tiling a square) into the bird, vertex by vertex.

export type Point = [number, number];
export type Triangle = [Point, Point, Point];

export const BIRD_VIEWBOX = "190 200 620 570";

export const BIRD: Triangle[] = [
  [[268, 265], [355, 293], [405, 475]], // back wing
  [[345, 217], [528, 343], [430, 527]], // front wing
  [[537, 352], [608, 612], [328, 752]], // body
  [[206, 710], [374, 637], [320, 744]], // tail
  [[585, 487], [695, 428], [615, 600]], // neck
  [[707, 430], [797, 520], [670, 512]], // head
];

// A 400×400 sheet centred on the bird, cut into six triangles that meet at the centre.
const C: Point = [500, 485];
const TL: Point = [300, 285];
const TR: Point = [700, 285];
const BR: Point = [700, 685];
const BL: Point = [300, 685];
const MT: Point = [500, 285];
const ML: Point = [300, 485];

// Ordered to match BIRD: each sheet triangle becomes the bird piece at the same index.
export const SHEET: Triangle[] = [
  [ML, TL, C],
  [TL, MT, C],
  [BR, BL, C],
  [BL, ML, C],
  [MT, TR, C],
  [TR, BR, C],
];

function rotate([x, y]: Point, deg: number, [cx, cy]: Point = C): Point {
  const r = (deg * Math.PI) / 180;
  const dx = x - cx;
  const dy = y - cy;
  return [cx + dx * Math.cos(r) - dy * Math.sin(r), cy + dx * Math.sin(r) + dy * Math.cos(r)];
}

function lerp(a: Point, b: Point, t: number): Point {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

export const DIAMOND: Triangle[] = SHEET.map((t) => t.map((p) => rotate(p, 45)) as Triangle);

export const HALF_FOLD: Triangle[] = DIAMOND.map(
  (t, i) => t.map((p, j) => rotate(lerp(p, BIRD[i][j], 0.55), -12)) as Triangle,
);

export const NEAR_BIRD: Triangle[] = HALF_FOLD.map(
  (t, i) => t.map((p, j) => rotate(lerp(p, BIRD[i][j], 0.6), 8)) as Triangle,
);

/** Pulls each vertex toward the triangle's centroid, leaving the paper-cut gaps the logo has. */
export function inset(t: Triangle, amount = 0.06): Triangle {
  const cx = (t[0][0] + t[1][0] + t[2][0]) / 3;
  const cy = (t[0][1] + t[1][1] + t[2][1]) / 3;
  return t.map(([x, y]) => [x + (cx - x) * amount, y + (cy - y) * amount]) as Triangle;
}

export function toPoints(t: Triangle): string {
  return t.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}
