import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'outline';
  delay?: number;
}

export default function Badge({
  children,
  className = '',
  variant = 'default',
  delay = 0,
}: BadgeProps) {
  const variants = {
    default: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
    gradient: 'bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-violet-500/10 text-neutral-700 dark:text-neutral-200 border border-orange-500/20',
    outline: 'border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
