---
title: Snapshots & Refs
sidebar_position: 3
---

# Snapshots & Refs

## Aria snapshot algorithm

The `snapshot` command injects a script that recursively walks the DOM and builds a YAML accessibility tree per the W3C ARIA spec, assigning `data-se-ref="eN"` attributes to interactive elements. The output is compact — the part of the page an agent actually needs.

```text
- document:
  - heading "Welcome to Example" [level=1]
  - link "Learn more" [ref=e1]
  - textbox "Search" [ref=e2]
  - button "Submit" [ref=e3]
  - navigation:
    - link "Home" [ref=e4]
```

### Role determination

Priority: explicit `role` attribute → ARIA implicit role (`<button>`→button, `<a>`→link) → tag-name fallback (`<nav>`→navigation, `<main>`→main, `<header>`→banner).

### Interactive element detection

Refs are assigned only to interactive tags (`a`, `button`, `input`, `select`, …) and interactive roles (button, link, textbox, checkbox, menuitem, tab, combobox, …).

### Text & label extraction

Priority: `aria-label` > `aria-labelledby` > `<label for>` > `alt`/`title` > textContent > placeholder. Text is truncated to 80 chars to prevent token bloat.

### Ref resolution

A ref like `e1` resolves to `By.css('[data-se-ref="e1"]')`. Anything that isn't a ref is treated as a raw CSS selector.

## Ref lifecycle

:::warning
**Refs are valid only within a single snapshot.** After a DOM rebuild the `data-se-ref` attribute is lost — you must `snapshot` again before acting. If you see `ELEMENT_NOT_FOUND`, refresh the snapshot first.
:::

The ref registry is held by the daemon, keyed per session. Re-snapshotting reassigns refs from `e1` upward; old refs are invalidated. For long-lived agents, snapshot after any navigation or action that rebuilds the DOM.

## Depth control & find

`--depth=N` limits recursion (default 50) — useful on deep pages to keep the snapshot small. `find` greps the snapshot instead of dumping everything, returning only matching elements with their refs.

### Depth limit

```bash
# Only the top two levels of the tree
se-cli snapshot --depth=2
# - document:
#   - navigation [ref=e1]
#   - main [ref=e2]
```

### Find by text / regex

```bash
se-cli find "Submit"
# - button "Submit order" [ref=e7]

se-cli find --regex "price.*\\$[0-9]+"
# - text "price: $29.99" [ref=e12]

se-cli click e12
```

## iframe: cross-frame refs

Since v0.3 the snapshot recurses into iframes. Elements inside an iframe get a compound ref `f<frame>e<index>` — for example `f3e15` means element `e15` inside the third frame. se-cli resolves the frame switch automatically when you act on a cross-frame ref.

### Cross-frame ref format

`f3e15` → the daemon switches to iframe #3 via `driver.switchTo().frame(...)`, then locates `[data-se-ref="e15"]` inside it. After the action it switches back to the default content. Recursion is nested — `f1f2e3` is a ref two frames deep.

```bash
se-cli open https://app.example.com
se-cli snapshot
# - document:
#   - heading "Outer page" [ref=e1]
#   - iframe "ad frame":
#     - button "Buy now" [ref=f1e2]

se-cli click f1e2
```

## Shadow DOM

Also in v0.3: the snapshot recurses into **open** shadow roots via `el.shadowRoot`. Elements inside a shadow root appear inline in the tree with normal refs — no special prefix needed. Closed shadow roots cannot be traversed and emit a placeholder.

### Shadow DOM traversal

For open shadow roots the injected script walks `el.shadowRoot.querySelectorAll('*')` and assigns refs normally. `find` searches across both frames and shadow roots transparently. Note: Edge IE mode cannot support Shadow DOM (the IE engine has no shadow root concept).

:::info
**Coverage caveat.** se-cli's aria algorithm is a self-written simplified version (~80% coverage) versus Playwright's mature built-in implementation. See [the implementation matrix](matrix.md) for which snapshot features ship where.
:::