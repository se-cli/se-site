---
title: Roadmap
sidebar_position: 1
---

# Roadmap

The version timeline, feature classification, and the explicit boundary of what se-cli will never become.

## Philosophy

Every feature is ranked by where it lands se-cli's defensibility — not by how flashy it looks.

### Must-Have

The foundation. Without these, se-cli isn't usable or competitive — the CLI/daemon architecture, wait/retry layer, and MCP server. Built first, no exceptions.

### Core

Differentiation. Capabilities that distinguish se-cli from raw WebDriver and from Playwright-CLI — assertions, network, emulation, remote/Grid.

### Marginal

Nice-to-have. Recording, VSCode extension — significant effort, smaller payoff. Scheduled late, may slip.

## Guiding Principles

Revised 2026-07-29 — these four rules decide every "should we build this?" question.

### 1. Selenium-native moat first

Wait/retry/timeout, Grid, custom browsers, real Safari, Edge IE mode. These are strengths Playwright will never match — prioritized as the defensive stronghold.

### 2. Front-load high-value ports

Playwright-CLI features that are easy to port (auto-wait, retry-assertion, device emulation) are ranked by `complexity × importance` and shipped early when the ratio is favourable.

### 3. No "code writing" from the CLI

Every Selenium capability that requires code (explicit waits, `ExpectedConditions`, Actions chains, `setScriptTimeout`) is exposed via the 4-tier priority: `flag > ENV > config file > default`.

### 4. An explicit "never" boundary

To avoid misplaced community expectations, se-cli declares what it will never implement — native aria ref engine, full tracing parity, real IE 11.

## Version Timeline

v0.1–v0.9 are shipped. v0.10–v0.13 are planned, sequenced by dependency and value.

### v0.1 — MVP Architecture `Must-Have` ✓ shipped

CLI + daemon process architecture, basic commands (open/close/goto/click/fill/type/press/snapshot/screenshot/eval), aria snapshot + ref mechanism, named sessions, multi-browser (Chrome/Edge/Firefox), code generation replay.

### v0.2 — Practical Capability Completion `Must-Have` ✓ shipped

Storage management (cookie/localStorage/sessionStorage), state save/load round-trip, tab management, `install --skills`, `--profile` persistent user data dir, `--persistent` auto userDataDir.

### v0.3 — iframe & Shadow DOM `Must-Have` ✓ shipped

Recursive iframe snapshot with cross-frame refs (e.g. `f3e15`), Shadow DOM traversal for open shadow roots, `find` enhanced to search across frames and shadow boundaries.

### v0.4 — Wait & Retry Configuration Layer `Must-Have` ✓ shipped

The foundation every later release depends on. Surfaces Selenium's implicit/explicit wait, pageLoad/script timeout, and `ExpectedConditions` as CLI-native config — `--timeout`, `--wait`, `--retry`, plus `config get/set/list/init`.

### v0.5 — Interaction Completion `Must-Have` ✓ shipped

Closes the gap vs Playwright CLI: `hover`, `dblclick`, `drag`, dialog accept/dismiss, `upload`, `resize`, fine-grained keyboard/mouse control, and `actions-chain` to combine actions into one round-trip.

### v0.6 — Web-First Assertions `Core` ✓ shipped

Playwright-style retry-until-timeout assertions with CI-friendly exit codes: `expect <ref> visible|hidden|enabled|disabled|checked|text|value|count|attribute`, `--not` inversion, `expect title`/`expect url`.

### v0.7 — Network & Debugging `Core` ✓ shipped

BiDi-based network interception (`route`/`unroute`/`route-list`), `console` capture with level filtering, `requests`/`request` listing and inspection, and persistent element `highlight` with `--style`/`--hide`/`--all` via CSS overlay.

### v0.8 — Device & Environment Emulation `Core` ✓ shipped

Device presets (`device "iPhone 13"`), geolocation/timezone/locale/color-scheme/viewport/UA/permissions, network throttling (`slow3g`), CPU slowdown, and offline emulation. State integrated into `state-save`.

### v0.9 — MCP Server & AI Ecosystem `Must-Have` ✓ shipped

Dual-track: CLI+SKILLS for coding agents, MCP Server for autonomous workflows — sharing the same tool implementation. MCP server lives in core (stdio + Streamable HTTP), with a separate [`se-mcp`](https://github.com/se-cli/se-mcp) wrapper package. Adds `run-code`, `generate-locator`, `By.role()` codegen, spec-compliant SKILL.md frontmatter, and multi-target `install --skills`.

### v0.10 — Remote, Grid & Custom Browsers `Core` planned

The Selenium moat. Real Safari via `safaridriver`, Selenium Grid 4 (`--endpoint`), custom browser/driver binaries, `--browser=electron` with `--app-binary` for Electron app testing, cloud browsers (Browserbase/Sauce/BrowserStack), Grid sharding, `pdf` export, and Edge IE mode for legacy scenarios.

### v0.11 — Recording & Visualization `Marginal` planned

`record` mode that emits a complete test file, multi-framework test code export (`export --format=pytest|junit5|mocha`), built-in test report generation (`--report=junit|allure|html`), simplified tracing, video capture (CDP or ffmpeg), video chapters, and a `show` dashboard for multi-session monitoring and page annotation.

### v0.12 — VSCode Extension `Marginal` planned

A separate repo ([`se-extension-vscode`](https://github.com/se-cli/se-extension-vscode)): MCP Server registration, snapshot/screenshot Webview, status bar, and configuration settings. Following the `playwright-vscode` pattern.

### v0.13 — BiDi Expansion & Hardening `Core` planned

Expand WebDriver BiDi coverage beyond v0.7 network/console — `browsingContext` (viewport, print, CSP bypass, downloads), `input` (file dialogs), `script` (preload scripts), `emulation` (cross-browser alternative to CDP). Plus daemon performance optimization (startup, snapshot efficiency, memory) and stability hardening (error recovery, session resilience, circuit breaker retry).

## Long-term Goals

No version commitment — explored when the core stabilizes.

### Multi-language SDK

Python / Java client bindings. The CLI stays Node; bindings wrap the socket protocol.

### Trace Viewer

Simplified GUI playback for recorded traces (aligned with issue #24).

### DOM mutation listener

BiDi DOM mutation events for live ref invalidation.

### Script preload

BiDi script pinning and preloading before page scripts run.

### Localized SKILL.md

Multi-language skill files for non-English agents.

### Test-framework hooks

`pytest-selenium` / JUnit5 integration — attach to test pause points (issue #22).

### Appium mobile

iOS/Android bidirectional, Appium Grid (issue #79).

### Grid management CLI

Selenium Grid 4 hub/node deploy, autoscale, health checks.

## Will Never Implement

> **Will Never Implement** — declared explicitly to avoid misplaced expectations:

- **Native aria ref engine** — cannot match Playwright's `aria-ref` selector engine stability; will always rely on `data-se-ref` attributes.
- **Playwright-level full tracing parity** — Selenium BiDi event stream quality is insufficient for timeline + DOM snapshot + network + console + source map; only a simplified version is pursued.
- **Real IE 11 (IEDriverServer)** — IE 11 is EOL; replaced by Edge IE mode (v0.10). Users needing true IE11 should use legacy Selenium bindings directly.