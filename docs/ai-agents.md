---
title: AI Agents
sidebar_position: 6
---

## Agent integration flow

se-cli works with any AI agent that can run shell commands — Claude Code, Cursor, Copilot CLI, and more. There is no MCP server required for the CLI path: install once, drop in `SKILL.md`, and the agent drives the browser like a human would.

### 1. Install the CLI

One global install — no per-agent setup or MCP server configuration needed.

```bash
npm install -g @browsers-cli/se-cli
```

### 2. Install the skill (recommended)

`install --skills` copies `SKILL.md` into your agent's skills directory so it learns the command syntax instantly. Targets Claude Code (`.claude/skills/se-cli/`), Cursor (`.cursor/skills/se-cli/`), GitHub Copilot (`.github/copilot/skills/se-cli/`), and a generic `.agents/skills/` path (v0.9).

```bash
se-cli install --skills                  # auto-detect installed agent dirs
se-cli install --agent=claude,cursor     # explicit multi-target
se-cli install --list-agents             # show supported targets
se-cli install --force                   # overwrite existing files
```

### 3. Agent drives the browser

The agent calls `se-cli` commands like a human would — open, snapshot, interact, close.

```text
User: "Check that the login page works"
Agent: I'll navigate and test the login flow.
  $ se-cli open https://app.example.com/login
  $ se-cli snapshot
  $ se-cli fill e1 "test@example.com"
  $ se-cli fill e2 "password"
  $ se-cli click e3
  $ se-cli snapshot
  Login succeeded — dashboard is visible.
```

### 4. Why CLI beats MCP for coding agents

No tool schemas pollute the context window. No JSON-RPC envelope overhead. Just clean shell commands and compact YAML output — typically ~12× fewer tokens than Selenium MCP per interaction.

## MCP vs CLI token cost

For a coding agent that already runs shell commands, the CLI path is dramatically cheaper. The MCP Server (below) is for autonomous workflows that need a persistent tool server instead of a shell.

| Aspect | Selenium MCP | se-cli (CLI) |
|--------|--------------|--------------|
| Tokens / call | ~5,000 | ~400 |
| Schema in context | ~5KB, always loaded | None |
| Output format | JSON-RPC envelope + full tree | Compact YAML + refs |
| Agent requirement | MCP client | Any shell-capable agent |
| Persistent server | Yes | No (daemon holds state) |
| Best for | Autonomous long-running workflows | Coding agents (Claude Code, Cursor) |

## MCP Server (Shipped · v0.9)

se-cli ships as an MCP Server (custom JSON-RPC 2.0, no SDK dependency), dual-tracking the CLI: both share the same underlying tool implementation. This covers autonomous agents that prefer a persistent tool server over shell commands.

```text
# stdio transport (default) — local agent
se-cli mcp-server

# thin npm wrapper (recommended for MCP clients)
npx @browsers-cli/se-mcp
```

- All CLI tools wrapped as `registerTool` calls
- `run-code "async driver => ..."` for arbitrary Selenium snippets
- `generate-locator <ref>` for best-available locators
- Role-based codegen (`By.role()`) via the shared codegen module
- SKILL.md frontmatter compliance (`name`, `description`, `license`, `compatibility`)

:::info Dual-track strategy
CLI + SKILLS stays the token-efficient path for coding agents; the MCP Server adds persistent-state tooling for autonomous workflows. Track progress on the [roadmap](roadmap.md).
:::