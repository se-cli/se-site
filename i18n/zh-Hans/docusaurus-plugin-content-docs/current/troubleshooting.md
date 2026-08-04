---
title: 故障排查
sidebar_position: 7
---

## 错误码

se-cli 会返回带有 `code` 字段的结构化错误。以下是您最常遇到的错误码及对应的恢复方法。

| 错误码 | 含义 | 恢复方法 |
|--------|------|----------|
| `ELEMENT_NOT_FOUND` | ref/选择器不再匹配任何元素（DOM 已重建） | 运行 `se-cli snapshot` 刷新 refs，然后重试 |
| `DAEMON_DEAD` | daemon 进程在会话中途崩溃或被杀掉 | 运行 `se-cli close`（或 `kill-all`），然后重新运行 `se-cli open` |
| `VERSION_MISMATCH` | CLI 版本与正在运行的 daemon 版本不一致 | 运行 `se-cli close && se-cli open` 使两者一致 |
| `UNSUPPORTED_BROWSER` | 请求的浏览器在此平台上不可用 | 安装浏览器，或选择 `--browser=chrome\|edge\|firefox` |

```text
### Error
Element not found: [data-se-ref="e15"]
Hint: run `se-cli snapshot` to refresh refs.
```

## daemon 卡住 / 无法关闭

如果 `close` 挂起，或 `list` 显示幽灵会话，请从优雅清理升级到强制清理。

```bash
# 1. 优雅方式：关闭所有会话
se-cli close-all

# 2. 强制方式：杀掉所有 daemon 和浏览器
se-cli kill-all

# 3. 最后手段：手动删除孤儿 .session 文件
rm -rf "$(./node_modules/.bin/se-cli config get cachePath)/ms-se-cli/daemon"/*.session
# Linux/macOS 的 socket 目录通常是 $TMPDIR/se-cli/
rm -rf "${TMPDIR:-/tmp}/se-cli/"*
```

:::warning 避免对 daemon PID 使用 `kill -9`
这会绕过 `gracefulShutdown`，可能导致浏览器进程成为孤儿进程。请优先使用 `kill-all`，它会走正常的退出路径。只有在 `kill-all` 返回之后，才删除 `.session` 文件。
:::

## 驱动版本漂移

:::info 交给 `selenium-manager` 处理
浏览器自动更新后的驱动不匹配是经典的 Selenium 痛点。`selenium-manager`（随 `selenium-webdriver` 捆绑）会自动检测已安装的浏览器版本并下载匹配的驱动——除非有特定原因，否则不要固定驱动版本。
:::

如果您必须固定版本（例如离线 CI），请在启动 se-cli 前设置相应的环境变量：

```bash
# 固定驱动与浏览器版本
SE_BROWSER_VERSION=120 SE_DRIVER_VERSION=120.0.6099.71 \
SE_OFFLINE=true se-cli open https://example.com
```

请参见[配置](./configuration.md#环境变量)页面获取完整的 Selenium Manager 变量。

## 常见问题

关于 se-cli 的常见问题。

### se-cli 与 Selenium MCP 有何不同？

Selenium MCP 每次调用会加载约 5KB 的工具 schema，并返回完整的无障碍树。se-cli 采用 CLI + daemon 架构：CLI 发送一行 JSON，daemon 持有 WebDriver，aria 快照返回带有元素 ref 的紧凑 YAML。没有 schema 进入智能体的上下文——通常少 10 倍的 token。

### 支持哪些浏览器？

Chrome、Edge 和 Firefox 在无头和有头模式下均得到完整支持。Chrome 和 Edge 还支持通过 `--cdp=<url>` 进行 CDP 附加。Safari（`--browser=safari`）和 Edge IE 模式（`--browser=edge-ie`）计划在 v0.10 中提供。

### 我需要单独安装浏览器驱动吗？

不需要。`selenium-manager`（随 `selenium-webdriver` 捆绑）会自动为您的浏览器和平台下载正确的驱动二进制文件。

### 我可以在 AI 智能体中使用 se-cli 吗？

可以。se-cli 可与任何能够运行 shell 命令的 AI 智能体配合使用——包括 Claude Code、Cursor、Copilot CLI。运行 `se-cli install --skills`（或手动放置 `skill/SKILL.md`）即可立即开始驱动浏览器。

### 会话如何在命令之间保持？

daemon 进程持有 WebDriver 实例，并在多次 CLI 调用之间保持存活。会话元数据以 `.session` JSON 文件形式存储在 `<cache>/ms-se-cli/daemon/` 中。使用 `close` 进行清理，或使用 `kill-all` 强制结束。

### se-cli 会取代 Selenium WebDriver 吗？

不会。se-cli 构建在 `selenium-webdriver` 之上。它在 WebDriver 协议之上提供了 CLI 界面和 daemon 架构，使 AI 智能体和 shell 脚本都能使用。每个操作还会输出等效的 Selenium 代码，供您的测试文件使用。

### 采用什么许可证？

Apache License 2.0。详见 [LICENSE](https://github.com/se-cli/se-cli/blob/main/LICENSE)。