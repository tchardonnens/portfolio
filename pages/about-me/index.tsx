'use client';

import { motion } from 'framer-motion';
import { BookOpen, Tv, Gamepad2, Utensils, Plane, Music } from 'lucide-react';
import Navigation from '../../components/navigation';
import CustomHead from '../../components/head';
import SectionTitle from '../../components/section-title';
import GradientText from '../../components/gradient-text';

interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  delay?: number;
}

function AboutCard({ icon, title, content, delay = 0 }: AboutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 text-orange-600 transition-transform duration-300 group-hover:scale-110 dark:text-orange-400">
          {icon}
        </div>
        <h3 className="mb-3 font-display text-xl font-semibold text-neutral-900 dark:text-white">
          {title}
        </h3>
        <div className="text-neutral-600 dark:text-neutral-400">{content}</div>
      </div>
    </motion.div>
  );
}

export default function AboutMe() {
  const cards = [
    {
      icon: <Plane className="h-6 w-6" />,
      title: 'Travel',
      content: (
        <>
          <p className="mb-2">22 years old and love exploring new places.</p>
          <p>
            Visited{' '}
            <span className="font-medium text-pink-600 dark:text-pink-400">
              Seoul
            </span>{' '}
            last May — this city is fantastic 😍
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Still wondering what my next trip will be... 🤔
          </p>
        </>
      ),
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: 'Food',
      content: (
        <p>
          Big fan of{' '}
          <span className="font-medium text-orange-600 dark:text-orange-400">
            Korean food
          </span>{' '}
          🇰🇷 — from bibimbap to Korean BBQ, I love it all!
        </p>
      ),
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Books',
      content: (
        <>
          <p className="mb-2">My favorites:</p>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              The Hobbit
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              1984
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              Atomic Habits
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <Tv className="h-6 w-6" />,
      title: 'Entertainment',
      content: (
        <>
          <p className="mb-2">
            A big fan of{' '}
            <span className="italic text-neutral-800 dark:text-neutral-200">
              The Office
            </span>
            
          </p>
          <p className="mb-2">Watching popular KDramas to stay up to date:</p>
          <div className="flex flex-wrap gap-2">
            {['The Glory', 'Doona', 'King The Land'].map((drama) => (
              <span
                key={drama}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {drama}
              </span>
            ))}
          </div>
        </>
      ),
    },
    {
      icon: <Gamepad2 className="h-6 w-6" />,
      title: 'Gaming',
      content: (
        <>
          <p className="mb-2">
            <span className="font-medium">Solo:</span> Finished Hades and Cyberpunk 2077
          </p>
          <p>
            <span className="font-medium">Multiplayer:</span> Minecraft and Valorant with friends
          </p>
        </>
      ),
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: 'Sports',
      content: (
        <p>
          Love{' '}
          <span className="font-medium text-violet-600 dark:text-violet-400">
            running
          </span>{' '}
          to clear my mind and stay active. It helps me think better and solve problems!
        </p>
      ),
    },
  ];

  return (
    <>
      <CustomHead
        title="About Me - Thomas Chardonnens"
        description="Learn more about Thomas Chardonnens - interests, hobbies, and more."
      />
      <Navigation />
      
      <main className="min-h-screen bg-neutral-50 px-4 py-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl pt-20">
          <SectionTitle subtitle="Beyond the code - here's what makes me tick">
            <GradientText>About Me</GradientText>
          </SectionTitle>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <AboutCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                content={card.content}
                delay={0.1 * index}
              />
            ))}
          </div>

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              ← Back to home
            </a>
          </motion.div>
        </div>
      </main>
    </>
  );
}
