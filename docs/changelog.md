---
title: Changelog
sidebar_position: 3
---

# Changelog

Per-release notes from the v0.1 MVP through the planned v0.13 BiDi expansion & hardening. Shipped releases are solid; planned releases are dashed.

## v0.1 — MVP Architecture `Must-Have` ✓ shipped

*2026-07-28 · initial release*

The foundational architecture proving the token-efficient CLI + daemon model.

- CLI + Daemon process architecture — short-lived CLI sends one JSON line to a long-lived daemon over a Unix socket / Windows named pipe.
- Basic commands: `open`, `close`, `goto`, `click`, `fill`, `type`, `press`, `snapshot`, `screenshot`, `eval`, `title`, `url`.
- Aria snapshot injection script + `data-se-ref` reference mechanism.
- Named session management (`-s=<name>`) and multi-browser support (Chrome, Edge, Firefox).
- Code generation replay — every action emits the equivalent Selenium code.

## v0.2 — Practical Capability Completion `Must-Have` ✓ shipped

*2026-07 · practical layer*

The capabilities that make se-cli usable for real workflows beyond demos.

- **Storage management**: `cookie-list/get/set/delete`, `localstorage-*`, `sessionstorage-*`.
- **State save/load**: export cookies + storage to JSON, restore by loading in reverse.
- **Tab management**: `tab-list`, `tab-new`, `tab-close`, `tab-select`.
- `install --skills`: copy `SKILL.md` to `.claude/skills/se-cli/` or `.agents/skills/se-cli/`.
- `--profile=<path>` persistent user data directory and `--persistent` auto-assign.

## v0.3 — iframe & Shadow DOM `Must-Have` ✓ shipped

*2026-07 · structural depth*

Full DOM coverage — snapshots no longer stop at frame or shadow boundaries.

- **iframe recursive snapshot**: cross-frame refs (e.g. `f3e15`) navigate into framed content.
- **Shadow DOM recursion**: traverse `el.shadowRoot` for open shadow roots.
- **find command enhancement**: search across frames and shadow DOM boundaries.

## v0.4 — Wait & Retry Configuration Layer `Must-Have` ✓ shipped

*2026-07 · wait & retry foundation*

Surfaces Selenium's implicit/explicit wait, pageLoad/script timeout, and `ExpectedConditions` as CLI-native configuration. Every capability that previously required code is exposed through the 4-tier priority: `flag > ENV > config file > default`.

- Flag layer: `--timeout`, `--wait`, `--retry`, `--retry-interval`, `--implicit-wait`, `--page-load-timeout`, `--script-timeout`, `--no-wait`.
- ENV layer: `SE_CLI_TIMEOUT`, `SE_CLI_WAIT`, `SE_CLI_RETRY`, `SE_CLI_RETRY_INTERVAL`, `SE_CLI_IMPLICIT_WAIT`, `SE_CLI_PAGE_LOAD_TIMEOUT`, `SE_CLI_SCRIPT_TIMEOUT`.
- Config file layer: `.se-cli.json` or `~/.config/se-cli/config.json` with per-command overrides.
- New commands: `config get/set/list/init` (list shows the source per item: flag/env/file/default).
- Codegen reflects the effective strategy: `await driver.wait(until.elementIsVisible(el), 5000);`

## v0.5 — Interaction Completion `Must-Have` ✓ shipped

*2026-07 · interaction parity*

Closes the gap with Playwright CLI on basic interactions. All Actions commands automatically consume the v0.4 wait/retry configuration.

- `hover`, `dblclick`, `drag <start> <end>` via `driver.actions()`.
- `dialog-accept [text]` / `dialog-dismiss` via `driver.switchTo().alert()`.
- `upload <ref> <file>` via `sendKeys(path)`; `resize <w> <h>` viewport control.
- Fine-grained keyboard/mouse: `keydown`/`keyup`, `mousemove`, `mousedown`/`mouseup`, `mousewheel`.
- `actions-chain` command: combine multiple actions into a single `perform()` to reduce round-trips.

## v0.6 — Web-First Assertions `Core` ✓ shipped

*2026-08-01 · CI-friendly testing*

Playwright's `expect(locator).toBeVisible()` retry-until-timeout model, ported to a CLI with exit codes scripts can chain on.

- `expect <ref> visible|hidden|enabled|disabled|checked|unchecked`.
- `expect <ref> text "..." [--exact]`, `value "..."`, `count N`, `attribute <name> <value>`.
- `expect title "..."` / `expect url "..."`.
- Exit codes: success `0`, failure `1` — chain with `&&` in CI.
- `--not` inverts the assertion; defaults to v0.4 `--timeout`.

## v0.7 — Network & Debugging `Core` ✓ shipped

*2026-08-01 · BiDi network & debug*

Leverages the Selenium BiDi protocol (selenium-webdriver@4.46.0) for cross-browser network interception, console log capture, and request inspection — plus persistent element highlighting for visual debugging.

- `route <pattern> --status=/--body=/--headers=`, `route-list`, `unroute <index>` / `unroute --all` via BiDi `Network.addIntercept`.
- `console [level]` — captures `console.log`/`error`/`warn`/`info` and JS exceptions via BiDi `log.entryAdded`; `--since=5m` time filter, `--clear`, `js-error` sub-filter.
- `requests` — list all buffered network requests with `--filter`, `--status`, `--method`, `--clear`; `request <index>` shows full details (headers, body, response).
- `highlight <ref> [--style=]` persistent element highlighting via CSS overlay; `highlight <ref> --hide` removes one; `highlight --hide --all` clears all; bare `highlight` lists active highlights.

## v0.8 — Device & Environment Emulation `Core` ✓ shipped

*2026-08-02 · CDP-first, BiDi fallback*

All capabilities via CDP `Emulation.*` / `Network.*` domains, BiDi as a fallback (viewport on Firefox). Selenium has no native equivalent — CDP makes this trivial to port from Playwright.

- `open --geolocation= --timezone= --locale= --color-scheme= --viewport= --user-agent= --permissions=`.
- `device "iPhone 13"` preset and `device-list` (reference Playwright DeviceDescriptors).
- `emulate --offline`, `--throttle-network=slow3g|fast3g|custom:...`, `--throttle-cpu=4`, `--reset`.
- Emulation state integrated into `state-save`.

## v0.9 — MCP Server & AI Ecosystem `Must-Have` ✓ shipped

*2026-08 · MCP Server & AI ecosystem*

Exposes se-cli as an MCP Server. Dual-track: CLI+SKILLS (token-efficient for coding agents) and MCP Server (persistent state for autonomous workflows) — both share the same underlying tool implementation. MCP server wrapper published as [`se-mcp`](https://github.com/se-cli/se-mcp).

- `se-cli mcp-server`: 62 tools over custom JSON-RPC (no SDK dependency); stdio (default) and Streamable HTTP (`--http`, `POST|GET|DELETE /mcp`, `Mcp-Session-Id`).
- `run-code "async driver => ..."`: execute arbitrary Selenium snippets; returned elements become refs.
- `generate-locator <ref>`: best locator (`new By('role', …)`/`By.css`) with match counts; role-based codegen via `--locator-style=role|css|ref`.
- `SKILL.md` frontmatter compliance (`name`, `description`, `license`, `compatibility`) and multi-target `install --skills` (auto-detect, `--agent`, `--path`, `--force`, `--list-agents`).

## v0.10 — Remote, Grid & Custom Browsers `Core` planned

*planned · the Selenium moat*

The differentiated stronghold — the area Playwright will never match. Extends browser coverage and connection capabilities.

- `--browser=safari` via `safaridriver` (macOS only, no headless/BiDi/CDP).
- `--endpoint=<url>`: Selenium Grid 4 or remote WebDriver; `grid status/attach/distribute --shard=x/y`.
- `--browser-binary`, `--driver-binary`, `--browser-args`, `--browser-prefs`, `--capabilities` (cover all W3C WebDriver endpoints).
- Cloud browser integration: Browserbase, Sauce Labs, BrowserStack.
- `pdf --filename=f` via CDP `Page.printToPDF` (Chromium only).
- `--browser=edge-ie`: Edge IE mode for legacy IE scenarios (Windows Edge Enterprise only, auto-configures policy).

## v0.11 — Recording & Visualization `Marginal` planned

*planned · dev & debug workflows*

High implementation complexity but significant differentiation potential. Scheduled late; may slip.

- `se-cli record`: recording mode — user actions generate a complete test file.
- `tracing-start` / `tracing-stop`: simplified operation tracing (see "Will Never Implement").
- `video-start` / `video-stop` / `video-chapter <title>`: CDP or ffmpeg frame capture.
- `show` dashboard for multi-session monitoring; `show --annotate` for design feedback.

## v0.12 — VSCode Extension `Marginal` partially delivered

*2026-08 · separate GitHub repo — initial implementation delivered*

A separate repo ([`se-extension-vscode`](https://github.com/se-cli/se-extension-vscode)) that depends on se-cli CLI being globally installed. Initial implementation includes MCP registration, commands, webview, and status bar.

- **Task Provider**: register se-cli commands as VSCode custom tasks.
- **Webview**: browser screenshot and aria snapshot preview via `postMessage`.
- **MCP Server auto-registration**: write `.vscode/mcp.json` on install.
- `attach --extension`: connect to a real browser through the extension.

## v0.13 — BiDi Expansion & Hardening `Core` planned

*planned · issues #76 #77 #78*

Expand WebDriver BiDi coverage beyond v0.7 and harden the daemon for production reliability.

- **BiDi protocol expansion**: `browsingContext` (viewport, print, CSP bypass, downloads), `input` (file dialogs), `script` (preload scripts), `emulation` (cross-browser alternative to CDP).
- **Performance optimization**: lazy driver loading, incremental snapshots (`snapshot --diff`), memory-efficient buffers, gzip compression.
- **Stability hardening**: driver crash auto-recovery, BiDi WebSocket reconnection, circuit breaker retry, standardized exit codes.

## Will Never Implement

> **Will Never Implement.**

- Native aria ref engine — relies on `data-se-ref` attributes permanently.
- Playwright-level full tracing parity — only a simplified version is pursued.
- Real IE 11 (IEDriverServer) — replaced by Edge IE mode in v0.10.