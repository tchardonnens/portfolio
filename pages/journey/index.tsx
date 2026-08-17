import type { GetStaticProps } from 'next';
import { useState } from 'react';
import CustomHead from '../../components/head';
import FlightBoard, { BoardColumn, BoardRow } from '../../components/journey/flight-board';
import GatePanel from '../../components/journey/gate-panel';
import GlobePanel from '../../components/journey/globe-panel';
import TerminalHeader from '../../components/journey/terminal-header';
import {
  DerivedTrip,
  HOME_CODE,
  HOME_NAME,
  buildBoards,
  formatRange,
  formatStart,
  precisionOf,
} from '../../lib/journey';

type Props = { todayISO: string };

/**
 * The date is resolved at build time and passed down, so the server and the
 * browser agree on which trips are past and which are upcoming. Revalidating
 * hourly keeps the board honest without a rebuild.
 */
export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { todayISO: new Date().toISOString().slice(0, 10) },
  revalidate: 3600,
});

const DEPARTURE_COLUMNS: BoardColumn[] = [
  { label: 'Departs' },
  { label: 'Destination' },
  { label: 'Flight', className: 'hidden sm:block' },
  { label: 'Remarks' },
];

const ARRIVAL_COLUMNS: BoardColumn[] = [
  { label: 'Arrived' },
  { label: 'From' },
  { label: 'Flight', className: 'hidden sm:block' },
  { label: 'Remarks' },
];

const WHEN = 'tabular-nums text-sm text-neutral-800 dark:text-neutral-100';
const CITY = "truncate font-['Schibsted_Grotesk'] text-sm font-semibold";
const FLIGHT = 'hidden text-sm tabular-nums text-neutral-500 dark:text-neutral-400 sm:block';
const STATUS = 'text-[0.7rem] uppercase tracking-[0.15em]';

const STATUS_STYLES: Record<string, string> = {
  ontime: 'text-emerald-600 dark:text-emerald-400',
  boarding: 'text-orange-500',
  enroute: 'text-orange-500',
  landed: 'text-neutral-500 dark:text-neutral-500',
  live: 'text-orange-500',
};

const departureStatus = (trip: DerivedTrip): { text: string; kind: string; sub?: string } => {
  if (trip.phase === 'boarding') return { text: 'Boarding', kind: 'boarding' };
  if (trip.phase === 'enroute') return { text: 'En route', kind: 'enroute' };
  // A countdown off a date rounded to the month would be made up to the day.
  const sub = precisionOf(trip) === 'day' ? `in ${trip.daysAway}d` : undefined;
  return { text: 'On time', kind: 'ontime', sub };
};

const toDepartureRow = (trip: DerivedTrip): BoardRow => {
  const status = departureStatus(trip);
  return {
    key: trip.id,
    href: trip.link,
    cells: [
      { content: formatStart(trip), className: WHEN },
      { content: trip.city, className: CITY, sub: trip.region ?? trip.country },
      { content: trip.flight, className: FLIGHT },
      {
        content: trip.link ? `${status.text} →` : status.text,
        className: `${STATUS} ${STATUS_STYLES[status.kind]}`,
        sub: status.sub,
      },
    ],
  };
};

const toArrivalRow = (trip: DerivedTrip): BoardRow => {
  const live = trip.phase === 'resident';
  const enroute = trip.phase === 'enroute';
  const remark = live ? 'Live · Home' : enroute ? 'On the ground' : 'Arrived';
  const kind = live ? 'live' : enroute ? 'enroute' : 'landed';

  return {
    key: trip.id,
    href: trip.link,
    live,
    cells: [
      { content: live ? 'Now' : formatRange(trip), className: WHEN },
      { content: trip.city, className: CITY, sub: trip.region ?? trip.country },
      { content: trip.iata, className: FLIGHT },
      {
        content: trip.link ? `${remark} →` : remark,
        className: `${STATUS} ${STATUS_STYLES[kind]}`,
        sub: trip.nights ? `${trip.nights} nights` : undefined,
        flap: !live,
      },
    ],
  };
};

function SectionTitle({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="font-['Schibsted_Grotesk'] text-2xl font-semibold">{title}</h2>
      <span className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
        {tag}
      </span>
    </div>
  );
}

export default function Journey({ todayISO }: Props) {
  const boards = buildBoards(todayISO);
  const { departures, arrivals, arrivalsByYear, home, nextUp } = boards;
  const [focusId, setFocusId] = useState<string | null>(null);

  const arrivalRows: BoardRow[] = [];
  if (home) arrivalRows.push(toArrivalRow(home));
  for (const group of arrivalsByYear) {
    arrivalRows.push({ key: `year-${group.year}`, divider: `${group.year}` });
    for (const trip of group.trips) arrivalRows.push(toArrivalRow(trip));
  }

  const everywhere = [...departures, ...arrivals];
  const focused = everywhere.find((trip) => trip.id === focusId) ?? null;

  return (
    <>
      <CustomHead
        title="Journey - Thomas Chardonnens"
        description="A departures and arrivals board of everywhere I have been, and where I am headed next."
      />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col bg-neutral-50 px-4 pb-20 pt-8 font-['JetBrains_Mono'] text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
        <TerminalHeader boards={boards} todayISO={todayISO} />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex flex-col gap-14">
            <section>
              <SectionTitle title="Departures" tag="Where I am headed" />
              <FlightBoard
                title={`${HOME_CODE} · ${HOME_NAME}`}
                columns={DEPARTURE_COLUMNS}
                rows={departures.map(toDepartureRow)}
                ariaLabel="Departures board"
                emptyLabel="No departures scheduled"
                activeKey={focusId}
                onFocusRow={setFocusId}
              />
            </section>

            {nextUp && (
              <section>
                <SectionTitle title="Now Boarding" tag="Gate detail" />
                <GatePanel trip={nextUp} />
              </section>
            )}

            <section>
              <SectionTitle title="Arrivals" tag="Everywhere I have landed" />
              <FlightBoard
                title={`${HOME_CODE} · ${HOME_NAME}`}
                columns={ARRIVAL_COLUMNS}
                rows={arrivalRows}
                ariaLabel="Arrivals board"
                emptyLabel="No arrivals logged"
                activeKey={focusId}
                onFocusRow={setFocusId}
              />
            </section>
          </div>

          {/* Sticky, so the globe stays in view while you run down the boards. */}
          {home && (
            <div className="order-first lg:sticky lg:top-8 lg:order-none">
              <GlobePanel trips={everywhere} home={home} focused={focused} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
