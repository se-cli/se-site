---
title: Troubleshooting
sidebar_position: 7
---

## Error codes

se-cli returns structured errors with a `code` field. Here are the codes you will most often see and how to recover.

| Code | Meaning | Recovery |
|------|---------|----------|
| `ELEMENT_NOT_FOUND` | The ref/selector no longer matches an element (DOM rebuilt) | Run `se-cli snapshot` to refresh refs, then retry |
| `DAEMON_DEAD` | The daemon process crashed or was killed mid-session | Run `se-cli close` (or `kill-all`) then `se-cli open` again |
| `VERSION_MISMATCH` | CLI version differs from the running daemon version | Run `se-cli close && se-cli open` so they match |
| `UNSUPPORTED_BROWSER` | Requested browser is not available on this platform | Install the browser or pick `--browser=chrome\|edge\|firefox` |

```text
### Error
Element not found: [data-se-ref="e15"]
Hint: run `se-cli snapshot` to refresh refs.
```

## Daemon is stuck / won't close

If `close` hangs or `list` shows ghost sessions, escalate from graceful to forceful cleanup.

```bash
# 1. graceful: close every session
se-cli close-all

# 2. forceful: kill all daemons + browsers
se-cli kill-all

# 3. last resort: remove orphan .session files manually
rm -rf "$(./node_modules/.bin/se-cli config get cachePath)/ms-se-cli/daemon"/*.session
# Linux/macOS socket dir is usually $TMPDIR/se-cli/
rm -rf "${TMPDIR:-/tmp}/se-cli/"*
```

:::warning Avoid `kill -9` on the daemon PID
That bypasses `gracefulShutdown` and can leave the browser process orphaned. Prefer `kill-all`, which drives the quit path. Only delete `.session` files after `kill-all` returns.
:::

## Driver version drift

:::info Let `selenium-manager` handle it
Driver mismatch after a browser auto-update is the classic Selenium headache. `selenium-manager` (bundled with `selenium-webdriver`) detects the installed browser version and downloads the matching driver automatically — do not pin a driver version unless you have a specific reason.
:::

If you must pin (e.g. offline CI), set the matching variables before launching se-cli:

```bash
# pin driver + browser version
SE_BROWSER_VERSION=120 SE_DRIVER_VERSION=120.0.6099.71 \
SE_OFFLINE=true se-cli open https://example.com
```

See the [Configuration](./configuration.md#environment-variables) page for the full set of Selenium Manager variables.

## FAQ

Common questions about se-cli.

### How is se-cli different from Selenium MCP?

Selenium MCP loads ~5KB of tool schemas per call and returns full accessibility trees. se-cli uses a CLI + daemon architecture: the CLI sends one JSON line, the daemon holds the WebDriver, and aria snapshots return compact YAML with element refs. No schemas enter the agent's context — typically 10× fewer tokens.

### Which browsers are supported?

Chrome, Edge, and Firefox are fully supported for both headless and headed modes. Chrome and Edge also support CDP attach via `--cdp=<url>`. Safari (`--browser=safari`) and Edge IE mode (`--browser=edge-ie`) are planned for v0.10.

### Do I need to install browser drivers separately?

No. `selenium-manager` (bundled with `selenium-webdriver`) automatically downloads the correct driver binary for your browser and platform.

### Can I use se-cli with my AI agent?

Yes. se-cli works with any AI agent that can run shell commands — Claude Code, Cursor, Copilot CLI. Run `se-cli install --skills` (or place `skill/SKILL.md` manually) and it can start driving browsers immediately.

### How do sessions persist between commands?

The daemon process holds the WebDriver instance and stays alive across CLI invocations. Session metadata is stored as `.session` JSON files in `<cache>/ms-se-cli/daemon/`. Use `close` to clean up, or `kill-all` to force-kill.

### Is se-cli a replacement for Selenium WebDriver?

No. se-cli is built on top of `selenium-webdriver`. It provides a CLI interface and daemon architecture on top of the WebDriver protocol, making it accessible to AI agents and shell scripts. Every action also emits the equivalent Selenium code for your test files.

### What's the license?

Apache License 2.0. See [LICENSE](https://github.com/se-cli/se-cli/blob/main/LICENSE) for details.