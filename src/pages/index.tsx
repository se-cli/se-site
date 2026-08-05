import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const features = [
  {
    icon: '⚡',
    title: '10× fewer tokens',
    desc: 'Compact aria snapshots with refs (e1, e2) instead of full accessibility tree dumps. Schemas never enter the agent’s context.',
  },
  {
    icon: '🌐',
    title: 'Multi-browser',
    desc: 'Chrome, Edge, and Firefox supported out of the box. One CLI, three browsers, single session or parallel named sessions.',
  },
  {
    icon: '🔄',
    title: 'Session persistence',
    desc: 'The daemon holds the WebDriver across CLI calls. No browser restart per command. No driver reconnect overhead.',
  },
  {
    icon: '🏷️',
    title: 'Named sessions',
    desc: 'Run multiple browsers in parallel with -s=name. Isolate contexts, switch between sessions, close them all at once.',
  },
  {
    icon: '🤖',
    title: 'Agent-agnostic',
    desc: 'Works with any AI agent that runs shell commands — Claude Code, Cursor, Copilot CLI. Drop in SKILL.md and go.',
  },
  {
    icon: '📝',
    title: 'Code generation',
    desc: 'Every action emits the equivalent Selenium code. Copy directly into your test files — no translation step.',
  },
  {
    icon: '🎯',
    title: 'Aria snapshots',
    desc: 'YAML representation of the page following W3C ARIA roles. Interactive elements get refs you can act on by name.',
  },
  {
    icon: '🔌',
    title: 'CDP attach',
    desc: 'Attach to a running Chrome via --cdp=<url>. Inspect real sessions, debug real state.',
  },
  {
    icon: '🧪',
    title: 'Tested & CI-ready',
    desc: '1,100+ unit tests and 250+ integration tests. GitHub Actions matrix across OS and browsers. npm publish on release.',
  },
];

const quickStart = [
  {
    title: 'Install',
    lang: 'bash',
    code: 'npm install -g @browsers-cli/se-cli',
  },
  {
    title: 'Open & snapshot',
    lang: 'bash',
    code: `se-cli open https://example.com
se-cli snapshot
# - document:
#   - heading "Example Domain" [level=1]
#   - link "More information..." [ref=e1]`,
  },
  {
    title: 'Interact by ref',
    lang: 'bash',
    code: `se-cli click e1

### Ran Selenium code
await driver.findElement(
  new By('role', { role: 'link', name: 'More information...' })
).click();

se-cli close`,
  },
];

const ecosystem = [
  {
    logo: 'img/logo-se-cli.svg',
    name: 'se-cli',
    version: 'npm',
    badge: 'npm',
    desc: 'The core CLI + daemon. Drives Chrome, Edge, and Firefox with aria snapshots and element refs. Works with any shell or AI agent.',
    install: 'npm i -g @browsers-cli/se-cli',
    links: [
      {label: 'GitHub', href: 'https://github.com/se-cli/se-cli'},
      {label: 'npm', href: 'https://www.npmjs.com/package/@browsers-cli/se-cli'},
      {label: 'Docs', href: '/docs/getting-started'},
    ],
  },
  {
    logo: 'img/logo-se-mcp.svg',
    name: 'se-mcp',
    version: 'npm',
    badge: 'npm',
    desc: 'Thin MCP server wrapper. Exposes all 62 browser automation tools to VS Code, Claude Desktop, Cursor, and any MCP-aware client via stdio.',
    install: 'npx @browsers-cli/se-mcp',
    links: [
      {label: 'GitHub', href: 'https://github.com/se-cli/se-mcp'},
      {label: 'npm', href: 'https://www.npmjs.com/package/@browsers-cli/se-mcp'},
      {label: 'Docs', href: '/docs/ecosystem#se-mcp'},
    ],
  },
  {
    logo: 'img/logo-se-extension-vscode.svg',
    name: 'se-extension-vscode',
    version: 'VS Code',
    badge: 'VS Code',
    desc: 'VS Code extension with a browser panel, status bar, one-click commands, and automatic MCP server registration for Copilot agents.',
    install: 'Search "se-cli" in Extensions',
    links: [
      {label: 'GitHub', href: 'https://github.com/se-cli/se-extension-vscode'},
      {
        label: 'Marketplace',
        href: 'https://marketplace.visualstudio.com/items?itemName=se-cli.se-extension-vscode',
      },
      {label: 'Docs', href: '/docs/ecosystem#se-extension-vscode'},
    ],
  },
];

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--green', styles.hero)}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          Token-efficient Selenium
          <span className={styles.heroAccent}> for AI agents &amp; humans</span>
        </h1>
        <p className={styles.heroSubtitle}>
          A short-lived CLI + long-lived daemon. Chrome, Edge, Firefox — aria
          snapshots keep token cost low.
        </p>
        <div className={styles.heroActions}>
          <Link className="button button--primary button--lg" to="/docs/getting-started">
            Get Started
          </Link>
          <code className={styles.installCode}>npm install -g @browsers-cli/se-cli</code>
        </div>
      </div>
    </header>
  );
}

function TokenCompare() {
  const bars = [
    {label: 'Selenium MCP', value: '~5,000 tokens / call', width: '100%', num: '5,000'},
    {label: 'Raw WebDriver API', value: '~2,000 tokens / call', width: '40%', num: '2,000'},
    {label: 'se-cli', value: '~400 tokens / call', width: '8%', num: '400'},
  ];
  return (
    <section className={clsx('section', styles.sectionAlt)}>
      <div className="container">
        <h2 className="section-title">Token Efficiency</h2>
        <p className="section-lead">
          How much context does each approach burn per interaction? Real numbers
          from typical agent workflows.
        </p>
        <div className={styles.tokenBars}>
          {bars.map((b) => (
            <div key={b.label} className={styles.tokenGroup}>
              <div className={styles.tokenLabel}>
                <span>{b.label}</span>
                <span className={styles.tokenValue}>{b.value}</span>
              </div>
              <div className={styles.tokenTrack}>
                <div className={styles.tokenFill} style={{width: b.width}}>
                  {b.num}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.tokenStats}>
          <div className={styles.tokenStat}>
            <div className={styles.statNumGreen}>12.5×</div>
            <div>fewer tokens vs MCP</div>
          </div>
          <div className={styles.tokenStat}>
            <div className={styles.statNumGreen}>5×</div>
            <div>fewer tokens vs raw API</div>
          </div>
          <div className={styles.tokenStat}>
            <div className={styles.statNumRed}>5KB</div>
            <div>schema eliminated</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Features</h2>
        <p className="section-lead">
          Everything you need to drive a browser from a shell or an AI agent.
        </p>
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className={clsx('section', styles.sectionAlt)}>
      <div className="container">
        <h2 className="section-title">Quick Start</h2>
        <p className="section-lead">
          Install, open a page, snapshot, interact — in under a minute.
        </p>
        <div className={styles.qsGrid}>
          {quickStart.map((s, i) => (
            <div key={s.title} className={styles.qsStep}>
              <div className={styles.qsNum}>{i + 1}</div>
              <h3>{s.title}</h3>
              <pre className={styles.qsCode}>
                <code>{s.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ecosystem() {
  const {siteConfig} = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Ecosystem</h2>
        <p className="section-lead">
          Three packages that work together — pick the one that fits your
          workflow, or combine them all.
        </p>
        <div className={styles.ecoGrid}>
          {ecosystem.map((e) => (
            <div key={e.name} className={styles.ecoCard}>
              <div className={styles.ecoHeader}>
                <img src={`${baseUrl}${e.logo}`} alt={e.name} className={styles.ecoLogo} />
                <span className={styles.ecoBadge}>{e.badge}</span>
              </div>
              <h3>{e.name}</h3>
              <p>{e.desc}</p>
              <code className={styles.ecoInstall}>{e.install}</code>
              <div className={styles.ecoLinks}>
                {e.links.map((l) => (
                  <Link key={l.label} to={l.href} className={styles.ecoLink}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className={clsx('section', styles.sectionAlt)}>
      <div className="container">
        <h2>Start automating with fewer tokens</h2>
        <p>Install se-cli and let your agent drive any browser.</p>
        <div className={styles.ctaButtons}>
          <Link className="button button--primary button--lg" to="/docs/getting-started">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="https://github.com/se-cli/se-cli/blob/main/docs/spec.md">
            Read the Spec
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Token-efficient Selenium for AI agents"
      description="A short-lived CLI + long-lived daemon that drives Chrome, Edge, and Firefox. Aria snapshots and ref references keep token cost low.">
      <main>
        <Hero />
        <section className="section">
          <div className="container">
            <h2 className="section-title">Why se-cli?</h2>
            <p className="section-lead">
              Selenium MCP implementations burn tokens — heavy schemas, full
              accessibility dumps, no CLI. se-cli borrows the proven architecture
              from{' '}
              <a href="https://github.com/microsoft/playwright-cli" target="_blank" rel="noopener">
                playwright-cli
              </a>{' '}
              and ports it to the Selenium ecosystem.
            </p>
            <div className={styles.whyGrid}>
              <div className={styles.whyCard}>
                <div className={clsx(styles.whyLabel, styles.whyLabelRed)}>The Problem</div>
                <p>
                  Selenium MCP loads ~5KB of schema per call. Full accessibility
                  tree is returned every time. No CLI — agents are forced through
                  verbose JSON-RPC envelopes.
                </p>
              </div>
              <div className={styles.whyCard}>
                <div className={clsx(styles.whyLabel, styles.whyLabelGreen)}>The Solution</div>
                <p>
                  A short-lived CLI sends one JSON line to a long-lived daemon.
                  Aria snapshots return compact YAML with element refs. Every
                  action emits reusable Selenium code.
                </p>
              </div>
            </div>
          </div>
        </section>
        <TokenCompare />
        <Features />
        <QuickStart />
        <Ecosystem />
        <Cta />
      </main>
    </Layout>
  );
}