import type { ReactNode } from 'react';
import { GROUND as G, circ, eave, rect, rng, skyline, yAt } from './draw';

/* Palette — resolved from CSS custom properties so the banner follows the theme. */
const F = 'var(--cb-front)';
const M = 'var(--cb-mid)';
const M2 = 'var(--cb-mid-2)';
const HILL = 'var(--cb-hill)';
const FAR = 'var(--cb-far)';
const RED = 'var(--cb-red)';
const GOLD = 'var(--cb-gold)';
const STONE = 'var(--cb-stone)';
const WALL = 'var(--cb-wall)';
const ROOF = 'var(--cb-roof)';
const WOOD = 'var(--cb-wood)';
const JADE = 'var(--cb-jade)';
const AZURE = 'var(--cb-azure)';
const GRASS = 'var(--cb-grass)';
const BLOSSOM = 'var(--cb-blossom)';
const BRIDGE = 'var(--cb-bridge)';
const PEARL = 'var(--cb-pearl)';
const FERRY = 'var(--cb-ferry)';
const WIN = 'var(--cb-win)';
const PANE = 'var(--cb-pane)';
const PANE_OFF = 'var(--cb-pane-off)';
const TRIM = 'var(--cb-trim)';

/* --- painting helpers ------------------------------------------------------ */

/** Path data grouped by fill; painted in insertion order. */
type Paint = Record<string, string>;

function paint(...order: string[]): Paint {
  const p: Paint = {};
  order.forEach((k) => (p[k] = ''));
  return p;
}

function put(p: Paint, fill: string, d: string) {
  p[fill] = (p[fill] ?? '') + d;
}

function Painted({ p }: { p: Paint }) {
  return (
    <>{Object.entries(p).map(([fill, d]) => (d ? <path key={fill} d={d} fill={fill} /> : null))}</>
  );
}

/** A regular grid of windows; some lit, some dark. */
function windows(
  p: Paint,
  rand: () => number,
  x: number,
  y: number,
  w: number,
  h: number,
  cols: number,
  rows: number,
  ww: number,
  wh: number,
  lit = 0.6
) {
  const gx = (w - cols * ww) / (cols + 1);
  const gy = (h - rows * wh) / (rows + 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      put(
        p,
        rand() < lit ? PANE : PANE_OFF,
        rect(x + gx + c * (ww + gx), y + gy + r * (wh + gy), ww, wh)
      );
    }
  }
}

const WINDOW_PATTERNS = ['cb-win', 'cb-win-grid', 'cb-win-band', 'cb-win-fin'];

/** Generic towers: alternating tones, each with one of several window rhythms. */
function Towers({ blocks, fills = [M, M2] }: { blocks: string[]; fills?: string[] }) {
  return (
    <>
      {fills.map((fill, i) => (
        <path key={fill} d={blocks.filter((_, j) => j % fills.length === i).join('')} fill={fill} />
      ))}
      {WINDOW_PATTERNS.map((id, i) => (
        <path
          key={id}
          d={blocks.filter((_, j) => (j * 7 + 3) % WINDOW_PATTERNS.length === i).join('')}
          fill={`url(#${id})`}
          opacity="var(--cb-win-dim)"
        />
      ))}
    </>
  );
}

/** A single mass with a window pattern laid over it. */
function Lit({
  d,
  fill = F,
  pattern = 'cb-win',
  rule,
}: {
  d: string;
  fill?: string;
  pattern?: string;
  rule?: 'evenodd';
}) {
  return (
    <>
      <path d={d} fill={fill} fillRule={rule} />
      <path d={d} fill={`url(#${pattern})`} fillRule={rule} />
    </>
  );
}

function Tree({ x, r = 8, y = G, fill = F }: { x: number; r?: number; y?: number; fill?: string }) {
  return (
    <>
      <rect x={x - 0.8} y={y - r * 1.5} width={1.6} height={r * 1.5} fill={F} />
      <circle cx={x} cy={y - r * 1.7} r={r} fill={fill} />
    </>
  );
}

function Lamp({ x, y = G, h = 11 }: { x: number; y?: number; h?: number }) {
  return (
    <>
      <rect x={x - 0.4} y={y - h} width={0.8} height={h} fill={F} />
      <circle cx={x} cy={y - h - 1} r={3.4} fill={GOLD} opacity="var(--cb-glow)" />
      <circle cx={x} cy={y - h - 1} r={1.3} fill={GOLD} />
    </>
  );
}

function Willow({ x, h = 30 }: { x: number; h?: number }) {
  const top = G - 5 - h;
  const strands = [-12, -7, -2, 3, 8, 13]
    .map((dx, i) => `M${x + dx},${top + 5}v${Math.min(h - 8, [15, 22, 17, 24, 19, 13][i])}`)
    .join('');
  return (
    <g strokeLinecap="round" fill="none">
      <path d={`M${x},${G - 4}q-3,${-h / 2} 0,${-h + 6}`} strokeWidth={2.2} stroke={F} />
      <path d={strands} strokeWidth={4.4} stroke={GRASS} />
      <ellipse cx={x + 0.5} cy={top + 5} rx={14.5} ry={9} fill={GRASS} />
    </g>
  );
}

/* --- small craft ----------------------------------------------------------- */

export function Sampan({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x},${y})${flip ? ' scale(-1,1)' : ''}`} fill={F}>
      <path d="M-28,-4Q0,8 28,-4Q0,1 -28,-4Z" />
      <path d="M-12,-1A11,8 0 0 1 10,-1Z" />
      <circle cx={18} cy={-15} r={2.2} />
      <path d="M13.5,-12.5L18,-17.5L22.5,-12.5Z" />
      <path d="M16.8,-12h2.4v10h-2.4Z" />
      <path d="M21,-11L30,7" stroke={F} strokeWidth={1} fill="none" />
    </g>
  );
}

export function Junk({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M0.5,-8V-42M-13,-8V-29M24,-11V-31" stroke={F} strokeWidth={1.2} />
      <g fill={RED}>
        <path d="M1,-9L-3,-40Q11,-45 17,-30L16,-9Z" />
        <path d="M-12,-9L-19,-27Q-11,-31 -6,-21L-7,-9Z" />
        <path d="M24,-12L22,-30Q29,-32 32,-24L31,-13Z" />
      </g>
      <path
        d="M-2,-33L16,-28M-1,-25L16,-21M0,-17L16,-14M-17,-22L-6,-19M-15,-15L-7,-13M23,-25L32,-22M23,-18L31,-17"
        stroke={F}
        strokeWidth={0.6}
        opacity={0.5}
      />
      <path d="M-24,0L-29,-8L-10,-5H15L32,-12L27,0Q0,5 -24,0Z" fill={F} />
    </g>
  );
}

export function Sailboat({ x, y, flip }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x},${y})${flip ? ' scale(-1,1)' : ''}`}>
      <path d="M1,-5V-32L15,-7Z" fill={STONE} />
      <path d="M-1,-6V-25L-11,-7Z" fill={STONE} />
      <path d="M-11,0L-14,-5H14L10,0Z" fill={F} />
    </g>
  );
}

function Ferry({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-14} y={-17} width={28} height={5} fill={STONE} />
      <rect x={-20} y={-12} width={40} height={6} fill={STONE} />
      <rect x={-2} y={-23} width={5} height={6} fill={F} />
      <path d="M-24,0L-28,-7H28L24,0Z" fill={FERRY} />
      <path d="M-17,-10h34" stroke={F} strokeWidth={1.4} strokeDasharray="2.5 2" />
    </g>
  );
}

function RiverBoat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M-34,-6Q-34,-13 -26,-13H22Q30,-13 32,-6Z" fill={STONE} opacity={0.9} />
      <path d="M-28,-9.5h54" stroke={F} strokeWidth={2.2} strokeDasharray="5 2" />
      <path d="M-40,0L-42,-6H40L34,0Z" fill={F} />
    </g>
  );
}

/* --- Paris ----------------------------------------------------------------- */

/** A run of Haussmann blocks: stone fronts, balconies, zinc mansards, chimney pots. */
function haussmann(seed: number, from: number, to: number, low = false) {
  const rand = rng(seed);
  const p = paint(WALL, PANE_OFF, PANE, ROOF, WOOD, RED);
  let x = from;
  while (x < to - 20) {
    const w = Math.min(30 + rand() * 22, to - x);
    const h = (low ? 24 : 31) + rand() * 11;
    const top = G - h;
    put(p, WALL, rect(x, top, w, h));
    // shopfronts
    const bays = Math.floor(w / 7.5);
    const bayGap = (w - bays * 4.6) / (bays + 1);
    for (let i = 0; i < bays; i++) {
      const bx = x + bayGap + i * (4.6 + bayGap);
      put(p, PANE_OFF, `M${bx},${G}v-4.2a2.3,2.3 0 0 1 4.6,0V${G}Z`);
      if (rand() < 0.3) put(p, RED, rect(bx - 0.6, G - 7.6, 5.8, 1.5));
    }
    // floors of tall windows
    const rows = Math.max(3, Math.floor((h - 9) / 6.4));
    windows(p, rand, x, top + 0.6, w, h - 9.4, Math.floor(w / 5.4), rows, 1.9, 3.7, 0.55);
    // balconies and cornice
    put(p, ROOF, rect(x, G - 9.2, w, 0.8));
    put(p, ROOF, rect(x, top + (h - 9.4) / rows + 0.2, w, 0.7));
    put(p, ROOF, rect(x - 0.5, top - 0.7, w + 1, 1.3));
    // mansard with dormers
    put(
      p,
      ROOF,
      `M${x + 0.3},${top}L${x + 2.8},${top - 7.6}H${x + w - 2.8}L${x + w - 0.3},${top}Z`
    );
    for (let dx = x + 5; dx < x + w - 6; dx += 5.4) put(p, PANE, rect(dx, top - 5.6, 1.9, 3));
    // chimney stacks with clay pots
    const stacks = 1 + Math.floor(rand() * 2);
    for (let i = 0; i < stacks; i++) {
      const cx = x + 4 + rand() * (w - 14);
      put(p, WOOD, rect(cx, top - 11.4, 6, 4));
      for (let k = 0; k < 3; k++) put(p, WOOD, rect(cx + 0.6 + k * 1.9, top - 13.4, 1, 2.2));
    }
    x += w;
  }
  return p;
}

const parisBlocks = [
  haussmann(11, 22, 128),
  haussmann(29, 214, 376),
  haussmann(53, 660, 884, true),
];

const notreDame = (() => {
  const x = 546;
  const p = paint(WALL, ROOF, PANE_OFF, PANE);
  // nave, roof and apse
  put(p, WALL, rect(x + 26, G - 34, 62, 34) + `M${x + 88},${G}v-34a9,12 0 0 1 9,12V${G}Z`);
  put(
    p,
    ROOF,
    `M${x + 25},${G - 34}L${x + 28},${G - 47}H${x + 86}L${x + 97},${G - 22}L${x + 88},${G - 34}Z`
  );
  put(p, ROOF, `M${x + 56.5},${G - 46}L${x + 58.3},${G - 96}L${x + 60},${G - 46}Z`);
  for (let i = 0; i < 8; i++) {
    const wx = x + 30 + i * 7.4;
    put(p, PANE, `M${wx},${G - 12}v-10a1.3,2.4 0 0 1 2.600,0v10Z`);
    put(p, WALL, `M${wx + 3.6},${G}v-27l1.6,-3v30Z`);
    put(p, ROOF, rect(wx - 1, G - 31, 4.6, 0.8));
  }
  // west towers and the gallery between them
  put(
    p,
    WALL,
    rect(x, G - 68, 11.5, 68) + rect(x + 18.5, G - 68, 11.5, 68) + rect(x + 11, G - 45, 8, 45)
  );
  put(p, ROOF, rect(x - 0.6, G - 69.4, 12.7, 1.6) + rect(x + 17.9, G - 69.4, 12.7, 1.6));
  put(p, ROOF, rect(x, G - 46, 30, 1) + rect(x, G - 27.5, 30, 0.9) + rect(x, G - 17, 30, 0.8));
  [x + 2.3, x + 6.6, x + 20.8, x + 25.1].forEach((lx) =>
    put(p, PANE_OFF, `M${lx},${G - 48}v-14a1.3,2 0 0 1 2.600,0v14Z`)
  );
  put(
    p,
    PANE,
    circ(x + 15, G - 35.5, 3.5) + circ(x + 5.7, G - 37, 1.5) + circ(x + 24.3, G - 37, 1.5)
  );
  [x + 5.7, x + 15, x + 24.3].forEach((px) =>
    put(p, PANE_OFF, `M${px - 3},${G}v-8q0,-5 3,-7q3,2 3,7v8Z`)
  );
  return p;
})();

function Paris() {
  return (
    <>
      {/* Montmartre and Sacré-Cœur */}
      <path d="M612,300C660,262 712,236 766,236C826,236 862,270 896,300Z" fill={HILL} />
      {[640, 664, 690, 850, 872].map((x, i) => (
        <circle key={x} cx={x} cy={i < 3 ? 280 - i * 12 : 262 + (i - 3) * 16} r={9} fill={HILL} />
      ))}
      <g transform="translate(66,-14)">
        <rect x={733} y={188} width={10} height={64} fill={STONE} />
        <path d="M731.5,188L738,170L744.5,188Z" fill={STONE} />
        <rect x={670} y={226} width={60} height={26} fill={STONE} />
        <rect x={689.5} y={202} width={21} height={26} fill={STONE} />
        <path d="M686.5,204C686.5,180 696,171 700,156C704,171 713.5,180 713.5,204Z" fill={STONE} />
        <rect x={698.6} y={144} width={2.8} height={14} fill={STONE} />
        <circle cx={700} cy={144} r={1.9} fill={STONE} />
        <path d="M669,228C669,213 674.5,209 677,199C679.5,209 685,213 685,228Z" fill={STONE} />
        <path d="M715,228C715,213 720.5,209 723,199C725.500,209 731,213 731,228Z" fill={STONE} />
        <path
          d="M689,252v-11a2.6,2.6 0 0 1 5.200,0v11ZM697.400,252v-11a2.6,2.6 0 0 1 5.200,0v11ZM705.800,252v-11a2.6,2.6 0 0 1 5.200,0v11ZM675,236h4v7h-4ZM721,236h4v7h-4ZM736,194h4v9h-4ZM736,210h4v8h-4Z"
          fill={PANE_OFF}
        />
        <path
          d="M692,214h2.200v8h-2.200ZM696.6,214h2.200v8h-2.200ZM701.200,214h2.200v8h-2.200ZM705.8,214h2.200v8h-2.200Z"
          fill={PANE}
        />
        <path
          d="M686.5,204h27M670,232h60M693,186q7,-8 14,0"
          stroke={PANE_OFF}
          strokeWidth={0.8}
          fill="none"
        />
      </g>

      {parisBlocks.map((p, i) => (
        <Painted key={i} p={p} />
      ))}

      {/* Arc de Triomphe */}
      <path
        d="M139,300V233H201V300ZM157,300V269A13,13 0 0 1 183,269V300Z"
        fill={STONE}
        fillRule="evenodd"
      />
      <path d="M157,300V269A13,13 0 0 1 163,258.500V300Z" fill={ROOF} opacity={0.45} />
      <path
        d={rect(137.5, 246, 65, 1.5) + rect(137.5, 232, 65, 1.8) + rect(139, 251, 62, 0.8)}
        fill={ROOF}
      />
      <path
        d={
          rect(143, 272, 10, 17) +
          rect(187, 272, 10, 17) +
          rect(144, 256, 8, 8) +
          rect(188, 256, 8, 8) +
          rect(143, 237, 54, 6)
        }
        fill={PANE_OFF}
        opacity={0.28}
      />
      {[130, 208].map((x) => (
        <Tree key={x} x={x} r={6.5} />
      ))}

      {/* Champ de Mars */}
      {[386, 402, 498, 514].map((x, i) => (
        <Tree key={x} x={x} r={i % 2 ? 8 : 6.5} fill={GRASS} />
      ))}

      {/* Eiffel Tower */}
      <path
        d="M394,300C424,262 441,190 446.6,72H453.4C459,190 476,262 506,300ZM414,300Q450,236 486,300ZM438,246L450,208L462,246Z"
        fill={F}
        fillRule="evenodd"
      />
      <path
        d="M394,300C424,262 441,190 446.6,72H453.4C459,190 476,262 506,300ZM414,300Q450,236 486,300ZM438,246L450,208L462,246Z"
        fill="url(#cb-lattice)"
        fillRule="evenodd"
      />
      <path
        d={
          rect(419, 247.5, 62, 5.5) +
          rect(434.5, 200.5, 31, 5) +
          rect(443.4, 91, 13.2, 4) +
          rect(446, 84, 8, 7) +
          'M446.4,84L450,76L453.600,84Z'
        }
        fill={F}
      />
      <path d="M449.300,78L450,48L450.700,78Z" fill={F} />
      <path d="M419,247.500h62M434.5,200.5h31" stroke="var(--cb-lattice)" strokeWidth={1} />
      <circle cx={450} cy={48} r={1.7} fill={GOLD} />

      <Painted p={notreDame} />

      {[36, 96, 236, 296, 356, 540, 652, 700, 760, 820].map((x) => (
        <Lamp key={x} x={x} />
      ))}
      <rect x={16} y={298.5} width={872} height={2.5} fill={ROOF} />
    </>
  );
}

/* --- Hangzhou -------------------------------------------------------------- */

/** Leifeng Pagoda: five bronze storeys, each with a balcony and a sweeping eave. */
const leifeng = (() => {
  const cx = 692;
  const base = 245;
  const p = paint(STONE, WOOD, F, PANE, GOLD);
  put(p, STONE, rect(cx - 31, base - 4, 62, 5) + rect(cx - 26, base - 7, 52, 3.5));
  let y = base - 7;
  for (let i = 0; i < 5; i++) {
    const w = 40 - i * 5.4;
    const h = 17 - i * 0.8;
    const body = w - 9;
    put(p, WOOD, rect(cx - body / 2, y - h + 5.5, body, h - 5.5));
    put(p, F, rect(cx - w / 2 + 2, y - 2, w - 4, 1.1));
    const n = i < 3 ? 3 : 2;
    for (let k = 0; k < n; k++) {
      const wx = cx - body / 2 + ((k + 0.5) * body) / n - 1.2;
      put(p, PANE, `M${wx},${y - 2.2}v-4.4a1.2,1.4 0 0 1 2.400,0v4.4Z`);
    }
    put(p, F, eave(cx, y - h + 6, w + 2, body - 5, 5.6, 5.5));
    y -= h;
  }
  put(p, F, eave(cx, y + 1.5, 15, 2, 9, 4));
  put(p, GOLD, rect(cx - 0.7, y - 22, 1.4, 16) + circ(cx, y - 11, 1.6) + circ(cx, y - 15.5, 1.2));
  return p;
})();

/** Jiangnan houses: white walls, dark tiles, stepped "horse-head" gables. */
function jiangnan(houses: [number, number, number][]) {
  const p = paint(STONE, ROOF, PANE_OFF, RED);
  houses.forEach(([x, w, h], i) => {
    const top = G - h;
    put(p, STONE, rect(x, top, w, h));
    put(
      p,
      ROOF,
      `M${x - 1.5},${top + 0.6}L${x + 2.5},${top - 5.5}H${x + w - 2.5}L${x + w + 1.5},${top + 0.6}Z`
    );
    put(p, ROOF, rect(x + 2, top - 6.4, w - 4, 1.2));
    // stepped gable on one end
    const gx = i % 2 ? x + w - 3 : x;
    put(p, STONE, rect(gx, top - 4, 3, 5) + rect(gx + (i % 2 ? -3 : 3), top - 1.5, 3, 2.5));
    put(p, ROOF, rect(gx - 1, top - 5.2, 5, 1.3) + rect(gx + (i % 2 ? -4 : 2), top - 2.7, 5, 1.3));
    for (let wx = x + 4; wx < x + w - 5; wx += 6.5) put(p, PANE_OFF, rect(wx, top + 4, 2.4, 3));
    put(p, PANE_OFF, rect(x + w / 2 - 1.6, G - 6.5, 3.2, 6.5));
    put(p, RED, circ(x + w / 2 + 3.4, G - 6, 1.1));
  });
  return p;
}

const hangzhouVillage = jiangnan([
  [770, 24, 15],
  [796, 20, 20],
  [818, 28, 14],
  [848, 22, 18],
  [560, 22, 14],
  [584, 18, 18],
]);

function Hangzhou() {
  return (
    <>
      <path
        d="M30,300C110,262 190,232 262,244C330,256 364,222 442,212C520,202 580,236 640,226C704,216 764,232 824,264C852,279 872,292 890,300Z"
        fill={HILL}
      />
      {/* Baochu Pagoda, slim on the far ridge */}
      <path
        d="M236,246l1.8,-22l1.1,-14l1.1,14l1.800,22ZM233.500,246h11v2.500h-11ZM236.6,232h4.800v1h-4.800ZM237.200,224h3.6v1h-3.6Z"
        fill={M}
      />

      {/* Leifeng Pagoda on Sunset Hill */}
      <path d="M548,300C604,266 648,245 692,244C742,244 792,270 846,300Z" fill={M} />
      {[610, 634, 656, 730, 752, 778].map((x, i) => (
        <circle key={x} cx={x} cy={[268, 258, 250, 251, 259, 270][i]} r={8.5} fill={M} />
      ))}
      <Painted p={leifeng} />
      <Painted p={hangzhouVillage} />
      <Tree x={612} r={7} y={298} fill={GRASS} />
      <Tree x={760} r={8} y={298} fill={BLOSSOM} />

      {/* Su Causeway: one willow, one peach tree */}
      <path d={rect(36, 295, 508, 6)} fill={F} />
      {[100, 160, 222, 372, 428, 498].map((x, i) => (
        <Tree key={x} x={x} r={6 + (i % 2)} y={296} fill={BLOSSOM} />
      ))}
      {[72, 130, 190, 400, 524].map((x, i) => (
        <Willow key={x} x={x} h={26 + ((i * 7) % 10)} />
      ))}

      {/* moon bridge */}
      <path
        d="M242,300Q300,250 358,300ZM281,300A19,19 0 0 1 319,300Z"
        fill={WALL}
        fillRule="evenodd"
      />
      <path d="M246,294Q300,247 354,294" stroke={ROOF} strokeWidth={0.9} fill="none" />
      <path
        d="M256,290.500v-4M268,282.500v-4M282,276.500v-4M300,274v-4M318,276.500v-4M332,282.500v-4M344,290.500v-4"
        stroke={ROOF}
        strokeWidth={1.2}
      />
      <path
        d="M279,300A21,21 0 0 1 321,300"
        stroke={ROOF}
        strokeWidth={0.8}
        fill="none"
        opacity={0.6}
      />

      {/* lake pavilion */}
      <path d={rect(436, 291, 48, 5) + rect(440, 288.5, 40, 3)} fill={STONE} />
      <path
        d={
          rect(444, 267, 2, 22) +
          rect(453.5, 267, 2, 22) +
          rect(464.5, 267, 2, 22) +
          rect(474, 267, 2, 22)
        }
        fill={RED}
      />
      <path d="M444,283h32M444,285.500h32" stroke={RED} strokeWidth={0.7} />
      <path
        d={
          eave(460, 269, 40, 22, 9, 7) +
          rect(451, 254.5, 18, 6.5) +
          eave(460, 255.5, 22, 3, 11, 5) +
          rect(459.3, 237, 1.4, 8)
        }
        fill={F}
      />
      <circle cx={460} cy={237} r={1.5} fill={GOLD} />
    </>
  );
}

function HangzhouAfloat() {
  return (
    <>
      {/* Three Pools Mirroring the Moon */}
      {[566, 600, 634].map((x, i) => (
        <g key={x} transform={`translate(${x},${312 + (i % 2) * 5})`}>
          <path d="M-2.2,2v-6h4.4v6ZM-3,-4l3,-4.500l3,4.500ZM-0.5,-12h1v4h-1Z" fill={STONE} />
          <circle cx={0} cy={-1.2} r={1.1} fill={GOLD} />
        </g>
      ))}
      {/* lotus */}
      {[
        [386, 306],
        [396, 309],
        [408, 305],
        [420, 310],
        [432, 306],
        [50, 307],
        [62, 310],
      ].map(([x, y]) => (
        <ellipse key={`${x}`} cx={x} cy={y} rx={5} ry={1.5} fill={GRASS} />
      ))}
      <path d={circ(397, 306.5, 1.3) + circ(421, 307.5, 1.3) + circ(56, 305, 1.3)} fill={BLOSSOM} />
      <Sampan x={190} y={324} />
      <Sampan x={690} y={330} flip />
    </>
  );
}

/* --- Shanghai -------------------------------------------------------------- */

const shanghaiFill = skyline({
  seed: 7,
  from: 228,
  to: 868,
  minH: 34,
  maxH: 124,
  minW: 14,
  maxW: 28,
  gap: 4,
  detail: 0.9,
  envelope: (t) => 0.45 + 0.55 * Math.sin(Math.PI * Math.min(1, t * 1.1)),
});

/** The Bund: a wall of 1920s stone banks and hotels. */
const bund = (() => {
  const rand = rng(1929);
  const p = paint(WALL, ROOF, PANE_OFF, PANE, FERRY, GOLD, RED);
  const block = (x: number, w: number, h: number) => {
    const top = G - h;
    put(p, WALL, rect(x, top, w, h));
    put(p, ROOF, rect(x - 0.8, top - 0.8, w + 1.6, 1.5) + rect(x, G - 8, w, 0.8));
    windows(
      p,
      rand,
      x,
      top + 1.5,
      w,
      h - 10,
      Math.floor(w / 4.6),
      Math.floor((h - 10) / 6),
      1.7,
      3.5
    );
    for (let dx = x + 2.5; dx < x + w - 3; dx += 5) put(p, PANE_OFF, rect(dx, G - 6, 2.4, 6));
    return top;
  };
  const flag = (x: number, y: number) => {
    put(p, ROOF, rect(x - 0.3, y - 9, 0.6, 9));
    put(p, RED, rect(x + 0.3, y - 9, 4, 2.6));
  };

  let top = block(24, 30, 31);
  flag(39, top);

  // Peace Hotel, with its green copper pyramid
  top = block(56, 26, 46);
  put(p, WALL, rect(62, top - 6, 14, 6));
  put(p, FERRY, `M61,${top - 6}L69,${top - 27}L77,${top - 6}Z`);

  // Bank of China, capped with a Chinese roof
  top = block(84, 25, 53);
  put(p, ROOF, eave(96.5, top + 0.5, 23, 9, 6, 3));

  // Customs House and its clock tower
  top = block(112, 40, 33);
  put(
    p,
    WALL,
    rect(123, top - 25, 18, 25) + rect(125.5, top - 35, 13, 10) + rect(128, top - 41, 8, 6)
  );
  put(
    p,
    ROOF,
    rect(122.3, top - 25.8, 19.4, 1.2) +
      rect(124.8, top - 35.8, 14.4, 1.2) +
      `M127.500,${top - 41}L132,${top - 50}L136.500,${top - 41}Z`
  );
  put(p, GOLD, circ(132, top - 16, 4.2));
  put(p, ROOF, rect(131.7, top - 19.2, 0.6, 3.4) + rect(131.8, top - 16.3, 2.6, 0.6));
  put(p, PANE_OFF, rect(128.5, top - 33, 2, 6) + rect(133.5, top - 33, 2, 6));
  for (let i = 0; i < 6; i++) put(p, ROOF, rect(115 + i * 6.6, top + 4, 1, 21));
  flag(132, top - 50);

  // HSBC Building: colonnade and dome
  top = block(156, 52, 30);
  put(p, WALL, rect(172, top - 8, 20, 8) + `M170,${top - 8}A12,11.5 0 0 1 194,${top - 8}Z`);
  put(p, WALL, rect(180.8, top - 24, 2.4, 5));
  put(p, ROOF, rect(170.5, top - 8.6, 23, 1) + rect(171.5, top - 1.2, 21, 1.2));
  for (let i = 0; i < 6; i++) put(p, ROOF, rect(170 + i * 4.8, top + 4, 1.1, 18));
  flag(160, top);
  flag(204, top);
  return p;
})();

function jinMao(cx: number) {
  const widths = [38, 35, 32, 28.5, 25, 21.5, 18, 14.5, 11];
  const heights = [26, 23, 20, 17.5, 15, 12.5, 10.5, 8.5, 7];
  let d = '';
  let y = G;
  widths.forEach((w, i) => {
    y -= heights[i];
    d += rect(cx - w / 2, y, w, heights[i] + 0.5);
    d += rect(cx - w / 2 - 1.6, y - 0.4, w + 3.2, 2.2);
    // corner fins, like the eaves of a pagoda
    d += rect(cx - w / 2 - 1.6, y - 3, 1.4, 3) + rect(cx + w / 2 + 0.2, y - 3, 1.4, 3);
  });
  d += rect(cx - 4, y - 5, 8, 5.5);
  d += `M${cx - 5.5},${y - 5}l1,-9l1,9ZM${cx + 3.5},${y - 5}l1,-9l1,9Z`;
  return `${d}M${cx - 2.2},${y - 5}L${cx},${y - 36}L${cx + 2.2},${y - 5}Z`;
}

function Shanghai() {
  return (
    <>
      <Towers blocks={shanghaiFill} />

      {/* Aurora's gold screen */}
      <Lit d={rect(690, 214, 30, 86)} fill={M2} pattern="cb-win-band" />
      <rect x={690} y={206} width={30} height={9} fill={GOLD} />

      <Painted p={bund} />
      {[50, 110, 150, 212].map((x) => (
        <Lamp key={x} x={x} h={8} />
      ))}

      {/* convention-centre globes */}
      <g>
        <path d={rect(336, 290, 58, 10)} fill={F} />
        <circle cx={346} cy={286} r={8} fill={STONE} opacity={0.85} />
        <circle cx={384} cy={286} r={8} fill={STONE} opacity={0.85} />
        <path
          d="M338,286h16M346,278v16M376,286h16M384,278v16M340,281.500q6,3 12,0M340,290.500q6,-3 12,0M378,281.500q6,3 12,0M378,290.500q6,-3 12,0"
          stroke={M}
          strokeWidth={0.6}
          fill="none"
        />
      </g>

      {/* Oriental Pearl Tower */}
      <path
        d="M290,254L262,300M290,254L318,300"
        stroke={F}
        strokeWidth={4.4}
        strokeLinecap="round"
      />
      <path d="M276,281L290,246L304,281" stroke={F} strokeWidth={2.2} fill="none" />
      <path
        d={
          rect(283.5, 150, 3.4, 150) +
          rect(288.3, 140, 3.4, 160) +
          rect(293.1, 150, 3.4, 150) +
          rect(286, 104, 8, 30) +
          rect(287.5, 88, 5, 18) +
          rect(264, 294, 52, 7)
        }
        fill={F}
      />
      <path d="M289,90L290,50L291,90Z" fill={F} />
      <g fill={PEARL}>
        <circle cx={290} cy={242} r={20} />
        <circle cx={290} cy={166} r={13.5} />
        <circle cx={290} cy={128} r={6} />
        {[188, 197, 206, 215].map((y) => (
          <circle key={y} cx={290} cy={y} r={3} />
        ))}
      </g>
      <path
        d="M270.500,238a20,6 0 0 0 39,0M271,246a20,6 0 0 0 38,0M277,163a13.500,4 0 0 0 26,0M277.500,170a13.500,4 0 0 0 25,0"
        stroke={STONE}
        strokeWidth={1.1}
        fill="none"
        opacity={0.7}
      />
      <path
        d="M273,242.500h1.600M277,244.300h1.600M281.500,245.500h1.600M286.500,246.200h1.600M291.500,246.300h1.600M296.500,245.800h1.600M301,244.600h1.600M305,242.800h1.600"
        stroke={GOLD}
        strokeWidth={1.4}
      />
      <circle cx={290} cy={50} r={1.5} fill={RED} />

      {/* Jin Mao */}
      <Lit d={jinMao(432)} pattern="cb-win-fin" />

      {/* Shanghai World Financial Center */}
      <Lit
        d="M498,300L503,112L538,98L544,300ZM512,113L531,105.500L529.500,125H514Z"
        pattern="cb-win-grid"
        rule="evenodd"
      />
      <path d="M500,300Q514,190 538,100" stroke={TRIM} strokeWidth={1} fill="none" opacity={0.7} />

      {/* Shanghai Tower */}
      <Lit
        d="M586,300C586,214 591,124 601,62L606,48L611,56L620,52C632,124 638,214 638,300Z"
        pattern="cb-win-band"
      />
      <path
        d="M592,300C597,224 622,150 613,58M606,300C611,236 634,180 628,118"
        stroke={TRIM}
        strokeWidth={1.1}
        fill="none"
      />
      <path
        d="M587,268q25,5 50,-1M588,236q24,5 48,-1M589.500,204q23,5 45,-1M591,172q21,4 42,-1M593.500,140q18,4 37,-1M596.500,108q15,3 30,-1M600,80q11,2 23,-1"
        stroke={TRIM}
        strokeWidth={0.7}
        fill="none"
        opacity={0.6}
      />

      {[250, 330, 400, 470, 560, 660, 740, 800, 850].map((x, i) => (
        <Tree key={x} x={x} r={4.5 + (i % 2)} fill={GRASS} />
      ))}
    </>
  );
}

/* --- Taipei ---------------------------------------------------------------- */

/** Taipei apartment blocks: balcony grilles, tin rooftop huts, water tanks, shop signs. */
const taipeiBlocks = (() => {
  const rand = rng(886);
  const p = paint(M, M2, F, PANE_OFF, PANE, RED, FERRY, GOLD, PEARL, STONE);
  const signs = [RED, GOLD, FERRY, PEARL];
  let x = 304;
  let i = 0;
  while (x < 812) {
    const w = 22 + rand() * 20;
    const floors = 4 + Math.floor(rand() * rand() * 9);
    const h = floors * 6 + 5;
    const top = G - h;
    put(p, i % 2 ? M : M2, rect(x, top, w, h));
    windows(p, rand, x, top + 0.5, w, floors * 6, Math.floor(w / 5), floors, 2.6, 2.6, 0.5);
    for (let f = 0; f < floors; f++) put(p, F, rect(x, top + 5.2 + f * 6, w, 0.7));
    // ground-floor arcade
    put(p, F, rect(x, G - 5, w, 0.9));
    for (let dx = x + 2; dx < x + w - 4; dx += 6) put(p, PANE, rect(dx, G - 4, 3.6, 4));
    // rooftop additions
    const roll = rand();
    if (roll < 0.45) {
      const hw = w * (0.4 + rand() * 0.3);
      const hx = x + rand() * (w - hw);
      put(p, rand() < 0.5 ? RED : FERRY, `M${hx},${top}v-3.6l${hw / 2},-2.4l${hw / 2},2.4v3.6Z`);
    }
    if (roll > 0.3) {
      const tx = x + 2 + rand() * (w - 9);
      put(p, STONE, rect(tx, top - 7, 4.6, 4.4) + `M${tx},${top - 7}a2.300,1.2 0 0 1 4.6,0Z`);
      put(p, F, rect(tx + 0.4, top - 2.6, 0.7, 2.8) + rect(tx + 3.5, top - 2.6, 0.7, 2.8));
    }
    if (rand() < 0.5) put(p, F, rect(x + w * rand(), top - 9, 0.7, 9));
    // vertical shop sign
    if (rand() < 0.6)
      put(p, signs[i % signs.length], rect(x + w - 0.6, top + 5 + rand() * 6, 2.8, 12));
    x += w + (rand() < 0.3 ? 3 : 0.5);
    i++;
  }
  return p;
})();

/** Taipei 101: eight flared tiers on a tapered base, like stacked bamboo. */
const taipei101 = (() => {
  const cx = 500;
  let glass = `M${cx - 27},287L${cx - 21},248H${cx + 21}L${cx + 27},287Z`;
  let ledges = rect(cx - 36, 287, 72, 14);
  let gold = circ(cx, 270, 3) + circ(cx - 13, 276, 1.8) + circ(cx + 13, 276, 1.8);
  let y = 248;
  for (let i = 0; i < 8; i++) {
    glass += `M${cx - 18.5},${y + 0.5}L${cx - 24},${y - 18.5}H${cx + 24}L${cx + 18.5},${y + 0.5}Z`;
    ledges += rect(cx - 25.5, y - 19.5, 51, 1.7);
    ledges += rect(cx - 27, y - 21.5, 2.6, 3.4) + rect(cx + 24.4, y - 21.5, 2.6, 3.4);
    gold += rect(cx - 1.8, y - 3.4, 3.6, 2.6);
    y -= 19;
  }
  glass +=
    rect(cx - 15, y - 9, 30, 9.5) + rect(cx - 10, y - 17, 20, 8.5) + rect(cx - 6, y - 23, 12, 6.5);
  ledges += rect(cx - 16, y - 9.8, 32, 1.4) + rect(cx - 11, y - 17.8, 22, 1.4);
  const spire =
    rect(cx - 3.2, y - 36, 6.4, 13.5) +
    rect(cx - 2, y - 48, 4, 12.5) +
    `M${cx - 1.2},${y - 48}L${cx},${y - 68}L${cx + 1.2},${y - 48}Z`;
  return { glass, ledges, gold, spire, tip: y - 68 };
})();

function Taipei() {
  return (
    <>
      <path
        d="M0,300C60,250 130,222 210,234C282,244 322,272 400,262C500,250 580,206 670,200C750,196 812,250 860,300Z"
        fill={HILL}
      />
      <Painted p={taipeiBlocks} />

      {/* Shin Kong tower */}
      <Lit
        d={
          rect(356, 176, 26, 124) +
          rect(360, 166, 18, 11) +
          rect(364, 158, 10, 9) +
          rect(368.4, 140, 1.2, 19)
        }
        fill={M}
        pattern="cb-win-fin"
      />

      {/* The Grand Hotel on Yuanshan */}
      <path d="M70,300C108,270 146,261 190,261C238,261 270,278 306,300Z" fill={M} />
      {[92, 112, 276, 292].map((x, i) => (
        <Tree key={x} x={x} r={6 + (i % 2) * 2} y={i === 0 || i === 3 ? 296 : 286} fill={GRASS} />
      ))}
      <path d={rect(126, 259, 128, 5) + rect(134, 255.5, 112, 4)} fill={STONE} />
      <path d="M176,264h28l4,9h-36Z" fill={STONE} />
      <path d={rect(138, 214, 104, 42) + rect(160, 194, 60, 10)} fill={RED} />
      <path
        d={[0, 1, 2, 3, 4].map((f) => rect(138, 221.5 + f * 7, 104, 1)).join('')}
        fill={STONE}
        opacity={0.85}
      />
      <path
        d={
          Array.from({ length: 13 }, (_, c) =>
            [0, 1, 2, 3, 4].map((f) => rect(141 + c * 7.8, 216.3 + f * 7, 4, 4.4)).join('')
          ).join('') + Array.from({ length: 8 }, (_, c) => rect(163 + c * 7, 196.5, 4, 5)).join('')
        }
        fill={PANE}
      />
      <path d={eave(190, 216, 108, 78, 12, 9) + eave(190, 196, 66, 24, 15, 8)} fill={GOLD} />
      <path d="M177,180.500h26M132,215.500h116M152,195.500h76" stroke={WOOD} strokeWidth={1.2} />
      <path
        d="M176,181l-3,-3.500M204,181l3,-3.500"
        stroke={GOLD}
        strokeWidth={1.4}
        strokeLinecap="round"
      />

      {/* Chiang Kai-shek Memorial Hall */}
      <g>
        <path d={rect(672, 292, 96, 9) + rect(680, 285, 80, 8)} fill={STONE} />
        <path d={rect(694, 247, 52, 39)} fill={STONE} />
        <path d="M712,285v-17a8,8 0 0 1 16,0v17Z" fill={PANE_OFF} />
        <path d="M713,300l5,-15h4l5,15Z" fill={PANE_OFF} opacity={0.3} />
        <path d={eave(720, 249, 58, 36, 9, 6)} fill={AZURE} />
        <path d={rect(704, 232, 32, 9)} fill={STONE} />
        <path
          d="M696,234Q708,230 716.500,202H723.500Q732,230 744,234L744,236.500H696Z"
          fill={AZURE}
        />
        <path d={circ(720, 199, 2.4) + rect(719.4, 188, 1.2, 9)} fill={GOLD} />
        <path d="M698,254h44M698,258h44" stroke={AZURE} strokeWidth={0.8} opacity={0.7} />
      </g>

      {/* Taipei 101 */}
      <Lit d={taipei101.glass} fill={JADE} pattern="cb-win-grid" />
      <path d={taipei101.ledges + taipei101.spire} fill={F} />
      <path d={taipei101.gold} fill={GOLD} />
      <circle cx={500} cy={taipei101.tip} r={1.6} fill={GOLD} />
    </>
  );
}

/* --- Jiufen ---------------------------------------------------------------- */

const JIUFEN_SLOPE: [number, number][] = [
  [64, 300],
  [150, 284],
  [230, 250],
  [310, 212],
  [390, 176],
  [450, 154],
  [500, 146],
  [552, 152],
  [610, 176],
  [670, 214],
  [730, 258],
  [790, 290],
  [840, 300],
];

function smooth(points: [number, number][]) {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    d += `Q${x},${y} ${(x + nx) / 2},${(y + ny) / 2}`;
  }
  const last = points[points.length - 1];
  return `${d}L${last[0]},${last[1]}Z`;
}

/** The hillside town: tar-roofed houses stacked on terraces, strung with lanterns. */
const jiufen = (() => {
  const rand = rng(97);
  const p = paint(FAR, M, M2, F, PANE_OFF, PANE, STONE);
  const lanterns: [number, number][] = [];
  const woods: [number, number, number][] = [];
  for (let x = 110; x < 800; x += 9 + rand() * 6) {
    woods.push([x, yAt(JIUFEN_SLOPE, x) + 3 + rand() * 3, 6 + rand() * 5]);
  }
  for (let row = 0; row < 7; row++) {
    let x = 150 + row * 5 + rand() * 10;
    while (x < 600) {
      const w = 16 + rand() * 13;
      const storeys = rand() < 0.4 ? 2 : 1;
      const h = storeys * 8 + 3 + rand() * 2;
      const base = yAt(JIUFEN_SLOPE, x + w / 2) + 14 + row * 19;
      const teahouse = x + w > 262 && x < 346 && base > 220 && base < 282;
      const temple = x + w > 428 && x < 478 && base > 196 && base < 232;
      if (base < 299 && !teahouse && !temple) {
        const top = base - h;
        put(p, FAR, rect(x - 2.5, base - 0.5, w + 5, 1.4));
        put(p, rand() < 0.5 ? M : M2, rect(x, top, w, h));
        const cols = Math.max(2, Math.floor(w / 6));
        windows(p, rand, x, top + 1, w, h - 1.5, cols, storeys, 2.8, 3.4, 0.65);
        if (storeys === 2) {
          put(p, F, rect(x - 1, top + h / 2 + 0.3, w + 2, 0.9));
        }
        if (rand() < 0.62) {
          put(
            p,
            F,
            `M${x - 2.5},${top + 0.6}L${x + w * 0.5},${top - 5.5}L${x + w + 2.5},${top + 0.6}Z`
          );
        } else {
          put(p, F, rect(x - 2, top - 2.2, w + 4, 2.8));
          if (rand() < 0.5) {
            const tx = x + 2 + rand() * (w - 8);
            put(p, STONE, rect(tx, top - 6, 3.6, 3.8));
          }
        }
        if (row > 0 && rand() < 0.6) {
          lanterns.push([x + 3, base + 3.4]);
          lanterns.push([x + w - 3, base + 3.4]);
        }
      }
      x += w + 3 + rand() * 6;
    }
  }
  return { p, lanterns, woods };
})();

/** Shuqi Road: the lantern-lined stairway through the town. */
const jiufenStairs = (() => {
  let d = 'M222,300';
  const lanterns: [number, number][] = [];
  let x = 222;
  let y = 300;
  for (let i = 0; i < 26; i++) {
    x += 4.4;
    y -= 3.1;
    d += `H${x.toFixed(1)}V${y.toFixed(1)}`;
    if (i % 2 === 0) lanterns.push([x - 5, y - 6], [x + 5, y - 9]);
  }
  return { d, lanterns };
})();

const SKY_LANTERNS: [number, number, number][] = [
  [600, 100, 1],
  [640, 60, 0.8],
  [690, 116, 1.1],
  [726, 46, 0.7],
  [770, 92, 0.9],
];

function Jiufen() {
  const lanterns = [...jiufen.lanterns, ...jiufenStairs.lanterns];
  return (
    <>
      {/* Keelung Mountain behind, an islet out at sea */}
      <path d="M8,300Q46,272 84,300Z" fill={FAR} />
      <path d="M330,300C420,190 520,74 604,70C690,70 770,200 840,300Z" fill={FAR} />
      <path d={smooth(JIUFEN_SLOPE)} fill={HILL} />
      {jiufen.woods.map(([x, y, r], i) => (
        <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={r.toFixed(1)} fill={HILL} />
      ))}

      <Painted p={jiufen.p} />
      <path d={jiufenStairs.d} stroke={STONE} strokeWidth={2.6} fill="none" opacity={0.55} />

      {/* hillside temple with a swallowtail roof */}
      <g>
        <path d={rect(430, 216, 46, 4) + rect(436, 202, 34, 14)} fill={RED} />
        <path d={rect(430, 219.5, 46, 2)} fill={STONE} />
        <path d="M440,216v-9h4v9ZM451,216v-9h4v9ZM462,216v-9h4v9Z" fill={PANE} />
        <path d={eave(453, 203, 40, 26, 6.5, 8) + rect(444, 190, 18, 7)} fill={GOLD} />
        <path d="M436,197.500Q453,192 470,197.500L476,186Q453,191.500 430,186Z" fill={WOOD} />
        <path d="M441,184Q453,180 465,184L469,176Q453,180 437,176Z" fill={GOLD} />
        <circle cx={453} cy={176.5} r={1.6} fill={RED} />
      </g>

      {/* the big teahouse */}
      <path
        d={rect(270, 247, 66, 18) + rect(275, 229, 56, 14) + rect(280, 213, 46, 12)}
        fill={WOOD}
      />
      <path
        d={
          eave(303, 247, 66, 58, 4.5, 6) +
          eave(303, 229, 56, 48, 4.5, 6) +
          eave(303, 213, 46, 10, 11, 7) +
          rect(268, 258, 70, 1) +
          rect(273, 239, 60, 1) +
          rect(278, 222, 50, 1) +
          rect(267, 264, 72, 2.2)
        }
        fill={F}
      />
      <path
        d={
          [273, 283, 293, 303, 313, 323].map((x) => rect(x, 250, 6.5, 7)).join('') +
          [278, 288, 298, 308, 318].map((x) => rect(x, 232, 6.5, 6)).join('') +
          [283, 292, 301, 310, 318].map((x) => rect(x, 216, 5, 5)).join('')
        }
        fill={PANE}
      />
      <path
        d="M270,258v-4M276,258v-4M282,258v-4M288,258v-4M294,258v-4M300,258v-4M306,258v-4M312,258v-4M318,258v-4M324,258v-4M330,258v-4M336,258v-4"
        stroke={F}
        strokeWidth={0.6}
      />
      <path d={rect(337.5, 232, 4.4, 22)} fill={GOLD} />
      <path d="M339.700,235v16" stroke={F} strokeWidth={1} strokeDasharray="2.4 1.6" />
      <g fill={RED}>
        {[270, 280, 290, 300, 310, 320, 330].map((x) => (
          <ellipse key={`a${x}`} cx={x + 3} cy={249.5} rx={2} ry={2.4} />
        ))}
        {[277, 287, 297, 307, 317, 327].map((x) => (
          <ellipse key={`b${x}`} cx={x + 1} cy={231.5} rx={1.8} ry={2.2} />
        ))}
      </g>

      {/* lantern strings */}
      <g fill={RED} opacity="var(--cb-glow)">
        {lanterns.map(([x, y], i) => (
          <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={4.4} />
        ))}
      </g>
      <g fill={RED}>
        {lanterns.map(([x, y], i) => (
          <ellipse key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} rx={1.7} ry={2.1} />
        ))}
      </g>

      {/* sky lanterns drifting off the mountain */}
      {SKY_LANTERNS.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`}>
          <g className="cb-float" style={{ animationDelay: `${-i * 1.7}s` }}>
            <circle r={13} fill="var(--cb-lantern)" opacity="var(--cb-glow)" />
            <path d="M-4,6L-6,-3Q-6,-9 0,-9Q6,-9 6,-3L4,6Z" fill="var(--cb-lantern)" />
            <rect x={-1.5} y={3} width={3} height={2.6} fill={GOLD} />
          </g>
        </g>
      ))}
    </>
  );
}

/* --- Hong Kong ------------------------------------------------------------- */

const hkMidLevels = skyline({
  seed: 852,
  from: 200,
  to: 900,
  minH: 96,
  maxH: 168,
  minW: 7,
  maxW: 11,
  gap: 9,
  detail: 0.3,
  envelope: (t) => 0.55 + 0.45 * Math.sin(Math.PI * t),
});

const hkTowers = skyline({
  seed: 5,
  from: 196,
  to: 910,
  minH: 50,
  maxH: 120,
  minW: 9,
  maxW: 16,
  gap: 5,
  detail: 0.7,
  envelope: (t) => 0.55 + 0.45 * Math.sin(Math.PI * t),
});

/** Old tenement blocks with neon signs hanging over the street. */
const tongLau = (() => {
  const rand = rng(1997);
  const p = paint(M2, M, F, PANE_OFF, PANE, PEARL, GOLD, FERRY, RED, AZURE);
  const neon = [PEARL, GOLD, FERRY, RED, AZURE];
  let x = 28;
  let i = 0;
  while (x < 192) {
    const w = 15 + rand() * 9;
    const floors = 4 + Math.floor(rand() * 5);
    const h = floors * 6 + 7;
    const top = G - h;
    put(p, i % 2 ? M2 : M, rect(x, top, w, h));
    windows(p, rand, x, top + 0.5, w, floors * 6, Math.floor(w / 4.4), floors, 2.2, 3, 0.6);
    put(p, F, rect(x - 0.6, top - 1, w + 1.2, 1.4) + rect(x, G - 7, w, 0.9));
    if (rand() < 0.5) put(p, F, rect(x + 2, top - 5, 5, 4.4));
    if (rand() < 0.4) put(p, F, rect(x + w - 3, top - 10, 0.7, 10));
    // signs cantilevered over the street
    const count = 1 + Math.floor(rand() * 2);
    for (let k = 0; k < count; k++) {
      const sy = top + 6 + rand() * (h - 22);
      const fill = neon[(i + k * 2) % neon.length];
      if (rand() < 0.5) put(p, fill, rect(x + w - 1, sy, 7 + rand() * 4, 3.2));
      else put(p, fill, rect(x + w - 0.5, sy, 3, 9 + rand() * 5));
    }
    put(p, PANE, rect(x + 1.5, G - 5.5, w - 3, 5.5));
    x += w + 0.6;
    i++;
  }
  return p;
})();

const hkWheel = (() => {
  const cx = 232;
  const cy = 268;
  const r = 25;
  let spokes = '';
  let cars = '';
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    spokes += `M${cx},${cy}L${x.toFixed(1)},${y.toFixed(1)}`;
    cars += rect(x - 1.5, y - 0.4, 3, 3);
  }
  return { cx, cy, r, spokes, cars };
})();

function HongKong() {
  return (
    <>
      {/* Victoria Peak, the Peak Tower on its saddle */}
      <path
        d="M0,300C80,250 180,160 300,142C400,128 450,170 540,152C660,132 750,196 840,242C890,268 920,292 940,300Z"
        fill={HILL}
      />
      <path d="M455,160v-7h-4l-2.500,-5h25l-2.500,5h-4v7ZM449.500,146q12,5 24,0Z" fill={M} />
      <path d={hkMidLevels.join('')} fill={FAR} />
      <path d={hkMidLevels.join('')} fill="url(#cb-win-grid)" opacity="var(--cb-win-dim)" />
      <Towers blocks={hkTowers} />

      <Painted p={tongLau} />

      {/* Observation wheel */}
      <path
        d={`M${hkWheel.cx},${hkWheel.cy}L${hkWheel.cx - 13},300M${hkWheel.cx},${hkWheel.cy}L${hkWheel.cx + 13},300`}
        stroke={F}
        strokeWidth={2}
      />
      <path d={hkWheel.spokes} stroke={STONE} strokeWidth={0.5} opacity={0.8} />
      <circle
        cx={hkWheel.cx}
        cy={hkWheel.cy}
        r={hkWheel.r}
        stroke={STONE}
        strokeWidth={1.5}
        fill="none"
      />
      <circle
        cx={hkWheel.cx}
        cy={hkWheel.cy}
        r={hkWheel.r - 3}
        stroke={STONE}
        strokeWidth={0.5}
        fill="none"
      />
      <path d={hkWheel.cars} fill={STONE} />
      <circle cx={hkWheel.cx} cy={hkWheel.cy} r={2.4} fill={F} />

      {/* One and Two IFC */}
      <Lit
        d={
          'M268,300L270,212L272,212L273,186H289L290,212L292,212L294,300Z' +
          rect(275, 180, 2, 7) +
          rect(280, 178, 2, 9) +
          rect(285, 180, 2, 7)
        }
        pattern="cb-win-fin"
      />
      <Lit
        d={
          'M300,300L303,170L305,170L307,104H335L337,170L339,170L342,300Z' +
          'M307,104L305.500,82L309.500,92V104ZM335,104L336.500,82L332.500,92V104Z' +
          rect(312.5, 92, 2.6, 13) +
          rect(319.7, 94, 2.6, 11) +
          rect(326.9, 92, 2.6, 13)
        }
        pattern="cb-win-fin"
      />
      <path d="M303,170h36M305,236h32" stroke={TRIM} strokeWidth={0.8} opacity={0.6} />

      {/* Jardine House and its portholes */}
      <Lit d={rect(354, 172, 30, 128)} pattern="cb-win-round" />

      {/* The Center, striped with light */}
      <path
        d={
          rect(398, 148, 26, 152) +
          rect(402, 140, 18, 9) +
          rect(406, 133, 10, 8) +
          rect(410.4, 104, 1.2, 30)
        }
        fill={F}
      />
      {[156, 170, 184, 198, 212, 226, 240, 254, 268, 282].map((y, i) => (
        <rect
          key={y}
          x={398}
          y={y}
          width={26}
          height={1.5}
          fill={[PEARL, AZURE, FERRY, GOLD][i % 4]}
        />
      ))}

      {/* HSBC */}
      <Lit
        d={rect(442, 208, 16, 92) + rect(458, 192, 17, 108) + rect(475, 200, 16, 100)}
        pattern="cb-win-band"
      />
      <path d={rect(439.5, 214, 2.5, 86) + rect(491, 206, 2.5, 94)} fill={M2} />
      <path
        d="M442,222L466.500,233L491,222M442,250L466.500,261L491,250M442,278L466.500,289L491,278M458,192V300M475,200V300"
        stroke={TRIM}
        strokeWidth={1.2}
        fill="none"
      />
      <path d="M461,192v-6h8M478,200v-5h7" stroke={F} strokeWidth={1.1} fill="none" />

      {/* Bank of China Tower */}
      <Lit d="M506,300V216L528,186V156L550,126V300Z" pattern="cb-win-grid" />
      <path d="M528,300V186L550,156V300Z" fill={TRIM} opacity={0.12} />
      <path
        d="M506,300L550,256L506,216M550,300L506,256L550,212L528,186M550,212V300M506,216L528,186M528,156L550,186L528,186M528,156L550,126M506,300V216M550,126V300"
        stroke={TRIM}
        strokeWidth={1.2}
        fill="none"
        strokeLinejoin="round"
      />
      <path d={rect(541.5, 88, 1.5, 44) + rect(546.5, 96, 1.5, 34)} fill={F} />

      {/* Lippo Centre */}
      <Lit
        d={
          rect(566, 196, 13, 104) +
          rect(583, 184, 13, 116) +
          [204, 232, 260]
            .map((y) => rect(563.5, y, 2.5, 14) + rect(596, y - 10, 2.5, 14))
            .join('') +
          [218, 246, 274].map((y) => rect(579, y, 2.5, 14) + rect(580.5, y - 14, 2.5, 14)).join('')
        }
        pattern="cb-win-grid"
      />

      {/* Central Plaza */}
      <Lit
        d={rect(694, 146, 32, 154) + 'M690,300V204L694,198V300ZM730,300V204L726,198V300Z'}
        pattern="cb-win-fin"
      />
      <path d="M695,146L710,114L725,146Z" fill={GOLD} />
      <path d={rect(709.3, 78, 1.4, 38)} fill={F} />
      <path d="M694,146V300M726,146V300" stroke={GOLD} strokeWidth={0.9} opacity={0.8} />
      <path
        d={rect(708.5, 84, 3, 1.4) + rect(708.5, 92, 3, 1.4) + rect(708.5, 100, 3, 1.4)}
        fill={PEARL}
      />

      {/* Convention and Exhibition Centre */}
      <g>
        <path d={rect(770, 284, 104, 17)} fill={M2} />
        <path d={rect(772, 288, 100, 9)} fill={PANE} opacity={0.8} />
        <path
          d="M772,288v9M784,288v9M796,288v9M808,288v9M820,288v9M832,288v9M844,288v9M856,288v9M868,288v9"
          stroke={M2}
          strokeWidth={0.8}
        />
        <path
          d="M762,288Q790,264 824,276Q852,262 884,288Q852,278 824,284Q794,276 762,288Z"
          fill={STONE}
        />
        <path
          d="M786,280Q806,262 826,274Q812,270 786,280ZM828,274Q850,262 870,280Q848,270 828,274Z"
          fill={STONE}
        />
      </g>
    </>
  );
}

/* --- San Francisco --------------------------------------------------------- */

const sfFill = skyline({
  seed: 41,
  from: 926,
  to: 1108,
  minH: 34,
  maxH: 100,
  minW: 14,
  maxW: 24,
  gap: 3,
  detail: 0.8,
  envelope: (t) => 0.5 + 0.5 * Math.sin(Math.PI * t),
});

const GG = { left: 250, right: 610, top: 128, deck: 268, sag: 258 };

const goldenGate = (() => {
  const { left, right, top, deck, sag } = GG;
  const ctrl = 2 * sag - top;
  let hangers = '';
  for (let x = left + 10; x < right; x += 10) {
    const t = (x - left) / (right - left);
    const y = (1 - t) * (1 - t) * top + 2 * t * (1 - t) * ctrl + t * t * top;
    hangers += `M${x},${y.toFixed(1)}V${deck}`;
  }
  // side spans: hangers under the cables that run down to the anchorages
  const side = (x0: number, x1: number) => {
    let d = '';
    const n = Math.floor(Math.abs(x1 - x0) / 10);
    for (let i = 1; i < n; i++) {
      const t = i / n;
      const x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * ((x0 + x1) / 2) + t * t * x1;
      const y = (1 - t) * (1 - t) * top + 2 * t * (1 - t) * (deck - 28) + t * t * (deck - 2);
      d += `M${x.toFixed(1)},${y.toFixed(1)}V${deck}`;
    }
    return d;
  };
  const cables =
    `M${left},${top}Q${(left + right) / 2},${ctrl} ${right},${top}` +
    `M${left},${top}Q${(left + 70) / 2},${deck - 28} 70,${deck - 2}` +
    `M${right},${top}Q${(right + 790) / 2},${deck - 28} 790,${deck - 2}`;
  // Art Deco towers: legs that step in as they rise, portal struts between them
  const tower = (x: number) => {
    let d = '';
    const steps: [number, number, number][] = [
      [G, 232, 6.2],
      [232, 196, 5.4],
      [196, 162, 4.6],
      [162, top - 5, 3.8],
    ];
    steps.forEach(([y0, y1, w]) => {
      d += rect(x - 10.5, y1, w, y0 - y1) + rect(x + 10.5 - w, y1, w, y0 - y1);
    });
    [
      [top - 1, 8],
      [162, 7.5],
      [196, 7],
      [232, 7],
    ].forEach(([y, h]) => {
      d +=
        rect(x - 7, y, 14, h) +
        rect(x - 5.6, y + h, 11.2, 1.5) +
        rect(x - 4.2, y + h + 1.5, 8.4, 1.3);
    });
    d += rect(x - 11.2, top - 8, 5, 3.4) + rect(x + 6.2, top - 8, 5, 3.4);
    d += `M${x - 5},${G - 2}L${x + 5},${deck + 10}l1.2,1L${x - 3.8},${G - 1}ZM${x + 5},${G - 2}L${x - 5},${deck + 10}l-1.2,1L${x + 3.8},${G - 1}Z`;
    return d;
  };
  // stiffening truss under the roadway
  let truss = `M40,${deck + 8}`;
  for (let x = 40; x < 810; x += 5) truss += `l2.5,-4.6l2.5,4.6`;
  const piers = [left, right].map((x) => rect(x - 15, 291, 30, 10)).join('');
  const approaches =
    [84, 128, 172, 660, 700].map((x) => rect(x - 1.5, deck + 8, 3, G - deck - 8)).join('') +
    rect(742, deck + 8, 3.5, G - deck - 8) +
    rect(796, deck + 8, 3.5, G - deck - 8);
  return {
    cables,
    hangers: hangers + side(left, 70) + side(right, 790),
    towers: tower(left) + tower(right),
    truss,
    piers,
    approaches,
  };
})();

/** Victorian row houses: steep gables, bay windows, front steps. */
const paintedLadies = (() => {
  const colours = ['#e8a39c', '#a8c6de', '#f1d28c', '#b4d4ae', '#d2b3de', '#f0b98f'];
  const body: { d: string; fill: string }[] = [];
  const p = paint(STONE, PANE, PANE_OFF, ROOF);
  colours.forEach((fill, i) => {
    const x = 1122 + i * 16.4;
    const base = 288 - i * 0.9;
    body.push({
      fill,
      d:
        rect(x, base - 25, 15.4, 25 + 14) +
        `M${x - 1},${base - 25}L${x + 7.7},${base - 38}L${x + 16.4},${base - 25}Z`,
    });
    // bay window, two storeys with its own little cornice
    put(p, STONE, rect(x + 0.8, base - 21, 7.4, 19.5));
    put(p, STONE, `M${x},${base - 21}l1.6,-2.4h5.800l1.600,2.400Z`);
    put(p, PANE, rect(x + 1.8, base - 19.5, 2.2, 5.5) + rect(x + 5, base - 19.5, 2.2, 5.5));
    put(p, PANE, rect(x + 1.8, base - 10.5, 2.2, 5.5) + rect(x + 5, base - 10.5, 2.2, 5.5));
    // door up a flight of steps, a window over it, one in the gable
    put(p, PANE_OFF, rect(x + 10.4, base - 8.5, 3.4, 7));
    put(p, PANE, rect(x + 10.6, base - 19.5, 3, 5.5));
    put(p, PANE, `M${x + 6.3},${base - 26.5}v-3.200a1.400,1.600 0 0 1 2.800,0v3.200Z`);
    put(
      p,
      STONE,
      rect(x + 9.2, base - 1.5, 6, 1.5) +
        rect(x + 9.8, base, 6, 1.5) +
        rect(x + 10.4, base + 1.5, 6, 1.5)
    );
    put(p, STONE, rect(x, base - 12.8, 15.4, 0.8));
    // trim along the gable, dark slate behind
    put(
      p,
      STONE,
      `M${x - 1},${base - 25}L${x + 7.7},${base - 38}L${x + 16.4},${base - 25}h-1.800L${x + 7.7},${base - 35.4}L${x + 0.8},${base - 25}Z`
    );
    put(p, ROOF, rect(x + 13.2, base - 37, 2, 6));
  });
  return { body, p };
})();

function SanFrancisco() {
  return (
    <>
      {/* Marin headlands */}
      <path d="M0,300C40,238 112,212 172,234C226,252 258,288 286,300Z" fill={HILL} />
      {/* Presidio, Telegraph Hill, the hills behind downtown */}
      <path
        d="M760,300C790,280 830,272 866,278C890,258 916,256 938,272C980,262 1060,262 1130,278C1170,270 1200,282 1220,300Z"
        fill={HILL}
      />
      {[874, 886, 924, 936].map((x, i) => (
        <circle key={x} cx={x} cy={[270, 263, 264, 271][i]} r={7} fill={GRASS} />
      ))}

      {/* Sutro Tower, far off on Twin Peaks */}
      <path
        d="M1188,280L1192.500,222M1206,280L1201.500,222M1197,280V214M1190.500,250h13M1191.500,234h11M1192.500,222h9"
        stroke={F}
        strokeWidth={1.4}
        fill="none"
      />

      <Towers blocks={sfFill} />

      {/* Golden Gate Bridge */}
      <g fill={BRIDGE} stroke={BRIDGE}>
        <path d={goldenGate.approaches} stroke="none" />
        <path d="M704,300Q748,262 792,300" strokeWidth={2.2} fill="none" />
        <path
          d="M716,290V276M728,283V276M740,279V276M756,279V276M768,283V276M780,290V276"
          strokeWidth={0.9}
        />
        <path d={goldenGate.hangers} strokeWidth={0.7} fill="none" />
        <path d={goldenGate.cables} strokeWidth={2.2} fill="none" />
        <path d={goldenGate.truss} strokeWidth={0.7} fill="none" />
        <path d={rect(40, GG.deck, 770, 3.4) + rect(40, GG.deck + 7.4, 770, 1.3)} stroke="none" />
        <path d={goldenGate.towers} stroke="none" />
      </g>
      <path d={goldenGate.piers} fill={WALL} />
      <circle cx={GG.left} cy={GG.top - 10} r={1.4} fill={RED} />
      <circle cx={GG.right} cy={GG.top - 10} r={1.4} fill={RED} />

      {/* Palace of Fine Arts */}
      <g>
        <path d={rect(826, 293, 40, 8)} fill={WALL} />
        <path
          d={
            [829, 834.5, 840, 849, 854.5, 860].map((x) => rect(x, 276, 2.6, 18)).join('') +
            rect(827, 272, 38, 4.5)
          }
          fill={WALL}
        />
        <path d="M830,272A16,14 0 0 1 862,272Z" fill={WOOD} />
        <path d="M843.500,294v-11a2.500,2.500 0 0 1 5,0v11Z" fill={PANE_OFF} opacity={0.5} />
        <path d={rect(845.4, 254, 1.2, 5)} fill={WOOD} />
      </g>

      {/* Coit Tower on Telegraph Hill */}
      <path
        d={
          rect(901, 232, 8.5, 32) +
          rect(899.8, 227, 11, 6) +
          rect(902, 223.5, 6.5, 4) +
          rect(898, 262, 14.5, 4)
        }
        fill={STONE}
      />
      <path
        d="M902.200,238v20M904.400,238v20M906.600,238v20M901.500,232.200v-3.400a0.9,0.9 0 0 1 1.800,0v3.400ZM904.400,232.200v-3.400a0.9,0.9 0 0 1 1.800,0v3.400ZM907.300,232.200v-3.400a0.9,0.9 0 0 1 1.800,0v3.400Z"
        stroke={PANE_OFF}
        strokeWidth={0.5}
        fill="none"
        opacity={0.7}
      />

      {/* a cable car climbing the hill */}
      <g transform="translate(884,279) rotate(-20)">
        <path d={rect(-8, -7.5, 16, 6)} fill={RED} />
        <path d={rect(-9, -9, 18, 1.6) + rect(-5, -10.4, 10, 1.5)} fill={STONE} />
        <path
          d={
            rect(-6.5, -6.4, 2.4, 2.8) +
            rect(-2.8, -6.4, 2.4, 2.8) +
            rect(0.9, -6.4, 2.4, 2.8) +
            rect(4.6, -6.4, 2.4, 2.8)
          }
          fill={PANE}
        />
        <path d={rect(-8, -3.2, 16, 1)} fill={GOLD} />
        <path d={circ(-5, -0.8, 1.2) + circ(5, -0.8, 1.2)} fill={F} />
      </g>

      {/* 555 California */}
      <Lit d={rect(1008, 158, 30, 142) + rect(1012, 153, 22, 6)} pattern="cb-win-fin" />

      {/* Transamerica Pyramid */}
      <path d="M956,300L973,120L975,84L977,120L994,300Z" fill={WALL} />
      <path d="M956,300L973,120L975,84L977,120L994,300Z" fill="url(#cb-pane-band)" />
      <path d="M963.4,222l-3.2,0l6.500,-64ZM986.6,222l3.200,0l-6.500,-64Z" fill={WALL} />
      <path d="M973,120L975,84L977,120Z" fill={STONE} />
      <path d="M975,84V300" stroke={ROOF} strokeWidth={0.5} opacity={0.4} />

      {/* Salesforce Tower */}
      <Lit
        d="M1050,300L1053,144Q1053,116 1070,110Q1087,116 1087,144L1090,300Z"
        pattern="cb-win-band"
      />
      <path
        d="M1053.300,140Q1053.500,117 1070,110Q1086.500,117 1086.700,140Z"
        fill={TRIM}
        opacity={0.5}
      />

      {/* Ferry Building */}
      <g>
        <path d={rect(1070, 286, 46, 15)} fill={WALL} />
        <path
          d={Array.from(
            { length: 8 },
            (_, i) => `M${1072.5 + i * 5.4},300v-7a1.700,1.700 0 0 1 3.4,0v7Z`
          ).join('')}
          fill={PANE_OFF}
        />
        <path d={rect(1069, 285, 48, 1.5)} fill={ROOF} />
        <path
          d={rect(1089, 246, 8, 40) + rect(1090.2, 238, 5.6, 8) + rect(1091.3, 232, 3.4, 6)}
          fill={WALL}
        />
        <path d="M1090.800,232L1093,224L1095.200,232Z" fill={ROOF} />
        <path d={circ(1093, 252, 2.8)} fill={GOLD} />
        <path d={rect(1092.7, 214, 0.6, 10)} fill={ROOF} />
        <path d={rect(1093.3, 214, 4, 2.6)} fill={RED} />
      </g>

      {/* Alamo Square and the Painted Ladies */}
      <path d="M1100,300C1118,288 1150,284 1182,280C1200,278 1212,286 1220,300Z" fill={GRASS} />
      {paintedLadies.body.map((h) => (
        <path key={h.fill} d={h.d} fill={h.fill} />
      ))}
      <Painted p={paintedLadies.p} />
      <path d="M1112,300C1130,293 1170,291 1222,292V301H1112Z" fill={GRASS} />
      <Tree x={1110} r={6} y={299} fill={GRASS} />

      {/* Karl the Fog */}
      <g fill="var(--cb-fog)" className="cb-fog">
        <ellipse cx={170} cy={246} rx={86} ry={10} />
        <ellipse cx={340} cy={258} rx={110} ry={11} />
        <ellipse cx={500} cy={284} rx={130} ry={9} />
        <ellipse cx={660} cy={250} rx={84} ry={9} />
        <ellipse cx={420} cy={236} rx={60} ry={7} />
      </g>
    </>
  );
}

function Alcatraz({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M-40,0Q-30,-9 -12,-10Q10,-13 28,-8Q38,-5 42,0Z" fill={M} />
      <path d={rect(-20, -17, 30, 7) + rect(-26, -13, 6, 4) + rect(14, -14, 9, 5)} fill={STONE} />
      <path d={rect(-17, -15, 24, 1.6)} fill={PANE_OFF} opacity={0.6} />
      <path d={rect(-4.8, -29, 2.6, 13) + rect(-5.6, -30.5, 4.2, 2)} fill={STONE} />
      <circle cx={-3.5} cy={-32} r={1.5} fill={GOLD} />
      <path d={rect(24, -19, 4, 4) + rect(24.5, -15, 0.7, 6) + rect(26.8, -15, 0.7, 6)} fill={F} />
    </g>
  );
}

/* --- registry -------------------------------------------------------------- */

export interface City {
  id: string;
  name: string;
  native?: string;
  width: number;
  art: ReactNode;
  /** Things floating on the water (not mirrored in the reflection). */
  afloat?: ReactNode;
}

export const CITIES: City[] = [
  {
    id: 'paris',
    name: 'Paris',
    width: 910,
    art: <Paris />,
    afloat: <RiverBoat x={300} y={322} />,
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou',
    native: '杭州',
    width: 900,
    art: <Hangzhou />,
    afloat: <HangzhouAfloat />,
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    native: '上海',
    width: 890,
    art: <Shanghai />,
    afloat: <RiverBoat x={720} y={320} />,
  },
  {
    id: 'taipei',
    name: 'Taipei',
    native: '台北',
    width: 860,
    art: <Taipei />,
  },
  {
    id: 'jiufen',
    name: 'Jiufen',
    native: '九份',
    width: 840,
    art: <Jiufen />,
    afloat: <Sampan x={90} y={320} />,
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    native: '香港',
    width: 940,
    art: <HongKong />,
    afloat: (
      <>
        <Junk x={150} y={328} />
        <Ferry x={640} y={318} />
      </>
    ),
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    width: 1230,
    art: <SanFrancisco />,
    afloat: (
      <>
        <Alcatraz x={880} y={322} />
        <Sailboat x={430} y={322} />
        <Sailboat x={540} y={314} flip />
      </>
    ),
  },
];

export const CITIES_WIDTH = CITIES.reduce((sum, c) => sum + c.width, 0);
