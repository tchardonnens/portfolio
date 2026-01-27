'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import GradientText from './gradient-text';
import Badge from './badge';

interface HeroSectionProps {
  name: string;
  location: string;
  tagline?: string;
}

export default function HeroSection({ name, location, tagline }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Avatar with animated ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="relative mb-8"
        >
          <motion.div
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 opacity-75 blur"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative">
            <Image
              src="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg"
              alt={name}
              width={140}
              height={140}
              className="rounded-full border-4 border-white shadow-xl dark:border-neutral-900"
            />
            {/* Status indicator */}
            <motion.div
              className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-white bg-green-500 dark:border-neutral-900"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Name with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl"
        >
          <GradientText>{name}</GradientText>
        </motion.h1>

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4"
        >
          <Badge variant="gradient">📍 {location}</Badge>
        </motion.div>

        {/* Tagline */}
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
          >
            {tagline}
          </motion.p>
        )}

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex gap-4"
        >
          {[
            { icon: FaXTwitter, href: 'https://twitter.com/thomas_chardo', label: 'Twitter' },
            { icon: FaGithub, href: 'https://github.com/tchardonnens', label: 'GitHub' },
            { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/thomaschardonnens/', label: 'LinkedIn' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md transition-all hover:shadow-lg dark:bg-neutral-800"
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            >
              <social.icon className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-orange-500 dark:text-neutral-400 dark:group-hover:text-orange-400" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-neutral-400 dark:text-neutral-600">Scroll</span>
            <div className="h-8 w-5 rounded-full border-2 border-neutral-300 p-1 dark:border-neutral-700">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-600"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
