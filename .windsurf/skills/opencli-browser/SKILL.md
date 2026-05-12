---
name: "opencli-browser"
description: "用于通过 OpenCLI 驱动真实浏览器完成查看、点击、输入、提取等任务。适合用户要操作已登录网页、抓取页面数据或做临时浏览器自动化时调用。"
---

# OpenCLI Browser

这是一个用于实时浏览器自动化的 skill。

当用户提出以下需求时，优先调用本 skill：

- 打开某个网页并查看内容
- 在真实浏览器里点击、输入、选择、滚动
- 使用用户当前登录态访问站点
- 临时抓取页面数据，而不是编写长期复用的 adapter
- 需要通过 `opencli browser` 调试页面行为或网络请求

如果目标是“做成可复用命令”，不要停留在这里，应切到 `opencli-adapter-author`。

## 启动前检查

先运行：

```bash
opencli doctor
```

如果 `doctor` 没通过，优先解决以下问题：

- Chrome 或 Chromium 没有运行
- OpenCLI 扩展未安装
- 浏览器桥接没有连通
- 用户尚未登录目标网站

浏览器类问题没有解决前，不要继续猜测页面行为。

## 核心原则

1. 先观察，再操作
2. 优先用结构化输出，不要盲猜 DOM
3. 页面变化后重新获取状态，不复用旧 ref
4. 能看网络请求时，优先看网络，不优先硬抓 DOM
5. 写入类动作后要验证结果

## 会话规则

`opencli browser` 需要 `<session>` 参数，整个多步流程应复用同一个 session。

示例：

```bash
opencli browser work open https://example.com
opencli browser work state
opencli browser work click 3
```

建议：

- 一个任务用一个固定 session 名
- 页面流程较长时，不要频繁换 session
- 完成后可用 `opencli browser <session> close` 释放

## 推荐操作顺序

大多数网页任务按这个顺序走：

```bash
opencli doctor
opencli browser <session> open <url>
opencli browser <session> state
opencli browser <session> click <ref>
opencli browser <session> state
```

适用说明：

- `open`：打开页面
- `state`：获取结构化页面快照和 ref
- `click` / `type` / `fill` / `select`：执行交互
- 再次 `state`：确认页面变化，拿新的 ref

## 常用命令

### 查看页面

```bash
opencli browser <session> state
opencli browser <session> find --css "button"
opencli browser <session> get title
opencli browser <session> get url
opencli browser <session> screenshot
```

使用建议：

- 不确定页面结构时先 `state`
- 已知选择器时可用 `find`
- 需要可视化确认时再 `screenshot`

### 页面交互

```bash
opencli browser <session> click <target>
opencli browser <session> type <target> "关键词"
opencli browser <session> fill <target> "完整内容"
opencli browser <session> select <target> "选项"
opencli browser <session> keys Enter
opencli browser <session> scroll down
```

区分：

- `type` 更像真实键盘输入，适合触发联想或输入事件
- `fill` 更适合直接设置并校验值
- `select` 只用于原生下拉框

## target 选择策略

交互命令里的 `<target>` 优先顺序：

1. 优先使用 `state` / `find` 返回的数字 ref
2. 必要时再用 CSS selector

原因：

- 数字 ref 通常更稳定
- CSS selector 更容易因页面改版失效

不要跨页面或跨刷新复用旧 ref。

## 写入后验证

以下动作做完后要立刻验证：

- `type`
- `fill`
- `select`

示例：

```bash
opencli browser work type 8 "chen"
opencli browser work get value 8
```

原因：

- 有些页面会吞字
- 有些输入框是受控组件
- 自动补全可能未真正提交

## 页面变化后的处理

以下情况视为页面已变化：

- 点击后跳转
- 提交表单
- SPA 路由切换
- 打开弹窗或异步刷新列表

这时要重新执行：

```bash
opencli browser <session> state
```

旧 ref 可能已经失效，继续使用会造成误点。

## 等待策略

不要只依赖固定 sleep，优先使用显式等待：

```bash
opencli browser <session> wait selector ".result"
opencli browser <session> wait text "提交成功"
opencli browser <session> wait time 2
```

建议：

- 优先 `wait selector`
- 文字提示明显时用 `wait text`
- `wait time` 只作为最后手段

## 网络优先原则

如果页面数据来源于接口，优先看网络请求：

```bash
opencli browser <session> network
opencli browser <session> network --detail <key>
```

适用场景：

- 目标数据本质上来自 JSON API
- 页面 DOM 很复杂
- 想确认分页、鉴权、接口字段

对结构化数据抓取来说，网络通常比 DOM 更稳定。

## 何时切换 skill

遇到这些情况时切换：

- 想把流程沉淀成长期可复用命令：切到 `opencli-adapter-author`
- 某个现有 adapter 坏了：切到 `opencli-autofix`
- 还不清楚 OpenCLI 有没有现成能力：切到 `opencli-usage`

## 不要这样做

- 不要跳过 `opencli doctor`
- 不要在没 `state` 的情况下盲点
- 不要跨页面继续使用旧 ref
- 不要优先依赖截图做人肉识别
- 不要在已有 JSON 接口时硬抓复杂 DOM
