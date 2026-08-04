---
title: 生态
sidebar_position: 8
---

se-cli 生态——三个协同工作的包，覆盖 CLI、MCP 和 VS Code 工作流。

## 概览

se-cli 生态遵循 Playwright 的多仓库模式。三个相互独立的仓库各自提供不同的入口——核心 CLI、MCP 服务器包装器和 VS Code 扩展。三者共享相同的 daemon 架构和 WebDriver 实例。

## se-mcp

### 什么是 se-mcp？

se-mcp 是围绕 se-cli 的轻量 MCP（Model Context Protocol）服务器包装器。它通过 stdio JSON-RPC 2.0 向支持 MCP 的 AI 客户端（如 VS Code、Claude Desktop、Cursor 和 Claude Code）暴露 50 多个浏览器自动化工具。

- 包：npm 上的 `@browsers-cli/se-mcp`
- 仓库：[https://github.com/se-cli/se-mcp](https://github.com/se-cli/se-mcp)

### 安装

```bash
npx @browsers-cli/se-mcp
```

无需全局安装——`npx` 会自动下载并运行最新版本。

### 配置

将 se-mcp 添加到您的 MCP 客户端配置中。服务器名称为 `se-cli`。

**VS Code**（settings.json）：

```json
{
  "mcp.servers": {
    "se-cli": {
      "command": "npx",
      "args": ["-y", "@browsers-cli/se-mcp"]
    }
  }
}
```

**Claude Desktop**（claude_desktop_config.json）：

```json
{
  "mcpServers": {
    "se-cli": {
      "command": "npx",
      "args": ["-y", "@browsers-cli/se-mcp"]
    }
  }
}
```

**Cursor**（~/.cursor/mcp.json）：

```json
{
  "mcpServers": {
    "se-cli": {
      "command": "npx",
      "args": ["-y", "@browsers-cli/se-mcp"]
    }
  }
}
```

### 工具目录

se-mcp 暴露 50 多个 MCP 工具，覆盖完整的浏览器自动化生命周期。所有工具均以 `browser_` 为前缀。

| 工具 | 描述 |
|------|------|
| `browser_open` | 启动浏览器会话（Chrome、Edge 或 Firefox） |
| `browser_close` | 关闭浏览器会话并停止 daemon |
| `browser_navigate` | 导航到某个 URL |
| `browser_click` | 通过 ref 或 CSS 选择器点击元素 |
| `browser_fill` | 向输入框填充文本 |
| `browser_snapshot` | 获取带元素 ref 的无障碍（aria）快照 |
| `browser_screenshot` | 截取页面或元素的截图 |
| `browser_eval` | 在页面中执行 JavaScript |
| `browser_run_code` | 执行任意 Selenium 片段（v0.9） |
| `browser_generate_locator` | 为 ref 生成推荐定位器，并附带匹配计数（v0.9） |
| `browser_tab_list` | 列出所有打开的标签页 |
| `browser_cookie_list` | 列出所有 cookie |
| `browser_state_save` | 将浏览器状态保存为 JSON |
| `browser_expect` | 断言条件（可见、隐藏、文本、值等） |
| `browser_route` | 模拟网络路由 |
| `browser_console` | 获取缓冲的控制台消息和 JS 错误 |

## se-extension-vscode

### 什么是 se-extension-vscode？

这是一个用于 se-cli 的 Visual Studio Code 扩展。它提供侧边栏浏览器面板（渲染 aria 快照和截图）、反映 daemon 状态的状态栏、常用浏览器操作的一键命令，以及为 Copilot 智能体自动注册 se-cli MCP 服务器。

- 发布者：VS Code Marketplace 上的 `se-cli`
- 仓库：[https://github.com/se-cli/se-extension-vscode](https://github.com/se-cli/se-extension-vscode)

### 安装

在扩展视图（Ctrl+Shift+X）中搜索 "se-cli"。

或者从命令行安装：

```bash
code --install-extension se-cli.se-extension-vscode
```

### 功能

- **MCP 服务器集成** —— se-cli 通过 `contributes.mcpServers` 注册为 Model Context Protocol 服务器，向 VS Code 智能体暴露 40 多个浏览器自动化工具。
- **浏览器面板** —— 活动栏中的 webview，以树形展示最近一次 aria 快照、最近一次截图、快捷操作按钮（打开、关闭、导航、快照、截图、点击、填写）以及命令历史。
- **状态栏** —— 实时显示 daemon 状态（浏览器运行中 / 已停止）。点击可打开包含所有命令的快速选择器。
- **自动快照** —— 可选地在每次导航或交互后自动获取 aria 快照，使面板始终反映当前页面。
- **有无全局安装均可使用** —— 使用已配置的 `se-cli` 二进制文件、PATH 上的全局安装，或回退到 `npx @browsers-cli/se-cli`。

### 配置

| 设置 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `se-cli.browser` | `chrome` \| `edge` \| `firefox` | `chrome` | 启动会话时要启动的浏览器。 |
| `se-cli.headless` | `boolean` | `false` | 以无头模式运行浏览器。禁用以显示浏览器窗口。 |
| `se-cli.session` | `string` | `default` | 用于浏览器隔离 / 并行会话的命名会话。 |
| `se-cli.autoSnapshot` | `boolean` | `true` | 在导航/交互后自动获取 aria 快照。 |
| `se-cli.cliPath` | `string` | `""` | se-cli 二进制的路径。为空 = 自动检测，然后回退到 npx。 |

### 命令

| 命令 | 描述 |
|------|------|
| `se-cli.openBrowser` | 选择浏览器并启动 daemon 会话。 |
| `se-cli.closeBrowser` | 停止 daemon 并关闭浏览器。 |
| `se-cli.navigate` | 运行 `goto <url>`。 |
| `se-cli.snapshot` | 运行 `snapshot` 并在面板中渲染树。 |
| `se-cli.screenshot` | 运行 `screenshot` 并在面板中显示图片。 |
| `se-cli.click` | 通过 ref（`e1`）或 CSS 选择器点击。 |
| `se-cli.fill` | 通过 ref/选择器向输入框填充文本。 |
| `se-cli.runCommand` | 快速选择所有可用命令。 |

## 架构

三个包共享同一个 se-cli daemon，它持有 WebDriver 实例。CLI 通过 Unix socket（或 Windows 命名管道）每条命令发送一行 JSON。se-mcp 包装了 se-cli 中的 MCP 服务器，将 JSON-RPC 2.0 调用转换为 CLI 参数。VS Code 扩展直接为其命令启动 CLI，并为 Copilot 智能体集成注册 MCP 服务器。

```text
┌─────────────┐   shell    ┌──────────┐   JSON    ┌──────────┐   WebDriver  ┌────────┐
│  AI Agent   │───────────►│  se-cli  │─────────►│  Daemon  │─────────────►│Browser │
│  (shell)    │            │  CLI     │  socket   │          │              │        │
└─────────────┘            └────┬─────┘           └──────────┘              └────────┘
                                │
                                │ require()
                                ▼
┌─────────────┐  JSON-RPC  ┌──────────┐
│  VS Code    │◄──────────►│  se-mcp  │
│  Copilot    │  stdio     │  wrapper │
└─────────────┘            └──────────┘
                                │
                                │ spawns
┌─────────────┐  spawns     ┌──────────┐
│  VS Code    │────────────►│  se-cli  │
│  Extension  │             │  CLI     │
│  Panel      │             └──────────┘
└─────────────┘
```

## 我应该使用哪个包？

| 使用场景 | 包 |
|----------|-----|
| Shell 脚本、终端自动化 | se-cli |
| Claude Code、任何基于 shell 的 AI 智能体 | se-cli |
| Claude Desktop、Cursor（MCP 客户端） | se-mcp |
| 带 Copilot 智能体的 VS Code | se-extension-vscode |
| 带浏览器面板 UI 的 VS Code | se-extension-vscode |
| 在 Node.js 中以编程方式使用 MCP 服务器 | se-mcp |
| 以上全部 | se-cli + se-mcp + se-extension-vscode |