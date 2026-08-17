import { useEffect, useState } from 'react';
import { pad2 } from '../../lib/journey';

const now = () => {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
};

/**
 * Ticks in the viewer's own timezone. Renders a placeholder until mounted —
 * the server has no idea what time it is where you are, and rendering its
 * clock would trip a hydration mismatch.
 */
export default function LiveClock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(now());
    const id = window.setInterval(() => setTime(now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? '--:--:--'}
    </span>
  );
}
