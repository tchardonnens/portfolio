/**
 * Data + helpers for the /journey flight board.
 *
 * Everything the board renders is derived from the TRIPS array below, so
 * adding a place is a one-line edit: give it a date and it sorts itself into
 * Arrivals (past) or Departures (future) on its own.
 */

export type Continent =
  | 'Europe'
  | 'Asia'
  | 'North America'
  | 'South America'
  | 'Africa'
  | 'Oceania';

export type Trip = {
  /** Stable key, kebab-case. */
  id: string;
  city: string;
  country: string;
  /** Airport code, shown in the Flight column of Arrivals. */
  iata: string;
  continent: Continent;
  /** [longitude, latitude] — where the globe puts the marker. */
  geo: [number, number];
  /** YYYY-MM-DD. Drives sorting and which board the row lands on. */
  startDate: string;
  /** YYYY-MM-DD. Omit for a single day or an open-ended stay. */
  endDate?: string;
  /**
   * `resident` pins the row to the top of Arrivals with a live indicator.
   * `lived` is for somewhere you stayed a while but have since left.
   */
  status?: 'resident' | 'lived' | 'visited';
  /** Small line under the city, e.g. "France · Home". Defaults to the country. */
  region?: string;
  /** One line shown in the Now Boarding panel. */
  note?: string;
  /** Optional link — makes the whole row clickable. */
  link?: string;
};

/** The year the board counts from, shown in the header stats. */
export const JOURNEY_SINCE = 2018;

/** Your IATA-ish code, used across the header and board titles. */
export const HOME_CODE = 'TCD';
export const HOME_NAME = 'THOMAS CHARDONNENS INTL';

// ─────────────────────────────────────────────────────────────────────────────
//  TRIPS
//
//  The first three are real. Everything below the SAMPLES marker is a
//  placeholder so the board looks populated in dev — replace or delete those
//  before you deploy. Order here does not matter; the board sorts by date.
// ─────────────────────────────────────────────────────────────────────────────
export const TRIPS: Trip[] = [
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    iata: 'CDG',
    continent: 'Europe',
    geo: [2.35, 48.86],
    startDate: `${JOURNEY_SINCE}-09-01`, // adjust to when you actually landed here
    status: 'resident',
    region: 'France · Home',
    note: 'Home base. Everything else on this board leaves from here.',
  },
  {
    id: 'berkeley-2023',
    city: 'Berkeley',
    country: 'United States',
    iata: 'SFO',
    continent: 'North America',
    geo: [-122.27, 37.87],
    startDate: '2023-08-14',
    endDate: '2023-12-15',
    status: 'lived',
    region: 'California · Semester abroad',
    note: 'A semester at UC Berkeley — the reason Plane Buddy exists.',
    link: 'https://plane-buddy.vercel.app/',
  },
  {
    id: 'seoul-2024',
    city: 'Seoul',
    country: 'South Korea',
    iata: 'ICN',
    continent: 'Asia',
    geo: [126.98, 37.57],
    startDate: '2024-05-04', // check the real dates
    endDate: '2024-05-18',
    region: 'South Korea',
    note: 'Two weeks of Korean food, which I have been talking about ever since.',
  },

  // ─── SAMPLES — replace these with your own trips ──────────────────────────
  {
    id: 'lisbon-2022',
    city: 'Lisbon',
    country: 'Portugal',
    iata: 'LIS',
    continent: 'Europe',
    geo: [-9.14, 38.72],
    startDate: '2022-04-08',
    endDate: '2022-04-13',
    region: 'Portugal',
  },
  {
    id: 'rome-2023',
    city: 'Rome',
    country: 'Italy',
    iata: 'FCO',
    continent: 'Europe',
    geo: [12.5, 41.9],
    startDate: '2023-03-02',
    endDate: '2023-03-06',
    region: 'Italy',
  },
  {
    id: 'tokyo-2025',
    city: 'Tokyo',
    country: 'Japan',
    iata: 'HND',
    continent: 'Asia',
    geo: [139.69, 35.69],
    startDate: '2025-04-11',
    endDate: '2025-04-24',
    region: 'Japan',
  },
  {
    id: 'marrakech-2025',
    city: 'Marrakech',
    country: 'Morocco',
    iata: 'RAK',
    continent: 'Africa',
    geo: [-7.98, 31.63],
    startDate: '2025-11-06',
    endDate: '2025-11-10',
    region: 'Morocco',
  },
  {
    id: 'lisbon-2026',
    city: 'Porto',
    country: 'Portugal',
    iata: 'OPO',
    continent: 'Europe',
    geo: [-8.61, 41.15],
    startDate: '2026-10-09',
    endDate: '2026-10-13',
    region: 'Portugal · Long weekend',
    note: 'Four days, no plan beyond the list of places to eat.',
  },
  {
    id: 'seoul-2026',
    city: 'Seoul',
    country: 'South Korea',
    iata: 'ICN',
    continent: 'Asia',
    geo: [126.98, 37.57],
    startDate: '2026-12-19',
    endDate: '2027-01-03',
    region: 'South Korea · Round two',
    note: 'Going back in winter this time.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  Derivation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Where a trip sits relative to `today`:
 *  - resident  : where you live now
 *  - scheduled : still in the future
 *  - boarding  : starts today
 *  - enroute   : you are there right now
 *  - landed    : done
 */
export type Phase = 'resident' | 'scheduled' | 'boarding' | 'enroute' | 'landed';

export type DerivedTrip = Trip & {
  phase: Phase;
  /** Days until departure; 0 once it has started. */
  daysAway: number;
  /** Nights on the ground, 0 for a single day or an open-ended stay. */
  nights: number;
  /** Fake-but-consistent flight number, e.g. "TC 0814". */
  flight: string;
  year: number;
};

const MS_PER_DAY = 86_400_000;

/** Parses YYYY-MM-DD as UTC so the result never shifts with the timezone. */
const parseISO = (iso: string): number => Date.parse(`${iso}T00:00:00Z`);

const daysBetween = (fromISO: string, toISO: string): number =>
  Math.round((parseISO(toISO) - parseISO(fromISO)) / MS_PER_DAY);

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const pad2 = (n: number): string => String(n).padStart(2, '0');

/** "2023-08-14" → "14 AUG" */
export const formatDay = (iso: string): string => {
  const d = new Date(parseISO(iso));
  return `${pad2(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]}`;
};

/** "2023-08-14" + "2023-12-15" → "14 AUG – 15 DEC", collapsing a shared month. */
export const formatRange = (trip: Trip): string => {
  if (!trip.endDate || trip.endDate === trip.startDate) return formatDay(trip.startDate);
  const start = new Date(parseISO(trip.startDate));
  const end = new Date(parseISO(trip.endDate));
  if (
    start.getUTCMonth() === end.getUTCMonth() &&
    start.getUTCFullYear() === end.getUTCFullYear()
  ) {
    return `${pad2(start.getUTCDate())}–${pad2(end.getUTCDate())} ${MONTHS[start.getUTCMonth()]}`;
  }
  return `${formatDay(trip.startDate)} – ${formatDay(trip.endDate)}`;
};

/** "MON 17 AUG", for the header. */
export const formatHeaderDate = (iso: string): string => {
  const d = new Date(parseISO(iso));
  return `${DAYS[d.getUTCDay()]} ${pad2(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]}`;
};

const flightNumber = (trip: Trip): string => `TC ${trip.startDate.slice(5).replace('-', '')}`;

const EARTH_RADIUS_KM = 6371;

/** Great-circle distance between two [lon, lat] pairs, in kilometres. */
export const distanceKm = (from: [number, number], to: [number, number]): number => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const [lon1, lat1] = from;
  const [lon2, lat2] = to;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a)));
};

const phaseOf = (trip: Trip, todayISO: string): Phase => {
  if (trip.status === 'resident') return 'resident';
  const end = trip.endDate ?? trip.startDate;
  if (todayISO > end) return 'landed';
  if (todayISO === trip.startDate) return 'boarding';
  if (todayISO > trip.startDate) return 'enroute';
  return 'scheduled';
};

export const derive = (trip: Trip, todayISO: string): DerivedTrip => {
  const end = trip.endDate ?? trip.startDate;
  return {
    ...trip,
    phase: phaseOf(trip, todayISO),
    daysAway: Math.max(0, daysBetween(todayISO, trip.startDate)),
    nights: trip.endDate ? Math.max(0, daysBetween(trip.startDate, end)) : 0,
    flight: flightNumber(trip),
    year: Number(trip.startDate.slice(0, 4)),
  };
};

export type JourneyBoards = {
  /** Future trips, soonest first. */
  departures: DerivedTrip[];
  /** Everything already flown, newest first, with the resident row pinned on top. */
  arrivals: DerivedTrip[];
  /** Arrivals bucketed by year, newest year first — one group per board divider. */
  arrivalsByYear: { year: number; trips: DerivedTrip[] }[];
  /** The next departure, or the trip you are on right now. */
  nextUp: DerivedTrip | null;
  /** Where you are now. */
  home: DerivedTrip | null;
  stats: { cities: number; countries: number; continents: number; since: number };
};

const uniqueCount = <T>(items: T[], key: (item: T) => string): number =>
  new Set(items.map(key)).size;

export const buildBoards = (todayISO: string, trips: Trip[] = TRIPS): JourneyBoards => {
  const derived = trips.map((trip) => derive(trip, todayISO));

  const departures = derived
    .filter((t) => t.phase === 'scheduled' || t.phase === 'boarding')
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  const home = derived.find((t) => t.phase === 'resident') ?? null;

  const landed = derived
    .filter((t) => t.phase === 'landed' || t.phase === 'enroute')
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  const arrivals = home ? [home, ...landed] : landed;

  const arrivalsByYear: { year: number; trips: DerivedTrip[] }[] = [];
  for (const trip of landed) {
    const group = arrivalsByYear.at(-1);
    if (group && group.year === trip.year) group.trips.push(trip);
    else arrivalsByYear.push({ year: trip.year, trips: [trip] });
  }

  const nextUp = derived.find((t) => t.phase === 'enroute') ?? departures[0] ?? null;

  return {
    departures,
    arrivals,
    arrivalsByYear,
    nextUp,
    home,
    stats: {
      cities: uniqueCount(derived, (t) => t.city),
      countries: uniqueCount(derived, (t) => t.country),
      continents: uniqueCount(derived, (t) => t.continent),
      since: JOURNEY_SINCE,
    },
  };
};
