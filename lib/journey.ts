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

/**
 * How much of the date is actually known. The board never renders more
 * precision than it has: a 'year' trip shows "2019", never an invented day.
 */
export type Precision = 'day' | 'month' | 'year';

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
  /**
   * Where this leg took off from, when it was not home. Leave it off and the
   * route is drawn from Paris, which is true of almost everything here.
   */
  origin?: { code: string; city: string; geo: [number, number] };
  /**
   * Waypoints the route passes through, as [lon, lat]. Leave this off and the
   * globe draws the great circle, which is what aircraft actually fly on most
   * routes. Set it for the ones where airspace pushes the real track off the
   * direct line — these are approximate published routings, not recorded tracks.
   */
  via?: [number, number][];
  /** YYYY-MM-DD. Drives sorting and which board the row lands on. */
  startDate: string;
  /** YYYY-MM-DD. Omit for a single day or an open-ended stay. */
  endDate?: string;
  /** Defaults to 'day'. Set it lower and the board rounds what it prints. */
  precision?: Precision;
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
export const JOURNEY_SINCE = 2006;

/** Your IATA-ish code, used across the header and board titles. */
export const HOME_CODE = 'TCD';
export const HOME_NAME = 'THOMAS CHARDONNENS INTL';

// ─────────────────────────────────────────────────────────────────────────────
//  Routings
//
//  Since 2022 nothing westbound-to-Asia crosses Russia, so the real tracks bow
//  a long way south of the great circle. These are approximate published
//  routings — close enough to be honest, not recorded ADS-B traces.
// ─────────────────────────────────────────────────────────────────────────────
const VIA_KOREA: [number, number][] = [
  [19.0, 47.5], // Hungary
  [33.0, 40.0], // central Türkiye
  [52.0, 40.5], // Caspian / Turkmenistan
  [67.0, 42.5], // Uzbekistan
  [87.0, 44.0], // Ürümqi, Xinjiang
  [110.0, 41.5], // Inner Mongolia
];

const VIA_SHANGHAI: [number, number][] = [
  [19.0, 47.5], // Hungary
  [33.0, 40.0], // central Türkiye
  [52.0, 40.5], // Caspian / Turkmenistan
  [67.0, 42.5], // Uzbekistan
  [87.0, 43.0], // Xinjiang
  [103.0, 37.0], // Gansu corridor
];

const VIA_HONG_KONG: [number, number][] = [
  [19.0, 47.5], // Hungary
  [33.0, 40.0], // central Türkiye
  [52.0, 40.0], // Caspian / Turkmenistan
  [67.0, 41.0], // Uzbekistan
  [82.0, 38.5], // Tarim basin
  [99.0, 31.0], // western Sichuan
];

const PARIS: [number, number] = [2.35, 48.86];
const PAPEETE: [number, number] = [-149.57, -17.55];
const SHANGHAI: [number, number] = [121.47, 31.23];

// ─────────────────────────────────────────────────────────────────────────────
//  TRIPS
//
//  Listed oldest first; the board sorts itself. Most of these carry only a
//  year, which is all that was recorded — set `precision: 'month'` or drop it
//  entirely (defaulting to 'day') as you pin the real dates down, and the
//  board starts printing them without any other change.
// ─────────────────────────────────────────────────────────────────────────────
export const TRIPS: Trip[] = [
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    iata: 'CDG',
    continent: 'Europe',
    geo: PARIS,
    startDate: '2009-01-01',
    precision: 'year',
    status: 'resident',
    region: 'France · Home',
    note: 'Home base. Everything else on this board leaves from here.',
  },

  // ─── 2006–2009 · the Pacific years ────────────────────────────────────────
  {
    id: 'papeete-2006',
    city: 'Papeete',
    country: 'French Polynesia',
    iata: 'PPT',
    continent: 'Oceania',
    geo: PAPEETE,
    via: [[-118.4, 33.94]], // the long way west, through Los Angeles
    startDate: '2006-01-01',
    endDate: '2009-01-01',
    precision: 'year',
    status: 'lived',
    region: 'Tahiti · Lived there',
    note: 'Three years in the South Pacific, and the reason for everything below.',
  },
  {
    id: 'sydney-2007',
    city: 'Sydney',
    country: 'Australia',
    iata: 'SYD',
    continent: 'Oceania',
    geo: [151.21, -33.87],
    origin: { code: 'PPT', city: 'Papeete', geo: PAPEETE },
    via: [[174.76, -36.85]], // Auckland
    startDate: '2007-01-01',
    precision: 'year',
    region: 'Australia · From Tahiti',
  },
  {
    id: 'san-diego-2009',
    city: 'San Diego',
    country: 'United States',
    iata: 'SAN',
    continent: 'North America',
    geo: [-117.16, 32.72],
    origin: { code: 'PPT', city: 'Papeete', geo: PAPEETE },
    startDate: '2009-01-01',
    precision: 'year',
    region: 'California · From Tahiti',
  },
  {
    id: 'new-york-2009',
    city: 'New York',
    country: 'United States',
    iata: 'JFK',
    continent: 'North America',
    geo: [-74.01, 40.71],
    startDate: '2009-01-01',
    precision: 'year',
    region: 'New York · The way home',
  },

  // ─── Europe ───────────────────────────────────────────────────────────────
  {
    id: 'london-2015',
    city: 'London',
    country: 'United Kingdom',
    iata: 'LHR',
    continent: 'Europe',
    geo: [-0.13, 51.51],
    startDate: '2015-01-01',
    precision: 'year',
    region: 'United Kingdom',
  },
  {
    id: 'dublin-2016',
    city: 'Dublin',
    country: 'Ireland',
    iata: 'DUB',
    continent: 'Europe',
    geo: [-6.26, 53.35],
    startDate: '2016-01-01',
    precision: 'year',
    region: 'Ireland',
  },
  {
    id: 'dublin-2017',
    city: 'Dublin',
    country: 'Ireland',
    iata: 'DUB',
    continent: 'Europe',
    geo: [-6.26, 53.35],
    startDate: '2017-01-01',
    precision: 'year',
    region: 'Ireland · Again',
  },
  {
    id: 'fort-de-france-2017',
    city: 'Fort-de-France',
    country: 'Martinique',
    iata: 'FDF',
    continent: 'North America',
    geo: [-61.07, 14.6],
    startDate: '2017-01-01',
    precision: 'year',
    region: 'Martinique · Caribbean',
  },
  {
    id: 'miami-2018',
    city: 'Miami',
    country: 'United States',
    iata: 'MIA',
    continent: 'North America',
    geo: [-80.19, 25.76],
    startDate: '2018-01-01',
    precision: 'year',
    region: 'Florida',
  },
  {
    id: 'lisbon-2019',
    city: 'Lisbon',
    country: 'Portugal',
    iata: 'LIS',
    continent: 'Europe',
    geo: [-9.14, 38.72],
    startDate: '2019-01-01',
    precision: 'year',
    region: 'Portugal',
  },
  {
    id: 'venice-2019',
    city: 'Venice',
    country: 'Italy',
    iata: 'VCE',
    continent: 'Europe',
    geo: [12.34, 45.44],
    startDate: '2019-01-01',
    precision: 'year',
    region: 'Italy',
  },
  {
    id: 'bastia-2019',
    city: 'Bastia',
    country: 'France',
    iata: 'BIA',
    continent: 'Europe',
    geo: [9.45, 42.7],
    startDate: '2019-01-01',
    precision: 'year',
    region: 'Corsica',
  },
  {
    id: 'athens-2021',
    city: 'Athens',
    country: 'Greece',
    iata: 'ATH',
    continent: 'Europe',
    geo: [23.73, 37.98],
    startDate: '2021-01-01',
    precision: 'year',
    region: 'Greece',
  },

  // ─── California ───────────────────────────────────────────────────────────
  {
    id: 'san-francisco-2022',
    city: 'San Francisco',
    country: 'United States',
    iata: 'SFO',
    continent: 'North America',
    geo: [-122.42, 37.77],
    startDate: '2022-01-01',
    precision: 'year',
    region: 'California',
  },
  {
    id: 'san-francisco-2023',
    city: 'San Francisco',
    country: 'United States',
    iata: 'SFO',
    continent: 'North America',
    geo: [-122.42, 37.77],
    startDate: '2023-08-01',
    endDate: '2023-12-01',
    precision: 'month',
    status: 'lived',
    region: 'Berkeley · Exchange semester',
    note: 'Four months at UC Berkeley — the reason Plane Buddy exists.',
    link: 'https://plane-buddy.vercel.app/',
  },

  // ─── Asia ─────────────────────────────────────────────────────────────────
  {
    id: 'seoul-2024-first',
    city: 'Seoul',
    country: 'South Korea',
    iata: 'ICN',
    continent: 'Asia',
    geo: [126.98, 37.57],
    via: VIA_KOREA,
    startDate: '2024-01-01',
    precision: 'year',
    region: 'South Korea · First time',
  },
  {
    id: 'seoul-2024-second',
    city: 'Seoul',
    country: 'South Korea',
    iata: 'ICN',
    continent: 'Asia',
    geo: [126.98, 37.57],
    via: VIA_KOREA,
    startDate: '2024-01-01',
    precision: 'year',
    region: 'South Korea · Straight back',
  },
  {
    id: 'shanghai-2025',
    city: 'Shanghai',
    country: 'China',
    iata: 'PVG',
    continent: 'Asia',
    geo: SHANGHAI,
    via: VIA_SHANGHAI,
    startDate: '2025-01-01',
    precision: 'year',
    region: 'China',
  },
  {
    id: 'taipei-2025',
    city: 'Taipei',
    country: 'Taiwan',
    iata: 'TPE',
    continent: 'Asia',
    geo: [121.56, 25.03],
    origin: { code: 'PVG', city: 'Shanghai', geo: SHANGHAI },
    startDate: '2025-01-01',
    precision: 'year',
    region: 'Taiwan · Out of Shanghai',
  },
  {
    id: 'london-2025',
    city: 'London',
    country: 'United Kingdom',
    iata: 'LHR',
    continent: 'Europe',
    geo: [-0.13, 51.51],
    startDate: '2025-01-01',
    precision: 'year',
    region: 'United Kingdom · Again',
  },
  {
    id: 'seoul-2025',
    city: 'Seoul',
    country: 'South Korea',
    iata: 'ICN',
    continent: 'Asia',
    geo: [126.98, 37.57],
    via: VIA_KOREA,
    startDate: '2025-01-01',
    precision: 'year',
    region: 'South Korea · Third run',
  },

  // ─── Upcoming ─────────────────────────────────────────────────────────────
  {
    id: 'hong-kong-2026',
    city: 'Hong Kong',
    country: 'Hong Kong',
    iata: 'HKG',
    continent: 'Asia',
    geo: [114.17, 22.32],
    via: VIA_HONG_KONG,
    // Only the month is known. The days are placeholders that keep the trip on
    // the Departures board and are never printed — swap in the real ones and
    // drop `precision` to have the board count down to them properly.
    startDate: '2026-08-20',
    endDate: '2026-08-30',
    precision: 'month',
    region: 'First time · Booked',
    note: 'Twelve hours the long way round Russia, and a first look at Hong Kong.',
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
  /** Nights on the ground, 0 unless the exact dates are known. */
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

export const precisionOf = (trip: Trip): Precision => trip.precision ?? 'day';

/** "2023-08-14" → "14 AUG" */
export const formatDay = (iso: string): string => {
  const d = new Date(parseISO(iso));
  return `${pad2(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]}`;
};

/** The departure cell: as much of the start date as is actually known. */
export const formatStart = (trip: Trip): string => {
  const d = new Date(parseISO(trip.startDate));
  const precision = precisionOf(trip);
  if (precision === 'year') return String(d.getUTCFullYear());
  if (precision === 'month') return MONTHS[d.getUTCMonth()];
  return formatDay(trip.startDate);
};

/**
 * The arrival cell. "14 AUG – 15 DEC" when the days are known, "AUG – DEC" or
 * just "2019" when they are not — the year divider above the row carries the
 * rest, so nothing here has to be invented to fill the column.
 */
export const formatRange = (trip: Trip): string => {
  const precision = precisionOf(trip);
  const start = new Date(parseISO(trip.startDate));
  const end = trip.endDate ? new Date(parseISO(trip.endDate)) : null;
  const sameYear = end ? start.getUTCFullYear() === end.getUTCFullYear() : true;

  if (precision === 'year') {
    if (end && !sameYear) return `${start.getUTCFullYear()} – ${end.getUTCFullYear()}`;
    return String(start.getUTCFullYear());
  }

  if (precision === 'month') {
    const from = MONTHS[start.getUTCMonth()];
    if (!end) return from;
    const to = MONTHS[end.getUTCMonth()];
    if (from === to && sameYear) return from;
    return sameYear ? `${from} – ${to}` : `${from} ${start.getUTCFullYear()} – ${to}`;
  }

  if (!trip.endDate || trip.endDate === trip.startDate) return formatDay(trip.startDate);
  if (end && start.getUTCMonth() === end.getUTCMonth() && sameYear) {
    return `${pad2(start.getUTCDate())}–${pad2(end.getUTCDate())} ${MONTHS[start.getUTCMonth()]}`;
  }
  return `${formatDay(trip.startDate)} – ${formatDay(trip.endDate)}`;
};

/** "MON 17 AUG", for the header. */
export const formatHeaderDate = (iso: string): string => {
  const d = new Date(parseISO(iso));
  return `${DAYS[d.getUTCDay()]} ${pad2(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]}`;
};

/**
 * A flight number that stays put across builds. Day-precise trips get one from
 * their date; the rest get a hash of their id, because half the board would
 * otherwise be flight TC 0101.
 */
const flightNumber = (trip: Trip): string => {
  if (precisionOf(trip) === 'day') return `TC ${trip.startDate.slice(5).replace('-', '')}`;
  let hash = 0;
  for (let i = 0; i < trip.id.length; i += 1) hash = (hash * 31 + trip.id.charCodeAt(i)) % 9000;
  return `TC ${pad2(hash + 1000)}`;
};

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

/** A city on the globe, with every trip that landed there. */
export type Place = {
  /** Stable key for the city. */
  id: string;
  city: string;
  country: string;
  iata: string;
  geo: [number, number];
  /** Trips to this city, most recent first. */
  visits: DerivedTrip[];
};

/**
 * One marker per city rather than per trip — going back to Seoul should light
 * up the same point, not stack a second one on top of it.
 */
export const groupPlaces = (trips: DerivedTrip[]): Place[] => {
  const places = new Map<string, Place>();
  for (const trip of trips) {
    const id = `${trip.city}·${trip.country}`;
    const existing = places.get(id);
    if (existing) existing.visits.push(trip);
    else
      places.set(id, {
        id,
        city: trip.city,
        country: trip.country,
        iata: trip.iata,
        geo: trip.geo,
        visits: [trip],
      });
  }
  const grouped = Array.from(places.values());
  grouped.forEach((place) => {
    place.visits.sort((a, b) => b.startDate.localeCompare(a.startDate));
  });
  return grouped;
};

/** Where a leg took off from — home, unless the trip says otherwise. */
export const originGeo = (trip: Trip, homeGeo: [number, number]): [number, number] =>
  trip.origin?.geo ?? homeGeo;

/**
 * Distance actually flown: the sum of the legs through any waypoints, so a
 * route bent around closed airspace reports the longer figure it really is.
 */
export const routeKm = (from: [number, number], trip: Trip): number => {
  const legs = [from, ...(trip.via ?? []), trip.geo];
  return legs.slice(0, -1).reduce((total, point, i) => total + distanceKm(point, legs[i + 1]), 0);
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
  const exact = precisionOf(trip) === 'day';
  return {
    ...trip,
    phase: phaseOf(trip, todayISO),
    daysAway: Math.max(0, daysBetween(todayISO, trip.startDate)),
    // Counting nights off a date we rounded to the month would be fiction.
    nights: trip.endDate && exact ? Math.max(0, daysBetween(trip.startDate, end)) : 0,
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

  // Year-only trips inside the same year all sort equal, so the stable sort
  // leaves them in the order TRIPS lists them.
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
