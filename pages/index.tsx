import { motion } from 'framer-motion';
import { 
  Brain, 
  MapPin, 
  Plane, 
  Search, 
  Gamepad2, 
  Bot, 
  Shield, 
  Database,
  Lock,
  Server,
  Sparkles
} from 'lucide-react';
import HeroSection from '../components/hero-section';
import BentoCard from '../components/bento-card';
import ExperienceCard from '../components/experience-card';
import SectionTitle from '../components/section-title';
import Navigation from '../components/navigation';
import CustomHead from '../components/head';
import GradientText from '../components/gradient-text';

const experiences = {
  work: [
    {
      title: 'Software Engineer',
      organization: 'Mistral AI',
      organizationUrl: 'https://mistral.ai/',
      description: 'French AI lab – Building the future of AI',
    },
    {
      title: 'Software Engineer',
      organization: 'RockFi',
      organizationUrl: 'https://rockfi.fr/',
      description: 'Private wealth management startup',
    },
  ],
  internships: [
    {
      title: 'Software Engineer Intern',
      organization: 'Qonto',
      organizationUrl: 'https://qonto.com/en',
      description: 'European leader in neobanking for SMEs',
    },
    {
      title: 'Software Engineer Intern',
      organization: 'Ledger',
      organizationUrl: 'https://www.ledger.com/',
      description: 'Leader in security for crypto-assets',
    },
    {
      title: 'Software Engineer Intern',
      organization: 'Idemia',
      organizationUrl: 'https://www.idemia.com/',
      description: 'Leader in identity technologies',
    },
  ],
};

const education = [
  {
    title: 'M.S. in Electronic Engineering and Computer Science',
    organization: 'ISEP Paris & UC Berkeley',
    organizationUrl: 'https://www.isep.fr/',
    description: 'Double degree program combining French engineering excellence with Silicon Valley innovation',
  },
];

const projects = [
  {
    title: 'Mistral AI MCP for Le Chat',
    description: 'Bring the widest enterprise-ready MCP connectors directory (+20 connectors) to Le Chat, with custom extensibility to bring your own connectors.',
    icon: <Sparkles className="h-6 w-6" />,
    tags: ['MCP', 'Le Chat', 'AI'],
    linkProd: 'https://mistral.ai/news/le-chat-mcp-connectors-memories',
    size: 'large' as const,
    gradient: true,
  },
  {
    title: 'Qonto Customer Support Chatbot',
    description: 'RAG chatbot handling 50%+ of customer conversations autonomously. Reduced time to solve user issues by 44% for 500k customers.',
    icon: <Bot className="h-6 w-6" />,
    tags: ['RAG', 'Mistral AI', 'Customer Support'],
    linkProd: 'https://medium.com/qonto-way/meet-qontos-new-genai-chatbot-faster-smarter-and-ready-to-serve-with-mistral-s-power-e5fde2684e46',
    size: 'large' as const,
  },
  {
    title: 'EEG Seizure Detection AI',
    description: 'CNN model with 86% accuracy detecting seizures from EEG brain wave data.',
    icon: <Brain className="h-6 w-6" />,
    tags: ['PyTorch', 'Python', 'Healthcare'],
    linkRepo: 'https://huggingface.co/ThomasCdnns/EEG-Seizure-Detection',
    size: 'medium' as const,
  },
  {
    title: 'Tailored Tours',
    description: 'TSP implementation on 2000+ French locations for optimized trip planning.',
    icon: <MapPin className="h-6 w-6" />,
    tags: ['Go', 'Next.js', 'Algorithms'],
    linkProd: 'https://map.verycurious.xyz',
    linkRepo: 'https://github.com/tchardonnens/t3-back',
    size: 'medium' as const,
  },
  {
    title: 'Plane Buddy',
    description: 'Connect students on flights. 200+ unique visitors in 2 days.',
    icon: <Plane className="h-6 w-6" />,
    tags: ['Node.js', 'PostgreSQL', 'Next.js'],
    linkProd: 'https://plane-buddy.vercel.app/',
    linkRepo: 'https://github.com/tchardonnens/planeBuddy',
    size: 'medium' as const,
  },
  {
    title: 'ScanURL',
    description: 'Security analysis tool for URLs and domains.',
    icon: <Search className="h-6 w-6" />,
    tags: ['Python', 'Flask', 'Security'],
    linkProd: 'https://scanurl.thomascdnns.com/',
    linkRepo: 'https://github.com/tchardonnens/scanurl',
    size: 'small' as const,
  },
  {
    title: 'Password Crusher',
    description: 'Cached cracked MD5 password lookup service.',
    icon: <Lock className="h-6 w-6" />,
    tags: ['NestJS', 'Redis', 'Security'],
    linkRepo: 'https://github.com/tchardonnens/pwd-crusher-back',
    size: 'small' as const,
  },
  {
    title: 'Flat Fall Race',
    description: '2D multiplayer race game with JavaFX and Kryonet.',
    icon: <Gamepad2 className="h-6 w-6" />,
    tags: ['Java', 'Kryonet', 'Game Dev'],
    linkRepo: 'https://github.com/tchardonnens/flat-fall-race',
    size: 'small' as const,
  },
  {
    title: 'Minecraft Server Dashboard',
    description: 'Management dashboard for Minecraft servers with custom settings.',
    icon: <Server className="h-6 w-6" />,
    tags: ['PHP', 'JavaScript', 'Gaming'],
    linkRepo: 'https://github.com/tchardonnens/site-minecraft',
    size: 'small' as const,
  },
  {
    title: 'Monkus Bot',
    description: 'Sassy Discord bot powered by GPT-3.5.',
    icon: <Bot className="h-6 w-6" />,
    tags: ['JavaScript', 'OpenAI', 'Discord'],
    linkRepo: 'https://github.com/tchardonnens/monkus',
    size: 'small' as const,
  },
];

export default function Home() {
  return (
    <>
      <CustomHead />
      <Navigation />
      
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        {/* Hero Section */}
        <HeroSection
          name="Thomas Chardonnens"
          location="Paris, France"
          tagline="Software Engineer passionate about AI and knowledge compression. Building tools that make information more accessible and transferable."
        />

        {/* Experience Section */}
        <section id="experience" className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle subtitle="My professional journey and academic background">
              <GradientText>Experience & Education</GradientText>
            </SectionTitle>

            <div className="grid gap-6 md:grid-cols-2">
              <ExperienceCard
                type="work"
                items={experiences.work}
                delay={0.2}
              />
              <ExperienceCard
                type="work"
                items={experiences.internships}
                delay={0.4}
              />
              <ExperienceCard
                type="education"
                items={education}
                delay={0.6}
              />
              
              {/* Interests card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-violet-500/5 p-6 dark:border-neutral-800"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 text-violet-600 dark:text-violet-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-neutral-900 dark:text-white">
                    Interests
                  </h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Mainly interested in searching for new ways to{' '}
                  <span className="font-medium text-orange-600 dark:text-orange-400">
                    compress knowledge
                  </span>{' '}
                  and make it transferable. Passionate about AI, algorithms, and building products that matter.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle subtitle="A collection of my work, side projects, and experiments">
              <GradientText>Projects</GradientText>
            </SectionTitle>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <BentoCard
                  key={project.title}
                  {...project}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-200 px-4 py-12 dark:border-neutral-800">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                © {new Date().getFullYear()} Thomas Chardonnens. Built with Next.js & Tailwind.
              </p>
              <div className="flex gap-6">
                <a
                  href="https://twitter.com/thomas_chardo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
                >
                  Twitter
                </a>
                <a
                  href="https://github.com/tchardonnens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/thomaschardonnens/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
