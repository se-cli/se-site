---
title: Ecosystem
sidebar_position: 8
---

The se-cli ecosystem — three packages that work together for CLI, MCP, and VS Code workflows.

## Overview

The se-cli ecosystem follows the Playwright multi-repo pattern. Three independent repositories each serve a different entry point — the core CLI, an MCP server wrapper, and a VS Code extension. All three share the same daemon architecture and WebDriver instance.

## se-mcp

### What is se-mcp?

se-mcp is a thin MCP (Model Context Protocol) server wrapper around se-cli. It exposes 50+ browser automation tools to MCP-aware AI clients like VS Code, Claude Desktop, Cursor, and Claude Code via stdio JSON-RPC 2.0.

- Package: `@browsers-cli/se-mcp` on npm
- Repository: [https://github.com/se-cli/se-mcp](https://github.com/se-cli/se-mcp)

### Installation

```bash
npx @browsers-cli/se-mcp
```

No global install needed — `npx` downloads and runs the latest version automatically.

### Configuration

Add se-mcp to your MCP client configuration. The server name is `se-cli`.

**VS Code** (settings.json):

```json
{
  "mcp.servers": {
    "se-cli": {
      "command": "npx",
      "args": ["-y", "@browsers-cli/se-mcp"]
    }
  }
}
```

**Claude Desktop** (claude_desktop_config.json):

```json
{
  "mcpServers": {
    "se-cli": {
      "command": "npx",
      "args": ["-y", "@browsers-cli/se-mcp"]
    }
  }
}
```

**Cursor** (~/.cursor/mcp.json):

```json
{
  "mcpServers": {
    "se-cli": {
      "command": "npx",
      "args": ["-y", "@browsers-cli/se-mcp"]
    }
  }
}
```

### Tool Catalog

se-mcp exposes 50+ MCP tools covering the full browser automation lifecycle. All tools are prefixed with `browser_`.

| Tool | Description |
|------|-------------|
| `browser_open` | Start a browser session (Chrome, Edge, or Firefox) |
| `browser_close` | Close a browser session and stop the daemon |
| `browser_navigate` | Navigate to a URL |
| `browser_click` | Click an element by ref or CSS selector |
| `browser_fill` | Fill an input field with text |
| `browser_snapshot` | Take an accessibility (aria) snapshot with element refs |
| `browser_screenshot` | Take a screenshot of the page or element |
| `browser_eval` | Execute JavaScript in the page |
| `browser_run_code` | Execute arbitrary Selenium snippets (v0.9) |
| `browser_generate_locator` | Recommended locator for a ref, with match counts (v0.9) |
| `browser_tab_list` | List all open tabs |
| `browser_cookie_list` | List all cookies |
| `browser_state_save` | Save browser state to JSON |
| `browser_expect` | Assert conditions (visible, hidden, text, value, etc.) |
| `browser_route` | Mock a network route |
| `browser_console` | Get buffered console messages and JS errors |

## se-extension-vscode

### What is se-extension-vscode?

A Visual Studio Code extension for se-cli. It provides a sidebar browser panel that renders aria snapshots and screenshots, a status bar reflecting daemon state, one-click commands for common browser actions, and automatic registration of the se-cli MCP server for Copilot agents.

- Publisher: `se-cli` on VS Code Marketplace
- Repository: [https://github.com/se-cli/se-extension-vscode](https://github.com/se-cli/se-extension-vscode)

### Installation

Search "se-cli" in the Extensions view (Ctrl+Shift+X).

Or install from the command line:

```bash
code --install-extension se-cli.se-extension-vscode
```

### Features

- **MCP server integration** — se-cli is registered as a Model Context Protocol server via `contributes.mcpServers`, exposing 40+ browser automation tools to VS Code agents.
- **Browser panel** — a webview in the activity bar showing the last aria snapshot as a tree, the last screenshot, quick action buttons (Open, Close, Navigate, Snapshot, Screenshot, Click, Fill), and a command history.
- **Status bar** — live daemon status (running browser / stopped). Click to open a quick pick of all commands.
- **Auto-snapshot** — optionally take an aria snapshot after every navigation or interaction so the panel always reflects the current page.
- **Works with or without a global install** — uses a configured `se-cli` binary, a global install on PATH, or falls back to `npx @browsers-cli/se-cli`.

### Configuration

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `se-cli.browser` | `chrome` \| `edge` \| `firefox` | `chrome` | Browser to launch when starting a session. |
| `se-cli.headless` | `boolean` | `false` | Run the browser in headless mode. Disable to show the browser window. |
| `se-cli.session` | `string` | `default` | Named session for browser isolation / parallel sessions. |
| `se-cli.autoSnapshot` | `boolean` | `true` | Auto-take an aria snapshot after navigation/interaction. |
| `se-cli.cliPath` | `string` | `""` | Path to the se-cli binary. Empty = auto-detect, then npx fallback. |

### Commands

| Command | Description |
|---------|-------------|
| `se-cli.openBrowser` | Pick a browser and start a daemon session. |
| `se-cli.closeBrowser` | Stop the daemon and close the browser. |
| `se-cli.navigate` | Run `goto <url>`. |
| `se-cli.snapshot` | Run `snapshot` and render the tree in the panel. |
| `se-cli.screenshot` | Run `screenshot` and display the image in the panel. |
| `se-cli.click` | Click by ref (`e1`) or CSS selector. |
| `se-cli.fill` | Fill an input by ref/selector with text. |
| `se-cli.runCommand` | Quick pick of all available commands. |

## Architecture

All three packages share the same se-cli daemon, which holds the WebDriver instance. The CLI sends one JSON line per command over a Unix socket (or Windows named pipe). se-mcp wraps the MCP server from se-cli, translating JSON-RPC 2.0 calls into CLI args. The VS Code extension spawns the CLI directly for its commands and registers the MCP server for Copilot agent integration.

```text
┌─────────────┐   shell    ┌──────────┐   JSON    ┌──────────┐   WebDriver  ┌────────┐
│  AI Agent   │───────────►│  se-cli  │─────────►│  Daemon  │─────────────►│Browser │
│  (shell)    │            │  CLI     │  socket   │          │              │        │
└─────────────┘            └────┬─────┘           └──────────┘              └────────┘
                                │
                                │ require()
                                ▼
┌─────────────┐  JSON-RPC  ┌──────────┐
│  VS Code    │◄──────────►│  se-mcp  │
│  Copilot    │  stdio     │  wrapper │
└─────────────┘            └──────────┘
                                │
                                │ spawns
┌─────────────┐  spawns     ┌──────────┐
│  VS Code    │────────────►│  se-cli  │
│  Extension  │             │  CLI     │
│  Panel      │             └──────────┘
└─────────────┘
```

## Which package should I use?

| Use case | Package |
|----------|---------|
| Shell scripts, terminal automation | se-cli |
| Claude Code, any shell-based AI agent | se-cli |
| Claude Desktop, Cursor (MCP clients) | se-mcp |
| VS Code with Copilot agents | se-extension-vscode |
| VS Code with browser panel UI | se-extension-vscode |
| Programmatic MCP server in Node.js | se-mcp |
| All of the above | se-cli + se-mcp + se-extension-vscode |