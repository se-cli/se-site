---
title: Configuration
sidebar_position: 2
---

# Configuration

## v0.4 Wait & Retry Configuration Layer

The v0.4 release surfaces Selenium's implicit/explicit wait, pageLoad/script timeout, and `ExpectedConditions` as CLI-native configuration. Every capability that previously required code (explicit waits, `ExpectedConditions`, Actions chains, `setScriptTimeout`) is exposed through a four-tier priority — there is no "code writing" from the CLI.

```
Priority (high → low)

  ┌───────────────────────────┐
  │  --flag  (per-command)    │   highest — overrides everything
  ├───────────────────────────┤
  │  ENV  (SE_CLI_*)          │   process environment
  ├───────────────────────────┤
  │  .se-cli.json / config    │   project / user config file
  ├───────────────────────────┤
  │  built-in default         │   lowest — safe defaults
  └───────────────────────────┘
```

### Wait / retry flags

| Flag | Description | Default |
|------|-------------|---------|
| `--timeout=<ms>` | Per-command explicit-wait timeout | 5000 |
| `--wait=<state>` | visible \| hidden \| enabled \| disabled \| stable \| attached \| none \| auto | auto |
| `--retry=<n>` | Failure retry count (`-1` = until timeout) | 0 |
| `--retry-interval=<ms>` | Polling interval | 100 |
| `--implicit-wait=<ms>` | Driver implicit wait (discouraged but compatible) | 0 |
| `--page-load-timeout=<ms>` | `driver.manage().setTimeouts({ pageLoad })` | 30000 |
| `--script-timeout=<ms>` | `setScriptTimeout` (affects async `eval`) | 30000 |
| `--no-wait` | Shorthand for `--wait=none --timeout=0` (precise-timing scenarios) | — |

### Config file schema

The config file lives at `.se-cli.json` in the project root or `~/.config/se-cli/config.json` for user-wide settings. The `perCommand` block applies the wait strategy per command type.

```json
{
  "wait": { "timeout": 5000, "state": "auto", "retry": 0, "retryInterval": 100 },
  "timeouts": { "implicit": 0, "pageLoad": 30000, "script": 30000 },
  "perCommand": {
    "click":    { "wait": "visible+enabled" },
    "fill":     { "wait": "visible+enabled" },
    "snapshot": { "wait": "none" },
    "eval":     { "wait": "none", "scriptTimeout": 30000 }
  }
}
```

### Config commands

| Command | Description |
|---------|-------------|
| `config get <key>` | Show a config value and its source |
| `config set <key> <value>` | Write a value to the config file |
| `config list` | List every config item with its source (flag / env / file / default) |
| `config init` | Generate a template config file |

> **Code generation reflects the strategy.** The emitted Selenium code mirrors the effective wait, e.g. `await driver.wait(until.elementIsVisible(el), 5000);`

## Environment variables

Selenium ecosystem environment variables, driver paths, and configuration tips for se-cli users.

### 🔧 se-cli Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SE_CLI_SESSION` | Default session name when `-s` flag is not provided | my-session |
| `SE_CLI_E2E` | Set to `1` to run integration tests (requires real browsers) | 1 |
| `SE_CLI_TEST_CHROME` | Set to `1` to run Chrome integration test cases | 1 |
| `SE_CLI_TEST_EDGE` | Set to `1` to run Edge integration test cases | 1 |
| `SE_CLI_TEST_FIREFOX` | Set to `1` to run Firefox integration test cases | 1 |

### ⚙️ Selenium Manager Variables

`selenium-manager` (bundled with `selenium-webdriver`) auto-downloads drivers. Priority: CLI args > config file (`~/.cache/selenium/se-config.toml`) > env vars.

| Variable | Description | Example |
|----------|-------------|---------|
| `SE_BROWSER` | Browser name for driver resolution | chrome |
| `SE_DRIVER` | Driver name to use | chromedriver |
| `SE_BROWSER_VERSION` | Pin browser major version | 120, beta, dev |
| `SE_DRIVER_VERSION` | Pin driver version | 120.0.6099.71 |
| `SE_BROWSER_PATH` | Absolute path to browser binary (for version detection) | /usr/bin/google-chrome |
| `SE_DRIVER_MIRROR_URL` | Mirror URL for driver downloads (useful in China) | https://npmmirror.com/mirrors/chromedriver/ |
| `SE_BROWSER_MIRROR_URL` | Mirror URL for browser downloads | https://mirror.example.com/firefox/ |
| `SE_PROXY` | HTTP proxy for network requests | user:pass@proxy:8080 |
| `SE_TIMEOUT` | Network request timeout in seconds | 600 |
| `SE_OFFLINE` | Disable network requests and downloads | true |
| `SE_CACHE_PATH` | Local cache path for drivers and browsers | ~/.cache/selenium |
| `SE_SKIP_DRIVER_IN_PATH` | Ignore drivers found in system PATH | true |
| `SE_SKIP_BROWSER_IN_PATH` | Ignore browsers found in system PATH | true |
| `SE_AVOID_STATS` | Disable anonymous usage statistics reporting | true |
| `SE_DEBUG` | Enable DEBUG-level Selenium Manager logs | true |

### 📁 Driver Path System Properties

Traditional driver location via JVM system properties. When set, Selenium Manager won't intervene (acts as fallback only). se-cli passes these to the underlying `selenium-webdriver` Builder.

| Property | Description | Example |
|----------|-------------|---------|
| `webdriver.chrome.driver` | Path to ChromeDriver binary | /usr/local/bin/chromedriver |
| `webdriver.gecko.driver` | Path to GeckoDriver (Firefox) binary | /usr/local/bin/geckodriver |
| `webdriver.edge.driver` | Path to Microsoft EdgeDriver binary | C:\drivers\msedgedriver.exe |
| `webdriver.ie.driver` | Path to IEDriverServer binary | C:\drivers\IEDriverServer.exe |

> **Tip:** On Node.js, set these before launching se-cli: `webdriver.chrome.driver=/path/to/chromedriver se-cli open https://example.com`. Or put the driver binary in your system `PATH` — Selenium Manager will find it automatically.

### 🌐 Browser Binary Path Variables

When browsers are installed in non-default locations, use these variables to help Selenium Manager locate them.

| Variable | Description | Example |
|----------|-------------|---------|
| `SE_BROWSER_PATH` | Selenium Manager — browser binary absolute path | C:\Program Files\Google\Chrome\Application\chrome.exe |
| `CHROME_BIN` | Chrome/Chromium binary path (recognized by some tools) | /usr/bin/google-chrome-stable |
| `CHROME_PATH` | Alternative Chrome binary path variable | /opt/google/chrome/chrome |
| `FIREFOX_BIN` | Firefox binary path | /usr/bin/firefox |
| `MOZ_HEADLESS` | Firefox headless mode switch (recognized by Firefox itself) | 1 |

### 🔗 Remote WebDriver & Grid Variables

For connecting to Selenium Grid or cloud providers (BrowserStack, Sauce Labs, etc.). se-cli's `--endpoint` flag for Grid attach is on the v0.10 roadmap.

| Variable | Description | Example |
|----------|-------------|---------|
| `SELENIUM_REMOTE_URL` | Remote WebDriver server URL (Grid or SaaS) | http://localhost:4444 |
| `SELENIUM_GRID_URL` | Selenium Grid URL (alternative binding) | http://grid.example.com:4444 |
| `SE_HUB_HOST` | Grid Hub hostname | grid.example.com |
| `SE_HUB_PORT` | Grid Hub port (default: 4444) | 4444 |
| `SE_NODE_MAX_SESSIONS` | Max concurrent sessions per node (default: 1) | 4 |
| `SE_NODE_SESSION_TIMEOUT` | Session idle timeout in seconds (default: 300) | 600 |

> **Note:** se-cli currently manages local browsers only. Remote Grid attach (`--endpoint`) is planned for v0.10. The variables above are recognized by the underlying `selenium-webdriver` library when configuring remote connections manually.

### 🐳 Docker & CI Tips

Common patterns for running se-cli in Docker containers and CI pipelines.

| Variable | Description | Example |
|----------|-------------|---------|
| `SE_OFFLINE` | Use pre-installed browsers/drivers in Docker image (default: true in Selenium images) | true |
| `SE_SCREEN_WIDTH` | Screen width for headless display (Docker) | 1920 |
| `SE_SCREEN_HEIGHT` | Screen height for headless display (Docker) | 1080 |
| `SE_START_XVFB` | Start Xvfb virtual display in container | true |
| `DISPLAY` | X11 display address for Linux headless environments | :99 |
| `SE_JAVA_OPTS` | Extra JVM options for Selenium Grid components | -Xmx512m |

> **CI tip:** In GitHub Actions, Chrome is pre-installed on `ubuntu-latest` runners. For other browsers, use `npx @puppeteer/browsers install chrome@stable` before running se-cli. Set `SE_AVOID_STATS=true` to disable telemetry in CI.