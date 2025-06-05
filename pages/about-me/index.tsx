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
        <section className="mb-12 space-y-8 text-center text-base leading-relaxed">
          <h2 className="mb-6 text-center font-['Schibsted_Grotesk'] text-2xl font-semibold">
            A little more about me
          </h2>

          <div className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="font-['Schibsted_Grotesk'] text-lg font-semibold">Personal</h3>
              <p className="text-base">22 years old, I love running and Korean food 🇰🇷</p>
              <p className="text-base">Visited Seoul last May. This city is fantastic 😍</p>
              <p className="text-base">Still wondering what my next trip will be 🤔</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-['Schibsted_Grotesk'] text-lg font-semibold">Books</h3>
              <p className="text-base">
                My favorite books are probably The Hobbit, 1984 and Atomic Habits
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-['Schibsted_Grotesk'] text-lg font-semibold">Entertainment</h3>
              <p className="text-base">A big fan of The Office</p>
              <p className="text-base">
                Watching some of the most popular KDramas to stay up to date with my friends!
              </p>
              <p className="text-base">I really liked The Glory, Doona and King The Land</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-['Schibsted_Grotesk'] text-lg font-semibold">Gaming</h3>
              <p className="text-base">Finished Hades and Cyberpunk 2077 in solo</p>
              <p className="text-base">Relax by playing Minecraft and Valorant with my friends</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
