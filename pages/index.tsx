import Head from 'next/head'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Card from '../components/card'
import Image from 'next/image';
import VariableFontHoverByLetter from "../components/fancy/variable-font-hover-by-letter"

export default function Home() {
  return (
    <>
      <Head>
        <title>Thomas Chardonnens</title>
        <meta name="description" content="Thomas Chardonnens - Personal Website" />
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1449466562591723522/3MyO9dFd_400x400.jpg" type="image/jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content="Thomas Chardonnens" />
        <meta property="og:description" content="Personal Website" />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg" />
        <meta property="og:url" content="https://portfolio.thomaschardonnens.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Thomas Chardonnens" />
        <meta name="twitter:description" content="Personal Website" />
        <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg" />
      </Head>
      <main className="flex flex-col mx-auto justify-center items-center min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 pt-8 pb-8 font-sans max-w-7xl px-4">
        <div className="w-full">
          <div className="flex flex-row justify-center items-center mb-8">
            <Image src="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg" alt='Profile Photo' width={200} height={200} className='rounded-full shadow-lg' />
          </div>
          <h1 className="text-5xl font-bold text-center mb-8">
            Thomas Chardonnens
          </h1>

          <div className="flex flex-row justify-center items-center space-x-8 mb-12">
            <a href="https://twitter.com/thomas_chardo" target="_blank" rel="noopener noreferrer">
              <button className='bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-xl border-2 hover:scale-110 transition-transform'><FaXTwitter /></button>
            </a>
            <a href="https://github.com/tchardonnens" target="_blank" rel="noopener noreferrer">
              <button className='bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-xl border-2 hover:scale-110 transition-transform'><FaGithub /></button>
            </a>
            <a href="https://www.linkedin.com/in/thomaschardonnens/" target="_blank" rel="noopener noreferrer">
              <button className='bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-xl border-2 hover:scale-110 transition-transform'><FaLinkedinIn /></button>
            </a>
          </div>

          <section className="text-lg text-center leading-relaxed space-y-10 mb-16">
            <h2 className='text-3xl font-semibold'>About me</h2>
            <p className="text-xl">📍 Based in Paris, France</p>

            <div className="flex flex-col space-y-2 cursor-pointer">
              <VariableFontHoverByLetter
                label="M.S. in Electronic Engineering and Computer Science"
                staggerDuration={0.03}
                fromFontVariationSettings="'wght' 400, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
              />
              <div className="text-lg">
                <a href="https://www.isep.fr/" className="hover:text-blue-600 dark:hover:text-blue-400">ISEP Paris 🇫🇷</a>
                {' '}and{' '}
                <a href="https://www.berkeley.edu/" className="hover:text-blue-600 dark:hover:text-blue-400">University of California, Berkeley 🇺🇸</a>
              </div>
            </div>

            <div className="flex flex-col space-y-2 cursor-pointer">
              <VariableFontHoverByLetter
                label="Software Engineer"
                staggerDuration={0.03}
                fromFontVariationSettings="'wght' 400, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
              />
              <div className="text-lg">
                <a href="https://mistral.ai/" className="hover:text-blue-600 dark:hover:text-blue-400">Mistral AI</a> – French AI lab
                <br />
                <a href="https://rockfi.fr/" className="hover:text-blue-600 dark:hover:text-blue-400">RockFi</a> – Private wealth management startup
              </div>
            </div>

            <div className="flex flex-col space-y-2 cursor-pointer">
              <VariableFontHoverByLetter
                label="Software Engineer Internships"
                staggerDuration={0.03}
                fromFontVariationSettings="'wght' 400, 'slnt' 0"
                toFontVariationSettings="'wght' 900, 'slnt' -10"
              />
              <div className="text-lg">
                <a href="https://qonto.com/en" className="hover:text-blue-600 dark:hover:text-blue-400">Qonto</a> – European leader in neobanking for SMEs
                <br />
                <a href="https://www.ledger.com/" className="hover:text-blue-600 dark:hover:text-blue-400">Ledger</a> – Leader in security for crypto-assets
                <br />
                <a href="https://www.idemia.com/" className="hover:text-blue-600 dark:hover:text-blue-400">Idemia</a> – Leader in identity technologies
              </div>
            </div>

            <p className="text-xl max-w-2xl mx-auto">
              Mainly interested in searching for new ways to compress knowledge and make it transferable.
            </p>
          </section>

          <section className="space-y-8 mb-16">
            <h2 className='text-3xl font-semibold text-center mb-8'>Some of my silly projects</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              <Card title="Qonto Customer Support Chatbot"
                description="RAG chatbot to help Qonto customers with their questions. Handles 50%+ of customer conversations autonomously and reduced time to solve user issues by 44% for 500k customers."
                linkProd='https://medium.com/qonto-way/meet-qontos-new-genai-chatbot-faster-smarter-and-ready-to-serve-with-mistral-s-power-e5fde2684e46'
                backendStack='RAG and Mistral AI model'
                frontendStack='Qonto website and apps'>
              </Card>

              <Card title="EEG Seizure Detection AI"
                description="CNN model that detects seizures from EEG brain wave data with 86% accuracy. Processes EEG signals into images for automated medical analysis, helping doctors identify seizure patterns."
                linkRepo='https://huggingface.co/ThomasCdnns/EEG-Seizure-Detection'
                backendStack='Python, PyTorch'
                frontendStack='HuggingFace'>
              </Card>

              <Card title="Tailored tours"
                description="Implementation of the TSP on a database of 2000 real locations in France to help tourists plan their trip according to their time constraints."
                linkProd="https://map.verycurious.xyz"
                linkRepo='https://github.com/tchardonnens/t3-back'
                backendStack='Go, Gin, SQLite'
                frontendStack='Next.js, Vercel'>
              </Card>

              <Card title="Plane buddy"
                description="Developed overnight to connect Berkeley BGA program students on flights to reach the campus. Achieved 200+ unique global visitors within 2 days, successfully facilitating meet-ups for several student groups."
                linkProd="https://plane-buddy.vercel.app/"
                linkRepo='https://github.com/tchardonnens/planeBuddy'
                backendStack='Node.js, Next.js, PostgreSQL'
                frontendStack='Next.js, Vercel'>
              </Card>

              <Card title="ScanURL"
                description="Just a silly website to gather WHOIS, IP, reverse DNS and redirections analysis of a URL or first level domain"
                linkProd="https://scanurl.thomascdnns.com/"
                linkRepo='https://github.com/tchardonnens/scanurl/tree/2c8aa86b953dd2dbef8a7c999c762674873e576b'
                backendStack='Python, Flask'
                frontendStack='Jinja'>
              </Card>

              <Card title="Portfolio"
                description="My personal website. You are on it right now. Using Next because I want to develop something more complex than a static website in the next version..."
                linkProd="https://thomascdnns.com"
                linkRepo="https://github.com/tchardonnens/portfolio"
                backendStack='???'
                frontendStack='Next.js, Vercel'>
              </Card>

              <Card title="Password Crusher"
                description="Website interface to retrieve cached cracked unsalted MD5 passwords"
                linkRepo='https://github.com/tchardonnens/pwd-crusher-back'
                backendStack='Nest, Redis'
                frontendStack='Angular'>
              </Card>

              <Card title="Flat Fall Race"
                description='A 2D multiplayer, server based, race game made with JavaFX (GUI) and Kryonet (Network) as ISEP Project'
                linkRepo='https://github.com/tchardonnens/flat-fall-race'
                backendStack='Java, Kryonet'
                frontendStack='JavaFX'>
              </Card>

              <Card title="Chess game"
                description="Terminal UI chess game made in Java. Did not finish it though, but it was a good way to practice."
                linkRepo='https://github.com/tchardonnens/cours-java/tree/main/TP3_G7_Chardonnens/'
                backendStack='Java'
                frontendStack='In the terminal, not very fancy'>
              </Card>

              <Card title="Minecraft Server Dashboard"
                description="Tiny vanilla website with a login system to start, stop and restart a Minecraft server with custom settings, choose map, mode (PVE or PVP), dark/light mode..."
                linkRepo="https://github.com/tchardonnens/site-minecraft"
                backendStack='PHP, JavaScript'
                frontendStack='HTML, CSS'>
              </Card>

              <Card title="Monkus"
                description="A conversational sassy and roasting Discord bot using GPT3.5 API"
                linkRepo="https://github.com/tchardonnens/monkus"
                backendStack='JavaScript, GPT3.5 API'
                frontendStack='Discord hahaha'>
              </Card>
            </div>
          </section>

          <section className="text-lg text-center leading-relaxed space-y-6 mb-16">
            <h2 className='text-3xl font-semibold mb-8'>A little more about me</h2>

            <p className="max-w-2xl mx-auto">
              22 years old, I love running and Korean food 🇰🇷.<br />
              Visited Seoul last May. This city is fantastic 😍.<br />
              Still wondering what my next trip will be 🤔.
            </p>

            <p className="max-w-2xl mx-auto">
              My favorite books are probably The Hobbit, 1984 and Atomic Habits.
            </p>

            <p className="max-w-2xl mx-auto">
              A big fan of The Office.<br />
              Watching some of the most popular KDramas to stay up to date with my friends!<br />
              I really liked The Glory, Doona and King The Land.
            </p>

            <p className="max-w-2xl mx-auto">
              Finished Hades and Cyberpunk 2077 in solo and relax by playing Minecraft and Valorant with my friends.
            </p>
          </section>

          <section className="text-center mb-8">
            <h2 className='text-3xl font-semibold mb-8'>Chat with me</h2>
            <button className="bg-neutral-500 py-3 px-6 rounded-lg text-white opacity-50 cursor-not-allowed text-lg">
              (Coming soon...)
            </button>
          </section>
        </div>
      </main>
    </>
  )
}
