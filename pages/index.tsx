import Head from 'next/head'
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

export default function Home() {
  return (

    <>
      <Head>
        <title>Thomas Chardonnens</title>
        <meta name="description" content="Thomas Chardonnens" />
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1449466562591723522/3MyO9dFd_400x400.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Thomas Chardonnens" />
        <meta property="og:description" content="Personal website" />
        <meta property="og:image" content="https://pbs.twimg.com/profile_images/1449466562591723522/3MyO9dFd_400x400.jpg" />
        <meta property="og:url" content="https://portfolio.thomaschardonnens.com" />
      </Head>
      <main className="flex flex-col mx-auto justify-center items-center min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-neutral-200 mt-4 mb-4">
        <div className="w-5/6 md:w-3/4 lg:w-5/6">
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
          <div className="text-md text-center">
            <p className='text-2xl'>About me</p>
            <br />
            CS Master student @&nbsp;
            <a href="https://www.berkeley.edu/">UC Berkeley 🇺🇸</a>
            &nbsp;and&nbsp;
            <a href="https://www.isep.fr/">ISEP 🇫🇷&nbsp;</a>
            <br />
            ex-Software Engineer Intern&nbsp;
            <a href="https://www.ledger.com/">@ Ledger</a>
          </div>
          <br />

          <h2 className='text-2xl text-center'>Some of my projects</h2>
          <br />
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='https://verycurious.xyz'>
                <div className="flex flex-row">
                  <p className='text-xl'>Curious</p>
                </div>
              </a>
              <p>My main side project. Working on a way to change the way we learn by providing custom knowledge just in time by using LLMs.</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='https://map.verycurious.xyz'>
                <div className="flex flex-row">
                  <p className='text-xl'>Tailored tours</p>
                </div>
              </a>
              <p>Implementation of the TSP on a database of 2000 real locations in France to help tourists plan their trip according to their time constraints.</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='https://plane-buddy.vercel.app/'>
                <div className="flex flex-row">
                  <p className='text-xl'>Plane buddy</p>
                </div>
              </a>
              <p>Developed overnight to connect Berkeley BGA program students on flights to reach the campus. Achieved 200+ unique global visitors within 2 days, successfully facilitating meet-ups for several student groups.</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='https://scanurl.thomascdnns.com/'>
                <div className="flex flex-row">
                  <p className='text-xl'>ScanURL</p>
                </div>
              </a>
              <p>Just a silly website to gather WHOIS, IP, reverse DNS and redirections analysis of a URL or first level domain</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='https://scanurl.thomascdnns.com/'>
                <div className="flex flex-row">
                  <p className='text-xl'>Password Crusher</p>
                </div>
              </a>
              <p>Website interface to retrieve cached cracked unsalted MD5 passwords</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='https://thomascdnns.com'>
                <div className="flex flex-row">
                  <p className='text-xl'>Portfolio</p>
                </div>
              </a>
              <p>My personal website. You are on it right now.</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='' target='_blank' rel="noopener noreferrer">
                <div className="flex flex-row">
                  <p className='text-xl'>Chess game</p>
                </div>
              </a>
              <p>Everything is in the name!</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='' target='_blank' rel="noopener noreferrer">
                <div className="flex flex-row">
                  <p className='text-xl'>Flat Fall Race</p>
                </div>
              </a>
              <p>Java multiplayer, server based, race game made with JavaFX (GUI) and Kryonet (Network) as ISEP Project</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='' target='_blank' rel="noopener noreferrer">
                <div className="flex flex-row">
                  <p className='text-xl'>Monkus</p>
                </div>
              </a>
              <p>A conversational sassy and roasting Discord bot using GPT3.5 API</p>
            </div>

            <div className='flex flex-col bg-neutral-200 dark:bg-neutral-900 hover:ring hover:ring-black dark:hover:ring-white p-10 rounded-2xl'>
              <a href='' target='_blank' rel="noopener noreferrer">
                <div className="flex flex-row">
                  <p className='text-xl'>Minecraft Server Dashboard</p>
                </div>
              </a>
              <p>Tiny vanilla website with a login system to start, stop and restart a Minecraft server with custom settings, choose map, mode (PVE or PVP), dark/light mode...</p>
            </div>

          </div>
        </div>
      </main >
    </>
  )
}
