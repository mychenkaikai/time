---
name: "opencli-autofix"
description: "用于修复失效的 OpenCLI adapter。适合用户执行某个 opencli 命令报错，需要根据诊断信息定位问题、修改 adapter 并重试验证时调用。"
---

# OpenCLI AutoFix

这是一个用于修复 OpenCLI adapter 的 skill。

当用户提出以下需求时，优先调用本 skill：

- 某个 `opencli <site> <command>` 之前能用，现在报错
- 页面结构、接口或返回字段发生变化
- 希望根据诊断信息自动修复 adapter

如果任务是新建一个 command，不要用本 skill，切到 `opencli-adapter-author`。

## 修复边界

修复前先确认边界：

- 只修改报错指向的 adapter 文件
- 不扩散修改到无关源码
- 最多进行 3 轮“诊断 -> 修复 -> 重试”

以下情况应立即停止，不要改代码：

- `AUTH_REQUIRED`
- `BROWSER_CONNECT`
- CAPTCHA
- 被限流或 IP 封禁

这些通常不是 adapter 代码问题。

## 第一步：先确认是不是“真坏了”

有些“空结果”并不代表 adapter 坏了。

先检查：

- 换个关键词或入口是否能返回结果
- 用户自己的浏览器里是否真的能看到该内容
- 是否只是站点暂时返回空数据
- 是否本来就没有搜索结果

如果只是站点给出空结果，不要误修 adapter。

## 第二步：收集诊断信息

用诊断模式重新执行失败命令：

```bash
OPENCLI_DIAGNOSTIC=1 opencli <site> <command> [args...] 2> diagnostic.json
```

重点关注诊断上下文里的内容：

- 错误码
- adapter 文件路径
- 页面快照
- 网络请求
- 控制台错误

后续所有修复都应基于这些信息，而不是主观猜测。

## 第三步：分类问题

常见错误类型和处理方向：

| 错误类型 | 常见原因 | 修复方向 |
|---|---|---|
| `SELECTOR` | DOM 改版、类名变化 | 找新元素或更稳定定位方式 |
| `EMPTY_RESULT` | 响应结构变化、字段路径变了 | 检查网络响应与字段映射 |
| `API_ERROR` | 接口地址、参数或鉴权变了 | 重新侦察网络请求 |
| `TIMEOUT` | 页面加载方式变了 | 调整等待条件 |
| `PAGE_CHANGED` | 页面大改版 | 可能需要重写关键逻辑 |
| `COMMAND_EXEC` | adapter 内部代码出错 | 修复运行时逻辑 |

## 第四步：用浏览器重新确认现状

不要继续依赖坏掉的 adapter 反复试。

改用浏览器能力检查真实页面：

```bash
opencli doctor
opencli browser <session> open <url>
opencli browser <session> state
opencli browser <session> network
```

检查重点：

- 目标元素是否还存在
- 站点是否换了新的接口
- 返回结构是否与 adapter 预期不同
- 页面是否新增登录、弹窗、懒加载等流程

## 第五步：做最小修复

修复原则：

1. 只改当前报错点
2. 不顺手大重构
3. 保持输出结构兼容
4. 能改成更稳定接口时，优先接口

常见修复：

- 更新 selector
- 更新 API endpoint
- 调整响应字段路径
- 增加或修改等待条件
- 补充空值或异常分支处理

如果只是 fixture 太宽松或太宽泛，不要通过放水掩盖真实错误。

## 第六步：重试验证

修完后重新执行原命令：

```bash
opencli <site> <command> [args...]
```

如果还失败：

- 重新收集新一轮诊断
- 不要沿用旧快照判断
- 进入下一轮修复

总轮数最多 3 次，超过就停止并汇总已尝试内容。

## 第七步：确认是否需要上游反馈

只有在以下条件同时满足时，才考虑向上游提 issue：

- 本地修复后命令已经恢复
- 确认问题是 adapter 漂移，而不是环境问题
- 用户同意提交

如果未真正修好，不要提交“半成品 issue”。

## 推荐修复流程

```bash
opencli doctor
OPENCLI_DIAGNOSTIC=1 opencli <site> <command> [args...] 2> diagnostic.json
```

然后按这个顺序处理：

1. 读诊断输出
2. 找到 adapter 文件
3. 用 `opencli browser` 查看真实页面和网络
4. 做最小修复
5. 重试原命令

## 何时切换 skill

- 要新写 adapter：切到 `opencli-adapter-author`
- 要临时手动驱动浏览器：切到 `opencli-browser`
- 只是想了解 OpenCLI 能做什么：切到 `opencli-usage`

## 不要这样做

- 不要在 `AUTH_REQUIRED` 时改代码
- 不要在浏览器没连通时瞎修 adapter
- 不要连续多轮复用旧诊断
- 不要为了“通过”而放宽错误的验证条件
- 不要把环境问题误当成源码问题
