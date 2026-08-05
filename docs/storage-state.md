---
title: Storage & State
sidebar_position: 4
---

# Storage & State

## Cookies

Cookie commands operate on the cookies for the current page's domain. `cookie-set` accepts a JSON object describing the cookie.

| Command | Description |
|---------|-------------|
| `cookie-list` | List all cookies for the current page |
| `cookie-get <name>` | Get a single cookie by name (returns JSON) |
| `cookie-set <name> <value>` | Add or overwrite a cookie, e.g. `'{"name":"token","value":"abc"}'` |
| `cookie-delete <name>` | Delete a cookie by name |

```bash
se-cli cookie-get session_id
se-cli cookie-set '{"name":"flag","value":"on","path":"/"}'
se-cli cookie-list
se-cli cookie-delete flag
```

## localStorage & sessionStorage

The storage families mirror each other — replace `localstorage` with `sessionstorage` for the sessionStorage equivalent. Both run in the page context via the daemon.

| Command | Description |
|---------|-------------|
| `localstorage-get <key>` | Read a value |
| `localstorage-set <key> <val>` | Write a value |
| `localstorage-delete <key>` | Delete a value |
| `localstorage-delete` | Clear all localStorage |
| `sessionstorage-get/set/delete/clear` | Same operations for sessionStorage |

```bash
se-cli localstorage-set theme "dark"
se-cli localstorage-get theme
# dark

se-cli sessionstorage-set flash "welcome"
se-cli localstorage-delete
```

## State save & load

`state-save` exports cookies + localStorage + sessionStorage into a single JSON file. `state-load` restores them in reverse order (storage first, then cookies). This lets you capture an authenticated session and replay it on another machine or CI run — far more portable than a `--profile` directory.

### Capture an authed session

```bash
# Log in through the UI once
se-cli open https://app.example.com/login
se-cli snapshot
se-cli fill e1 "user@example.com"
se-cli fill e2 "hunter2"
se-cli click e3

# Capture the now-authenticated state
se-cli state-save auth.json
se-cli close
```

### Restore in CI

```bash
# Fresh browser, skip the login flow
se-cli open https://app.example.com
se-cli state-load auth.json
se-cli snapshot
# Already logged in — dashboard visible.
```

:::warning
**Domain matching.** Cookies are scoped by domain. `state-load` only restores cookies for the page's current domain — navigate to the right origin before loading.
:::

Pair state with [persistent profiles](sessions.md#persistent-profiles) when you need both browser-level and storage-level persistence, or see [Troubleshooting](troubleshooting.md) if a save round-trip behaves unexpectedly.