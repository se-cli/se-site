# se-site

The Markdown-based documentation site for the se-cli ecosystem, built with
[Docusaurus](https://docusaurus.io/).

- **Site**: https://se-cli.github.io/se-site/
- **Repository**: https://github.com/se-cli/se-site
- **Docs source**: Markdown under `docs/` (English) and
  `i18n/zh-Hans/docusaurus-plugin-content-docs/current/` (简体中文)

## What this site hosts

The se-cli ecosystem consists of three repositories. Their documentation and
landing pages all live here, migrated from hand-written static HTML to clean
Markdown:

| Repo | npm Package | Content |
|------|------------|---------|
| [`se-cli/se-cli`](https://github.com/se-cli/se-cli) | `@browsers-cli/se-cli` | Core CLI + daemon + MCP server |
| [`se-cli/se-mcp`](https://github.com/se-cli/se-mcp) | `@browsers-cli/se-mcp` | Thin MCP server wrapper |
| [`se-cli/se-extension-vscode`](https://github.com/se-cli/se-extension-vscode) | VS Code Marketplace | VS Code extension |

## Local development

```bash
npm install
npm run start        # dev server with hot reload
npm run build        # static build to ./build
npm run serve        # serve the production build locally
```

## Content structure

```
docs/                          # English docs (source of truth)
docs/index.md                  # Docs landing page
docs/getting-started.md        # Guides
docs/sessions.md
docs/snapshots-refs.md
docs/storage-state.md
docs/codegen.md
docs/ai-agents.md
docs/troubleshooting.md
docs/commands.md               # Reference
docs/configuration.md
docs/roadmap.md                # Roadmap
docs/matrix.md
docs/changelog.md
docs/ecosystem.md
i18n/zh-Hans/docusaurus-plugin-content-docs/current/   # 简体中文 translations
src/pages/index.tsx            # Landing page
src/css/custom.css             # se-cli green theme
static/img/                    # Static assets (favicon, logos, og-image)
```

## Deployment

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the site
and deploys it to GitHub Pages on every push to `main`. The site is served at:

```
https://se-cli.github.io/se-site/
```

## License

Apache-2.0. Built with [Docusaurus](https://docusaurus.io/).