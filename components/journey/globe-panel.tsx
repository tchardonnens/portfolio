import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GlobeHit, GlobePoint } from './globe';
import {
  DerivedTrip,
  HOME_CODE,
  Place,
  formatRange,
  groupPlaces,
  routeKm,
} from '../../lib/journey';

// three.js is heavy and touches the DOM, so it stays out of the static build
// and only loads once the page is running in a browser.
const Globe = dynamic(() => import('./globe'), {
  ssr: false,
  loading: () => <div className="aspect-square w-full" />,
});

const CONTROL =
  'rounded-md px-1.5 py-0.5 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-500 transition-colors duration-200 hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:text-neutral-500 dark:hover:text-orange-500';

/** The card pinned to whichever marker the pointer is on. */
function PlaceTooltip({ place, hit }: { place: Place; hit: GlobeHit }) {
  return (
    <div
      className="pointer-events-none absolute z-10 w-56 -translate-x-1/2 -translate-y-[calc(100%+0.85rem)] rounded-xl border-2 border-neutral-200 bg-white/95 p-3 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/95"
      style={{ left: hit.x, top: hit.y }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-['Schibsted_Grotesk'] text-sm font-semibold">{place.city}</span>
        <span className="text-[0.7rem] text-neutral-500 dark:text-neutral-400">{place.iata}</span>
      </div>
      <p className="mt-0.5 text-[0.625rem] uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
        {place.country} · {place.visits.length} {place.visits.length === 1 ? 'trip' : 'trips'}
      </p>
      <ul className="mt-2 flex flex-col gap-1 border-t border-neutral-200 pt-2 dark:border-neutral-800">
        {place.visits.map((visit) => (
          <li key={visit.id} className="flex items-baseline justify-between gap-2 text-[0.7rem]">
            <span className="tabular-nums">{visit.year}</span>
            <span className="text-neutral-500 dark:text-neutral-400">
              {visit.phase === 'resident' ? 'Home' : formatRange(visit)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Caption({ home, focused }: { home: DerivedTrip; focused: DerivedTrip | null }) {
  if (!focused || focused.id === home.id) {
    return (
      <span className="text-[0.7rem] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-500">
        Point at a row to fly the route
      </span>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm">
        <span className="text-neutral-500 dark:text-neutral-500">{HOME_CODE}</span>
        <span className="px-2 text-orange-500">→</span>
        <span className="font-semibold">{focused.iata}</span>
      </span>
      <span className="text-[0.7rem] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-500">
        {focused.city} · {routeKm(home.geo, focused).toLocaleString('en-US')} km
      </span>
    </div>
  );
}

export default function GlobePanel({
  trips,
  home,
  focused,
}: {
  trips: DerivedTrip[];
  home: DerivedTrip;
  focused: DerivedTrip | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hit, setHit] = useState<GlobeHit | null>(null);

  const places = useMemo(() => groupPlaces(trips), [trips]);
  const points: GlobePoint[] = useMemo(
    () => places.map((place) => ({ id: place.id, geo: place.geo })),
    [places]
  );
  const hovered = hit ? (places.find((place) => place.id === hit.id) ?? null) : null;

  const focus = useMemo(
    () => (focused && focused.id !== home.id ? { geo: focused.geo, via: focused.via } : null),
    [focused, home.id]
  );

  // Escape closes the expanded map, and the page behind it must not scroll.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [expanded]);

  const close = useCallback(() => {
    setExpanded(false);
    setHit(null);
  }, []);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950/60">
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
            Route map
          </span>
          <button type="button" onClick={() => setExpanded(true)} className={CONTROL}>
            Expand ⤢
          </button>
        </div>

        <Globe
          points={points}
          homeGeo={home.geo}
          focus={focus}
          interactive
          className="aspect-square w-full"
        />

        <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
          <Caption home={home} focused={focused} />
        </div>
      </div>

      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Route map"
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/70 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border-2 border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-100 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-900">
              <span className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
                Route map · {places.length} places
              </span>
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <button type="button" onClick={close} autoFocus className={CONTROL}>
                Close ✕
              </button>
            </div>

            <div className="relative">
              <Globe
                points={points}
                homeGeo={home.geo}
                focus={focus}
                interactive
                onHoverPoint={setHit}
                className="aspect-square max-h-[70vh] w-full"
              />
              {hovered && hit && <PlaceTooltip place={hovered} hit={hit} />}
            </div>

            <p className="border-t border-neutral-200 px-5 py-3 text-[0.7rem] uppercase tracking-[0.15em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
              Drag to spin · point at a marker for its trips
            </p>
          </div>
        </div>
      )}
    </>
  );
}
