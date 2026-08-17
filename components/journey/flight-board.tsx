import React, { ReactNode } from 'react';

/** One cell of a board row. */
export type BoardCell = {
  content: ReactNode;
  className?: string;
  /** Small second line under the cell, e.g. the country under the city. */
  sub?: ReactNode;
  /** Set false to opt out of the split-flap animation (used for live dots). */
  flap?: boolean;
};

export type BoardColumn = {
  label: string;
  /** Extra classes, e.g. `hidden sm:block` to drop a column on mobile. */
  className?: string;
};

export type BoardRow =
  | { key: string; divider: string }
  | { key: string; cells: BoardCell[]; href?: string; live?: boolean };

const isDivider = (row: BoardRow): row is { key: string; divider: string } => 'divider' in row;

/**
 * Board rows are laid out as one grid so the header labels and every row stay
 * on the same columns. Mobile drops to three columns; the flight code hides.
 */
const GRID =
  'grid grid-cols-[4.5rem_minmax(0,1fr)_6.5rem] items-baseline gap-x-3 sm:grid-cols-[7.5rem_minmax(0,1fr)_5.5rem_8.5rem] sm:gap-x-5';

/** A cell that flips down into place, like a split-flap board. */
function Flap({
  children,
  delay,
  className = '',
}: {
  children: ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={`journey-flap ${className}`}
      style={{ '--flap-delay': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}

function Row({
  row,
  index,
  active,
  onFocusRow,
}: {
  row: Extract<BoardRow, { cells: BoardCell[] }>;
  index: number;
  active?: boolean;
  onFocusRow?: (key: string) => void;
}) {
  const content = row.cells.map((cell, column) => {
    // Stagger down the rows and across the columns, so the board fills in the
    // way a real one does rather than all at once.
    const delay = 0.12 + index * 0.05 + column * 0.06;
    const inner =
      cell.flap === false ? (
        <span className={cell.className}>{cell.content}</span>
      ) : (
        <Flap delay={delay} className={cell.className}>
          {cell.content}
        </Flap>
      );

    if (cell.sub == null) return <React.Fragment key={column}>{inner}</React.Fragment>;

    return (
      <span key={column} className="flex min-w-0 flex-col">
        {inner}
        <span className="truncate text-[0.625rem] uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
          {cell.sub}
        </span>
      </span>
    );
  });

  const className = [
    GRID,
    'border-t border-neutral-200 px-4 py-3.5 transition-colors duration-200 dark:border-neutral-800',
    active ? 'bg-orange-500/[0.06] shadow-[inset_2px_0_0_0_#f97316] dark:bg-orange-500/[0.08]' : '',
    row.live && !active
      ? 'bg-orange-500/[0.06] dark:bg-orange-500/[0.08]'
      : 'hover:bg-neutral-100 dark:hover:bg-neutral-900',
  ].join(' ');

  // Pointing at a row flies the globe to that destination. The route then stays
  // up until another row is pointed at, so there is no handler for leaving.
  // Focus mirrors hover so the globe follows keyboard navigation too.
  const handlers = onFocusRow && {
    onMouseEnter: () => onFocusRow(row.key),
    onFocus: () => onFocusRow(row.key),
  };

  if (row.href) {
    return (
      <a
        className={`${className} no-underline hover:!bg-orange-500/10 hover:no-underline`}
        href={row.href}
        target="_blank"
        rel="noopener noreferrer"
        {...handlers}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={className} tabIndex={onFocusRow ? 0 : undefined} {...handlers}>
      {content}
    </div>
  );
}

export default function FlightBoard({
  title,
  columns,
  rows,
  ariaLabel,
  emptyLabel = 'Nothing scheduled',
  activeKey,
  onFocusRow,
}: {
  title: string;
  columns: BoardColumn[];
  rows: BoardRow[];
  ariaLabel: string;
  emptyLabel?: string;
  /** The row whose route is currently on the globe. */
  activeKey?: string | null;
  /** Fires with a row key on hover or focus. Selection is sticky. */
  onFocusRow?: (key: string) => void;
}) {
  const body: BoardRow[] = rows.length
    ? rows
    : [{ key: 'empty', divider: emptyLabel } satisfies BoardRow];

  // Dividers do not animate, so they must not consume a stagger slot.
  let dataRowIndex = -1;

  return (
    <section
      aria-label={ariaLabel}
      className="overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950/60">
        <span className="truncate text-[0.7rem] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400">
          {title}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange-500" />
          </span>
          Live
        </span>
      </div>

      <div
        aria-hidden="true"
        className={`${GRID} border-b border-neutral-200 px-4 py-2 text-[0.625rem] uppercase tracking-[0.18em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-500`}
      >
        {columns.map((column) => (
          <span key={column.label} className={column.className}>
            {column.label}
          </span>
        ))}
      </div>

      <div>
        {body.map((row) => {
          if (isDivider(row)) {
            return (
              <div
                key={row.key}
                className="flex items-center gap-3 border-t border-neutral-200 px-4 py-2 text-[0.625rem] uppercase tracking-[0.25em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-500"
              >
                <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                {row.divider}
                <span className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              </div>
            );
          }
          dataRowIndex += 1;
          return (
            <Row
              key={row.key}
              row={row}
              index={dataRowIndex}
              active={row.key === activeKey}
              onFocusRow={onFocusRow}
            />
          );
        })}
      </div>
    </section>
  );
}
