import type { ReactNode } from 'react';
import { GROUND as G, eave, pagoda, rect, rng, skyline, yAt } from './draw';

/* Palette — resolved from CSS custom properties so the banner follows the theme. */
const F = 'var(--cb-front)';
const M = 'var(--cb-mid)';
const HILL = 'var(--cb-hill)';
const RED = 'var(--cb-red)';
const GOLD = 'var(--cb-gold)';
const STONE = 'var(--cb-stone)';
const BRIDGE = 'var(--cb-bridge)';
const PEARL = 'var(--cb-pearl)';
const WIN = 'var(--cb-win)';
const TRIM = 'var(--cb-trim)';

/** A building mass with lit windows laid over it. */
function Lit({ d, fill = M, rule }: { d: string; fill?: string; rule?: 'evenodd' }) {
  return (
    <>
      <path d={d} fill={fill} fillRule={rule} />
      <path
        d={d}
        fill="url(#cb-win)"
        fillRule={rule}
        opacity={fill === M ? 'var(--cb-win-dim)' : undefined}
      />
    </>
  );
}

function Tree({ x, r = 8, y = G }: { x: number; r?: number; y?: number }) {
  return (
    <>
      <rect x={x - 0.8} y={y - r * 1.5} width={1.6} height={r * 1.5} fill={F} />
      <circle cx={x} cy={y - r * 1.7} r={r} fill={F} />
    </>
  );
}

function Willow({ x, h = 30 }: { x: number; h?: number }) {
  const top = G - 5 - h;
  const strands = [-12, -7, -2, 3, 8, 13]
    .map((dx, i) => `M${x + dx},${top + 5}v${Math.min(h - 8, [15, 22, 17, 24, 19, 13][i])}`)
    .join('');
  return (
    <g stroke={F} strokeLinecap="round" fill="none">
      <path d={`M${x},${G - 4}q-3,${-h / 2} 0,${-h + 6}`} strokeWidth={2.2} />
      <path d={strands} strokeWidth={4.4} />
      <ellipse cx={x + 0.5} cy={top + 5} rx={14.5} ry={9} fill={F} stroke="none" />
    </g>
  );
}

/* --- small craft ---------------------------------------------------------- */

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
      <path d="M-24,0L-28,-7H28L24,0Z" fill="var(--cb-ferry)" />
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

/* --- Paris ---------------------------------------------------------------- */

function haussmann(seed: number, from: number, to: number) {
  const rand = rng(seed);
  let body = '';
  let roof = '';
  let x = from;
  while (x < to - 24) {
    const w = Math.min(30 + rand() * 22, to - x);
    const h = 28 + rand() * 13;
    const top = G - h;
    body += rect(x, top, w, h);
    roof += `M${x + 0.5},${top + 0.5}L${x + 3.5},${top - 8}H${x + w - 3.5}L${x + w - 0.5},${top + 0.5}Z`;
    const chimneys = 1 + Math.floor(rand() * 3);
    for (let i = 0; i < chimneys; i++) {
      roof += rect(x + 5 + rand() * (w - 13), top - 13, 3, 6);
    }
    x += w;
  }
  return { body, roof };
}

const parisLeft = haussmann(11, 24, 372);
const parisRight = haussmann(29, 528, 880);

function Paris() {
  return (
    <>
      {/* Montmartre */}
      <path d="M548,300C596,262 650,236 706,236C770,236 818,268 866,300Z" fill={HILL} />
      <g transform="translate(6,-13)">
        <rect x={733} y={190} width={10} height={62} fill={STONE} />
        <path d="M731.5,190L738,174L744.5,190Z" fill={STONE} />
        <rect x={672} y={226} width={56} height={26} fill={STONE} />
        <rect x={690} y={204} width={20} height={24} fill={STONE} />
        <path d="M687.5,206C687.5,182 696,173 700,160C704,173 712.5,182 712.5,206Z" fill={STONE} />
        <rect x={699} y={150} width={2} height={12} fill={STONE} />
        <path d="M671,228C671,214 675.5,210 678,202C680.500,210 685,214 685,228Z" fill={STONE} />
        <path d="M715,228C715,214 719.5,210 722,202C724.5,210 729,214 729,228Z" fill={STONE} />
        <path
          d="M690,252v-9a2.2,2.2 0 0 1 4.400,0v9ZM697.8,252v-9a2.2,2.2 0 0 1 4.400,0v9ZM705.6,252v-9a2.2,2.2 0 0 1 4.400,0v9Z"
          fill={HILL}
        />
      </g>

      <Lit d={parisLeft.body} />
      <path d={parisLeft.roof} fill={F} />
      <Lit d={parisRight.body} />
      <path d={parisRight.roof} fill={F} />

      {/* Arc de Triomphe */}
      <path
        d="M140,300V236H200V300ZM156,300V268A14,14 0 0 1 184,268V300Z"
        fill={F}
        fillRule="evenodd"
      />
      <path d="M137,247h66M140,240.5h60" stroke={TRIM} strokeWidth={1.2} />

      {/* Champ de Mars */}
      {[386, 402, 498, 514].map((x, i) => (
        <Tree key={x} x={x} r={i % 2 ? 8 : 6.5} />
      ))}

      {/* Eiffel Tower */}
      <path
        d="M394,300C424,262 441,190 446.6,72H453.4C459,190 476,262 506,300ZM414,300Q450,236 486,300ZM438,246L450,208L462,246Z"
        fill={F}
        fillRule="evenodd"
      />
      <path
        d={rect(420, 248, 60, 5) + rect(435.5, 201, 29, 4.5) + rect(444, 92, 12, 3.4)}
        fill={F}
      />
      <path d="M449.300,74L450,50L450.700,74Z" fill={F} />
      <circle cx={450} cy={50} r={1.6} fill={GOLD} />
    </>
  );
}

/* --- Hangzhou ------------------------------------------------------------- */

function Hangzhou() {
  return (
    <>
      <path
        d="M30,300C110,262 190,232 262,244C330,256 364,222 442,212C520,202 580,236 640,226C704,216 764,232 824,264C852,279 872,292 890,300Z"
        fill={HILL}
      />
      {/* Leifeng Pagoda on its hill */}
      <path d="M556,300C606,268 648,246 692,245C742,245 792,270 842,300Z" fill={M} />
      <path d={pagoda(692, 247, 5, 46, 18, 6)} fill={F} />
      <circle cx={692} cy={133} r={1.8} fill={GOLD} />
      {[600, 622, 760, 786].map((x, i) => (
        <Tree key={x} x={x} r={7 + (i % 2) * 2} y={i % 3 ? 292 : 284} />
      ))}

      {/* Su Causeway and its moon bridge */}
      <path d={rect(36, 295, 508, 6)} fill={F} />
      <path
        d="M244,300Q300,252 356,300ZM281,300A19,19 0 0 1 319,300Z"
        fill={F}
        fillRule="evenodd"
      />
      {[72, 122, 188, 392, 520].map((x, i) => (
        <Willow key={x} x={x} h={26 + ((i * 7) % 10)} />
      ))}

      {/* Lake pavilion */}
      <path
        d={
          rect(438, 291, 44, 5) +
          rect(444, 268, 2, 24) +
          rect(453.5, 268, 2, 24) +
          rect(464.5, 268, 2, 24) +
          rect(474, 268, 2, 24) +
          eave(460, 270, 40, 22, 9, 7) +
          rect(451, 255, 18, 7) +
          eave(460, 256, 22, 3, 11, 5) +
          rect(459.3, 238, 1.4, 8)
        }
        fill={F}
      />
    </>
  );
}

/* --- Shanghai ------------------------------------------------------------- */

const shanghaiFill = skyline({
  seed: 7,
  from: 200,
  to: 830,
  minH: 34,
  maxH: 120,
  minW: 14,
  maxW: 30,
  gap: 3,
  envelope: (t) => 0.45 + 0.55 * Math.sin(Math.PI * Math.min(1, t * 1.15)),
});

function jinMao(cx: number) {
  const widths = [38, 34, 30, 26, 22, 18, 13];
  const heights = [30, 26, 23, 20, 17, 13, 9];
  let d = '';
  let y = G;
  widths.forEach((w, i) => {
    y -= heights[i];
    d += rect(cx - w / 2, y, w, heights[i] + 0.5);
    d += rect(cx - w / 2 - 1.5, y, w + 3, 2.2);
  });
  return `${d}M${cx - 2.5},${y}L${cx},${y - 30}L${cx + 2.5},${y}Z`;
}

function Shanghai() {
  return (
    <>
      <Lit d={shanghaiFill} />

      {/* The Bund */}
      <Lit
        d={
          rect(40, 270, 40, 30) +
          rect(84, 262, 52, 38) +
          rect(102, 232, 16, 30) +
          rect(105, 220, 10, 12) +
          'M104,220L110,206L116,220Z' +
          rect(140, 268, 52, 32) +
          'M155,268A11,11 0 0 1 177,268Z'
        }
        fill={F}
      />
      <circle cx={110} cy={244} r={3.6} fill={GOLD} />

      {/* Oriental Pearl Tower */}
      <path
        d="M250,258L223,300M250,258L277,300M250,262V300"
        stroke={F}
        strokeWidth={4.2}
        strokeLinecap="round"
      />
      <path d="M235,283L250,250L265,283" stroke={F} strokeWidth={2.4} fill="none" />
      <path d={rect(245, 134, 10, 126) + rect(246, 108, 8, 24)} fill={F} />
      <path d="M248.600,110L250,58L251.400,110Z" fill={F} />
      <g fill={PEARL}>
        <circle cx={250} cy={244} r={19} />
        <circle cx={250} cy={170} r={13} />
        <circle cx={250} cy={132} r={6} />
        <circle cx={250} cy={199} r={3.6} />
        <circle cx={250} cy={213} r={3.6} />
      </g>
      <path
        d="M232,241a19,5.500 0 0 0 36,0M238,168a13,4 0 0 0 24,0"
        stroke={F}
        strokeWidth={1.4}
        fill="none"
        opacity={0.55}
      />

      {/* Jin Mao, SWFC, Shanghai Tower */}
      <Lit d={jinMao(400)} fill={F} />
      <Lit
        d="M468,300L473,104H507L512,300ZM481,111H499L496.500,130H483.500Z"
        fill={F}
        rule="evenodd"
      />
      <Lit d="M554,300C554,210 560,120 572,54L590,62C601,125 606,210 606,300Z" fill={F} />
      <path
        d="M561,300C565,220 590,150 584,60M574,300C578,230 600,170 597,110"
        stroke={TRIM}
        strokeWidth={1.2}
        fill="none"
      />
    </>
  );
}

/* --- Taipei --------------------------------------------------------------- */

const taipeiFill = skyline({
  seed: 23,
  from: 300,
  to: 800,
  minH: 22,
  maxH: 72,
  minW: 16,
  maxW: 34,
  gap: 2,
  detail: 0.8,
});

function taipei101(cx: number) {
  let d = `M${cx - 30},300L${cx - 22},250H${cx + 22}L${cx + 30},300Z`;
  let y = 250;
  for (let i = 0; i < 8; i++) {
    d += `M${cx - 19},${y + 0.5}L${cx - 24.5},${y - 19}H${cx + 24.5}L${cx + 19},${y + 0.5}Z`;
    y -= 19;
  }
  d += rect(cx - 14, y - 11, 28, 11.5);
  d += rect(cx - 8, y - 21, 16, 10.5);
  d += `M${cx - 3},${y - 21}L${cx - 1},${y - 40}L${cx},${y - 62}L${cx + 1},${y - 40}L${cx + 3},${y - 21}Z`;
  return d;
}

function Taipei() {
  return (
    <>
      <path
        d="M0,300C60,250 130,222 210,234C282,244 322,272 400,262C500,250 560,206 650,200C730,196 782,250 820,300Z"
        fill={HILL}
      />
      <Lit d={taipeiFill} />

      {/* The Grand Hotel on Yuanshan */}
      <path d="M84,300C118,272 150,263 190,263C234,263 262,278 296,300Z" fill={M} />
      <rect x={132} y={260} width={116} height={5} fill={STONE} />
      <Lit d={rect(140, 236, 100, 25) + rect(156, 219, 68, 9)} fill={RED} />
      <path
        d="M148,238v22M160,238v22M172,238v22M184,238v22M196,238v22M208,238v22M220,238v22M232,238v22"
        stroke={F}
        strokeWidth={1.3}
        opacity={0.45}
      />
      <path d={eave(190, 238, 104, 74, 11, 8) + eave(190, 221, 72, 30, 13, 7)} fill={GOLD} />
      {[100, 118, 268, 284].map((x, i) => (
        <Tree key={x} x={x} r={6 + (i % 2) * 2} y={i === 0 || i === 3 ? 294 : 284} />
      ))}

      {/* Taipei 101 */}
      <Lit d={taipei101(470)} fill={F} />
      <circle cx={470} cy={36} r={1.6} fill={GOLD} />
    </>
  );
}

/* --- Jiufen --------------------------------------------------------------- */

const JIUFEN_SLOPE: [number, number][] = [
  [64, 300],
  [150, 282],
  [230, 246],
  [310, 204],
  [390, 160],
  [450, 128],
  [500, 112],
  [552, 120],
  [610, 152],
  [670, 202],
  [730, 252],
  [790, 290],
  [820, 300],
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

const jiufen = (() => {
  const rand = rng(97);
  let houses = '';
  let windows = '';
  const lanterns: [number, number][] = [];
  for (let row = 0; row < 6; row++) {
    let x = 150 + row * 6 + rand() * 10;
    while (x < 440) {
      const w = 15 + rand() * 10;
      const h = 11 + rand() * 6;
      const base = yAt(JIUFEN_SLOPE, x + w / 2) + 10 + row * 20;
      if (base < 298 && base > 196 && !(x > 262 && x < 340 && row > 0 && row < 4)) {
        const top = base - h;
        houses += rect(x, top, w, h);
        houses +=
          rand() < 0.7
            ? `M${x - 2},${top + 0.5}L${x + w / 2},${top - 5}L${x + w + 2},${top + 0.5}Z`
            : rect(x - 1.5, top - 2, w + 3, 2.5);
        windows += rect(x + 3, top + 3.5, 3, 3.4);
        if (w > 19) windows += rect(x + w - 7, top + 3.5, 3, 3.4);
        if (row > 0 && row < 5) {
          lanterns.push([x + 2, base + 3]);
          lanterns.push([x + w / 2 + 2, base + 4.2]);
        }
      }
      x += w + 2 + rand() * 5;
    }
  }
  return { houses, windows, lanterns };
})();

const SKY_LANTERNS: [number, number, number][] = [
  [566, 86, 1],
  [612, 52, 0.8],
  [664, 104, 1.1],
  [706, 40, 0.7],
  [748, 80, 0.9],
];

function Jiufen() {
  return (
    <>
      <path d="M8,300Q46,272 84,300Z" fill={HILL} />
      <path d={smooth(JIUFEN_SLOPE)} fill={HILL} />
      <path d={jiufen.houses} fill={F} />
      <path d={jiufen.windows} fill={WIN} opacity="var(--cb-win-strong)" />

      {/* The big teahouse */}
      <path
        d={
          rect(274, 248, 58, 16) +
          eave(303, 248, 58, 50, 4.5, 6) +
          rect(278, 231, 50, 13) +
          eave(303, 231, 50, 42, 4.5, 6) +
          rect(282, 216, 42, 11) +
          eave(303, 216, 42, 10, 10, 7)
        }
        fill={F}
      />
      <path
        d={
          [280, 290, 300, 310, 320].map((x) => rect(x, 252, 5, 7)).join('') +
          [284, 294, 304, 314].map((x) => rect(x, 234, 5, 6)).join('') +
          [288, 298, 308, 316].map((x) => rect(x, 219, 4, 5)).join('')
        }
        fill={WIN}
        opacity="var(--cb-win-strong)"
      />
      <g fill={RED}>
        {[270, 280, 290, 300, 310, 320, 330].map((x) => (
          <ellipse key={`a${x}`} cx={x + 3} cy={251} rx={2} ry={2.4} />
        ))}
        {[276, 286, 296, 306, 316, 326].map((x) => (
          <ellipse key={`b${x}`} cx={x + 2} cy={234} rx={1.8} ry={2.2} />
        ))}
      </g>

      {/* Lantern strings along the stairs */}
      <g fill={RED} opacity="var(--cb-glow)">
        {jiufen.lanterns.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4.6} />
        ))}
      </g>
      <g fill={RED}>
        {jiufen.lanterns.map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx={1.9} ry={2.3} />
        ))}
      </g>

      {/* Sky lanterns drifting off the mountain */}
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

/* --- Hong Kong ------------------------------------------------------------ */

const hongKongFill = skyline({
  seed: 5,
  from: 40,
  to: 868,
  minH: 46,
  maxH: 128,
  minW: 9,
  maxW: 17,
  gap: 4,
  detail: 0.5,
  envelope: (t) => 0.5 + 0.5 * Math.sin(Math.PI * t),
});

function HongKong() {
  return (
    <>
      {/* Victoria Peak */}
      <path
        d="M0,300C80,250 160,172 280,152C380,136 430,176 520,160C640,140 720,200 800,242C850,270 880,294 900,300Z"
        fill={HILL}
      />
      <Lit d={hongKongFill} />

      {/* Bank of China Tower */}
      <Lit d="M308,300V206L330,176V146L352,116V300Z" fill={F} />
      <path
        d="M308,300L352,256L308,212M352,300L308,256L352,212M330,176L352,212M352,168L330,146"
        stroke={TRIM}
        strokeWidth={1.2}
        fill="none"
      />
      <path d={rect(344.5, 82, 1.4, 36) + rect(349, 90, 1.4, 28)} fill={F} />

      {/* HSBC */}
      <Lit d={rect(388, 198, 44, 102) + rect(394, 189, 32, 10) + rect(401, 181, 18, 9)} fill={F} />
      <path
        d="M388,222L410,234L432,222M388,250L410,262L432,250M388,278L410,290L432,278"
        stroke={TRIM}
        strokeWidth={1.2}
        fill="none"
      />

      <Lit d={rect(466, 150, 27, 150) + rect(478.8, 122, 1.4, 30)} fill={F} />

      {/* Two IFC */}
      <Lit
        d={
          'M540,300L545,92H575L580,300Z' +
          rect(545, 75, 3.2, 18) +
          rect(551.5, 81, 3, 12) +
          rect(558.5, 84, 3, 9) +
          rect(565.5, 81, 3, 12) +
          rect(571.8, 75, 3.2, 18)
        }
        fill={F}
      />

      {/* Central Plaza */}
      <Lit d={rect(684, 142, 32, 158) + rect(680, 196, 40, 104)} fill={F} />
      <path d="M685,142L700,112L715,142Z" fill={GOLD} />
      <path d={rect(699.3, 78, 1.4, 36)} fill={F} />

      {/* Convention centre */}
      <path d="M752,300V294Q772,281 802,285Q832,277 860,293V300Z" fill={STONE} />
    </>
  );
}

/* --- San Francisco -------------------------------------------------------- */

const sfFill = skyline({
  seed: 41,
  from: 850,
  to: 1076,
  minH: 30,
  maxH: 96,
  minW: 14,
  maxW: 26,
  gap: 2,
  envelope: (t) => 0.4 + 0.6 * Math.sin(Math.PI * t),
});

const GG = { left: 250, right: 610, top: 132, deck: 268, sag: 258 };

const goldenGate = (() => {
  const { left, right, top, deck, sag } = GG;
  const ctrl = 2 * sag - top;
  let hangers = '';
  for (let x = left + 12; x < right; x += 12) {
    const t = (x - left) / (right - left);
    const y = (1 - t) * (1 - t) * top + 2 * t * (1 - t) * ctrl + t * t * top;
    hangers += `M${x},${y.toFixed(1)}V${deck}`;
  }
  // side spans: hangers under the cables that run down to the anchorages
  const side = (x0: number, x1: number) => {
    let d = '';
    const n = Math.floor(Math.abs(x1 - x0) / 12);
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
  const tower = (x: number) =>
    rect(x - 9, top - 4, 5, G - top + 4) +
    rect(x + 4, top - 4, 5, G - top + 4) +
    [top + 2, top + 30, top + 64, top + 104].map((y) => rect(x - 5, y, 10, 5)).join('') +
    rect(x - 12, 290, 24, 11);
  return {
    cables,
    hangers: hangers + side(left, 70) + side(right, 790),
    towers: tower(left) + tower(right),
  };
})();

const LADIES = ['#e8a7a1', '#a9c6dd', '#f1d28c', '#b5d3b0', '#d3b3dd'];

function SanFrancisco() {
  return (
    <>
      {/* Marin headlands */}
      <path d="M0,300C40,238 112,212 172,234C226,252 258,288 286,300Z" fill={HILL} />
      {/* The city's hills */}
      <path d="M748,300C792,268 846,258 900,268C962,258 1024,268 1096,300Z" fill={HILL} />
      <Lit d={sfFill} />

      {/* Golden Gate Bridge */}
      <g fill={BRIDGE} stroke={BRIDGE}>
        <path d={goldenGate.hangers} strokeWidth={0.8} fill="none" />
        <path d={goldenGate.cables} strokeWidth={2.2} fill="none" />
        <path d={rect(40, GG.deck, 770, 4.6)} stroke="none" />
        <path d="M40,275.500H810" strokeWidth={1} strokeDasharray="1.5 4.500" fill="none" />
        <path d={goldenGate.towers} stroke="none" />
      </g>

      {/* Coit Tower */}
      <path d={rect(846, 236, 8, 30) + rect(844.8, 232, 10.4, 5)} fill={STONE} />

      {/* Transamerica Pyramid, Salesforce Tower */}
      <Lit d="M911,300L928.6,112L930,84L931.4,112L949,300Z" fill={F} />
      <path d="M920,214l-3.5,0l4.800,-34ZM940,214l3.5,0l-4.800,-34Z" fill={F} />
      <Lit d="M990,300L993,140Q993,112 1010,108Q1027,112 1027,140L1030,300Z" fill={F} />

      {/* Sutro Tower */}
      <path
        d="M1058,284L1062,226M1074,284L1070,226M1066,284V218M1060.5,250h11M1061.5,236h9"
        stroke={F}
        strokeWidth={1.5}
        fill="none"
      />

      {/* Painted Ladies */}
      {LADIES.map((c, i) => {
        const x = 760 + i * 15;
        return (
          <g key={c}>
            <path d={`M${x},300V282L${x + 6.5},273L${x + 13},282V300Z`} fill={c} />
            <path
              d={rect(x + 2, 285, 3.6, 5) + rect(x + 7.5, 285, 3.6, 5)}
              fill={F}
              opacity={0.55}
            />
          </g>
        );
      })}

      {/* Karl the Fog */}
      <g fill="var(--cb-fog)" className="cb-fog">
        <ellipse cx={170} cy={248} rx={86} ry={10} />
        <ellipse cx={340} cy={262} rx={110} ry={12} />
        <ellipse cx={500} cy={282} rx={130} ry={10} />
        <ellipse cx={660} cy={254} rx={84} ry={9} />
        <ellipse cx={420} cy={240} rx={60} ry={7} />
      </g>
    </>
  );
}

/* --- registry ------------------------------------------------------------- */

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
    width: 900,
    art: <Paris />,
    afloat: <RiverBoat x={300} y={322} />,
  },
  {
    id: 'hangzhou',
    name: 'Hangzhou',
    native: '杭州',
    width: 900,
    art: <Hangzhou />,
    afloat: (
      <>
        <Sampan x={190} y={324} />
        <Sampan x={640} y={316} flip />
      </>
    ),
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    native: '上海',
    width: 860,
    art: <Shanghai />,
    afloat: <RiverBoat x={690} y={320} />,
  },
  {
    id: 'taipei',
    name: 'Taipei',
    native: '台北',
    width: 820,
    art: <Taipei />,
  },
  {
    id: 'jiufen',
    name: 'Jiufen',
    native: '九份',
    width: 820,
    art: <Jiufen />,
    afloat: <Sampan x={90} y={320} />,
  },
  {
    id: 'hong-kong',
    name: 'Hong Kong',
    native: '香港',
    width: 900,
    art: <HongKong />,
    afloat: (
      <>
        <Junk x={190} y={326} />
        <Ferry x={640} y={318} />
      </>
    ),
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    width: 1100,
    art: <SanFrancisco />,
    afloat: (
      <>
        <Sailboat x={430} y={322} />
        <Sailboat x={520} y={314} flip />
      </>
    ),
  },
];

export const CITIES_WIDTH = CITIES.reduce((sum, c) => sum + c.width, 0);
