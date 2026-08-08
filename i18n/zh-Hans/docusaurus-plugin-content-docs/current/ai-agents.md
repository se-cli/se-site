---
title: AI 智能体
sidebar_position: 6
---

## 智能体集成流程

se-cli 可与任何能够运行 shell 命令的 AI 智能体配合使用——包括 Claude Code、Cursor、Copilot CLI 等。CLI 路径无需 MCP 服务器：只需安装一次，放入 `SKILL.md`，智能体即可像人类一样驱动浏览器。

### 1. 安装 CLI

一次全局安装即可——无需针对每个智能体进行配置，也无需配置 MCP 服务器。

```bash
npm install -g @browsers-cli/se-cli
```

### 2. 安装技能（推荐）

`install --skills` 会将 `SKILL.md` 复制到智能体的技能目录中，使其能立即掌握命令语法。支持 Claude Code（`.claude/skills/se-cli/`）、Cursor（`.cursor/skills/se-cli/`）、GitHub Copilot（`.github/copilot/skills/se-cli/`）以及通用的 `.agents/skills/` 路径（v0.9）。

```bash
se-cli install --skills                  # 自动检测已安装的智能体目录
se-cli install --agent=claude,cursor     # 显式指定多个目标
se-cli install --list-agents             # 显示支持的目标
se-cli install --force                   # 覆盖已有文件
```

### 3. 智能体驱动浏览器

智能体像人类一样调用 `se-cli` 命令——打开、快照、交互、关闭。

```text
User: "Check that the login page works"
Agent: I'll navigate and test the login flow.
  $ se-cli open https://app.example.com/login
  $ se-cli snapshot
  $ se-cli fill e1 "test@example.com"
  $ se-cli fill e2 "password"
  $ se-cli click e3
  $ se-cli snapshot
  Login succeeded — dashboard is visible.
```

### 4. 为什么对编码智能体而言 CLI 优于 MCP

工具 schema 不会污染上下文窗口。没有 JSON-RPC 信封开销。只有干净的 shell 命令和紧凑的 YAML 输出——单次交互通常比 Selenium MCP 少约 12 倍的 token。

## MCP 与 CLI 的 token 成本对比

对于已经能够运行 shell 命令的编码智能体而言，CLI 路径要便宜得多。下方的 MCP 服务器适用于需要持久化工具服务器而非 shell 的自动化工作流。

| 方面 | Selenium MCP | se-cli (CLI) |
|------|--------------|--------------|
| 每次调用的 token | 约 5,000 | 约 400 |
| 上下文中的 schema | 约 5KB，始终加载 | 无 |
| 输出格式 | JSON-RPC 信封 + 完整树 | 紧凑 YAML + refs |
| 智能体要求 | MCP 客户端 | 任何支持 shell 的智能体 |
| 持久化服务器 | 是 | 否（由 daemon 持有状态） |
| 最适合 | 自主的长时运行工作流 | 编码智能体（Claude Code、Cursor） |

## MCP 服务器（已发布 · v0.7.1）

se-cli 通过 `@modelcontextprotocol/sdk` 以 MCP 服务器形式发布，与 CLI 双轨并行：两者共享相同的底层工具实现。这覆盖了偏好使用持久化工具服务器而非 shell 命令的自主智能体。

```text
# stdio 传输（默认）——本地智能体
se-cli mcp-server

# 轻量 npm 包装（推荐用于 MCP 客户端）
npx @browsers-cli/se-mcp
```

- 所有 CLI 工具均包装为 `registerTool` 调用
- 通过 `run-code "async driver => ..."` 执行任意 Selenium 片段
- 通过 `generate-locator <ref>` 获取最佳可用定位器
- 通过共享的 codegen 模块实现基于角色的代码生成（`By.role()`）
- 符合 SKILL.md front matter 规范（`name`、`description`、`license`、`compatibility`）

:::info 双轨策略
CLI + SKILLS 仍是编码智能体最高效省 token 的路径；MCP 服务器则为自主工作流提供持久化状态的工具。可在[路线图](roadmap.md)中跟踪进度。
:::

## v0.10：远程、自定义浏览器与 Safari（已发布）

当 agent 需要本地 Chrome/Edge/Firefox 之外的浏览器时：

```text
# 连接到 Selenium Grid 4 hub 或远程 WebDriver
Agent: "在 staging Grid 上运行测试"
  $ se-cli open --browser=chrome --endpoint=http://grid.example.com:4444/wd/hub
  $ se-cli grid status http://grid.example.com:4444/wd/hub
  $ se-cli grid distribute --shard=1/4 --browsers=chrome,edge,firefox,safari

# 自定义浏览器/驱动二进制（360、UC、Brave、Electron 内嵌等）
  $ se-cli open --browser-binary=/opt/custom-browser --driver-binary=/opt/custom-driver

# 真实 Safari（仅 macOS——不支持无头、BiDi/CDP）
  $ se-cli open --browser=safari

# W3C capabilities 透传（例如接受自签名证书）
  $ se-cli open --capabilities='{"acceptInsecureCerts":true}'
```

并非每个命令都支持所有浏览器。导航、snapshot、交互、cookie、存储、截图、
eval、标签页与对话框在全部四种浏览器上可用；`console`/`requests`/`route`
需要 BiDi（Chrome/Edge/Firefox），`device`/`emulate`/`--cdp` 需要 CDP
（Chrome/Edge），`pdf` 需要 W3C 打印端点（不支持 Safari）。完整矩阵见
`se-cli` 仓库文档（`docs/spec.md` → 浏览器支持矩阵）。当 agent 尝试不支持的
命令时会收到明确错误（指出缺失的能力），从而自动回退到其他浏览器。