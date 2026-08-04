---
title: 快速入门
sidebar_position: 1
---

# 快速入门

## 安装

se-cli 以全局 CLI 的形式发布在 npm 上。它需要 **Node.js 18+**，并且你的机器上至少安装了 Chrome、Edge 或 Firefox 中的一种。

```bash
npm install -g @browsers-cli/se-cli
```

:::info
**驱动自动管理。** `selenium-manager`（随 `selenium-webdriver` 一起打包）会根据你的浏览器和平台下载正确的驱动二进制文件——无需手动配置。
:::

## 你的第一个会话

核心循环是 `open → snapshot → click → close`。`open` 会启动一个持有 WebDriver 的长驻守护进程；`snapshot` 返回一个紧凑的 YAML 树；像 `e1` 这样的引用（ref）让你无需选择器即可对元素执行操作。

```bash
se-cli open https://example.com
se-cli snapshot
# - document:
#   - heading "Example Domain" [level=1]
#   - link "More information..." [ref=e1]

se-cli click e1
se-cli close
```

## 概念模型

se-cli 是一个**短生命周期 CLI**，通过行分隔的 JSON 与一个**长生命周期守护进程**通信。该守护进程持有 WebDriver 实例和引用注册表。以下四个概念驱动着其他一切：

```text
┌─────────────────┐  Unix socket / Win pipe  ┌──────────────────────┐
│  se-cli         │ ─── line-delimited JSON ─▶ │  se-cli daemon       │
│  (short-lived)  │ ◀── single response ───── │  (holds WebDriver)   │
└─────────────────┘                            └──────────────────────┘
                                                          │
                                                          │ W3C WebDriver HTTP
                                                          ▼
                                                    ┌──────────┐
                                                    │ Browser  │
                                                    │(Chrome/  │
                                                    │ Edge/FF) │
                                                    └──────────┘
```

### CLI 进程

每个命令都会生成一个。发送一行 JSON，接收一个响应，然后退出。零模式开销——所有状态都由守护进程持有。

### 守护进程

在第一次 `open` 时启动。在多次 CLI 调用之间持续存在。持有 WebDriver 实例、快照树和引用注册表。

### 套接字 / 管道

通过 Unix 套接字（Linux/macOS）或 Windows 命名管道传输行分隔的 JSON。每个连接一个请求——没有长期存在的流。

### 引用注册表

可交互元素会获得 `data-se-ref="eN"` 属性。`<cache>/ms-se-cli/daemon/` 中的 `.session` JSON 文件在 CLI 退出后仍然保留。

## 使用示例

真实世界的模式：表单自动化、并行会话、CDP 附加、Shell 脚本、查找与搜索，以及代码生成。

### 表单提交

```bash
se-cli open https://app.example.com/login
se-cli snapshot
# - textbox "Email" [ref=e1]
# - textbox "Password" [ref=e2]
# - button "Sign in" [ref=e3]

se-cli fill e1 "user@example.com"
se-cli fill e2 "password123"
se-cli click e3
se-cli snapshot
se-cli close
```

### 并行浏览器

```bash
# 两个会话，两个浏览器
se-cli -s=chrome open https://example.com \
  --browser=chrome
se-cli -s=firefox open https://example.com \
  --browser=firefox

se-cli -s=chrome title
se-cli -s=firefox title

se-cli -s=chrome close
se-cli -s=firefox close
```

### CDP 附加

```bash
# 以调试模式启动 Chrome
google-chrome --remote-debugging-port=9222

# 附加到正在运行的浏览器
se-cli open --cdp=http://localhost:9222
se-cli snapshot
se-cli screenshot --filename=debug.png
se-cli close
```

### Shell 脚本

```bash
# 使用 --raw 获取干净的输出
TITLE=$(se-cli --raw title)
URL=$(se-cli --raw url)

# 通过 eval 统计元素数量
COUNT=$(se-cli --raw eval \
  "document.querySelectorAll('.item').length")
echo "Found $COUNT items on $TITLE"

# 面向管道的 JSON 输出
se-cli --json snapshot | jq '.refs[]'
```

### 查找与搜索

```bash
# 在快照中搜索文本
se-cli find "Submit"
# - button "Submit order" [ref=e7]

# 正则搜索
se-cli find --regex "price.*\\$[0-9]+"
# - text "price: $29.99" [ref=e12]

# 点击找到的元素
se-cli click e12
```

### 代码生成

```bash
$ se-cli fill e1 "hello@example.com"

### Ran Selenium code
await driver.findElement(
  By.css('[data-se-ref="e1"]')
).sendKeys("hello@example.com");

# Copy directly into test files
```

## 下一步

浏览[完整命令参考](commands.md)，了解[配置](configuration.md)，或阅读[快照与引用](snapshots-refs.md)在内部是如何工作的。