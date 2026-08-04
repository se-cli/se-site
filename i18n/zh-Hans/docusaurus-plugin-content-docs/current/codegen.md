---
title: 代码生成
sidebar_position: 5
---

## 逐操作代码生成

每个交互命令都会在其响应末尾追加一个 `### Ran Selenium code` 代码块，展示产生相同效果的确切 Selenium 调用。你可以直接将其复制到测试文件中——无需任何转换步骤。

### 点击（click）

```bash
$ se-cli click e2

### Ran Selenium code
await driver.findElement(
  By.css('[data-se-ref="e2"]')
).click();
```

### 填写（fill）

```bash
$ se-cli fill e1 "hi@example.com"

### Ran Selenium code
await driver.findElement(
  By.css('[data-se-ref="e1"]')
).sendKeys("hi@example.com");
```

### 选择（select）

```bash
$ se-cli select e3 "monthly"

### Ran Selenium code
const el = await driver.findElement(
  By.css('[data-se-ref="e3"]')
);
await new Select(el)
  .selectByVisibleText("monthly");
```

## generate-locator（计划 · v0.9）

计划中的 `generate-locator` 命令（v0.9）会为某个 ref 生成当前可用的最佳定位器表达式，优先使用 `By.role()`，并在必要时回退到 `By.css()` 或 `By.xpath()`。它与基于角色的代码生成相结合，可生成生产级定位器，而非内部的 `data-se-ref` 选择器。

```text
$ se-cli generate-locator e2
# By.role("button", { name: "Submit" })

$ se-cli generate-locator e5
# By.css("input[name='email']")
```

## By.role() 与 By.css() 的对比

se-cli 默认的代码生成会输出 `By.css('[data-se-ref="eN"]')`，因为该属性在快照后必然存在。v0.9 新增了基于角色的代码生成，可输出 `By.role(...)`，从而生成更具韧性的测试。下表对比了二者的取舍。

| 方面 | By.role() | By.css() |
|------|-----------|----------|
| 韧性 | 可承受 DOM/类名变化 | 重构时容易失效 |
| 可读性 | 高——意图明确 | 低——属于实现细节 |
| 快照一致性 | 直接镜像 aria 树 | 与角色解耦 |
| 可用性 | v0.9（基于角色的代码生成） | v0.1（默认） |
| Edge IE 模式 | 不支持——请继续使用 By.css/By.xpath | 支持 |

## 迁移到 Vitest / Jest

生成的代码片段就是普通的 Selenium WebDriver 调用。将它们放入 Vitest 或 Jest 测试中，在共享的 beforeAll 中设置 driver，即可得到一个可运行的测试套件。

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

:::info 提示
`data-se-ref` 属性由 se-cli 的快照脚本添加。在独立测试套件中，要么将 `data-se-ref` 保留在页面中，要么通过 v0.9 的 `generate-locator` 命令切换到 `By.role()` / 语义化选择器。
:::