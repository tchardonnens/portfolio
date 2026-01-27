import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import AnimatedElement from '../components/animated-element';
import Card from '../components/card';
import CustomHead from '../components/head';

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <>
      <CustomHead />
      <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center overflow-hidden bg-neutral-50 px-4 pb-8 pt-8 font-['JetBrains_Mono'] text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
        {/* Animated Background Orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 opacity-20 blur-3xl dark:opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 blur-3xl dark:opacity-10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>

        <div ref={heroRef} className="relative z-10 w-full">
          {/* Enhanced Profile Photo with Gradient Ring and Parallax */}
          <motion.div
            style={{ y: photoY, opacity: photoOpacity }}
            className="mb-8 flex flex-row items-center justify-center"
          >
            <div className="relative">
              {/* Pulsing Glow Behind */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 opacity-50 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Animated Gradient Ring */}
              <motion.div
                className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 opacity-75"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {/* Inner white/dark ring for spacing */}
              <div className="absolute -inset-1 rounded-full bg-neutral-50 dark:bg-neutral-950" />
              {/* Photo */}
              <Image
                src="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg"
                alt="Profile Photo"
                width={180}
                height={180}
                className="relative rounded-full shadow-2xl"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Dramatic Typography */}
          <AnimatedElement
            as="h1"
            variant="sophisticated"
            className="mb-4 bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-600 bg-clip-text text-center font-['Schibsted_Grotesk'] text-6xl font-bold text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 md:text-7xl lg:text-8xl"
          >
            Thomas Chardonnens
          </AnimatedElement>

          {/* Tagline */}
          <AnimatedElement as="p" delay={0.2} variant="fade" className="mb-8 text-center text-sm text-neutral-600 dark:text-neutral-400">
            Software Engineer • AI Enthusiast • Builder
          </AnimatedElement>

          {/* Glass-morphism Social Buttons */}
          <div className="mb-8 flex flex-row items-center justify-center space-x-6">
            <a href="https://twitter.com/thomas_chardo" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100/50 px-8 py-3 text-2xl text-neutral-800 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-200"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <FaXTwitter className="relative" />
              </motion.button>
            </a>
            <a href="https://github.com/tchardonnens" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100/50 px-8 py-3 text-2xl text-neutral-800 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-200"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <FaGithub className="relative" />
              </motion.button>
            </a>
            <a
              href="https://www.linkedin.com/in/thomaschardonnens/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100/50 px-8 py-3 text-2xl text-neutral-800 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900/50 dark:text-neutral-200"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <FaLinkedinIn className="relative" />
              </motion.button>
            </a>
          </div>

          <section className="mb-12 space-y-8 text-center text-base leading-relaxed">
            <AnimatedElement as="p" delay={0.3} className="text-sm">
              📍 Based in Paris, France
            </AnimatedElement>

            <div className="flex flex-col space-y-8">
              <AnimatedElement
                as="h3"
                delay={0.4}
                className="font-['Schibsted_Grotesk'] text-lg font-semibold"
              >
                Education
              </AnimatedElement>
              <AnimatedElement as="p" delay={0.5} className="text-sm">
                M.S. in Electronic Engineering and Computer Science
                <br />
                <motion.a
                  href="https://www.isep.fr/"
                  className="group relative inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="relative z-10">ISEP Paris</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-pink-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>{' '}
                and{' '}
                <motion.a
                  href="https://www.berkeley.edu/"
                  className="group relative inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="relative z-10">University of California, Berkeley</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-pink-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </AnimatedElement>
            </div>

            <div className="flex flex-col space-y-8">
              <AnimatedElement
                as="h3"
                delay={0.7}
                className="font-['Schibsted_Grotesk'] text-lg font-semibold"
              >
                Software Engineer
              </AnimatedElement>
              <AnimatedElement
                as="div"
                delay={0.8}
                className="text-sm text-neutral-600 dark:text-neutral-400"
              >
                <motion.a
                  href="https://mistral.ai/"
                  className="group relative inline-block text-neutral-800 dark:text-neutral-200"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="relative z-10">Mistral AI</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-pink-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>{' '}
                – French AI lab
                <br />
                <motion.a
                  href="https://rockfi.fr/"
                  className="group relative inline-block text-neutral-800 dark:text-neutral-200"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="relative z-10">RockFi</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-pink-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>{' '}
                – Private wealth management startup
              </AnimatedElement>
            </div>

            <div className="flex flex-col space-y-8">
              <AnimatedElement
                as="h3"
                delay={0.9}
                className="font-['Schibsted_Grotesk'] text-lg font-semibold"
              >
                Software Engineer Internships
              </AnimatedElement>
              <AnimatedElement
                as="div"
                delay={1.0}
                className="text-sm text-neutral-600 dark:text-neutral-400"
              >
                <motion.a
                  href="https://qonto.com/en"
                  className="group relative inline-block text-neutral-800 dark:text-neutral-200"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="relative z-10">Qonto</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-pink-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>{' '}
                – European leader in neobanking for SMEs
                <br />
                <motion.a
                  href="https://www.ledger.com/"
                  className="group relative inline-block text-neutral-800 dark:text-neutral-200"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="relative z-10">Ledger</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-pink-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>{' '}
                – Leader in security for crypto-assets
                <br />
                <motion.a
                  href="https://www.idemia.com/"
                  className="group relative inline-block text-neutral-800 dark:text-neutral-200"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span className="relative z-10">Idemia</span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-pink-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>{' '}
                – Leader in identity technologies
              </AnimatedElement>
            </div>

            <AnimatedElement as="p" delay={1.1} className="mx-auto max-w-2xl text-sm ">
              Mainly interested in searching for new ways
              <br />
              to compress knowledge and make it transferable.
            </AnimatedElement>
          </section>

          {/* Section Divider with Animated Gradient */}
          <div className="relative mb-16 h-px w-full overflow-hidden bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          <section className="mb-12 space-y-6">
            <AnimatedElement
              as="h2"
              delay={1.2}
              variant="sophisticated"
              className="mb-6 text-center font-['Schibsted_Grotesk'] text-2xl font-semibold"
            >
              Some of my silly projects
            </AnimatedElement>
            <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-6">
              {/* Featured - col-span-3 */}
              <AnimatedElement
                as="div"
                delay={1.3}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-3"
              >
                <Card
                  title="Mistral AI MCP for Le Chat"
                  description="Bring the widest enterprise-ready MCP connectors directory (+20 connectors) to Le Chat, with custom extensibility to bring your own connectors."
                  linkProd="https://mistral.ai/news/le-chat-mcp-connectors-memories"
                  backendStack="MCP"
                  frontendStack="Le Chat"
                  accent="orange"
                  featured={true}
                />
              </AnimatedElement>

              {/* Featured - col-span-3 */}
              <AnimatedElement
                as="div"
                delay={1.4}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-3"
              >
                <Card
                  title="Qonto Customer Support Chatbot"
                  description="RAG chatbot to help Qonto customers with their questions. Handles 50%+ of customer conversations autonomously and reduced time to solve user issues by 44% for 500k customers."
                  linkProd="https://medium.com/qonto-way/meet-qontos-new-genai-chatbot-faster-smarter-and-ready-to-serve-with-mistral-s-power-e5fde2684e46"
                  backendStack="RAG, Mistral AI"
                  frontendStack="Qonto apps"
                  accent="blue"
                  featured={true}
                />
              </AnimatedElement>

              {/* Large - col-span-2 */}
              <AnimatedElement
                as="div"
                delay={1.5}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-2"
              >
                <Card
                  title="EEG Seizure Detection AI"
                  description="CNN model that detects seizures from EEG brain wave data with 86% accuracy. Processes EEG signals into images for automated medical analysis, helping doctors identify seizure patterns."
                  linkRepo="https://huggingface.co/ThomasCdnns/EEG-Seizure-Detection"
                  backendStack="Python, PyTorch"
                  frontendStack="HuggingFace"
                  accent="purple"
                />
              </AnimatedElement>

              {/* Large - col-span-2 */}
              <AnimatedElement
                as="div"
                delay={1.6}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-2"
              >
                <Card
                  title="Tailored tours"
                  description="Implementation of the TSP on a database of 2000 real locations in France to help tourists plan their trip according to their time constraints."
                  linkProd="https://map.verycurious.xyz"
                  linkRepo="https://github.com/tchardonnens/t3-back"
                  backendStack="Go, Gin, SQLite"
                  frontendStack="Next.js, Vercel"
                  accent="green"
                />
              </AnimatedElement>

              {/* Large - col-span-2 */}
              <AnimatedElement
                as="div"
                delay={1.7}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-2"
              >
                <Card
                  title="Plane buddy"
                  description="Developed overnight to connect Berkeley BGA program students on flights to reach the campus. Achieved 200+ unique global visitors within 2 days, successfully facilitating meet-ups for several student groups."
                  linkProd="https://plane-buddy.vercel.app/"
                  linkRepo="https://github.com/tchardonnens/planeBuddy"
                  backendStack="Node.js, PostgreSQL"
                  frontendStack="Next.js, Vercel"
                  accent="blue"
                />
              </AnimatedElement>

              {/* Standard - col-span-3 */}
              <AnimatedElement
                as="div"
                delay={1.8}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-3"
              >
                <Card
                  title="ScanURL"
                  description="Just a silly website to gather WHOIS, IP, reverse DNS and redirections analysis of a URL or first level domain"
                  linkProd="https://scanurl.thomascdnns.com/"
                  linkRepo="https://github.com/tchardonnens/scanurl/tree/2c8aa86b953dd2dbef8a7c999c762674873e576b"
                  backendStack="Python, Flask"
                  frontendStack="Jinja"
                  accent="orange"
                />
              </AnimatedElement>

              {/* Standard - col-span-3 */}
              <AnimatedElement
                as="div"
                delay={1.9}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-3"
              >
                <Card
                  title="Portfolio"
                  description="My personal website. You are on it right now. Using Next because I want to develop something more complex than a static website in the next version..."
                  linkProd="https://thomascdnns.com"
                  linkRepo="https://github.com/tchardonnens/portfolio"
                  backendStack="???"
                  frontendStack="Next.js, Vercel"
                  accent="pink"
                />
              </AnimatedElement>

              {/* Standard - col-span-2 */}
              <AnimatedElement
                as="div"
                delay={2.0}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-2"
              >
                <Card
                  title="Password Crusher"
                  description="Website interface to retrieve cached cracked unsalted MD5 passwords"
                  linkRepo="https://github.com/tchardonnens/pwd-crusher-back"
                  backendStack="Nest, Redis"
                  frontendStack="Angular"
                  accent="purple"
                />
              </AnimatedElement>

              {/* Standard - col-span-2 */}
              <AnimatedElement
                as="div"
                delay={2.1}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-2"
              >
                <Card
                  title="Flat Fall Race"
                  description="A 2D multiplayer, server based, race game made with JavaFX (GUI) and Kryonet (Network) as ISEP Project"
                  linkRepo="https://github.com/tchardonnens/flat-fall-race"
                  backendStack="Java, Kryonet"
                  frontendStack="JavaFX"
                  accent="green"
                />
              </AnimatedElement>

              {/* Standard - col-span-2 */}
              <AnimatedElement
                as="div"
                delay={2.2}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-2"
              >
                <Card
                  title="Chess game"
                  description="Terminal UI chess game made in Java. Did not finish it though, but it was a good way to practice."
                  linkRepo="https://github.com/tchardonnens/cours-java/tree/main/TP3_G7_Chardonnens/"
                  backendStack="Java"
                  frontendStack="Terminal"
                  accent="blue"
                />
              </AnimatedElement>

              {/* Standard - col-span-3 */}
              <AnimatedElement
                as="div"
                delay={2.3}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-3"
              >
                <Card
                  title="Minecraft Server Dashboard"
                  description="Tiny vanilla website with a login system to start, stop and restart a Minecraft server with custom settings, choose map, mode (PVE or PVP), dark/light mode..."
                  linkRepo="https://github.com/tchardonnens/site-minecraft"
                  backendStack="PHP, JavaScript"
                  frontendStack="HTML, CSS"
                  accent="green"
                />
              </AnimatedElement>

              {/* Standard - col-span-3 */}
              <AnimatedElement
                as="div"
                delay={2.4}
                variant="sophisticated"
                useScrollTrigger={true}
                className="md:col-span-3"
              >
                <Card
                  title="Monkus"
                  description="A conversational sassy and roasting Discord bot using GPT3.5 API"
                  linkRepo="https://github.com/tchardonnens/monkus"
                  backendStack="JavaScript, GPT3.5"
                  frontendStack="Discord"
                  accent="pink"
                />
              </AnimatedElement>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
