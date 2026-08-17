import { DerivedTrip, HOME_CODE, formatRange, formatStart, precisionOf } from '../../lib/journey';

const countdown = (trip: DerivedTrip): string => {
  if (trip.phase === 'enroute') return 'In the air';
  if (trip.phase === 'boarding') return 'Boarding today';
  // Counting down to the day needs a date that is known to the day.
  if (precisionOf(trip) !== 'day') return `Departs ${formatStart(trip)}`;
  if (trip.daysAway === 1) return 'Departs tomorrow';
  return `Departs in ${trip.daysAway} days`;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[0.625rem] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
        {label}
      </span>
      <span className="text-sm text-neutral-800 dark:text-neutral-100">{value}</span>
    </div>
  );
}

/** The boarding-pass style panel for whatever is next on the board. */
export default function GatePanel({ trip }: { trip: DerivedTrip }) {
  return (
    <section
      aria-label="Next departure"
      className="overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white transition-colors duration-200 hover:border-orange-500 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-500"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-neutral-200 bg-neutral-100 px-5 py-3 dark:border-neutral-800 dark:bg-neutral-950/60">
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
          Boarding pass · {trip.flight}
        </span>
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-orange-500">
          {countdown(trip)}
        </span>
      </div>

      <div className="flex flex-col gap-6 px-5 py-6 sm:px-7">
        <div className="flex items-center gap-4">
          <span className="font-['Schibsted_Grotesk'] text-2xl font-semibold text-neutral-400 dark:text-neutral-600">
            {HOME_CODE}
          </span>
          <span
            aria-hidden="true"
            className="flex-1 border-t border-dashed border-neutral-300 dark:border-neutral-700"
          />
          <span aria-hidden="true" className="text-orange-500">
            ✈
          </span>
          <span
            aria-hidden="true"
            className="flex-1 border-t border-dashed border-neutral-300 dark:border-neutral-700"
          />
          <span className="font-['Schibsted_Grotesk'] text-2xl font-semibold">{trip.iata}</span>
        </div>

        <div>
          <h3 className="font-['Schibsted_Grotesk'] text-xl font-semibold">{trip.city}</h3>
          <p className="mt-1 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
            {trip.region ?? trip.country}
          </p>
        </div>

        {trip.note && (
          <p className="max-w-prose text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {trip.note}
          </p>
        )}

        <div className="grid grid-cols-2 gap-5 border-t border-neutral-200 pt-5 sm:grid-cols-4 dark:border-neutral-800">
          <Field label="Dates" value={formatRange(trip)} />
          <Field label="Nights" value={trip.nights ? String(trip.nights) : '—'} />
          <Field label="Flight" value={trip.flight} />
          <Field label="Continent" value={trip.continent} />
        </div>
      </div>
    </section>
  );
}
