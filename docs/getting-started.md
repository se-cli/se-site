---
title: Getting Started
sidebar_position: 1
---

# Getting Started

## Installation

se-cli is distributed on npm as a global CLI. It requires **Node.js 18+** and at least one of Chrome, Edge, or Firefox installed on your machine.

```bash
npm install -g @browsers-cli/se-cli
```

:::info
**Drivers are auto-managed.** `selenium-manager` (bundled with `selenium-webdriver`) downloads the correct driver binary for your browser and platform — no manual setup.
:::

## Your first session

The core loop is `open → snapshot → click → close`. `open` spawns a long-lived daemon that holds the WebDriver; `snapshot` returns a compact YAML tree; refs like `e1` let you act on elements without selectors.

```bash
se-cli open https://example.com
se-cli snapshot
# - document:
#   - heading "Example Domain" [level=1]
#   - link "More information..." [ref=e1]

se-cli click e1
se-cli close
```

## Concept model

se-cli is a **short-lived CLI** that talks to a **long-lived daemon** over line-delimited JSON. The daemon holds the WebDriver instance and a registry of refs. Four concepts drive everything else:

```text
┌─────────────────┐  Unix socket / Win pipe  ┌──────────────────────┐
│  se-cli         │ ─── line-delimited JSON ─▶ │  se-cli daemon       │
│  (short-lived)  │ ◀── single response ───── │  (holds WebDriver)   │
└─────────────────┘                            └──────────────────────┘
                                                          │
                                                          │ W3C WebDriver HTTP
                                                          ▼
                                                    ┌──────────┐
                                                    │ Browser  │
                                                    │(Chrome/  │
                                                    │ Edge/FF) │
                                                    └──────────┘
```

### CLI process

Spawned per command. Sends one JSON line, receives one response, exits. Zero schema overhead — the daemon holds all the state.

### Daemon process

Spawned on first `open`. Persists across CLI calls. Holds the WebDriver instance, the snapshot tree, and the ref registry.

### Socket / pipe

Line-delimited JSON over Unix socket (Linux/macOS) or Windows named pipe. One request per connection — no long-lived streams.

### Ref registry

Interactive elements get `data-se-ref="eN"` attributes. `.session` JSON files in `<cache>/ms-se-cli/daemon/` survive CLI exits.

## Usage examples

Real-world patterns: form automation, parallel sessions, CDP attach, shell scripting, find & search, and code generation.

### Form Submission

```bash
se-cli open https://app.example.com/login
se-cli snapshot
# - textbox "Email" [ref=e1]
# - textbox "Password" [ref=e2]
# - button "Sign in" [ref=e3]

se-cli fill e1 "user@example.com"
se-cli fill e2 "password123"
se-cli click e3
se-cli snapshot
se-cli close
```

### Parallel Browsers

```bash
# Two sessions, two browsers
se-cli -s=chrome open https://example.com \
  --browser=chrome
se-cli -s=firefox open https://example.com \
  --browser=firefox

se-cli -s=chrome title
se-cli -s=firefox title

se-cli -s=chrome close
se-cli -s=firefox close
```

### CDP Attach

```bash
# Start Chrome with debugging
google-chrome --remote-debugging-port=9222

# Attach to running browser
se-cli open --cdp=http://localhost:9222
se-cli snapshot
se-cli screenshot --filename=debug.png
se-cli close
```

### Shell Scripting

```bash
# Use --raw for clean output
TITLE=$(se-cli --raw title)
URL=$(se-cli --raw url)

# Count elements via eval
COUNT=$(se-cli --raw eval \
  "document.querySelectorAll('.item').length")
echo "Found $COUNT items on $TITLE"

# JSON output for pipelines
se-cli --json snapshot | jq '.refs[]'
```

### Find & Search

```bash
# Search snapshot for text
se-cli find "Submit"
# - button "Submit order" [ref=e7]

# Regex search
se-cli find --regex "price.*\\$[0-9]+"
# - text "price: $29.99" [ref=e12]

# Click the found element
se-cli click e12
```

### Code Generation

```bash
$ se-cli fill e1 "hello@example.com"

### Ran Selenium code
await driver.findElement(
  By.css('[data-se-ref="e1"]')
).sendKeys("hello@example.com");

# Copy directly into test files
```

## Next steps

Browse the [full command reference](commands.md), learn about [configuration](configuration.md), or read how [snapshots and refs](snapshots-refs.md) work internally.