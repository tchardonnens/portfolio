import Image from 'next/image';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import AnimatedElement from '../components/animated-element';
import Card, { ProjectLinks } from '../components/card';
import CityBanner from '../components/city-banner';
import CustomHead from '../components/head';

const SOCIALS = [
  { label: 'X', href: 'https://twitter.com/thomas_chardo', icon: <FaXTwitter /> },
  { label: 'GitHub', href: 'https://github.com/tchardonnens', icon: <FaGithub /> },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thomaschardonnens/',
    icon: <FaLinkedinIn />,
  },
];

export default function Home() {
  return (
    <div className="tb">
      <CustomHead />
      <CityBanner />

      <main>
        <header className="tb-hero">
          <div className="tb-avatar">
            <Image
              src="https://pbs.twimg.com/profile_images/2095519240912805888/cTiK7Vpx_400x400.jpg"
              alt="Profile Photo"
              width={132}
              height={132}
            />
          </div>
          <AnimatedElement as="p" className="tb-tagline">
            Software engineer · Paris, France
          </AnimatedElement>
          <AnimatedElement as="h1" delay={0.1} className="tb-name">
            Thomas <em>Chardonnens</em>
          </AnimatedElement>
          <AnimatedElement as="p" delay={0.2} className="tb-lede">
            Mainly interested in searching for new ways to compress knowledge and make it
            transferable.
          </AnimatedElement>
          <AnimatedElement as="div" delay={0.3} className="tb-actions">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="tb-btn"
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </AnimatedElement>
        </header>

        <section className="tb-section tb-section--tinted">
          <div className="tb-section-header">
            <span className="tb-subtitle">Path</span>
            <h2 className="tb-title">Education &amp; work</h2>
          </div>
          <div className="tb-steps">
            <AnimatedElement as="div" delay={0.1} className="tb-step">
              <span className="tb-step-num" aria-hidden="true">
                一
              </span>
              <h3>Education</h3>
              <p>
                M.S. in Electronic Engineering and Computer Science
                <br />
                <a href="https://www.isep.fr/">ISEP Paris</a> and{' '}
                <a href="https://www.berkeley.edu/">University of California, Berkeley</a>
              </p>
            </AnimatedElement>
            <AnimatedElement as="div" delay={0.2} className="tb-step">
              <span className="tb-step-num" aria-hidden="true">
                二
              </span>
              <h3>Software Engineer</h3>
              <p>
                <a href="https://mistral.ai/">Mistral AI</a> – French AI lab
                <br />
                <a href="https://rockfi.fr/">RockFi</a> – Private wealth management startup
              </p>
            </AnimatedElement>
            <AnimatedElement as="div" delay={0.3} className="tb-step">
              <span className="tb-step-num" aria-hidden="true">
                三
              </span>
              <h3>Software Engineer Internships</h3>
              <p>
                <a href="https://qonto.com/en">Qonto</a> – European leader in neobanking for SMEs
                <br />
                <a href="https://www.ledger.com/">Ledger</a> – Leader in security for crypto-assets
                <br />
                <a href="https://www.idemia.com/">Idemia</a> – Leader in identity technologies
              </p>
            </AnimatedElement>
          </div>
        </section>

        <section className="tb-section">
          <div className="tb-section-header">
            <span className="tb-subtitle">Selected work</span>
            <h2 className="tb-title">Things I made</h2>
          </div>

          <article className="tb-feature">
            <div className="tb-feature-img">
              <Image
                src="/projects/wingsuit-canyon.jpg"
                alt="Wingsuit: flying through a neon city canyon at night"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
            <div className="tb-feature-text">
              <span className="tb-subtitle">Game</span>
              <h3>Wingsuit</h3>
              <p>
                A 3D wingsuit racing game. You BASE jump, then fly 2 km down a procedurally
                generated course against the clock: a neon city canyon, a jungle temple, a night
                forest, temples floating over a sea of clouds.
              </p>
              <p>
                It runs on desktop, in the browser and natively on iPhone, with multiplayer races of
                up to 10 players and leaderboards.
              </p>
              <dl className="tb-stack">
                <div>
                  <dt>Built with</dt>
                  <dd>C++17, raylib, Go race server</dd>
                </div>
                <div>
                  <dt>Runs on</dt>
                  <dd>Desktop, WebAssembly + WebGL 2, iOS</dd>
                </div>
              </dl>
              <ProjectLinks linkProd="https://wingsuit.thomascdnns.com" />
            </div>
          </article>

          <div className="tb-grid">
            <Card
              title="Mistral AI MCP for Le Chat"
              description="Bring the widest enterprise-ready MCP connectors directory (+20 connectors) to Le Chat, with custom extensibility to bring your own connectors."
              linkProd="https://mistral.ai/news/le-chat-mcp-connectors-memories"
              backendStack="MCP"
              frontendStack="Le Chat"
            />
            <Card
              title="Qonto Customer Support Chatbot"
              description="RAG chatbot to help Qonto customers with their questions. Handles 50%+ of customer conversations autonomously and reduced time to solve user issues by 44% for 500k customers."
              linkProd="https://medium.com/qonto-way/meet-qontos-new-genai-chatbot-faster-smarter-and-ready-to-serve-with-mistral-s-power-e5fde2684e46"
              backendStack="RAG and Mistral AI model"
              frontendStack="Qonto website and apps"
            />
            <Card
              title="EEG Seizure Detection AI"
              description="CNN model that detects seizures from EEG brain wave data with 86% accuracy. Processes EEG signals into images for automated medical analysis, helping doctors identify seizure patterns."
              linkRepo="https://huggingface.co/ThomasCdnns/EEG-Seizure-Detection"
              backendStack="Python, PyTorch"
              frontendStack="HuggingFace"
            />
            <Card
              title="Tailored tours"
              description="Implementation of the TSP on a database of 2000 real locations in France to help tourists plan their trip according to their time constraints."
              linkProd="https://map.verycurious.xyz"
              linkRepo="https://github.com/tchardonnens/t3-back"
              backendStack="Go, Gin, SQLite"
              frontendStack="Next.js, Vercel"
            />
            <Card
              title="Plane buddy"
              description="Developed overnight to connect Berkeley BGA program students on flights to reach the campus. Achieved 200+ unique global visitors within 2 days, successfully facilitating meet-ups for several student groups."
              linkProd="https://plane-buddy.vercel.app/"
              linkRepo="https://github.com/tchardonnens/planeBuddy"
              backendStack="Node.js, Next.js, PostgreSQL"
              frontendStack="Next.js, Vercel"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
