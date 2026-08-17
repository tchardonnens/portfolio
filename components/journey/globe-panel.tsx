import dynamic from 'next/dynamic';
import type { GlobePoint } from './globe';
import { DerivedTrip, HOME_CODE, distanceKm } from '../../lib/journey';

// three.js is heavy and touches the DOM, so it stays out of the static build
// and only loads once the page is running in a browser.
const Globe = dynamic(() => import('./globe'), {
  ssr: false,
  loading: () => <div className="aspect-square w-full" />,
});

export default function GlobePanel({
  trips,
  home,
  focused,
}: {
  trips: DerivedTrip[];
  home: DerivedTrip;
  focused: DerivedTrip | null;
}) {
  const points: GlobePoint[] = trips.map((trip) => ({ id: trip.id, geo: trip.geo }));

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950/60">
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
          Route map
        </span>
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
          {trips.length} points
        </span>
      </div>

      <Globe
        points={points}
        homeGeo={home.geo}
        focusGeo={focused && focused.id !== home.id ? focused.geo : null}
        className="aspect-square w-full"
      />

      <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
        {focused && focused.id !== home.id ? (
          <div className="flex flex-col gap-1">
            <span className="text-sm">
              <span className="text-neutral-500 dark:text-neutral-500">{HOME_CODE}</span>
              <span className="px-2 text-orange-500">→</span>
              <span className="font-semibold">{focused.iata}</span>
            </span>
            <span className="text-[0.7rem] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-500">
              {focused.city} · {distanceKm(home.geo, focused.geo).toLocaleString('en-US')} km
            </span>
          </div>
        ) : (
          <span className="text-[0.7rem] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-500">
            Point at a row to fly the route
          </span>
        )}
      </div>
    </div>
  );
}
