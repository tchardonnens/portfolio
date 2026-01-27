import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export default function GradientText({
  children,
  className = '',
  from = 'from-orange-500',
  via = 'via-pink-500',
  to = 'to-violet-500',
}: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
