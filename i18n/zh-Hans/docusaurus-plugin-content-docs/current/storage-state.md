---
title: 存储与状态
sidebar_position: 4
---

# 存储与状态

## Cookies

Cookie 命令作用于当前页面域名的 cookie。`cookie-set` 接受一个描述 cookie 的 JSON 对象。

| 命令 | 描述 |
|------|------|
| `cookie-list` | 列出当前页面的所有 cookie |
| `cookie-get <name>` | 按名称获取单个 cookie（返回 JSON） |
| `cookie-set <json>` | 添加或覆盖一个 cookie，例如 `'{"name":"token","value":"abc"}'` |
| `cookie-delete <name>` | 按名称删除一个 cookie |

```bash
se-cli cookie-get session_id
se-cli cookie-set '{"name":"flag","value":"on","path":"/"}'
se-cli cookie-list
se-cli cookie-delete flag
```

## localStorage 与 sessionStorage

这两类存储家族相互对应——把 `localstorage` 替换为 `sessionstorage` 即可得到相应的 sessionStorage 操作。两者都通过守护进程在页面上下文中运行。

| 命令 | 描述 |
|------|------|
| `localstorage-get <key>` | 读取一个值 |
| `localstorage-set <key> <val>` | 写入一个值 |
| `localstorage-delete <key>` | 删除一个值 |
| `localstorage-clear` | 清空所有 localStorage |
| `sessionstorage-get/set/delete/clear` | 针对 sessionStorage 的相同操作 |

```bash
se-cli localstorage-set theme "dark"
se-cli localstorage-get theme
# dark

se-cli sessionstorage-set flash "welcome"
se-cli localstorage-clear
```

## 状态保存与加载

`state-save` 将 cookies + localStorage + sessionStorage 导出到一个 JSON 文件中。`state-load` 按相反顺序恢复它们（先存储，后 cookie）。这让你可以捕获一个已认证的会话，并在另一台机器或 CI 运行中重放它——远比 `--profile` 目录可移植。

### 捕获已认证的会话

```bash
# 通过 UI 登录一次
se-cli open https://app.example.com/login
se-cli snapshot
se-cli fill e1 "user@example.com"
se-cli fill e2 "hunter2"
se-cli click e3

# 捕获当前已认证的状态
se-cli state-save auth.json
se-cli close
```

### 在 CI 中恢复

```bash
# 全新浏览器，跳过登录流程
se-cli open https://app.example.com
se-cli state-load auth.json
se-cli snapshot
# Already logged in — dashboard visible.
```

:::warning
**域名匹配。** Cookie 按域名限定作用域。`state-load` 只恢复页面当前域名的 cookie——在加载之前请先导航到正确的源。
:::

当你同时需要浏览器级和存储级的持久化时，请将状态与[持久化配置文件](sessions.md#持久化配置文件)结合使用；如果保存往返出现异常行为，请参阅[故障排查](troubleshooting.md)。