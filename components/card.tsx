import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa6';
import ServerIcon from './server-icon';
import WindowIcon from './window-icon';
import EarthIcon from './earth-icon';

type AccentColor = 'orange' | 'blue' | 'purple' | 'green' | 'pink';

type CardProps = {
  title?: string;
  description?: string;
  linkProd?: string;
  linkRepo?: string;
  backendStack?: string;
  frontendStack?: string;
  accent?: AccentColor;
  featured?: boolean;
  children?: React.ReactNode;
};

const accentColors = {
  orange: {
    gradient: 'from-orange-500 to-orange-600',
    glow: 'shadow-glow-orange',
    border: 'border-orange-500',
    bg: 'bg-orange-500/10',
  },
  blue: {
    gradient: 'from-blue-500 to-blue-600',
    glow: 'shadow-glow-blue',
    border: 'border-blue-500',
    bg: 'bg-blue-500/10',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-600',
    glow: 'shadow-glow-purple',
    border: 'border-purple-500',
    bg: 'bg-purple-500/10',
  },
  green: {
    gradient: 'from-green-500 to-green-600',
    glow: 'shadow-glow-green',
    border: 'border-green-500',
    bg: 'bg-green-500/10',
  },
  pink: {
    gradient: 'from-pink-500 to-pink-600',
    glow: 'shadow-glow-pink',
    border: 'border-pink-500',
    bg: 'bg-pink-500/10',
  },
};

const Card: React.FC<CardProps> = ({
  title = '',
  description = '',
  linkProd = '#',
  linkRepo = '#',
  backendStack = '',
  frontendStack = '',
  accent = 'orange',
  featured = false,
}) => {
  const colors = accentColors[accent];

  return (
    <motion.div
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: 2,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border-2 border-neutral-200 bg-white p-8 transition-all duration-300 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 ${
        featured ? `${colors.glow} hover:${colors.border}` : ''
      }`}
    >
      {/* Gradient Accent Bar - Top Edge */}
      <motion.div
        className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${colors.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />

      {/* Featured Badge */}
      {featured && (
        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full ${colors.bg} ${colors.border} border px-3 py-1 text-xs font-semibold`}
          >
            Featured
          </span>
        </div>
      )}

      {/* Glass-morphism Background Overlay on Hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
      />

      <div className="relative z-10 flex-1 space-y-4">
        <div className="flex flex-row">
          <h3 className="font-['Schibsted_Grotesk'] text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {description}
        </p>
      </div>

      {/* Tech Stack Badges */}
      <div className="relative z-10 space-y-3">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <ServerIcon />
          <div className="flex flex-wrap gap-2">
            {backendStack.split(',').map((tech, idx) => (
              <span
                key={idx}
                className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs text-neutral-800 dark:text-neutral-200"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center gap-2">
          <WindowIcon />
          <div className="flex flex-wrap gap-2">
            {frontendStack.split(',').map((tech, idx) => (
              <span
                key={idx}
                className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-neutral-800 dark:text-neutral-200"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-row justify-evenly gap-4">
        {linkProd !== '#' && (
          <a href={linkProd} target="_blank" rel="noopener noreferrer" className="w-1/2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r ${colors.gradient} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-xl`}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%', skewX: -20 }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <EarthIcon />
              <span className="relative">Visit</span>
            </motion.button>
          </a>
        )}

        {linkRepo !== '#' && (
          <a href={linkRepo} target="_blank" rel="noopener noreferrer" className="w-1/2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-100/50 px-6 py-3 text-sm font-semibold text-neutral-800 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-200"
            >
              <FaGithub className="text-lg" />
              <span>Code</span>
            </motion.button>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
