---
title: 配置
sidebar_position: 2
---

# 配置

## v0.4 等待与重试配置层

v0.4 版本将 Selenium 的隐式/显式等待、pageLoad/script 超时和 `ExpectedConditions` 以 CLI 原生配置的形式呈现。之前所有需要编写代码的能力（显式等待、`ExpectedConditions`、Actions 链、`setScriptTimeout`）都通过四级优先级暴露——CLI 中无需"编写代码"。

```
优先级（高 → 低）

  ┌───────────────────────────┐
  │  --flag  (per-command)    │   最高 —— 覆盖一切
  ├───────────────────────────┤
  │  ENV  (SE_CLI_*)          │   进程环境变量
  ├───────────────────────────┤
  │  .se-cli.json / config    │   项目 / 用户配置文件
  ├───────────────────────────┤
  │  built-in default         │   最低 —— 安全的默认值
  └───────────────────────────┘
```

### 等待 / 重试标志

| 标志 | 说明 | 默认值 |
|------|------|--------|
| `--timeout=<ms>` | 每个命令的显式等待超时 | 5000 |
| `--wait=<state>` | visible \| hidden \| enabled \| disabled \| stable \| attached \| none \| auto | auto |
| `--retry=<n>` | 失败重试次数（`-1` = 直到超时） | 0 |
| `--retry-interval=<ms>` | 轮询间隔 | 100 |
| `--implicit-wait=<ms>` | 驱动隐式等待（不推荐但兼容） | 0 |
| `--page-load-timeout=<ms>` | `driver.manage().timeouts().pageLoadTimeout()` | 30000 |
| `--script-timeout=<ms>` | `setScriptTimeout`（影响异步 `eval`） | 30000 |
| `--no-wait` | `--wait=none --timeout=0` 的简写（精确时序场景） | — |

### 配置文件 schema

配置文件位于项目根目录的 `.se-cli.json`，或用户级设置的 `~/.config/se-cli/config.json`。`perCommand` 块按命令类型应用等待策略。

```json
{
  "wait": { "timeout": 5000, "state": "auto", "retry": 0, "retryInterval": 100 },
  "timeouts": { "implicit": 0, "pageLoad": 30000, "script": 30000 },
  "perCommand": {
    "click":    { "wait": "visible+enabled" },
    "fill":     { "wait": "visible+enabled" },
    "snapshot": { "wait": "none" },
    "eval":     { "wait": "none", "scriptTimeout": 30000 }
  }
}
```

### 配置命令

| 命令 | 说明 |
|------|------|
| `config get <key>` | 显示某个配置值及其来源 |
| `config set <key> <value>` | 将值写入配置文件 |
| `config list` | 列出每个配置项及其来源（flag / env / file / default） |
| `config init` | 生成模板配置文件 |

> **代码生成反映该策略。** 生成的 Selenium 代码会镜像实际生效的等待配置，例如 `await driver.wait(until.elementIsVisible(el), 5000);`

## 环境变量

面向 se-cli 用户的 Selenium 生态环境变量、驱动路径和配置建议。

### 🔧 se-cli 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `SE_CLI_SESSION` | 未提供 `-s` 标志时的默认会话名 | my-session |
| `SE_CLI_E2E` | 设置为 `1` 以运行集成测试（需要真实浏览器） | 1 |
| `SE_CLI_TEST_CHROME` | 设置为 `1` 以运行 Chrome 集成测试用例 | 1 |
| `SE_CLI_TEST_EDGE` | 设置为 `1` 以运行 Edge 集成测试用例 | 1 |
| `SE_CLI_TEST_FIREFOX` | 设置为 `1` 以运行 Firefox 集成测试用例 | 1 |

### ⚙️ Selenium Manager 变量

`selenium-manager`（随 `selenium-webdriver` 一起打包）会自动下载驱动。优先级：CLI 参数 > 配置文件（`~/.cache/selenium/se-config.toml`）> 环境变量。

| 变量 | 说明 | 示例 |
|------|------|------|
| `SE_BROWSER` | 用于驱动解析的浏览器名称 | chrome |
| `SE_DRIVER` | 要使用的驱动名称 | chromedriver |
| `SE_BROWSER_VERSION` | 固定浏览器主版本 | 120, beta, dev |
| `SE_DRIVER_VERSION` | 固定驱动版本 | 120.0.6099.71 |
| `SE_BROWSER_PATH` | 浏览器二进制的绝对路径（用于版本检测） | /usr/bin/google-chrome |
| `SE_DRIVER_MIRROR_URL` | 驱动下载的镜像 URL（在中国很有用） | https://npmmirror.com/mirrors/chromedriver/ |
| `SE_BROWSER_MIRROR_URL` | 浏览器下载的镜像 URL | https://mirror.example.com/firefox/ |
| `SE_PROXY` | 网络请求的 HTTP 代理 | user:pass@proxy:8080 |
| `SE_TIMEOUT` | 网络请求超时（秒） | 600 |
| `SE_OFFLINE` | 禁用网络请求和下载 | true |
| `SE_CACHE_PATH` | 驱动和浏览器的本地缓存路径 | ~/.cache/selenium |
| `SE_SKIP_DRIVER_IN_PATH` | 忽略系统 PATH 中发现的驱动 | true |
| `SE_SKIP_BROWSER_IN_PATH` | 忽略系统 PATH 中发现的浏览器 | true |
| `SE_AVOID_STATS` | 禁用匿名使用统计上报 | true |
| `SE_DEBUG` | 启用 DEBUG 级别的 Selenium Manager 日志 | true |

### 📁 驱动路径系统属性

通过 JVM 系统属性设置的传统驱动位置。设置后，Selenium Manager 不会干预（仅作为后备）。se-cli 会将这些传递给底层的 `selenium-webdriver` Builder。

| 属性 | 说明 | 示例 |
|------|------|------|
| `webdriver.chrome.driver` | ChromeDriver 二进制路径 | /usr/local/bin/chromedriver |
| `webdriver.gecko.driver` | GeckoDriver（Firefox）二进制路径 | /usr/local/bin/geckodriver |
| `webdriver.edge.driver` | Microsoft EdgeDriver 二进制路径 | C:\drivers\msedgedriver.exe |
| `webdriver.ie.driver` | IEDriverServer 二进制路径 | C:\drivers\IEDriverServer.exe |

> **提示：** 在 Node.js 上，启动 se-cli 之前设置这些变量：`webdriver.chrome.driver=/path/to/chromedriver se-cli open https://example.com`。或者将驱动二进制放入系统 `PATH`——Selenium Manager 会自动找到它。

### 🌐 浏览器二进制路径变量

当浏览器安装在非默认位置时，使用这些变量帮助 Selenium Manager 定位它们。

| 变量 | 说明 | 示例 |
|------|------|------|
| `SE_BROWSER_PATH` | Selenium Manager——浏览器二进制绝对路径 | C:\Program Files\Google\Chrome\Application\chrome.exe |
| `CHROME_BIN` | Chrome/Chromium 二进制路径（部分工具可识别） | /usr/bin/google-chrome-stable |
| `CHROME_PATH` | 备选 Chrome 二进制路径变量 | /opt/google/chrome/chrome |
| `FIREFOX_BIN` | Firefox 二进制路径 | /usr/bin/firefox |
| `MOZ_HEADLESS` | Firefox 无头模式开关（Firefox 自身可识别） | 1 |

### 🔗 远程 WebDriver 与 Grid 变量

用于连接 Selenium Grid 或云服务商（BrowserStack、Sauce Labs 等）。se-cli 用于 Grid 附加的 `--endpoint` 标志在 v0.10 路线图中。

| 变量 | 说明 | 示例 |
|------|------|------|
| `SELENIUM_REMOTE_URL` | 远程 WebDriver 服务器 URL（Grid 或 SaaS） | http://localhost:4444 |
| `SELENIUM_GRID_URL` | Selenium Grid URL（备选绑定） | http://grid.example.com:4444 |
| `SE_HUB_HOST` | Grid Hub 主机名 | grid.example.com |
| `SE_HUB_PORT` | Grid Hub 端口（默认：4444） | 4444 |
| `SE_NODE_MAX_SESSIONS` | 每个节点的最大并发会话数（默认：1） | 4 |
| `SE_NODE_SESSION_TIMEOUT` | 会话空闲超时（秒）（默认：300） | 600 |

> **注意：** se-cli 目前仅管理本地浏览器。远程 Grid 附加（`--endpoint`）计划在 v0.10 中实现。手动配置远程连接时，上述变量会被底层 `selenium-webdriver` 库识别。

### 🐳 Docker 与 CI 提示

在 Docker 容器和 CI 流水线中运行 se-cli 的常见模式。

| 变量 | 说明 | 示例 |
|------|------|------|
| `SE_OFFLINE` | 使用 Docker 镜像中预装的浏览器/驱动（Selenium 镜像中默认：true） | true |
| `SE_SCREEN_WIDTH` | 无头显示的屏幕宽度（Docker） | 1920 |
| `SE_SCREEN_HEIGHT` | 无头显示的屏幕高度（Docker） | 1080 |
| `SE_START_XVFB` | 在容器中启动 Xvfb 虚拟显示 | true |
| `DISPLAY` | Linux 无头环境的 X11 显示地址 | :99 |
| `SE_JAVA_OPTS` | Selenium Grid 组件的额外 JVM 选项 | -Xmx512m |

> **CI 提示：** 在 GitHub Actions 中，Chrome 已预装在 `ubuntu-latest` 运行器上。对于其他浏览器，在运行 se-cli 之前使用 `npx @puppeteer/browsers install chrome@stable`。在 CI 中设置 `SE_AVOID_STATS=true` 以禁用遥测。