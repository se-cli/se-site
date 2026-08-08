import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'se-cli',
  tagline: 'Token-efficient Selenium for AI agents & humans',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://se-cli.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/se-site/',

  // GitHub pages deployment config.
  organizationName: 'se-cli', // Usually your GitHub org/user name.
  projectName: 'se-site', // Usually your repo name.

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: () => {},
    },
  },

  trailingSlash: false,

  // Cloudflare Web Analytics - privacy-friendly, cookie-free pageview stats.
  // Injected into <head> on every page (both locales).
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'module',
        src: 'https://static.cloudflareinsights.com/beacon.min.js',
        'data-cf-beacon': '{"token": "759f2f4c57ac477389ae6d62f5cafa96"}',
      },
    },
  ],

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
    localeConfigs: {
      en: {label: 'English'},
      'zh-Hans': {label: '简体中文'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/se-cli/se-site/tree/main/',
        },
        // blog disabled — the site is docs-focused
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.png',
    lastUpdated: {
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
      },
    },
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: 'version',
      content:
        'se-cli v0.9.1 · se-mcp v0.2 · se-extension-vscode v0.2 — get started with the <a href="docs/getting-started">Getting Started guide</a>.',
      backgroundColor: '#f0fdf4',
      textColor: '#166534',
    },
    navbar: {
      title: 'se-cli',
      logo: {
        alt: 'se-cli',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'guides',
          position: 'left',
          label: 'Guides',
        },
        {
          type: 'docSidebar',
          sidebarId: 'reference',
          position: 'left',
          label: 'Reference',
        },
        {to: '/docs/ecosystem', label: 'Ecosystem', position: 'left'},
        {to: '/docs/roadmap', label: 'Roadmap', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/se-cli/se-cli',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting Started', to: '/docs/getting-started'},
            {label: 'Command Reference', to: '/docs/commands'},
            {label: 'Configuration', to: '/docs/configuration'},
            {label: 'Ecosystem', to: '/docs/ecosystem'},
          ],
        },
        {
          title: 'Roadmap',
          items: [
            {label: 'Roadmap', to: '/docs/roadmap'},
            {label: 'Implementation Matrix', to: '/docs/matrix'},
            {label: 'Changelog', to: '/docs/changelog'},
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {label: 'se-cli', href: 'https://github.com/se-cli/se-cli'},
            {label: 'se-mcp', href: 'https://github.com/se-cli/se-mcp'},
            {
              label: 'se-extension-vscode',
              href: 'https://github.com/se-cli/se-extension-vscode',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'npm — @browsers-cli/se-cli',
              href: 'https://www.npmjs.com/package/@browsers-cli/se-cli',
            },
            {
              label: 'npm — @browsers-cli/se-mcp',
              href: 'https://www.npmjs.com/package/@browsers-cli/se-mcp',
            },
            {
              label: 'VS Code Marketplace',
              href: 'https://marketplace.visualstudio.com/items?itemName=se-cli.se-extension-vscode',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} se-cli. Apache-2.0. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;