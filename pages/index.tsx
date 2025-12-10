import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import AnimatedElement from '../components/animated-element';
import Card from '../components/card';
import CustomHead from '../components/head';

export default function Home() {
  const [snowflakes, setSnowflakes] = useState<JSX.Element[]>([]);
  const [isChristmasTheme, setIsChristmasTheme] = useState(true);

  useEffect(() => {
    // Create snowflakes
    const flakes = [];
    for (let i = 0; i < 50; i++) {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${Math.random() * 10 + 10}px`,
      };
      flakes.push(
        <div key={`snowflake-${i}`} className="xmas-snowflake" style={style}>
          ❄
        </div>
      );
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      <CustomHead />
      <div className={`xmas-theme ${isChristmasTheme ? '' : 'hidden'}`}>
        <div className="xmas-snowflakes">
          {snowflakes}
        </div>
        <div className="xmas-tree"></div>
      </div>
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center bg-neutral-50 px-4 pb-8 pt-8 font-['JetBrains_Mono'] text-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 relative">
        <div className="w-full">
          <div className="mb-6 flex flex-row items-center justify-center">
            <Image
              src="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg"
              alt="Profile Photo"
              width={150}
              height={150}
              className="rounded-full shadow-lg"
            />
          </div>
          <AnimatedElement
            as="h1"
            className="font-base mb-6 text-center font-['Mountains_of_Christmas'] text-3xl"
          >
            Thomas Chardonnens
          </AnimatedElement>

          <div className="mb-8 flex flex-row items-center justify-center space-x-6">
            <a href="https://twitter.com/thomas_chardo" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 bg-neutral-50 px-6 py-2 text-xl text-black dark:bg-black dark:text-white"
              >
                <FaXTwitter />
              </motion.button>
            </a>
            <a href="https://github.com/tchardonnens" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 bg-neutral-50 px-6 py-2 text-xl text-black dark:bg-black dark:text-white"
              >
                <FaGithub />
              </motion.button>
            </a>
            <a
              href="https://www.linkedin.com/in/thomaschardonnens/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 bg-white px-6 py-2 text-xl text-black dark:bg-black dark:text-white"
              >
                <FaLinkedinIn />
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
                <a
                  href="https://www.isep.fr/"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  ISEP Paris
                </a>{' '}
                and{' '}
                <a
                  href="https://www.berkeley.edu/"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  University of California, Berkeley
                </a>
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
                <a
                  href="https://mistral.ai/"
                  className="text-neutral-800 hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-400"
                >
                  Mistral AI
                </a>{' '}
                – French AI lab
                <br />
                <a
                  href="https://rockfi.fr/"
                  className="text-neutral-800 hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-400"
                >
                  RockFi
                </a>{' '}
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
                <a
                  href="https://qonto.com/en"
                  className="text-neutral-800 hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-400"
                >
                  Qonto
                </a>{' '}
                – European leader in neobanking for SMEs
                <br />
                <a
                  href="https://www.ledger.com/"
                  className="text-neutral-800 hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-400"
                >
                  Ledger
                </a>{' '}
                – Leader in security for crypto-assets
                <br />
                <a
                  href="https://www.idemia.com/"
                  className="text-neutral-800 hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-400"
                >
                  Idemia
                </a>{' '}
                – Leader in identity technologies
              </AnimatedElement>
            </div>
          </section>

          <section className="mb-12 space-y-6">
            <AnimatedElement
              as="h2"
              delay={1.2}
              className="mb-6 text-center font-['Mountains_of_Christmas'] text-2xl font-semibold"
            >
              Some of my silly projects
            </AnimatedElement>
            <AnimatedElement
              as="div"
              delay={1.3}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              <Card
                title="Mistral AI MCP for Le Chat"
                description="Bring the widest enterprise-ready MCP connectors directory (+20 connectors) to Le Chat, with custom extensibility to bring your own connectors."
                linkProd="https://mistral.ai/news/le-chat-mcp-connectors-memories"
                backendStack="MCP"
                frontendStack="Le Chat"
              ></Card>

              <Card
                title="Qonto Customer Support Chatbot"
                description="RAG chatbot to help Qonto customers with their questions. Handles 50%+ of customer conversations autonomously and reduced time to solve user issues by 44% for 500k customers."
                linkProd="https://medium.com/qonto-way/meet-qontos-new-genai-chatbot-faster-smarter-and-ready-to-serve-with-mistral-s-power-e5fde2684e46"
                backendStack="RAG and Mistral AI model"
                frontendStack="Qonto website and apps"
              ></Card>

              <Card
                title="EEG Seizure Detection AI"
                description="CNN model that detects seizures from EEG brain wave data with 86% accuracy. Processes EEG signals into images for automated medical analysis, helping doctors identify seizure patterns."
                linkRepo="https://huggingface.co/ThomasCdnns/EEG-Seizure-Detection"
                backendStack="Python, PyTorch"
                frontendStack="HuggingFace"
              ></Card>

              <Card
                title="Tailored tours"
                description="Implementation of the TSP on a database of 2000 real locations in France to help tourists plan their trip according to their time constraints."
                linkProd="https://map.verycurious.xyz"
                linkRepo="https://github.com/tchardonnens/t3-back"
                backendStack="Go, Gin, SQLite"
                frontendStack="Next.js, Vercel"
              ></Card>

              <Card
                title="Plane buddy"
                description="Developed overnight to connect Berkeley BGA program students on flights to reach the campus. Achieved 200+ unique global visitors within 2 days, successfully facilitating meet-ups for several student groups."
                linkProd="https://plane-buddy.vercel.app/"
                linkRepo="https://github.com/tchardonnens/planeBuddy"
                backendStack="Node.js, Next.js, PostgreSQL"
                frontendStack="Next.js, Vercel"
              ></Card>

              <Card
                title="ScanURL"
                description="Just a silly website to gather WHOIS, IP, reverse DNS and redirections analysis of a URL or first level domain"
                linkProd="https://scanurl.thomascdnns.com/"
                linkRepo="https://github.com/tchardonnens/scanurl/tree/2c8aa86b953dd2dbef8a7c999c762674873e576b"
                backendStack="Python, Flask"
                frontendStack="Jinja"
              ></Card>

              <Card
                title="Portfolio"
                description="My personal website. You are on it right now. Using Next because I want to develop something more complex than a static website in the next version..."
                linkProd="https://thomascdnns.com"
                linkRepo="https://github.com/tchardonnens/portfolio"
                backendStack="???"
                frontendStack="Next.js, Vercel"
              ></Card>

              <Card
                title="Password Crusher"
                description="Website interface to retrieve cached cracked unsalted MD5 passwords"
                linkRepo="https://github.com/tchardonnens/pwd-crusher-back"
                backendStack="Nest, Redis"
                frontendStack="Angular"
              ></Card>

              <Card
                title="Flat Fall Race"
                description="A 2D multiplayer, server based, race game made with JavaFX (GUI) and Kryonet (Network) as ISEP Project"
                linkRepo="https://github.com/tchardonnens/flat-fall-race"
                backendStack="Java, Kryonet"
                frontendStack="JavaFX"
              ></Card>

              <Card
                title="Chess game"
                description="Terminal UI chess game made in Java. Did not finish it though, but it was a good way to practice."
                linkRepo="https://github.com/tchardonnens/cours-java/tree/main/TP3_G7_Chardonnens/"
                backendStack="Java"
                frontendStack="In the terminal, not very fancy"
              ></Card>

              <Card
                title="Minecraft Server Dashboard"
                description="Tiny vanilla website with a login system to start, stop and restart a Minecraft server with custom settings, choose map, mode (PVE or PVP), dark/light mode..."
                linkRepo="https://github.com/tchardonnens/site-minecraft"
                backendStack="PHP, JavaScript"
                frontendStack="HTML, CSS"
              ></Card>

              <Card
                title="Monkus"
                description="A conversational sassy and roasting Discord bot using GPT3.5 API"
                linkRepo="https://github.com/tchardonnens/monkus"
                backendStack="JavaScript, GPT3.5 API"
                frontendStack="Discord hahaha"
              ></Card>
            </AnimatedElement>
          </section>
        </div>
      </main>
    </>
  );
}
