'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

interface Experience {
  title: string;
  organization: string;
  organizationUrl: string;
  description: string;
  period?: string;
}

interface ExperienceCardProps {
  type: 'work' | 'education';
  items: Experience[];
  delay?: number;
}

export default function ExperienceCard({ type, items, delay = 0 }: ExperienceCardProps) {
  const Icon = type === 'work' ? Briefcase : GraduationCap;
  const title = type === 'work' ? 'Experience' : 'Education';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 text-orange-600 dark:text-orange-400">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-xl font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>
      </div>

      {/* Items */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.title + index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 * (index + 1) }}
            className="relative pl-6 last:pb-0"
          >
            {/* Timeline line */}
            {index !== items.length - 1 && (
              <div className="absolute bottom-0 left-[9px] top-6 w-px bg-neutral-200 dark:bg-neutral-800" />
            )}
            
            {/* Timeline dot */}
            <div className="absolute left-0 top-2 h-[18px] w-[18px] rounded-full border-2 border-white bg-gradient-to-r from-orange-500 to-pink-500 dark:border-neutral-900" />
            
            <div className="space-y-1">
              <h4 className="font-medium text-neutral-900 dark:text-white">
                {item.title}
              </h4>
              <a
                href={item.organizationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-orange-600 transition-colors hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
              >
                {item.organization}
              </a>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
              {item.period && (
                <span className="text-xs text-neutral-400 dark:text-neutral-600">
                  {item.period}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
