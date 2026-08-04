---
title: 命令参考
sidebar_position: 1
---

# 命令参考

se-cli 内置的命令分为多个类别。会话级命令在 CLI 进程中运行；其余命令被转发到 daemon。按标签浏览每组命令。

## 会话（Session）

| 命令 | 说明 |
|------|------|
| `open [url]` | 启动 daemon + 浏览器，可选地导航到 URL |
| `close` | 关闭浏览器和 daemon |
| `close --all` | 关闭所有项目中的所有会话 |
| `sessions` | 列出所有项目中的所有会话（存活/已失效） |
| `list` | 列出所有会话 |
| `close-all` | 优雅地关闭所有会话 |
| `kill-all` | 强制终止所有会话 |
| `logs [--tail=N]` | 查看本会话的 daemon + CLI 日志文件（默认 50 行） |

## 导航（Navigation）

| 命令 | 说明 |
|------|------|
| `goto <url>` | 导航到 URL |
| `go-back` | 浏览器后退 |
| `go-forward` | 浏览器前进 |
| `reload` | 重新加载页面 |

## 交互（Interaction）

| 命令 | 说明 |
|------|------|
| `click <ref&vert;selector>` | 点击元素 |
| `fill <ref&vert;selector> <text>` | 清空并填充输入框 |
| `type <text>` | 在当前聚焦的元素中输入文本 |
| `press <key>` | 按下键盘按键（Enter、Tab、Escape 等） |
| `select <ref> <value>` | 选择下拉选项 |
| `check <ref>` | 勾选复选框 |
| `uncheck <ref>` | 取消勾选复选框 |
| `hover <ref>` | 鼠标悬停在元素上（v0.5） |
| `dblclick <ref>` | 双击元素（v0.5） |
| `drag <start> <end>` | 拖放元素（v0.5） |
| `dialog-accept [text]` | 接受 alert/confirm/prompt 对话框（v0.5） |
| `dialog-dismiss` | 关闭对话框（v0.5） |
| `upload <ref> <file>` | 向输入元素上传文件（v0.5） |
| `resize <w> <h>` | 设置视口尺寸（v0.5） |
| `keydown <key>` | 按下并按住按键（v0.5） |
| `keyup <key>` | 松开按住的按键（v0.5） |
| `mousemove <x> <y>` | 将鼠标移动到坐标（v0.5） |
| `mousedown [button]` | 按下鼠标按键（左键/右键/中键）（v0.5） |
| `mouseup [button]` | 松开鼠标按键（v0.5） |
| `mousewheel <dx> <dy>` | 按偏移量滚动滚轮（v0.5） |
| `actions-chain <json>` | 在单个 perform() 中链式执行多个动作（v0.5） |

> **v0.5 已发布。** 所有交互命令都使用 v0.4 的 wait/retry 配置。使用 `actions-chain` 将多个步骤合并为一次往返调用。

## 快照（Snapshot）

| 命令 | 说明 |
|------|------|
| `snapshot [ref]` | 获取页面或元素子树的 Aria 快照 |
| `snapshot --depth=N` | 限制快照深度 |
| `snapshot --filename=f.yml` | 将快照保存到文件 |
| `find <text>` | 在快照中搜索文本 |
| `find --regex <pattern>` | 使用正则表达式搜索快照 |

## 保存与执行（Save & Execute）

| 命令 | 说明 |
|------|------|
| `screenshot [ref]` | 截图（整页或元素） |
| `screenshot --filename=f.png` | 将截图保存到文件 |
| `eval "<js>"` | 执行 JavaScript，返回结果 |
| `eval "<js>" <ref>` | 在元素上执行 JavaScript |
| `run-code "<snippet>"` | 执行任意 Selenium 代码片段（接收 `driver`；v0.9） |
| `generate-locator <ref>` | 推荐定位器及匹配数量（v0.9） |
| `title` | 获取页面标题 |
| `url` | 获取当前 URL |

## 存储（Storage）

| 命令 | 说明 |
|------|------|
| `cookie-list` | 列出当前页面的所有 Cookie |
| `cookie-get <name>` | 按名称获取单个 Cookie |
| `cookie-set <json>` | 添加或覆盖一个 Cookie |
| `cookie-delete <name>` | 按名称删除一个 Cookie |
| `localstorage-get <key>` | 读取一个 localStorage 值 |
| `localstorage-set <key> <val>` | 写入一个 localStorage 值 |
| `localstorage-delete <key>` | 删除一个 localStorage 值 |
| `localstorage-clear` | 清空所有 localStorage |
| `sessionstorage-*` | 与 sessionStorage 对应的同族命令 |
| `state-save <file>` | 将 Cookie + 存储导出为 JSON |
| `state-load <file>` | 从 JSON 恢复 Cookie + 存储 |

## 标签页（Tabs）

| 命令 | 说明 |
|------|------|
| `tab-list` | 列出会话中的所有标签页/窗口 |
| `tab-new <url>` | 打开新标签页并导航到 URL |
| `tab-close` | 关闭当前标签页 |
| `tab-select <handle>` | 按窗口句柄切换到指定标签页 |

## 配置（Config）

| 命令 | 说明 |
|------|------|
| `config get <key>` | 显示某个配置值及其来源 |
| `config set <key> <value>` | 将值写入配置文件 |
| `config list` | 列出所有设置及其来源（flag/env/file/default） |
| `config init` | 生成模板配置文件 |

> **v0.4。** 参见 [配置](configuration.md) 页面了解 4 层优先级系统以及 wait/retry 标志。

## 断言（Assertions，v0.6）

| 命令 | 说明 |
|------|------|
| `expect <ref> visible` | 断言元素可见（退出码 0/1） |
| `expect <ref> hidden` | 断言元素隐藏 |
| `expect <ref> enabled` | 断言元素已启用 |
| `expect <ref> disabled` | 断言元素已禁用 |
| `expect <ref> checked` | 断言复选框已勾选 |
| `expect <ref> unchecked` | 断言复选框未勾选 |
| `expect <ref> text "..."` | 断言元素文本（子串匹配） |
| `expect <ref> value "..."` | 断言输入值 |
| `expect <ref> count N` | 断言匹配元素数量 |
| `expect <ref> attribute <name> <value>` | 断言属性值 |
| `expect title "..."` | 断言页面标题 |
| `expect url "..."` | 断言页面 URL |
| `--not` | 反转断言（例如 expect NOT visible） |
| `--exact` | 严格匹配而非子串匹配 |
| `--timeout=<ms>` | 轮询超时（默认 5000ms） |

## 网络与调试（Network & Debug，v0.7）

| 命令 | 说明 |
|------|------|
| `highlight <ref>` | 使用持久 CSS 覆盖层高亮元素外框（默认：3px solid red）（v0.7） |
| `highlight <ref> --style="2px solid blue"` | 自定义 CSS 外框样式（v0.7） |
| `highlight <ref> --hide` | 移除指定元素的高亮（v0.7） |
| `highlight --hide --all` | 移除所有高亮（v0.7） |
| `highlight` | 列出所有活动高亮（无参数）（v0.7） |
| `console` | 自会话开始以来所有缓冲的控制台消息（v0.7） |
| `console error` | 按级别过滤：error、warning、info、verbose（v0.7） |
| `console js-error` | 仅显示 JavaScript 异常（v0.7） |
| `console --since=5m` | 最近 5 分钟内的消息（30s、1h 等）（v0.7） |
| `console --clear` | 输出后清空控制台缓冲区（v0.7） |
| `requests` | 列出所有缓冲的网络请求（v0.7） |
| `requests --filter="api"` | 按 URL 子串过滤请求（v0.7） |
| `requests --status=500` | 按 HTTP 状态码过滤（v0.7） |
| `requests --method=POST` | 按 HTTP 方法过滤（v0.7） |
| `requests --clear` | 清空网络请求缓冲区（v0.7） |
| `request <index>` | 显示完整请求详情（请求头、请求体、响应）（v0.7） |
| `route <pattern> --status=401` | 通过 BiDi 为匹配 URL 注册模拟响应（v0.7） |
| `route <pattern> --body='{"error":"..."}'` | 使用自定义响应体模拟（v0.7） |
| `route <pattern> --headers='{"X-Custom":"val"}'` | 使用自定义响应头模拟（v0.7） |
| `route-list` | 列出所有活动路由拦截（v0.7） |
| `unroute <index>` | 移除指定路由拦截（v0.7） |
| `unroute --all` | 移除所有路由拦截（v0.7） |

> **v0.7 已发布。** 网络拦截和控制台捕获使用 Selenium BiDi 协议（`log.entryAdded`、`Network.addIntercept`）。`highlight` 命令是纯 JS 注入，适用于所有浏览器——无需 BiDi。BiDi 监听器在首次使用任何网络/调试命令时惰性初始化。

## 模拟（Emulation，v0.8）

| 命令 | 说明 |
|------|------|
| `device <name>` | 应用设备预设（视口 + UA + deviceScaleFactor + 触摸）（v0.8） |
| `device-list` | 列出所有内置设备预设（v0.8） |
| `emulate` | 显示当前模拟状态（v0.8） |
| `emulate --offline` | 进入离线状态（v0.8） |
| `emulate --throttle-network=<profile>` | 限制网络：`slow3g`\|`fast3g`\|`gprs`\|`custom:download=,upload=,latency=`（v0.8） |
| `emulate --throttle-cpu=<rate>` | CPU 降速倍率，例如 `4`（v0.8） |
| `emulate --reset` | 恢复运行时模拟（保留打开时的标志）（v0.8） |
| `open --viewport=<WxH>` | 页面视口尺寸，例如 `1280x720`（v0.8） |
| `open --user-agent=<ua>` | 覆盖浏览器用户代理（v0.8） |
| `open --locale=<tag>` | 覆盖页面区域设置，例如 `zh-CN`（v0.8） |
| `open --color-scheme=<light\|dark>` | 模拟 `prefers-color-scheme`（v0.8） |
| `open --timezone=<id>` | 覆盖时区，例如 `America/New_York`（v0.8） |
| `open --geolocation=<lat,lon[,accuracy]>` | 覆盖地理位置（v0.8） |
| `open --permissions=<list>` | 授予权限，例如 `geolocation,camera`（v0.8） |

> **v0.8 已发布。** 模拟在 Chrome/Edge 上使用 CDP（`Emulation.*`、`Network.*`、`Browser.*`）；Firefox 通过 WebDriver BiDi 支持视口。如果驱动重建，打开时的标志会自动重放。

## 标志（Flags）

| 标志 | 说明 |
|------|------|
| `--raw` | 仅输出结果值（用于脚本） |
| `--json` | 结构化 JSON 输出 |
| `-s=<name>` | 使用命名的会话 |
| `--browser=chrome\|edge\|firefox` | 浏览器选择（默认：chrome） |
| `--headed` | 显示浏览器窗口（默认：无头） |
| `--cdp=<url>` | 通过 CDP 附加到正在运行的 Chrome |
| `--profile=<path>` | 持久化用户数据目录（v0.2） |
| `--persistent` | 自动分配一个持久的 userDataDir（v0.2） |
| `--depth=<N>` | 限制 aria 快照递归深度（默认：50） |
| `--filename=<f>` | 将快照/截图保存到文件 |
| `--regex=<pattern>` | 使用正则表达式搜索快照（find） |
| `--submit` | 填充后提交表单（Enter 键） |
| `--timeout=<ms>` | 每个命令的显式等待超时（v0.4，默认 5000） |
| `--wait=<state>` | 等待条件：`visible\|hidden\|enabled\|disabled\|stable\|attached\|none\|auto`（v0.4） |
| `--retry=<n>` | 失败重试次数，`-1` = 直到超时（v0.4） |
| `--retry-interval=<ms>` | 重试的轮询间隔（v0.4，默认 100） |
| `--implicit-wait=<ms>` | 驱动隐式等待（v0.4） |
| `--page-load-timeout=<ms>` | `driver.manage().timeouts().pageLoadTimeout()`（v0.4） |
| `--script-timeout=<ms>` | 异步 `eval` 的 `setScriptTimeout`（v0.4） |
| `--no-wait` | `--wait=none --timeout=0` 的简写（v0.4） |
| `--not` | 反转断言（v0.6） |
| `--exact` | 断言的严格匹配（v0.6） |
| `--style="..."` | 用于 `highlight` 的自定义 CSS 外框（v0.7） |
| `--hide` | 移除元素上的高亮（v0.7） |
| `--all` | 应用于所有高亮或路由（v0.7） |
| `--since=<duration>` | `console` 的时间过滤（例如 `5m`、`30s`、`1h`）（v0.7） |
| `--clear` | 输出后清空缓冲区（console/requests）（v0.7） |
| `--filter="..."` | 按 URL 子串过滤 `requests`（v0.7） |
| `--status=<code>` | 过滤/模拟 HTTP 状态码（v0.7） |
| `--method=<VERB>` | 按 HTTP 方法过滤 `requests`（v0.7） |
| `--body='...'` | `route` 的模拟响应体（v0.7） |
| `--headers='{"k":"v"}'` | `route` 的模拟响应头（v0.7） |
| `--viewport=<WxH>` | 页面视口尺寸，例如 `1280x720`（v0.8） |
| `--user-agent=<ua>` | 覆盖浏览器用户代理（v0.8，Chrome/Edge） |
| `--locale=<tag>` | 覆盖页面区域设置，例如 `zh-CN`（v0.8，Chrome/Edge） |
| `--color-scheme=<light\|dark>` | 模拟 `prefers-color-scheme`（v0.8，Chrome/Edge） |
| `--timezone=<id>` | 覆盖时区，例如 `America/New_York`（v0.8，Chrome/Edge） |
| `--geolocation=<lat,lon[,accuracy]>` | 覆盖地理位置（v0.8，Chrome/Edge） |
| `--permissions=<list>` | 授予权限，例如 `geolocation,camera`（v0.8，Chrome/Edge） |

## 输出格式（Output formats）

每个命令都会返回一个包含最多四个部分的响应：`Page`、`Snapshot`、`Ran Selenium code` 和 `Result`。`--raw` 仅返回结果值；`--json` 返回结构化的 `{page, snapshot, code, result}` 对象，供流水线使用。

```response
### Page
- Page URL: https://example.com/
- Page Title: Example Domain

### Snapshot
- e1 [heading "Welcome"]
- e2 [link "Learn more"]

### Ran Selenium code
await driver.findElement(By.css('[data-se-ref="e2"]')).click();

### Result
clicked
```

关于 `snapshot` 背后的算法，参见 [快照与引用](snapshots-refs.md) 指南；关于 v0.4 的 wait/retry 标志，参见 [配置](configuration.md) 页面。