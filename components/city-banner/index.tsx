import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { CITIES, CITIES_WIDTH, Sailboat, Sampan } from './cities';
import { HEIGHT, ridge, rng, skyline } from './draw';

/** Speed of the landmark layer, in artwork units per second. */
const SPEED = 38;

/* --- procedural scenery (seeded, so SSR and client agree) ------------------ */

const MOUNTAINS_W = 2400;
const mountainsFar = ridge(3, MOUNTAINS_W, 236, 86, 200);
const mountainsNear = ridge(8, MOUNTAINS_W, 268, 52, 150);

const FAR_W = 3000;
const farSkyline = skyline({
  seed: 61,
  from: 0,
  to: FAR_W,
  minH: 18,
  maxH: 104,
  minW: 16,
  maxW: 40,
  gap: 10,
  detail: 0.35,
});

const CLOUDS_W = 2400;
const clouds = (() => {
  const rand = rng(19);
  const out: { x: number; y: number; w: number; h: number }[] = [];
  for (let i = 0; i < 11; i++) {
    const x = (i / 11) * CLOUDS_W + rand() * 90;
    const y = 36 + rand() * 150;
    const w = 90 + rand() * 120;
    const h = 9 + rand() * 7;
    out.push({ x, y, w, h });
    out.push({ x: x + w * 0.22, y: y - h * 0.8, w: w * 0.5, h });
    if (rand() > 0.4) out.push({ x: x - w * 0.18, y: y + h * 0.8, w: w * 0.6, h: h * 0.9 });
  }
  return out;
})();

const stars = (() => {
  const rand = rng(404);
  return Array.from({ length: 90 }, () => ({
    x: rand() * 1600,
    y: rand() * rand() * 260,
    r: 0.5 + rand() * 1.1,
    twinkle: rand() > 0.72,
    delay: rand() * 4,
  }));
})();

const WATER_W = 2600;
const ripples = (() => {
  const rand = rng(77);
  let d = '';
  for (let i = 0; i < 150; i++) {
    const y = 306 + rand() * 92;
    const len = 6 + ((y - 300) / 100) * 34 * (0.4 + rand());
    const x = rand() * (WATER_W - len);
    d += `M${x.toFixed(1)},${y.toFixed(1)}h${len.toFixed(1)}`;
  }
  return d;
})();

/* --- layers ---------------------------------------------------------------- */

interface TrackProps {
  id: string;
  width: number;
  /** How many times the strip is repeated; the loop slides by exactly one. */
  copies?: number;
  /** Relative speed: 1 = landmark layer, <1 = further away. */
  speed: number;
  /** How far the layer lags behind when the page scrolls (0 = moves with the page). */
  depth: number;
  /** Where in the loop the layer starts (0..1). */
  offset?: number;
  children: ReactNode;
}

function Track({ id, width, copies = 2, speed, depth, offset = 0, children }: TrackProps) {
  const duration = width / (SPEED * speed);
  return (
    <div className="cb-layer" style={{ '--cb-depth': depth } as CSSProperties}>
      <div
        className="cb-track"
        style={
          {
            '--cb-shift': `${-100 / copies}%`,
            animationDuration: `${duration.toFixed(1)}s`,
            animationDelay: `${(-duration * offset).toFixed(1)}s`,
          } as CSSProperties
        }
      >
        <svg
          viewBox={`0 0 ${width * copies} ${HEIGHT}`}
          style={{ aspectRatio: `${width * copies} / ${HEIGHT}` }}
          aria-hidden="true"
          focusable="false"
        >
          <g id={id}>{children}</g>
          {Array.from({ length: copies - 1 }, (_, i) => (
            <use key={i} href={`#${id}`} x={width * (i + 1)} />
          ))}
        </svg>
      </div>
    </div>
  );
}

function Cities() {
  let x = 0;
  const placed = CITIES.map((city) => {
    const at = x;
    x += city.width;
    return { city, at };
  });
  return (
    <>
      {/* mirrored in the water, squashed and faint */}
      <use
        href="#cb-cities-art"
        transform="translate(0,474) scale(1,-0.58)"
        opacity="var(--cb-reflect)"
      />
      <g id="cb-cities-art">
        {placed.map(({ city, at }) => (
          <g key={city.id} transform={`translate(${at},0)`}>
            {city.art}
          </g>
        ))}
      </g>
      {placed.map(({ city, at }) => (
        <g key={city.id} transform={`translate(${at},0)`}>
          {city.afloat}
          <text className="cb-label" x={city.width / 2} y={337} textAnchor="middle">
            {city.native ? `${city.native}  ` : ''}
            {city.name.toUpperCase()}
          </text>
        </g>
      ))}
    </>
  );
}

export default function CityBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only animate while the banner is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      el.toggleAttribute('data-paused', !entry.isIntersecting);
    });
    observer.observe(el);

    // Scroll parallax: distant layers lag behind the page.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.setProperty('--cb-scroll', reduced.matches ? '0' : String(window.scrollY));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="city-banner"
      role="img"
      aria-label={`A looping skyline of ${CITIES.map((c) => c.name).join(', ')}`}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="cb-win" width="20" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M2,3h2v3h-2ZM12,3h2v3h-2ZM7,9h2v3h-2ZM17,9h2v3h-2ZM2,15h2v3h-2ZM7,15h2v3h-2ZM12,21h2v2h-2ZM17,3h2v3h-2ZM12,15h2v3h-2Z"
              fill="var(--cb-win)"
            />
          </pattern>
        </defs>
      </svg>

      <div className="cb-layer" style={{ '--cb-depth': 0.55 } as CSSProperties}>
        <svg
          className="cb-stars"
          viewBox="0 0 1600 300"
          preserveAspectRatio="xMidYMin slice"
          aria-hidden="true"
          focusable="false"
        >
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.x.toFixed(1)}
              cy={s.y.toFixed(1)}
              r={s.r.toFixed(2)}
              className={s.twinkle ? 'cb-twinkle' : undefined}
              style={s.twinkle ? { animationDelay: `${-s.delay.toFixed(2)}s` } : undefined}
            />
          ))}
        </svg>
        <div className="cb-sun" />
      </div>

      <Track id="cb-clouds" width={CLOUDS_W} copies={3} speed={0.1} depth={0.48}>
        {clouds.map((c, i) => (
          <rect
            key={i}
            x={c.x.toFixed(1)}
            y={c.y.toFixed(1)}
            width={c.w.toFixed(1)}
            height={c.h.toFixed(1)}
            rx={(c.h / 2).toFixed(1)}
            fill="var(--cb-cloud)"
          />
        ))}
      </Track>

      <Track
        id="cb-mountains"
        width={MOUNTAINS_W}
        copies={3}
        speed={0.22}
        depth={0.36}
        offset={0.3}
      >
        <path d={mountainsFar} fill="var(--cb-mtn)" />
        <path d={mountainsNear} fill="var(--cb-mtn-near)" />
      </Track>

      <Track id="cb-far" width={FAR_W} copies={3} speed={0.5} depth={0.2} offset={0.15}>
        <path d={farSkyline} fill="var(--cb-far)" />
        <path d={farSkyline} fill="url(#cb-win)" opacity={0.5} />
      </Track>

      <div className="cb-water" />

      <Track id="cb-cities" width={CITIES_WIDTH} speed={1} depth={0}>
        <Cities />
      </Track>

      <Track id="cb-near" width={WATER_W} copies={3} speed={1.7} depth={-0.06} offset={0.4}>
        <path d={ripples} stroke="var(--cb-ripple)" strokeWidth={1.3} strokeLinecap="round" />
        <g transform="translate(620,378) scale(1.5)">
          <Sampan x={0} y={0} />
        </g>
        <g transform="translate(1900,372) scale(1.45)">
          <Sailboat x={0} y={0} flip />
        </g>
      </Track>

      <div className="cb-fade" />
    </div>
  );
}
