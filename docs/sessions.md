---
title: Sessions & Browsers
sidebar_position: 2
---

# Sessions & Browsers

## Named sessions

By default every command targets the default session. Pass `-s=<name>` to isolate a session — each named session gets its own daemon, WebDriver, and browser, so you can drive several in parallel and switch between them freely.

### Named session

```bash
se-cli -s=alpha open https://example.com
se-cli -s=alpha snapshot
se-cli -s=alpha title
se-cli -s=alpha close

se-cli list
# alpha    chrome    running
# default  —         (none)
```

### Parallel multi-browser

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

### CDP attach

```bash
# Start Chrome with debugging
google-chrome --remote-debugging-port=9222

# Attach to the running browser
se-cli open --cdp=http://localhost:9222
se-cli snapshot
se-cli screenshot --filename=debug.png
se-cli close
```

## Persistent profiles

Use `--profile` or `--persistent` (v0.2) to keep cookies, localStorage, and login state across runs. This is essential for authenticated workflows where you log in once and reuse the session.

| Flag | Description | Example |
|------|-------------|---------|
| `--profile=<path>` | Persistent user data directory — reuse a real browser profile | `--profile=/tmp/se-profile` |
| `--persistent` | Auto-assign a userDataDir so state is retained automatically | `se-cli open --persistent` |
| `--browser=chrome\|edge\|firefox` | Per-session browser selection | `--browser=firefox` |
| `--headed` | Show the browser window (default: headless) | `se-cli open --headed` |

:::info
**Combine with state-save.** For cross-machine portability, prefer [`state-save`](storage-state.md) over profiles — JSON is portable, a userDataDir is not.
:::

## Daemon lifecycle

The daemon is spawned on the first `open` and persists across CLI calls. It holds the WebDriver instance, the snapshot tree, and the ref registry. Three mechanisms keep it healthy and reclaim resources.

### selfDestructOnIdle

Self-destructs after 30 minutes with no requests (configurable). Prevents orphan daemons from leaking memory when an agent walks away.

### heartbeat

The driver periodically calls `getTitle()` as a liveness check. If the browser process died silently, the daemon detects it and reports `DAEMON_DEAD`.

### gracefulShutdown

`SIGTERM`/`SIGINT` → quit driver → delete the `.session` file → exit. `close` triggers the same path; `kill-all` force-terminates everything.

### Session registry

`.session` JSON files live in `<cache>/ms-se-cli/daemon/`. `list` reconciles them with live processes and cleans up orphans.

```bash
se-cli list              # see all sessions + reconcile orphans
se-cli close-all         # graceful close of every session
se-cli kill-all          # force-kill all daemons + browsers
```

Stuck daemon? See the [Troubleshooting](troubleshooting.md) guide for manual cleanup of `.session` files and socket paths.