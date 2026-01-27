import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // Initialize dark mode on mount to prevent flash
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950">
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
