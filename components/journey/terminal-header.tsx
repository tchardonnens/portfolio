import Link from 'next/link';
import LiveClock from './live-clock';
import {
  DerivedTrip,
  HOME_CODE,
  HOME_NAME,
  JourneyBoards,
  formatHeaderDate,
} from '../../lib/journey';

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <span className="whitespace-nowrap">
      <b className="font-semibold text-neutral-800 dark:text-neutral-100">{value}</b>{' '}
      <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
    </span>
  );
}

const Separator = () => (
  <span aria-hidden="true" className="h-3 w-px bg-neutral-300 dark:bg-neutral-700" />
);

/** "NEXT UP: PORTO ✦ SEOUL", the strip that scrolls across the bottom. */
const tickerText = (departures: DerivedTrip[], home: DerivedTrip | null): string => {
  const parts = ['EVERYWHERE THE ROAD HAS GONE'];
  if (home) parts.push(`BASED IN ${home.city.toUpperCase()}`);
  if (departures.length) {
    parts.push(
      `NEXT UP: ${departures
        .slice(0, 3)
        .map((t) => t.city.toUpperCase())
        .join(' ✦ ')}`
    );
  }
  return `${parts.join(' ✦ ')} ✦ `;
};

export default function TerminalHeader({
  boards,
  todayISO,
}: {
  boards: JourneyBoards;
  todayISO: string;
}) {
  const { stats, home, departures } = boards;
  const ticker = tickerText(departures, home);

  return (
    <header className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-neutral-200 pb-3 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-500">
        <span>
          {HOME_NAME} <span className="text-orange-500">· {HOME_CODE}</span>
        </span>
        <span className="flex items-center gap-3">
          <LiveClock className="tabular-nums text-neutral-700 dark:text-neutral-300" />
          <span>{formatHeaderDate(todayISO)}</span>
        </span>
      </div>

      <p className="mt-10 text-center text-[0.7rem] uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-500">
        The travel index
      </p>
      <h1 className="mt-3 text-center font-['Schibsted_Grotesk'] text-4xl font-semibold sm:text-5xl">
        Journeys<span className="text-orange-500">.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Every place I have landed in, and the ones I have not flown to yet.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs">
        <Stat value={stats.cities} label="Cities" />
        <Separator />
        <Stat value={stats.countries} label="Countries" />
        <Separator />
        <Stat value={stats.continents} label="Continents" />
        <Separator />
        <Stat value={`Since ${stats.since}`} label="" />
        {home && (
          <>
            <Separator />
            <span className="flex items-center gap-2 whitespace-nowrap text-neutral-500 dark:text-neutral-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
              </span>
              Now in {home.city}
            </span>
          </>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-500 hover:text-orange-500 dark:text-neutral-500 dark:hover:text-orange-500"
        >
          ← Back to projects
        </Link>
      </div>

      <div
        aria-hidden="true"
        className="mt-10 flex overflow-hidden border-y border-neutral-200 py-2.5 dark:border-neutral-800"
      >
        <div className="journey-ticker flex shrink-0 gap-8 whitespace-nowrap pr-8 text-[0.7rem] uppercase tracking-[0.25em] text-neutral-400 dark:text-neutral-600">
          <span>{ticker}</span>
          <span>{ticker}</span>
        </div>
      </div>
    </header>
  );
}
