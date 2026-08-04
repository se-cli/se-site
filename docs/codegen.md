---
title: Code Generation
sidebar_position: 5
---

## Per-action code generation

Every interaction command appends a `### Ran Selenium code` block to its response, showing the exact Selenium call that produced the same effect. Copy it straight into a test file — no translation step.

### click

```bash
$ se-cli click e2

### Ran Selenium code
await driver.findElement(
  By.css('[data-se-ref="e2"]')
).click();
```

### fill

```bash
$ se-cli fill e1 "hi@example.com"

### Ran Selenium code
await driver.findElement(
  By.css('[data-se-ref="e1"]')
).sendKeys("hi@example.com");
```

### select

```bash
$ se-cli select e3 "monthly"

### Ran Selenium code
const el = await driver.findElement(
  By.css('[data-se-ref="e3"]')
);
await new Select(el)
  .selectByVisibleText("monthly");
```

## generate-locator (Planned · v0.9)

The planned `generate-locator` command (v0.9) produces the best available locator expression for a ref, preferring `By.role()` and falling back to `By.css()` or `By.xpath()`. This pairs with role-based code generation to emit production-grade locators instead of the internal `data-se-ref` selector.

```text
$ se-cli generate-locator e2
# By.role("button", { name: "Submit" })

$ se-cli generate-locator e5
# By.css("input[name='email']")
```

## By.role() vs By.css()

se-cli's default codegen emits `By.css('[data-se-ref="eN"]')` because that attribute is guaranteed present after a snapshot. v0.9 adds role-based codegen that emits `By.role(...)` for more resilient tests. The comparison below covers the tradeoffs.

| Aspect | By.role() | By.css() |
|--------|-----------|----------|
| Resilience | Survives DOM/class changes | Breaks on refactor |
| Readability | High — intent is explicit | Low — implementation detail |
| Snapshot parity | Mirrors the aria tree directly | Decoupled from roles |
| Availability | v0.9 (role-based codegen) | v0.1 (default) |
| Edge IE mode | Disabled — keep By.css/By.xpath | Supported |

## Migrating into Vitest / Jest

The emitted snippets are plain Selenium WebDriver calls. Drop them into a Vitest or Jest test, set up the driver in a shared beforeAll, and you have a runnable suite.

```ts
import { describe, it, beforeAll, afterAll } from 'vitest';
import { Builder, By } from 'selenium-webdriver';

describe('login flow', () => {
  let driver: any;
  beforeAll(async () => { driver = await new Builder().forBrowser('chrome').build(); });
  afterAll(async () => { await driver.quit(); });

  it('signs in', async () => {
    await driver.get('https://app.example.com/login');
    // pasted from `se-cli fill e1 ...`
    await driver.findElement(
      By.css('[data-se-ref="e1"]')
    ).sendKeys('user@example.com');
    await driver.findElement(
      By.css('[data-se-ref="e2"]')
    ).sendKeys('password');
    await driver.findElement(
      By.css('[data-se-ref="e3"]')
    ).click();
  });
});
```

:::info Tip
`data-se-ref` attributes are added by se-cli's snapshot script. In a standalone test suite either keep them in the page or swap to `By.role()` / semantic selectors via the v0.9 `generate-locator` command.
:::