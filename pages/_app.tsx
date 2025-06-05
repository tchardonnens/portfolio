import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
