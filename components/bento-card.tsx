'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

interface BentoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  tags?: string[];
  linkProd?: string;
  linkRepo?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  gradient?: boolean;
  delay?: number;
}

export default function BentoCard({
  title,
  description,
  icon,
  tags = [],
  linkProd,
  linkRepo,
  className = '',
  size = 'medium',
  gradient = false,
  delay = 0,
}: BentoCardProps) {
  const sizeClasses = {
    small: 'md:col-span-1',
    medium: 'md:col-span-1',
    large: 'md:col-span-2',
    full: 'md:col-span-3',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/50 ${sizeClasses[size]} ${className}`}
      whileHover={{ y: -4 }}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ padding: '1px' }}>
        <div className="h-full w-full rounded-3xl bg-white dark:bg-neutral-900" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          {icon && (
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              gradient 
                ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white' 
                : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
            }`}>
              {icon}
            </div>
          )}
          
          {/* Links */}
          <div className="flex gap-2">
            {linkRepo && (
              <motion.a
                href={linkRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-4 w-4" />
              </motion.a>
            )}
            {linkProd && (
              <motion.a
                href={linkProd}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="mb-2 font-display text-lg font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="mb-4 flex-grow text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
