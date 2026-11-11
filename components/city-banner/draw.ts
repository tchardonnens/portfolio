/**
 * Small path-building helpers shared by the banner artwork.
 *
 * Everything is drawn in a 400-unit-tall coordinate space with the waterline
 * at y = GROUND. Randomness is seeded so server and client render the same
 * markup.
 */

export const HEIGHT = 400;
export const GROUND = 300;

/** Deterministic PRNG (mulberry32). */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function rect(x: number, y: number, w: number, h: number) {
  return `M${r1(x)},${r1(y)}h${r1(w)}v${r1(h)}h${r1(-w)}Z`;
}

/**
 * A sweeping East Asian roof: wide upturned tips at the bottom, narrowing to
 * `topW` at the ridge.
 */
export function eave(cx: number, y: number, w: number, topW: number, h: number, overhang = 6) {
  const l = cx - w / 2;
  const r = cx + w / 2;
  return (
    `M${r1(l - overhang)},${r1(y - 2.5)}` +
    `Q${r1(l)},${r1(y)} ${r1(cx - topW / 2)},${r1(y - h)}` +
    `H${r1(cx + topW / 2)}` +
    `Q${r1(r)},${r1(y)} ${r1(r + overhang)},${r1(y - 2.5)}` +
    `V${r1(y + 1)}H${r1(l - overhang)}Z`
  );
}

export function circ(cx: number, cy: number, r: number) {
  return `M${r1(cx - r)},${r1(cy)}a${r},${r} 0 1 0 ${r1(2 * r)},0a${r},${r} 0 1 0 ${r1(-2 * r)},0Z`;
}

interface SkylineOptions {
  seed: number;
  from: number;
  to: number;
  minH: number;
  maxH: number;
  minW: number;
  maxW: number;
  gap?: number;
  /** 0..1 — how often a building gets a distinctive top. */
  detail?: number;
  base?: number;
  /** Optional envelope: scales building height along x (0..1 → factor). */
  envelope?: (t: number) => number;
}

/** A run of generic buildings between `from` and `to`, one path per building. */
export function skyline({
  seed,
  from,
  to,
  minH,
  maxH,
  minW,
  maxW,
  gap = 0,
  detail = 0.6,
  base = GROUND,
  envelope,
}: SkylineOptions) {
  const rand = rng(seed);
  const out: string[] = [];
  let x = from;
  while (x < to - minW) {
    const w = Math.min(minW + rand() * (maxW - minW), to - x);
    const t = (x + w / 2 - from) / (to - from);
    const scale = envelope ? envelope(t) : 1;
    const h = (minH + rand() * rand() * (maxH - minH)) * scale + minH * (1 - scale) * 0.5;
    const top = base - h;
    let d = rect(x, top, w, h + 1);
    const roll = rand() / Math.max(detail, 0.01);
    const tall = h > (minH + maxH) / 2;
    if (roll < 0.16) {
      // stepped crown
      d += rect(x + w * 0.18, top - 5, w * 0.64, 6);
      if (w > 11) d += rect(x + w * 0.36, top - 9.5, w * 0.28, 5.5);
    } else if (roll < 0.3) {
      // mast
      d += rect(x + w * 0.5 - 0.6, top - 12 - rand() * 10, 1.2, 24);
      d += rect(x + w * 0.3, top - 3, w * 0.4, 4);
    } else if (roll < 0.42) {
      // slanted roof
      const up = 5 + rand() * 6;
      d +=
        rand() < 0.5
          ? `M${r1(x)},${r1(top + 0.5)}L${r1(x + w)},${r1(top - up)}V${r1(top + 0.5)}Z`
          : `M${r1(x)},${r1(top + 0.5)}V${r1(top - up)}L${r1(x + w)},${r1(top + 0.5)}Z`;
    } else if (roll < 0.54 && tall) {
      // setback tower
      const sh = 10 + rand() * 14;
      d += rect(x + w * 0.16, top - sh, w * 0.68, sh + 1);
      d += rect(x + w * 0.5 - 0.5, top - sh - 9, 1, 10);
    } else if (roll < 0.64) {
      // rounded top
      d += `M${r1(x)},${r1(top + 0.5)}A${r1(w / 2)},${r1(w * 0.36)} 0 0 1 ${r1(x + w)},${r1(top + 0.5)}Z`;
    } else if (roll < 0.74) {
      // pyramid cap
      d += `M${r1(x + 1)},${r1(top + 0.5)}L${r1(x + w / 2)},${r1(top - w * 0.55)}L${r1(x + w - 1)},${r1(top + 0.5)}Z`;
    } else if (roll < 0.9) {
      // plant room
      d += rect(x + 2, top - 3.5, w * 0.4, 4);
    }
    out.push(d);
    x += w + gap * rand();
  }
  return out;
}

/** A rolling ridge that tiles horizontally (starts and ends at the same height). */
export function ridge(seed: number, width: number, baseY: number, amp: number, step: number) {
  const rand = rng(seed);
  const n = Math.round(width / step);
  const ys: number[] = [];
  for (let i = 0; i < n; i++)
    ys.push(baseY - rand() * amp - (i % 3 === 0 ? rand() * amp * 0.8 : 0));
  ys.push(ys[0]);
  let d = `M0,${HEIGHT}V${r1(ys[0])}`;
  for (let i = 0; i < n; i++) {
    const x0 = i * step;
    const x1 = (i + 1) * step;
    const mid = (x0 + x1) / 2;
    d += `C${r1(mid)},${r1(ys[i])} ${r1(mid)},${r1(ys[i + 1])} ${r1(x1)},${r1(ys[i + 1])}`;
  }
  return `${d}V${HEIGHT}Z`;
}

/** Height of a polyline at x (linear interpolation). */
export function yAt(points: [number, number][], x: number) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    if (x >= x0 && x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
  }
  return points[points.length - 1][1];
}
