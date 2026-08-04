---
title: 特性矩阵
sidebar_position: 2
---

# 特性矩阵

每一个能力都对照五个受支持的浏览器目标进行映射。按浏览器或版本筛选以界定某个发布范围。

**图例：** ✓ 完整支持 · ◐ 部分/降级 · ○ 规划中 · — 不支持

| 能力 | 起始版本 | Chrome | Edge | Firefox | Safari | Edge IE |
|---|---|---|---|---|---|---|
| **会话与架构** | | | | | | |
| CLI + 守护进程架构 | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 命名会话 / 并行浏览器 | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 多浏览器启动 | v0.1 | ✓ | ✓ | ✓ | ○ | ○ |
| CDP 附加（`--cdp`） | v0.1 | ✓ | ✓ | — | — | — |
| 持久化配置文件（`--profile`） | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **导航** | | | | | | |
| goto / go-back / go-forward / reload | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| title / url | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **交互** | | | | | | |
| click / fill / type / press | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| select / check / uncheck | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| hover / dblclick / drag | v0.5 | ✓ | ✓ | ✓ | ✓ | ◐ |
| 对话框 accept / dismiss | v0.5 | ✓ | ✓ | ✓ | ✓ | ✓ |
| upload / 调整视口 | v0.5 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 键盘 / 鼠标精细控制 | v0.5 | ✓ | ✓ | ✓ | ✓ | ◐ |
| `actions-chain` 批量操作 | v0.5 | ✓ | ✓ | ✓ | ✓ | ◐ |
| **快照与搜索** | | | | | | |
| aria 快照 + ref 机制 | v0.1 | ✓ | ✓ | ✓ | ✓ | ◐ |
| find / find --regex | v0.1 | ✓ | ✓ | ✓ | ✓ | ✓ |
| iframe 递归快照 | v0.3 | ✓ | ✓ | ✓ | ✓ | ✓ |
| Shadow DOM 递归 | v0.3 | ✓ | ✓ | ✓ | ✓ | — |
| **存储与状态** | | | | | | |
| cookie / localStorage / sessionStorage | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| state-save / state-load | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 标签页管理 | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **等待与重试（v0.4）** | | | | | | |
| `--timeout` / `--wait` / `--retry` | v0.4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| 4 层配置优先级 | v0.4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| config get / set / list / init | v0.4 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **断言（v0.6）** | | | | | | |
| expect visible / hidden / enabled / disabled | v0.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| expect text / value / count / attribute | v0.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| `--not` 取反 / 退出码 | v0.6 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **网络与调试（v0.7）** | | | | | | |
| route / unroute（拦截） | v0.7 | ✓ | ✓ | ✓ | — | — |
| console 捕获 | v0.7 | ✓ | ✓ | ✓ | — | ◐ |
| requests / js-error | v0.7 | ✓ | ✓ | ✓ | — | ◐ |
| highlight / highlight --hide | v0.7 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **设备模拟（v0.8）** | | | | | | |
| 设备预设 / 视口 | v0.8 | ✓ | ✓ | ◐ | — | — |
| 地理位置 / 时区 / 语言环境 | v0.8 | ✓ | ✓ | ◐ | — | — |
| 网络 / CPU / 离线限速 | v0.8 | ✓ | ✓ | ◐ | — | — |
| **MCP 与 AI（v0.9）** | | | | | | |
| MCP 服务器（stdio / HTTP） | v0.9 | ✓ | ✓ | ✓ | ✓ | ✓ |
| run-code / generate-locator | v0.9 | ✓ | ✓ | ✓ | ✓ | ✓ |
| `By.role()` 代码生成 | v0.9 | ✓ | ✓ | ✓ | ✓ | ✓ |
| install --skills | v0.2 | ✓ | ✓ | ✓ | ✓ | ✓ |
| **远程与浏览器（v0.10）** | | | | | | |
| Safari（`safaridriver`） | v0.10 | — | — | — | ○ | — |
| Selenium Grid（`--endpoint`） | v0.10 | ○ | ○ | ○ | ○ | ○ |
| 自定义浏览器 / 驱动二进制 | v0.10 | ○ | ○ | ○ | ○ | ○ |
| Edge IE 模式 | v0.10 | — | — | — | — | ○ |
| 云浏览器（Browserbase / Sauce / BrowserStack） | v0.10 | ○ | ○ | ○ | ○ | ○ |
| pdf 导出 | v0.10 | ○ | ○ | — | — | — |
| **录制（v0.11）** | | | | | | |
| record 模式 → 测试文件 | v0.11 | ○ | ○ | ○ | ○ | ○ |
| tracing start / stop | v0.11 | ○ | ○ | ◐ | — | — |
| 视频录制 | v0.11 | ○ | ○ | ◐ | — | — |
| show 仪表盘 / 标注 | v0.11 | ○ | ○ | ○ | ○ | ○ |
| **VSCode 扩展（v0.12）** | | | | | | |
| 任务提供者 / webview | v0.12 | ○ | ○ | ○ | ○ | ○ |
| MCP 自动注册 / 附加 | v0.12 | ○ | ○ | ○ | ○ | ○ |
| **BiDi 扩展与加固（v0.13）** | | | | | | |
| BiDi browsingContext / input / script / emulation | v0.13 | ○ | ○ | ○ | — | — |
| 性能与稳定性优化 | v0.13 | ○ | ○ | ○ | ○ | ○ |

**说明。** Safari 不支持无头模式、BiDi 或 CDP——仅支持基本导航、交互、截图、存储和 iframe。Edge IE 模式仅限 Windows 企业版；IE 引擎缺少 Shadow DOM、模拟、BiDi 拦截和录制——标记为 ◐ 的能力以降级形式运行（Actions 链步骤、用于控制台/网络监控的部分 CDP）。标记为 ○ 的能力已排期但尚未发布。