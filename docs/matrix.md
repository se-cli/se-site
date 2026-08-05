---
title: Feature Matrix
sidebar_position: 2
---

# Feature Matrix

Every capability mapped against the five supported browser targets. Filter by browser or version to scope a release.

**Legend:** ✓ Full support · ◐ Partial / degraded · ○ Planned · — Not supported

| Capability | Since | Chrome | Edge | Firefox | Safari | Edge IE |
|---|---|---|---|---|---|---|
| **Session & Architecture** | | | | | | |
| CLI + Daemon architecture | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Named sessions / parallel browsers | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Multi-browser launch | v0.1 | ✓ | ✓ | ✓ | ○ | ○ |
| CDP attach (`--cdp`) | v0.1 | ✓ | ✓ | — | — | — |
| Persistent profile (`--profile`) | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Navigation** | | | | | | |
| goto / go-back / go-forward / reload | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| title / url | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Interaction** | | | | | | |
| click / fill / type / press | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| select / check / uncheck | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| hover / dblclick / drag | v0.5 | ✓ | ✓ | ✓ | ✓ | ◐ |
| dialog accept / dismiss | v0.5 | ✓ | ✓ | ✓ | ✓ | ✓ |
| upload / resize viewport | v0.5 | ✓ | ✓ | ✓ | ✓ | ✓ |
| keyboard / mouse fine control | v0.5 | ✓ | ✓ | ✓ | ✓ | ◐ |
| `actions-chain` batch | v0.5 | ✓ | ✓ | ✓ | ✓ | ◐ |
| **Snapshot & Search** | | | | | | |
| aria snapshot + ref mechanism | v0.1 | ✓ | ✓ | ✓ | ✓ | ◐ |
| find / find --regex | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| iframe recursive snapshot | v0.3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Shadow DOM recursion | v0.3 | ✓ | ✓ | ✓ | ✓ | — |
| **Storage & State** | | | | | | |
| cookie / localStorage / sessionStorage | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| state-save / state-load | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| tab management | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Wait & Retry (v0.4)** | | | | | | |
| `--timeout` / `--wait` / `--retry` | v0.4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 4-tier config priority | v0.4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| config get / set / list / init | v0.4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Assertions (v0.6)** | | | | | | |
| expect visible / hidden / enabled / disabled | v0.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| expect text / value / count / attribute | v0.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| `--not` inversion / exit codes | v0.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Network & Debugging (v0.7)** | | | | | | |
| route / unroute (interception) | v0.7 | ✓ | ✓ | ✓ | — | — |
| console capture | v0.7 | ✓ | ✓ | ✓ | — | ◐ |
| requests / js-error | v0.7 | ✓ | ✓ | ✓ | — | ◐ |
| highlight / highlight --hide | v0.7 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Device Emulation (v0.8)** | | | | | | |
| device presets / viewport | v0.8 | ✓ | ✓ | ◐ | — | — |
| geolocation / timezone / locale | v0.8 | ✓ | ✓ | ◐ | — | — |
| throttle network / cpu / offline | v0.8 | ✓ | ✓ | ◐ | — | — |
| **MCP & AI (v0.9)** | | | | | | |
| MCP server (stdio / HTTP) | v0.9 | ✓ | ✓ | ✓ | ✓ | ✓ |
| run-code / generate-locator | v0.9 | ✓ | ✓ | ✓ | ✓ | ✓ |
| `By.role()` codegen | v0.9 | ✓ | ✓ | ✓ | ✓ | ✓ |
| install --skills (multi-target) | v0.9 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Remote & Browsers (v0.10)** | | | | | | |
| Safari (`safaridriver`) | v0.10 | — | — | — | ○ | — |
| Selenium Grid (`--endpoint`) | v0.10 | ○ | ○ | ○ | ○ | ○ |
| custom browser / driver binary | v0.10 | ○ | ○ | ○ | ○ | ○ |
| Edge IE mode | v0.10 | — | — | — | — | ○ |
| cloud browsers (Browserbase / Sauce / BrowserStack) | v0.10 | ○ | ○ | ○ | ○ | ○ |
| pdf export | v0.10 | ○ | ○ | — | — | — |
| **Recording (v0.11)** | | | | | | |
| record mode → test file | v0.11 | ○ | ○ | ○ | ○ | ○ |
| tracing start / stop | v0.11 | ○ | ○ | ◐ | — | — |
| video capture | v0.11 | ○ | ○ | ◐ | — | — |
| show dashboard / annotate | v0.11 | ○ | ○ | ○ | ○ | ○ |
| **VSCode Extension (v0.12)** | | | | | | |
| task provider / webview | v0.12 | ○ | ○ | ○ | ○ | ○ |
| MCP auto-registration / attach | v0.12 | ○ | ○ | ○ | ○ | ○ |
| **BiDi Expansion & Hardening (v0.13)** | | | | | | |
| BiDi browsingContext / input / script / emulation | v0.13 | ○ | ○ | ○ | — | — |
| performance & stability optimization | v0.13 | ○ | ○ | ○ | ○ | ○ |

**Notes.** Safari has no headless, BiDi, or CDP support — only basic navigation, interaction, screenshot, storage, and iframe work. Edge IE mode is Windows Enterprise only; the IE engine lacks Shadow DOM, emulation, BiDi interception, and recording — capabilities marked ◐ run in a degraded form (Actions chain steps, partial CDP for console/network monitoring). Capabilities marked ○ are scheduled but not yet shipped.