---
title: 路线图
sidebar_position: 1
---

# 路线图

版本时间线、特性分类，以及 se-cli 永远不会变成什么的明确边界。

## 设计理念

每个特性都按其对 se-cli 防御性（defensibility）的贡献来排序——而不是看它看起来有多炫。

### 必备（Must-Have）

基础。没有这些，se-cli 就无法使用或无法竞争——CLI/守护进程架构、等待/重试层、MCP 服务器。首先构建，无例外。

### 核心（Core）

差异化。将 se-cli 与原始 WebDriver 和 Playwright-CLI 区分开来的能力——断言、网络、模拟、远程/Grid。

### 次要（Marginal）

锦上添花。录制、VSCode 扩展——投入巨大，回报较小。排在后面，可能延期。

## 指导原则

修订于 2026-07-29——这四条规则决定每一个"我们该不该做这个？"的问题。

### 1. 优先构建 Selenium 原生护城河

等待/重试/超时、Grid、自定义浏览器、真实 Safari、Edge IE 模式。这些是 Playwright 永远无法匹敌的优势——作为防御性要塞优先处理。

### 2. 前置高价值移植项

Playwright-CLI 中易于移植的特性（自动等待、重试断言、设备模拟）按 `复杂度 × 重要性` 排序，在比值有利时尽早交付。

### 3. 不在 CLI 中"编写代码"

所有需要代码的 Selenium 能力（显式等待、`ExpectedConditions`、Actions 链、`setScriptTimeout`）都通过 4 层优先级暴露：`flag > ENV > config 文件 > 默认值`。

### 4. 明确的"永不实现"边界

为避免误导社区预期，se-cli 明确声明它永远不会实现的内容——原生 aria ref 引擎、完整的追踪（tracing）对齐、真实 IE 11。

## 版本时间线

v0.1–v0.9 已发布。v0.10–v0.13 为规划中，按依赖关系和价值排序。

### v0.1 — MVP 架构 `必备` ✓ 已发布

CLI + 守护进程架构、基础命令（open/close/goto/click/fill/type/press/snapshot/screenshot/eval）、aria 快照 + ref 机制、命名会话、多浏览器（Chrome/Edge/Firefox）、代码生成回放。

### v0.2 — 实用能力补全 `必备` ✓ 已发布

存储管理（cookie/localStorage/sessionStorage）、状态保存/加载往返、标签页管理、`install --skills`、`--profile` 持久化用户数据目录、`--persistent` 自动 userDataDir。

### v0.3 — iframe 与 Shadow DOM `必备` ✓ 已发布

递归 iframe 快照，支持跨框架 ref（例如 `f3e15`）、遍历开放 shadow root 的 Shadow DOM 遍历、增强的 `find` 可跨框架和 shadow 边界搜索。

### v0.4 — 等待与重试配置层 `必备` ✓ 已发布

所有后续版本都依赖的基础。将 Selenium 的隐式/显式等待、pageLoad/script 超时和 `ExpectedConditions` 以 CLI 原生配置的形式暴露——`--timeout`、`--wait`、`--retry`，以及 `config get/set/list/init`。

### v0.5 — 交互补全 `必备` ✓ 已发布

缩小与 Playwright CLI 的差距：`hover`、`dblclick`、`drag`、对话框 accept/dismiss、`upload`、`resize`、精细的键盘/鼠标控制，以及将多个动作合并为一次往返的 `actions-chain`。

### v0.6 — Web 优先断言 `核心` ✓ 已发布

Playwright 风格"重试直到超时"的断言，带对 CI 友好的退出码：`expect <ref> visible|hidden|enabled|disabled|checked|text|value|count|attribute`、`--not` 取反、`expect title`/`expect url`。

### v0.7 — 网络与调试 `核心` ✓ 已发布

基于 BiDi 的网络拦截（`route`/`unroute`/`route-list`）、带级别过滤的 `console` 捕获、`requests`/`request` 列表与检查，以及通过 CSS 覆盖层实现带 `--style`/`--hide`/`--all` 的持久化元素 `highlight`。

### v0.8 — 设备与环境模拟 `核心` ✓ 已发布

设备预设（`device "iPhone 13"`）、地理位置/时区/语言环境/配色方案/视口/UA/权限、网络限速（`slow3g`）、CPU 降速，以及离线模拟。状态已集成到 `state-save`。

### v0.9 — MCP 服务器与 AI 生态 `必备` ✓ 已发布

双轨制：面向编码智能体的 CLI+SKILLS，面向自主工作流的 MCP 服务器——共享同一套工具实现。MCP 服务器位于核心中（stdio + Streamable HTTP），并附带独立的 [`se-mcp`](https://github.com/se-cli/se-mcp) 包装包。新增 `run-code`、`generate-locator`、`By.role()` 代码生成、符合规范的 SKILL.md front matter，以及多目标 `install --skills`。

### v0.10 — 远程、Grid 与自定义浏览器 `核心` 规划中

Selenium 护城河。通过 `safaridriver` 支持真实 Safari、Selenium Grid 4（`--endpoint`）、自定义浏览器/驱动二进制、带 `--app-binary` 的 `--browser=electron` 用于 Electron 应用测试、云浏览器（Browserbase/Sauce/BrowserStack）、Grid 分片、`pdf` 导出，以及用于遗留场景的 Edge IE 模式。

### v0.11 — 录制与可视化 `次要` 规划中

生成完整测试文件的 `record` 模式、多框架测试代码导出（`export --format=pytest|junit5|mocha`）、内置测试报告生成（`--report=junit|allure|html`）、简化追踪、视频录制（CDP 或 ffmpeg）、视频章节，以及用于多会话监控和页面标注的 `show` 仪表盘。

### v0.12 — VSCode 扩展 `次要` 规划中

独立的仓库（[`se-extension-vscode`](https://github.com/se-cli/se-extension-vscode)）：MCP 服务器注册、快照/截图 Webview、状态栏和配置设置。遵循 `playwright-vscode` 模式。

### v0.13 — BiDi 扩展与加固 `核心` 规划中

将 WebDriver BiDi 覆盖扩展到 v0.7 的网络/控制台之外——`browsingContext`（视口、打印、CSP 绕过、下载）、`input`（文件对话框）、`script`（预加载脚本）、`emulation`（CDP 的跨浏览器替代方案）。此外还包括守护进程性能优化（启动、快照效率、内存）和稳定性加固（错误恢复、会话韧性、熔断器重试）。

## 长期目标

不承诺版本——待核心稳定后探索。

### 多语言 SDK

Python / Java 客户端绑定。CLI 保持 Node；绑定包装 socket 协议。

### 追踪查看器（Trace Viewer）

录制轨迹的简化 GUI 回放（与 issue #24 对齐）。

### DOM 变更监听器

用于实时 ref 失效的 BiDi DOM 变更事件。

### 脚本预加载

BiDi 脚本固定（pinning）并在页面脚本运行前预加载。

### 本地化 SKILL.md

面向非英语智能体的多语言技能文件。

### 测试框架钩子

`pytest-selenium` / JUnit5 集成——挂接到测试暂停点（issue #22）。

### Appium 移动端

iOS/Android 双向、Appium Grid（issue #79）。

### Grid 管理 CLI

Selenium Grid 4 hub/node 部署、自动扩缩容、健康检查。

## 永不实现

> **永不实现** — 明确声明以避免误导预期：

- **原生 aria ref 引擎** — 无法匹敌 Playwright `aria-ref` 选择器引擎的稳定性；将始终依赖 `data-se-ref` 属性。
- **Playwright 级别的完整追踪对齐** — Selenium BiDi 事件流质量不足以支撑时间线 + DOM 快照 + 网络 + 控制台 + 源码映射；仅追求简化版本。
- **真实 IE 11（IEDriverServer）** — IE 11 已停止支持；由 Edge IE 模式（v0.10）替代。需要真正 IE11 的用户应直接使用遗留 Selenium 绑定。