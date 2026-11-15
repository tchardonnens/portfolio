interface Entry {
  name: string;
  /** Omitted when no logo file is available: the tile shows the name instead. */
  logo?: string;
  /** Rendered logo height in px; wordmarks differ a lot in visual weight. */
  logoHeight?: number;
  href: string;
  role: string;
  about: string;
  highlight?: { text: string; href: string };
}

const WORK: Entry[] = [
  {
    name: 'Mistral AI',
    logo: '/logos/mistral.svg',
    logoHeight: 42,
    href: 'https://mistral.ai/',
    role: 'Software Engineer',
    about: 'French AI lab',
    highlight: {
      text: 'MCP connectors for Le Chat: a directory of 20+ enterprise-ready connectors',
      href: 'https://mistral.ai/news/le-chat-mcp-connectors-memories',
    },
  },
  {
    name: 'RockFi',
    logo: '/logos/rockfi.svg',
    logoHeight: 28,
    href: 'https://rockfi.fr/',
    role: 'Software Engineer',
    about: 'Private wealth management startup',
  },
  {
    name: 'Qonto',
    logo: '/logos/qonto.jpg',
    logoHeight: 30,
    href: 'https://qonto.com/en',
    role: 'Software Engineer Intern',
    about: 'European leader in neobanking for SMEs',
    highlight: {
      text: 'Customer support chatbot: handles 50%+ of conversations for 500k customers',
      href: 'https://medium.com/qonto-way/meet-qontos-new-genai-chatbot-faster-smarter-and-ready-to-serve-with-mistral-s-power-e5fde2684e46',
    },
  },
  {
    name: 'Ledger',
    logo: '/logos/ledger.svg',
    logoHeight: 31,
    href: 'https://www.ledger.com/',
    role: 'Software Engineer Intern',
    about: 'Leader in security for crypto-assets',
  },
  {
    name: 'Idemia',
    logo: '/logos/idemia.svg',
    logoHeight: 26,
    href: 'https://www.idemia.com/',
    role: 'Software Engineer Intern',
    about: 'Leader in identity technologies',
  },
];

const SCHOOLS: Entry[] = [
  {
    name: 'ISEP',
    logo: '/logos/isep.svg',
    logoHeight: 48,
    href: 'https://www.isep.fr/',
    role: 'M.S. in Electronic Engineering and Computer Science',
    about: 'Engineering school, Paris',
  },
  {
    name: 'University of California, Berkeley',
    logo: '/logos/berkeley.svg',
    logoHeight: 42,
    href: 'https://www.berkeley.edu/',
    role: 'Exchange semester',
    about: 'Berkeley, California · 2023',
  },
];

function Row({ entry }: { entry: Entry }) {
  return (
    <li className="tb-xp-row">
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        className="tb-logo"
        aria-label={entry.name}
      >
        {entry.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={entry.logo} alt={`${entry.name} logo`} style={{ height: entry.logoHeight }} />
        ) : (
          <span className="tb-logo-name">{entry.name}</span>
        )}
      </a>
      <div className="tb-xp-body">
        <h4>{entry.role}</h4>
        <p className="tb-xp-org">
          <a href={entry.href} target="_blank" rel="noopener noreferrer">
            {entry.name}
          </a>
          <span> · {entry.about}</span>
        </p>
        {entry.highlight && (
          <a
            href={entry.highlight.href}
            target="_blank"
            rel="noopener noreferrer"
            className="tb-xp-highlight"
          >
            {entry.highlight.text} <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <div className="tb-xp">
      <div>
        <h3 className="tb-xp-heading">Experience</h3>
        <ul>
          {WORK.map((e) => (
            <Row key={e.name} entry={e} />
          ))}
        </ul>
      </div>
      <div>
        <h3 className="tb-xp-heading">Education</h3>
        <ul>
          {SCHOOLS.map((e) => (
            <Row key={e.name} entry={e} />
          ))}
        </ul>
      </div>
    </div>
  );
}
