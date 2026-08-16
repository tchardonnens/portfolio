import Link from 'next/link';
import React from 'react';
import CustomHead from '../../components/head';

export default function AboutMe() {
  return (
    <>
      <CustomHead
        title="About Me - Thomas Chardonnens"
        description="Learn more about Thomas Chardonnens"
      />
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center bg-white px-4 pb-8 pt-8 font-['JetBrains_Mono'] text-gray-700 dark:bg-neutral-950 dark:text-gray-200">
        <section className="mb-12 space-y-8 text-base leading-relaxed">
          <h2 className="mb-6 text-center font-['Schibsted_Grotesk'] text-2xl font-semibold">
            Outside of work
          </h2>

          <div className="mx-auto max-w-2xl space-y-6">
            <p>
              I run, I cook, and I practice Chinese calligraphy. All three reward patience and
              repetition far more than cleverness, which is a useful counterweight to the way I
              spend the rest of my time.
            </p>

            <p>
              I travel when I can. Seoul is the one that stuck with me — enough that Korean cooking
              has become a habit rather than a phase. I have not decided where the next trip goes.
            </p>

            <p className="text-sm">
              <Link
                href="/"
                className="underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Back to home
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
