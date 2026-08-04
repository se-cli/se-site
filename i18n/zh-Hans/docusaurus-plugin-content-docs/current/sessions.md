---
title: 会话与浏览器
sidebar_position: 2
---

# 会话与浏览器

## 命名会话

默认情况下，每个命令都针对默认会话。传入 `-s=<name>` 可以隔离一个会话——每个命名会话都有自己独立的守护进程、WebDriver 和浏览器，因此你可以并行驱动多个会话，并随时自由切换。

### 命名会话

```bash
se-cli -s=alpha open https://example.com
se-cli -s=alpha snapshot
se-cli -s=alpha title
se-cli -s=alpha close

se-cli list
# alpha    chrome    running
# default  —         (none)
```

### 并行多浏览器

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

## 持久化配置文件

使用 `--profile` 或 `--persistent`（v0.2）可以在多次运行之间保留 cookie、localStorage 和登录状态。这对于只登录一次并复用会话的认证工作流至关重要。

| 标志 | 描述 | 示例 |
|------|------|------|
| `--profile=<path>` | 持久化用户数据目录——复用真实的浏览器配置文件 | `--profile=/tmp/se-profile` |
| `--persistent` | 自动分配一个 userDataDir，使状态自动保留 | `se-cli open --persistent` |
| `--browser=chrome\|edge\|firefox` | 按会话选择浏览器 | `--browser=firefox` |
| `--headed` | 显示浏览器窗口（默认：无头模式） | `se-cli open --headed` |

:::info
**与 state-save 结合使用。** 对于跨机器的可移植性，优先使用 [`state-save`](storage-state.md) 而不是配置文件——JSON 是可移植的，而 userDataDir 不是。
:::

## 守护进程生命周期

守护进程在第一次 `open` 时启动，并在多次 CLI 调用之间持续存在。它持有 WebDriver 实例、快照树和引用注册表。三种机制让它保持健康并回收资源。

### selfDestructOnIdle

在没有请求的情况下，30 分钟后自动销毁（可配置）。防止代理离开时孤立守护进程造成内存泄漏。

### heartbeat

驱动会定期调用 `getTitle()` 作为存活检查。如果浏览器进程悄然崩溃，守护进程会检测到并报告 `DAEMON_DEAD`。

### gracefulShutdown

`SIGTERM`/`SIGINT` → 退出驱动 → 删除 `.session` 文件 → 退出。`close` 触发相同的路径；`kill-all` 强制终止一切。

### 会话注册表

`.session` JSON 文件存放在 `<cache>/ms-se-cli/daemon/` 中。`list` 会将其与实时进程进行对账并清理孤儿进程。

```bash
se-cli list              # 查看所有会话 + 对账孤儿进程
se-cli close-all         # 优雅关闭每个会话
se-cli kill-all          # 强制终止所有守护进程和浏览器
```

守护进程卡住了？请参阅[故障排查](troubleshooting.md)指南，了解如何手动清理 `.session` 文件和套接字路径。