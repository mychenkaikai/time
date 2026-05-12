---
name: "opencli-adapter-author"
description: "用于编写新的 OpenCLI adapter 或给现有站点增加命令。适合用户要把网页能力做成可复用 CLI 命令，并完成侦察、编码、验证闭环时调用。"
---

# OpenCLI Adapter Author

这是一个用于编写 OpenCLI adapter 的 skill。

当用户提出以下需求时，优先调用本 skill：

- 给一个新网站新增 OpenCLI 命令
- 给现有站点补一个新 command
- 想把临时浏览器操作沉淀成可复用 CLI
- 需要从页面侦察、接口发现、字段映射，一路走到 `verify`

如果只是临时浏览器操作，不要用本 skill，切到 `opencli-browser`。

## 目标

在尽量短的路径内完成这件事：

1. 确认站点是否适合写 adapter
2. 找到可靠的数据来源
3. 设计输出字段
4. 生成并编写 adapter
5. 通过验证

## 开始前检查

先运行：

```bash
opencli doctor
```

如果浏览器桥接不通，先修环境，不要直接开始写 adapter。

## 先判断值不值得写

先回答这几个问题：

1. 数据在浏览器里能看到吗？
2. 数据能通过 HTTP、JSON、HTML 或页面状态拿到吗？
3. 这个能力是否值得被复用成命令？

如果答案明显是否定的，不要强行写 adapter。

## 总体流程

推荐按下面顺序工作：

```bash
opencli doctor
opencli browser <session> open <url>
opencli browser <session> state
opencli browser <session> network
opencli browser init <site>/<command>
opencli browser verify <site>/<command>
```

思路是：

- 先侦察站点
- 再找 endpoint 或稳定数据来源
- 再写 adapter
- 最后 verify

## 第一步：站点侦察

优先观察页面属于哪类：

- 页面首次 HTML 就带数据
- 页面依赖前端请求接口
- 页面需要登录后才返回真实数据
- 页面强依赖前端交互和动态签名

推荐先做：

```bash
opencli browser <session> open <url>
opencli browser <session> state
opencli browser <session> network
```

目的：

- 看页面结构
- 看关键请求
- 看数据是不是来自稳定接口

## 第二步：优先找稳定数据源

编写 adapter 时，优先级通常如下：

1. 公开或可复用的 JSON 接口
2. 带 cookie 但结构稳定的接口
3. 页面内嵌状态
4. 最后才考虑脆弱 DOM 抓取

原则：

- 优先接口，不优先页面结构
- 能拿结构化响应，就不要依赖 class 名
- 如果接口字段可稳定解析，后续维护成本最低

## 第三步：确定鉴权方式

常见情况：

- `PUBLIC`：无需登录，直接请求
- `COOKIE`：依赖浏览器登录态
- `INTERCEPT`：要通过浏览器拦截签名请求
- `UI`：只能靠页面交互拿数据
- `LOCAL`：依赖本地或私有环境

在写 adapter 之前，先明确属于哪种策略，否则后面容易反复返工。

## 第四步：字段解码

拿到响应后，不要立刻写代码，先做字段确认：

- 哪些字段是主标识
- 哪些字段是核心业务值
- 哪些字段需要格式转换
- 哪些字段可能存在单位或比例问题

重点检查：

- 百分比是否已经乘过 100
- 金额单位是不是“元 / 分 / 万”
- 时间是不是时间戳或字符串
- 列名是否清晰并适合长期使用

## 第五步：设计输出 columns

设计原则：

- 使用稳定、清晰的 camelCase 名称
- `columns` 顺序与实际返回对象顺序一致
- 先放识别字段，再放业务字段，再放补充字段

不要一边写代码一边临时起名，先把输出结构定下来。

## 第六步：初始化并编写 adapter

先生成骨架：

```bash
opencli browser init <site>/<command>
```

建议：

- 找一个最相近的现有 adapter 作为参考
- 只改必要内容，不先做大重构
- 保持返回结构和 `columns` 完全对齐

编写时注意：

- 尽量只使用 OpenCLI 相关依赖
- 已知错误要明确抛错，不要静默返回空数组
- 能从接口直接拿数据就不要多绕一层 DOM

## 第七步：验证

核心命令：

```bash
opencli browser verify <site>/<command>
```

验证时要看两层：

1. 命令有没有跑通
2. 结果值和网页肉眼看到的是否一致

不要只因为 verify 通过就认为结果正确。

## 失败时怎么处理

常见回退路径：

- 找不到接口：回到侦察和 `network`
- 返回 401/403：回到鉴权策略判断
- 字段值不对：回到字段解码
- verify 失败：检查字段映射、空值、类型和输出顺序

如果是现有 adapter 已损坏，而不是新写 command，切到 `opencli-autofix`。

## 推荐工作方式

每轮尽量只推进一个闭环：

1. 先让数据出来
2. 再把字段对齐
3. 再补验证
4. 最后再整理站点知识

不要一开始就试图把所有抽象一次性做完。

## 何时切换 skill

- 临时网页操作或人工探索：切到 `opencli-browser`
- 修复已有 adapter：切到 `opencli-autofix`
- 先了解 OpenCLI 有哪些能力：切到 `opencli-usage`

## 不要这样做

- 不要跳过站点侦察
- 不要还没确定数据源就开始写 adapter
- 不要把 `columns` 和返回对象顺序写乱
- 不要用“能跑”代替“数据正确”
- 不要在没有必要时优先依赖脆弱 DOM
