---
title: 变更日志
sidebar_position: 3
---

# 变更日志

从 v0.1 MVP 到规划中的 v0.13 BiDi 扩展与加固的每版本发布说明。已发布的版本以实线表示；规划中的版本以虚线表示。

## v0.1 — MVP 架构 `必备` ✓ 已发布

*2026-07-28 · 初始发布*

验证"令牌高效 CLI + 守护进程"模型的基础架构。

- CLI + 守护进程架构——短生命周期 CLI 通过 Unix socket / Windows 命名管道向长生命周期守护进程发送一行 JSON。
- 基础命令：`open`、`close`、`goto`、`click`、`fill`、`type`、`press`、`snapshot`、`screenshot`、`eval`、`title`、`url`。
- Aria 快照注入脚本 + `data-se-ref` 引用机制。
- 命名会话管理（`-s=<name>`）和多浏览器支持（Chrome、Edge、Firefox）。
- 代码生成回放——每个动作都会生成对应的 Selenium 代码。

## v0.2 — 实用能力补全 `必备` ✓ 已发布

*2026-07 · 实用层*

让 se-cli 在演示之外可用于真实工作流的能力。

- **存储管理**：`cookie-list/get/set/delete`、`localstorage-*`、`sessionstorage-*`。
- **状态保存/加载**：将 cookie + 存储导出为 JSON，通过反向加载来恢复。
- **标签页管理**：`tab-list`、`tab-new`、`tab-close`、`tab-select`。
- `install --skills`：将 `SKILL.md` 复制到 `.claude/skills/se-cli/` 或 `.agents/skills/se-cli/`。
- `--profile=<path>` 持久化用户数据目录和 `--persistent` 自动分配。

## v0.3 — iframe 与 Shadow DOM `必备` ✓ 已发布

*2026-07 · 结构深度*

完整的 DOM 覆盖——快照不再止步于框架或 shadow 边界。

- **iframe 递归快照**：跨框架 ref（例如 `f3e15`）可进入框架内容。
- **Shadow DOM 递归**：遍历 `el.shadowRoot` 以访问开放的 shadow root。
- **find 命令增强**：跨框架和 shadow DOM 边界搜索。

## v0.4 — 等待与重试配置层 `必备` ✓ 已发布

*2026-07 · 等待与重试基础*

将 Selenium 的隐式/显式等待、pageLoad/script 超时和 `ExpectedConditions` 以 CLI 原生配置的形式暴露。所有之前需要代码的能力都通过 4 层优先级暴露：`flag > ENV > config 文件 > 默认值`。

- Flag 层：`--timeout`、`--wait`、`--retry`、`--retry-interval`、`--implicit-wait`、`--page-load-timeout`、`--script-timeout`、`--no-wait`。
- ENV 层：`SE_CLI_TIMEOUT`、`SE_CLI_WAIT`、`SE_CLI_RETRY`、`SE_CLI_RETRY_INTERVAL`、`SE_CLI_IMPLICIT_WAIT`、`SE_CLI_PAGE_LOAD_TIMEOUT`、`SE_CLI_SCRIPT_TIMEOUT`。
- 配置文件层：`.se-cli.json` 或 `~/.config/se-cli/config.json`，支持按命令覆盖。
- 新命令：`config get/set/list/init`（list 会显示每个项的来源：flag/env/file/default）。
- 代码生成反映有效策略：`await driver.wait(until.elementIsVisible(el), 5000);`

## v0.5 — 交互补全 `必备` ✓ 已发布

*2026-07 · 交互对齐*

在基础交互上缩小与 Playwright CLI 的差距。所有 Actions 命令都会自动使用 v0.4 的等待/重试配置。

- `hover`、`dblclick`、`drag <start> <end>`，通过 `driver.actions()`。
- `dialog-accept [text]` / `dialog-dismiss`，通过 `driver.switchTo().alert()`。
- `upload <ref> <file>`，通过 `sendKeys(path)`；`resize <w> <h>` 视口控制。
- 精细的键盘/鼠标：`keydown`/`keyup`、`mousemove`、`mousedown`/`mouseup`、`mousewheel`。
- `actions-chain` 命令：将多个动作合并到单个 `perform()` 以减少往返次数。

## v0.6 — Web 优先断言 `核心` ✓ 已发布

*2026-08-01 · 对 CI 友好的测试*

将 Playwright 的 `expect(locator).toBeVisible()` 重试直到超时模型移植到 CLI，并带脚本可链接的退出码。

- `expect <ref> visible|hidden|enabled|disabled|checked|unchecked`。
- `expect <ref> text "..." [--exact]`、`value "..."`、`count N`、`attribute <name> <value>`。
- `expect title "..."` / `expect url "..."`。
- 退出码：成功 `0`、失败 `1`——可在 CI 中用 `&&` 链接。
- `--not` 取反断言；默认使用 v0.4 的 `--timeout`。

## v0.7 — 网络与调试 `核心` ✓ 已发布

*2026-08-01 · BiDi 网络与调试*

利用 Selenium BiDi 协议（selenium-webdriver@4.46.0）实现跨浏览器网络拦截、控制台日志捕获和请求检查——以及用于可视化调试的持久化元素高亮。

- `route <pattern> --status=/--body=/--headers=`、`route-list`、`unroute <index>` / `unroute --all`，通过 BiDi `Network.addIntercept`。
- `console [level]`——通过 BiDi `log.entryAdded` 捕获 `console.log`/`error`/`warn`/`info` 和 JS 异常；`--since=5m` 时间过滤、`--clear`、`js-error` 子过滤。
- `requests`——列出所有缓冲的网络请求，支持 `--filter`、`--status`、`--method`、`--clear`；`request <index>` 显示完整详情（headers、body、response）。
- `highlight <ref> [--style=]` 通过 CSS 覆盖层实现持久化元素高亮；`highlight <ref> --hide` 移除单个；`highlight --hide --all` 清除所有；裸 `highlight` 列出活动的高亮。

## v0.8 — 设备与环境模拟 `核心` ✓ 已发布

*2026-08-02 · CDP 优先，BiDi 兜底*

所有能力通过 CDP `Emulation.*` / `Network.*` 域实现，BiDi 作为回退（Firefox 上的视口）。Selenium 没有原生等价物——CDP 使从 Playwright 移植变得非常简单。

- `open --geolocation= --timezone= --locale= --color-scheme= --viewport= --user-agent= --permissions=`。
- `device "iPhone 13"` 预设和 `device-list`（参考 Playwright DeviceDescriptors）。
- `emulate --offline`、`--throttle-network=slow3g|fast3g|custom:...`、`--throttle-cpu=4`、`--reset`。
- 模拟状态集成到 `state-save`。

## v0.9 — MCP 服务器与 AI 生态 `必备` ✓ 已发布

*2026-08 · MCP 服务器与 AI 生态*

将 se-cli 作为 MCP 服务器暴露。双轨制：CLI+SKILLS（面向编码智能体，令牌高效）和 MCP 服务器（面向自主工作流，持久状态）——两者共享同一套底层工具实现。MCP 服务器包装包发布为 [`se-mcp`](https://github.com/se-cli/se-mcp)。

- `se-cli mcp-server`：基于自定义 JSON-RPC 的 40+ 工具（无 SDK 依赖）；stdio（默认）和 Streamable HTTP（`--http`、`POST|GET|DELETE /mcp`、`Mcp-Session-Id`）。
- `run-code "async driver => ..."`：执行任意 Selenium 代码片段；返回的元素会成为 ref。
- `generate-locator <ref>`：最佳定位器（`new By('role', …)`/`By.css`）并带匹配数量；通过 `--locator-style=role|css|ref` 进行基于角色的代码生成。
- `SKILL.md` front matter 合规（`name`、`description`、`license`、`compatibility`）和多目标 `install --skills`（自动检测、`--agent`、`--path`、`--force`、`--list-agents`）。

## v0.10 — 远程、Grid 与自定义浏览器 `核心` 规划中

*规划中 · Selenium 护城河*

差异化的强项——Playwright 永远无法匹敌的领域。扩展浏览器覆盖范围和连接能力。

- `--browser=safari`，通过 `safaridriver`（仅 macOS，不支持无头/BiDi/CDP）。
- `--endpoint=<url>`：Selenium Grid 4 或远程 WebDriver；`grid status/attach/distribute --shard=x/y`。
- `--browser-binary`、`--driver-binary`、`--browser-args`、`--browser-prefs`、`--capabilities`（覆盖所有 W3C WebDriver 端点）。
- 云浏览器集成：Browserbase、Sauce Labs、BrowserStack。
- `pdf --filename=f`，通过 CDP `Page.printToPDF`（仅 Chromium）。
- `--browser=edge-ie`：面向遗留 IE 场景的 Edge IE 模式（仅 Windows Edge 企业版，自动配置策略）。

## v0.11 — 录制与可视化 `次要` 规划中

*规划中 · 开发与调试工作流*

实现复杂度高，但差异化潜力显著。排在后面，可能延期。

- `se-cli record`：录制模式——用户操作生成一个完整的测试文件。
- `tracing-start` / `tracing-stop`：简化操作追踪（参见"永不实现"）。
- `video-start` / `video-stop` / `video-chapter <title>`：CDP 或 ffmpeg 帧捕获。
- `show` 仪表盘用于多会话监控；`show --annotate` 用于设计反馈。

## v0.12 — VSCode 扩展 `次要` 规划中

*规划中 · 独立的 GitHub 仓库*

独立的仓库（[`se-extension-vscode`](https://github.com/se-cli/se-extension-vscode)），依赖 se-cli CLI 已被全局安装。初始实现包括 MCP 注册、命令、webview 和状态栏。

- **任务提供者（Task Provider）**：将 se-cli 命令注册为 VSCode 自定义任务。
- **Webview**：通过 `postMessage` 提供浏览器截图和 aria 快照预览。
- **MCP 服务器自动注册**：安装时写入 `.vscode/mcp.json`。
- `attach --extension`：通过扩展连接到真实浏览器。

## v0.13 — BiDi 扩展与加固 `核心` 规划中

*规划中 · issues #76 #77 #78*

将 WebDriver BiDi 覆盖扩展到 v0.7 之外，并加固守护进程以保障生产可靠性。

- **BiDi 协议扩展**：`browsingContext`（视口、打印、CSP 绕过、下载）、`input`（文件对话框）、`script`（预加载脚本）、`emulation`（CDP 的跨浏览器替代方案）。
- **性能优化**：惰性驱动加载、增量快照（`snapshot --diff`）、内存高效的缓冲区、gzip 压缩。
- **稳定性加固**：驱动崩溃自动恢复、BiDi WebSocket 重连、熔断器重试、标准化退出码。

## 永不实现

> **永不实现。**

- 原生 aria ref 引擎——永久依赖 `data-se-ref` 属性。
- Playwright 级别的完整追踪对齐——仅追求简化版本。
- 真实 IE 11（IEDriverServer）——由 v0.10 中的 Edge IE 模式替代。