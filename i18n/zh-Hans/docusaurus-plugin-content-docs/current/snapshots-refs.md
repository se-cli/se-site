---
title: 快照与引用
sidebar_position: 3
---

# 快照与引用

## ARIA 快照算法

`snapshot` 命令会注入一个脚本，递归遍历 DOM，并按照 W3C ARIA 规范构建一棵 YAML 无障碍树，同时为可交互元素分配 `data-se-ref="eN"` 属性。输出是紧凑的——只包含代理实际需要的页面部分。

```text
- document:
  - heading "Welcome to Example" [level=1]
  - link "Learn more" [ref=e1]
  - textbox "Search" [ref=e2]
  - button "Submit" [ref=e3]
  - navigation:
    - link "Home" [ref=e4]
```

### 角色判定

优先级：显式 `role` 属性 → 隐式 ARIA 角色（`<button>`→button、`<a>`→link）→ 标签名回退（`<nav>`→navigation、`<main>`→main、`<header>`→banner）。

### 可交互元素检测

引用只分配给可交互标签（`a`、`button`、`input`、`select` 等）和可交互角色（button、link、textbox、checkbox、menuitem、tab、combobox 等）。

### 文本与标签提取

优先级：`aria-label` > `aria-labelledby` > `<label for>` > `alt`/`title` > textContent > placeholder。文本会被截断到 80 个字符，以防止 token 膨胀。

### 引用解析

像 `e1` 这样的引用会被解析为 `By.css('[data-se-ref="e1"]')`。任何不是引用的内容都会被当作原始 CSS 选择器处理。

## 引用生命周期

:::warning
**引用只在单个快照内有效。** DOM 重建后，`data-se-ref` 属性会丢失——在操作之前你必须重新执行 `snapshot`。如果看到 `ELEMENT_NOT_FOUND`，请先刷新快照。
:::

引用注册表由守护进程持有，按会话进行键控。重新快照会从 `e1` 开始向上重新分配引用；旧的引用会被作废。对于长期运行的代理，请在每次导航或会重建 DOM 的操作之后执行快照。

## 深度控制与查找

`--depth=N` 限制递归深度（默认 50）——在深层页面上很有用，可以保持快照小巧。`find` 会在快照中检索而不是倾倒所有内容，只返回匹配的元素及其引用。

### 深度限制

```bash
# 只保留树的前两层
se-cli snapshot --depth=2
# - document:
#   - navigation [ref=e1]
#   - main [ref=e2]
```

### 按文本 / 正则查找

```bash
se-cli find "Submit"
# - button "Submit order" [ref=e7]

se-cli find --regex "price.*\\$[0-9]+"
# - text "price: $29.99" [ref=e12]

se-cli click e12
```

## iframe：跨框架引用

从 v0.3 开始，快照会递归进入 iframe。iframe 内的元素会获得复合引用 `f<frame>e<index>`——例如 `f3e15` 表示第三个框架内的元素 `e15`。当你对跨框架引用执行操作时，se-cli 会自动解析框架切换。

### 跨框架引用格式

`f3e15` → 守护进程通过 `driver.switchTo().frame(...)` 切换到 iframe #3，然后在其内部定位 `[data-se-ref="e15"]`。操作完成后，它会切换回默认内容。递归是嵌套的——`f1f2e3` 是深两层框架的引用。

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

同样在 v0.3 中：快照会通过 `el.shadowRoot` 递归进入**开放**的 shadow root。shadow root 内的元素会以内联形式出现在树中，并带普通引用——无需特殊前缀。封闭的 shadow root 无法遍历，只会产生一个占位符。

### Shadow DOM 遍历

对于开放的 shadow root，注入的脚本会遍历 `el.shadowRoot.querySelectorAll('*')` 并正常分配引用。`find` 可以透明地跨框架和 shadow root 搜索。注意：Edge IE 模式不支持 Shadow DOM（IE 引擎没有 shadow root 的概念）。

:::info
**覆盖范围说明。** 相比 Playwright 成熟的 built-in 实现，se-cli 的 aria 算法是一个自行编写的简化版本（约 80% 覆盖率）。请参阅[实现矩阵](matrix.md)了解哪些快照功能在哪些地方提供。
:::