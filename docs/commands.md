---
title: Command Reference
sidebar_position: 1
---

# Command Reference

se-cli ships with commands grouped into nine categories. Session-level commands run in the CLI process; the rest are forwarded to the daemon. Pick a tab to browse each group.

## Session

| Command | Description |
|---------|-------------|
| `open [url]` | Start daemon + browser, optionally navigate to URL |
| `close` | Close browser and daemon |
| `close --all` | Close every session across all projects |
| `sessions` | List all sessions across all projects (live/dead) |
| `list` | List all sessions |
| `close-all` | Close all sessions gracefully |
| `kill-all` | Force-kill all sessions |
| `logs [--tail=N]` | Tail this session's daemon + CLI log files (default 50 lines) |
| `mcp-server [--http] [--port=N]` | Start the MCP server (stdio default; Streamable HTTP with `--http`) (v0.9) |

## Navigation

| Command | Description |
|---------|-------------|
| `goto <url>` | Navigate to URL |
| `go-back` | Browser back |
| `go-forward` | Browser forward |
| `reload` | Reload page |

## Interaction

| Command | Description |
|---------|-------------|
| `click <ref&vert;selector>` | Click element |
| `fill <ref&vert;selector> <text>` | Clear and fill input |
| `type <text>` | Type into focused element |
| `press <key>` | Press keyboard key (Enter, Tab, Escape, …) |
| `select <ref> <value>` | Select dropdown option |
| `check <ref>` | Check checkbox |
| `uncheck <ref>` | Uncheck checkbox |
| `hover <ref>` | Mouse hover over element (v0.5) |
| `dblclick <ref>` | Double-click element (v0.5) |
| `drag <start> <end>` | Drag and drop element (v0.5) |
| `dialog-accept [text]` | Accept alert/confirm/prompt dialog (v0.5) |
| `dialog-dismiss` | Dismiss dialog (v0.5) |
| `upload <ref> <file>` | Upload file to input element (v0.5) |
| `resize <w> <h>` | Set viewport size (v0.5) |
| `keydown <key>` | Press and hold key (v0.5) |
| `keyup <key>` | Release held key (v0.5) |
| `mousemove <x> <y>` | Move mouse to coordinates (v0.5) |
| `mousedown [button]` | Press mouse button (left/right/middle) (v0.5) |
| `mouseup [button]` | Release mouse button (v0.5) |
| `mousewheel <dx> <dy>` | Scroll wheel by offsets (v0.5) |
| `actions-chain <json>` | Chain multiple actions in one perform() (v0.5) |

> **v0.5 shipped.** All interaction commands consume the v0.4 wait/retry configuration. Use `actions-chain` to batch multiple steps into a single round-trip.

## Snapshot

| Command | Description |
|---------|-------------|
| `snapshot [ref]` | Aria snapshot of page or element subtree |
| `snapshot --depth=N` | Limit snapshot depth |
| `snapshot --filename=f.yml` | Save snapshot to file |
| `find <text>` | Search snapshot for text |
| `find --regex <pattern>` | Search snapshot with regex |

## Save & Execute

| Command | Description |
|---------|-------------|
| `screenshot [ref]` | Take screenshot (full page or element) |
| `screenshot --filename=f.png` | Save screenshot to file |
| `eval "<js>"` | Execute JavaScript, return result |
| `eval "<js>" <ref>` | Execute JavaScript on element |
| `run-code "<snippet>"` | Execute arbitrary Selenium snippet (receives `driver`; v0.9) |
| `generate-locator <ref>` | Recommended locator with match counts (v0.9) |
| `title` | Get page title |
| `url` | Get current URL |

## Storage

| Command | Description |
|---------|-------------|
| `cookie-list` | List all cookies for the current page |
| `cookie-get <name>` | Get a single cookie by name |
| `cookie-set <name> <value>` | Add or overwrite a cookie |
| `cookie-delete [name]` | Delete a cookie by name (omit to delete all) |
| `localstorage-get <key>` | Read a localStorage value |
| `localstorage-set <key> <val>` | Write a localStorage value |
| `localstorage-delete <key>` | Delete a localStorage value |
| `localstorage-delete` | Clear all localStorage (omit key) |
| `sessionstorage-get/set/delete/list` | Same family for sessionStorage |
| `sessionstorage-delete` | Clear all sessionStorage (omit key) |
| `state-save [--filename=f]` | Export cookies + storage to JSON |
| `state-load [--filename=f]` | Restore cookies + storage from JSON |

## Tabs

| Command | Description |
|---------|-------------|
| `tab-list` | List all open tabs/windows in the session |
| `tab-new [url]` | Open a new tab, optionally navigate to URL |
| `tab-close` | Close the current tab |
| `tab-select <index>` | Switch to a tab by 0-based index |

## Config

| Command | Description |
|---------|-------------|
| `config get <key>` | Show a config value and its source |
| `config set <key> <value>` | Write a value to the config file |
| `config list` | List all settings with source (flag/env/file/default) |
| `config init` | Generate a template config file |

> **v0.4.** See the [Configuration](configuration.md) page for the 4-tier priority system and wait/retry flags.

## Assertions (v0.6)

| Command | Description |
|---------|-------------|
| `expect <ref> visible` | Assert element is visible (exit 0/1) |
| `expect <ref> hidden` | Assert element is hidden |
| `expect <ref> enabled` | Assert element is enabled |
| `expect <ref> disabled` | Assert element is disabled |
| `expect <ref> checked` | Assert checkbox is checked |
| `expect <ref> unchecked` | Assert checkbox is unchecked |
| `expect <ref> text "..."` | Assert element text (substring match) |
| `expect <ref> value "..."` | Assert input value |
| `expect <ref> count N` | Assert matching element count |
| `expect <ref> attribute <name> <value>` | Assert attribute value |
| `expect title "..."` | Assert page title |
| `expect url "..."` | Assert page URL |
| `--not` | Invert assertion (e.g. expect NOT visible) |
| `--exact` | Strict match instead of substring |
| `--timeout=<ms>` | Polling timeout (default 5000ms) |

## Network & Debug (v0.7)

| Command | Description |
|---------|-------------|
| `highlight <ref>` | Outline element with persistent CSS overlay (default: 3px solid red) (v0.7) |
| `highlight <ref> --style="2px solid blue"` | Custom CSS outline style (v0.7) |
| `highlight <ref> --hide` | Remove highlight from a specific element (v0.7) |
| `highlight --hide --all` | Remove all highlights (v0.7) |
| `highlight` | List all active highlights (no args) (v0.7) |
| `console` | All buffered console messages since session start (v0.7) |
| `console error` | Filter by level: error, warning, info, verbose (v0.7) |
| `console js-error` | Show only JavaScript exceptions (v0.7) |
| `console --since=5m` | Messages from the last 5 minutes (30s, 1h, ...) (v0.7) |
| `console --clear` | Clear the console buffer after output (v0.7) |
| `requests` | List all buffered network requests (v0.7) |
| `requests --filter="api"` | Filter requests by URL substring (v0.7) |
| `requests --status=500` | Filter by HTTP status code (v0.7) |
| `requests --method=POST` | Filter by HTTP method (v0.7) |
| `requests --clear` | Clear the network request buffer (v0.7) |
| `request <index>` | Show full request details (headers, body, response) (v0.7) |
| `route <pattern> --status=401` | Register a mock response for matching URLs via BiDi (v0.7) |
| `route <pattern> --body='{"error":"..."}'` | Mock with custom response body (v0.7) |
| `route <pattern> --headers='{"X-Custom":"val"}'` | Mock with custom response headers (v0.7) |
| `route-list` | List all active route intercepts (v0.7) |
| `unroute <index>` | Remove a specific route intercept (v0.7) |
| `unroute --all` | Remove all route intercepts (v0.7) |

> **v0.7 shipped.** Network interception and console capture use the Selenium BiDi protocol (`log.entryAdded`, `Network.addIntercept`). The `highlight` command is pure JS injection and works on all browsers — no BiDi required. BiDi listeners initialize lazily on first use of any network/debug command.

## Emulation (v0.8)

| Command | Description |
|---------|-------------|
| `device <name>` | Apply a device preset (viewport + UA + deviceScaleFactor + touch) (v0.8) |
| `device-list` | List all built-in device presets (v0.8) |
| `emulate` | Show current emulation state (v0.8) |
| `emulate --offline` | Go offline (v0.8) |
| `emulate --throttle-network=<profile>` | Throttle network: `slow3g`\|`fast3g`\|`gprs`\|`custom:download=,upload=,latency=` (v0.8) |
| `emulate --throttle-cpu=<rate>` | CPU slowdown rate, e.g. `4` (v0.8) |
| `emulate --reset` | Restore runtime emulation (keeps open-time flags) (v0.8) |
| `open --viewport=<WxH>` | Page viewport size, e.g. `1280x720` (v0.8) |
| `open --user-agent=<ua>` | Override the browser user agent (v0.8) |
| `open --locale=<tag>` | Override page locale, e.g. `zh-CN` (v0.8) |
| `open --color-scheme=<light\|dark>` | Emulate `prefers-color-scheme` (v0.8) |
| `open --timezone=<id>` | Override timezone, e.g. `America/New_York` (v0.8) |
| `open --geolocation=<lat,lon[,accuracy]>` | Override geolocation (v0.8) |
| `open --permissions=<list>` | Grant permissions, e.g. `geolocation,camera` (v0.8) |

> **v0.8 shipped.** Emulation uses CDP (`Emulation.*`, `Network.*`, `Browser.*`) on Chrome/Edge; Firefox supports viewport via WebDriver BiDi. Open-time flags are replayed automatically if the driver rebuilds.

## Flags

| Flag | Description |
|------|-------------|
| `--raw` | Output only the result value (for scripting) |
| `--json` | Structured JSON output |
| `-s=<name>` | Use named session |
| `--browser=chrome\|edge\|firefox` | Browser selection (default: auto-detect Edge → Chrome → Firefox) |
| `--headed` | Show browser window (default: headless) |
| `--cdp=<url>` | Attach to running Chrome via CDP |
| `--profile=<path>` | Persistent user data directory (v0.2) |
| `--persistent` | Auto-assign a persistent userDataDir (v0.2) |
| `--depth=<N>` | Limit aria snapshot recursion (default: 50) |
| `--filename=<f>` | Save snapshot/screenshot to file |
| `--regex=<pattern>` | Search snapshot with regex (find) |
| `--submit` | Submit form after fill (Enter key) |
| `--timeout=<ms>` | Per-command explicit-wait timeout (v0.4, default 5000) |
| `--wait=<state>` | Wait condition: `visible\|hidden\|enabled\|disabled\|stable\|attached\|none\|auto` (v0.4) |
| `--retry=<n>` | Failure retry count, `-1` = until timeout (v0.4) |
| `--retry-interval=<ms>` | Polling interval for retries (v0.4, default 100) |
| `--implicit-wait=<ms>` | Driver implicit wait (v0.4) |
| `--page-load-timeout=<ms>` | `driver.manage().timeouts().pageLoadTimeout()` (v0.4) |
| `--script-timeout=<ms>` | `setScriptTimeout` for async `eval` (v0.4) |
| `--no-wait` | Shorthand for `--wait=none --timeout=0` (v0.4) |
| `--not` | Invert assertion (v0.6) |
| `--exact` | Strict match for assertions (v0.6) |
| `--style="..."` | Custom CSS outline for `highlight` (v0.7) |
| `--hide` | Remove highlight from element(s) (v0.7) |
| `--all` | Apply to all highlights or routes (v0.7) |
| `--since=<duration>` | Time filter for `console` (e.g. `5m`, `30s`, `1h`) (v0.7) |
| `--clear` | Clear buffer after output (console/requests) (v0.7) |
| `--filter="..."` | Filter `requests` by URL substring (v0.7) |
| `--status=<code>` | Filter/mock HTTP status code (v0.7) |
| `--method=<VERB>` | Filter `requests` by HTTP method (v0.7) |
| `--body='...'` | Mock response body for `route` (v0.7) |
| `--headers='{"k":"v"}'` | Mock response headers for `route` (v0.7) |
| `--viewport=<WxH>` | Page viewport size, e.g. `1280x720` (v0.8) |
| `--user-agent=<ua>` | Override the browser user agent (v0.8, Chrome/Edge) |
| `--locale=<tag>` | Override page locale, e.g. `zh-CN` (v0.8, Chrome/Edge) |
| `--color-scheme=<light\|dark>` | Emulate `prefers-color-scheme` (v0.8, Chrome/Edge) |
| `--timezone=<id>` | Override timezone, e.g. `America/New_York` (v0.8, Chrome/Edge) |
| `--geolocation=<lat,lon[,accuracy]>` | Override geolocation (v0.8, Chrome/Edge) |
| `--permissions=<list>` | Grant permissions, e.g. `geolocation,camera` (v0.8, Chrome/Edge) |

## Output formats

Every command returns a response with up to four sections: `Page`, `Snapshot`, `Ran Selenium code`, and `Result`. `--raw` returns only the result value; `--json` returns a structured `{page, snapshot, code, result}` object for pipelines.

```response
### Page
- Page URL: https://example.com/
- Page Title: Example Domain

### Snapshot
- e1 [heading "Welcome"]
- e2 [link "Learn more"]

### Ran Selenium code
await driver.findElement(By.css('[data-se-ref="e2"]')).click();

### Result
clicked
```

See the [Snapshots & Refs](snapshots-refs.md) guide for the algorithm behind `snapshot`, or the [Configuration](configuration.md) page for the v0.4 wait/retry flags.