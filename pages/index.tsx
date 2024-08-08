import Head from 'next/head'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import Card from '../components/card'
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Thomas Chardonnens</title>
        <meta name="description" content="Thomas Chardonnens - Personal Website" />
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1449466562591723522/3MyO9dFd_400x400.jpg" type="image/jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
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
      <main className="flex flex-col mx-auto justify-center items-center min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 mt-4 mb-4">
        <div className="mt-4 w-5/6 md:w-3/4 lg:w-5/6">
          <div className="flex flex-row justify-center items-center mb-5">
            <Image src="https://pbs.twimg.com/profile_images/1728638195871674368/X979dM1Q_400x400.jpg" alt='PHOTO DE MOI' width={200} height={200} className='rounded-full' />
          </div>
          <p className="text-4xl text-center">
            Thomas Chardonnens
          </p>
          <br />
          <div className="flex flex-row sm:w-48 justify-center items-center text-center space-x-6 mx-auto">
            <a href="https://twitter.com/thomas_chardo" target="_blank" rel="noopener noreferrer">
              <button className='bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-xl border-2'><FaXTwitter /></button>
            </a>
            <a href="https://github.com/tchardonnens" target="_blank" rel="noopener noreferrer">
              <button className='bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-xl border-2'><FaGithub /></button>
            </a>
            <a href="https://www.linkedin.com/in/thomaschardonnens/" target="_blank" rel="noopener noreferrer">
              <button className='bg-white dark:bg-black text-black dark:text-white px-6 py-3 rounded-lg text-xl border-2'><FaLinkedinIn /></button>
            </a>
          </div>
          <br />
          <section className="text-lg text-center leading-relaxed space-y-8">
            <h2 className='text-2xl'>About me</h2>
            <p>📍 Based in Paris, France</p>
            <p>
              <strong>M.S. in Computer Science</strong>
              <br />
              <a href="https://www.isep.fr/">ISEP Paris 🇫🇷</a>
              {' '}and{' '}
              <a href="https://www.berkeley.edu/">University of California, Berkeley 🇺🇸</a>
            </p>
            <p>
              <strong>Software Engineer</strong>
              <br />
              <a href="https://rockfi.fr/">RockFi</a> – Private wealth management startup
            </p>
            <p>
              <strong>Software Engineer Internships</strong>
              <br />
              <a href="https://qonto.com/en">Qonto</a> – European leader in neobanking for SMEs
              <br />
              <a href="https://www.ledger.com/">Ledger</a> – Leader in security for crypto-assets
              <br />
              <a href="https://www.idemia.com/">Idemia</a> – Leader in identity technologies
            </p>
            <p>
              Studying NLP, Machine Learning, and AI agents.
              <br />
              My strongest skillset is fullstack web development but I am also interested in cybersecurity.
            </p>
          </section>
          <section className="text-lg leading-relaxed space-y-4 mt-8">
            <h2 className='text-2xl'>Some of my silly projects</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

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
                backendStack='Node.js, Next.js, PostreSQL'
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
          <section className="text-md text-center leading-loose space-y-4 mt-8">
            <h2 className='text-2xl'>A little more about me</h2>
            <br />
            22 years old, I love running and Korean food 🇰🇷.
            Visited Seoul last May. This city is fantastic 😍.
            Still wondering what my next trip will be 🤔.
            <br />
            My favorite books are probably The Hobbit, 1984 and Atomic Habits.
            <br />
            A big fan of The Office.
            Watching some of the most popular KDramas to stay up to date with my friends!
            I really liked The Glory, Doona and King The Land.
            <br />
            Finished Hades and Cyberpunk 2077 in solo and relax by playing Minecraft and Valorant with my friends.
          </section>
          <br />
          <h2 className='text-2xl text-center'>Chat with me</h2>
          <br />
          <section className="flex flex-col items-center">
            <button className="bg-transparent border-none cursor-not-allowed bg-neutral-500 py-2 px-4 rounded no-underline dark:no-underline">
              (Coming soon...)
            </button>
          </section>
        </div>
      </main >
    </>
  )
}
