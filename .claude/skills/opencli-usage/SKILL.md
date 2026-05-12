---
name: "opencli-usage"
description: "用于说明 OpenCLI 能做什么、如何发现可用命令、何时切换到其他 OpenCLI skill。适合在用户询问 OpenCLI 用法或需要先找正确命令时调用。"
---

# OpenCLI Usage

这是一个 OpenCLI 的总览型 skill。

当用户想知道以下内容时，优先使用本 skill：

- OpenCLI 是什么，适合做什么
- 当前有哪些站点或命令可用
- 应该先跑哪个命令来探索能力
- 某个需求应该走内置 adapter、浏览器自动化，还是外部 CLI 透传
- 需要决定接下来切到 `opencli-browser`、`opencli-adapter-author`、`opencli-autofix` 还是别的 skill

当任务已经明确是“实时操作浏览器”或“编写/修复 adapter”时，不要停留在本 skill，直接切到更具体的 skill。

## OpenCLI 是什么

OpenCLI 把三类能力统一成 `opencli <site> <command>` 的稳定接口：

- 网站能力：通过 adapter 调用公开接口、已登录浏览器会话或页面交互
- 桌面应用能力：通过 CDP 控制 Electron 应用
- 本地工具能力：把 `gh`、`docker`、`vercel` 一类外部 CLI 统一挂到 `opencli` 下

它的核心目标是给人和 AI Agent 提供确定性接口，而不是依赖脆弱的截图识别或手工点点点。

## 三种主要使用方式

### 1. 直接调用现成 adapter

格式：

```bash
opencli <site> <command>
```

示例：

```bash
opencli hackernews top --limit 5
opencli bilibili hot --limit 5
opencli zhihu hot -f json
```

适用场景：

- 已知某个站点已有现成命令
- 需要稳定、可脚本化、可重复执行的输出
- 不想自己写浏览器步骤

### 2. 用 `opencli browser` 驱动真实浏览器

适用场景：

- 现成 adapter 不覆盖你的需求
- 需要在已登录站点里点击、输入、提取内容
- 需要临时自动化一个网页任务

这类任务应切到 `opencli-browser` 或 `opencli-adapter-author`。

### 3. 透传本地外部 CLI

示例：

```bash
opencli external register mycli
opencli gh pr list
opencli docker ps
```

适用场景：

- 想把多个 CLI 的入口统一到 OpenCLI
- 想让 Agent 用统一命令面调用本地工具

## 开始前先做什么

优先按下面顺序判断：

1. 看 OpenCLI 是否可用
2. 看有哪些命令已安装
3. 再决定具体走哪条路径

推荐命令：

```bash
opencli doctor
opencli list
opencli list -f json
```

说明：

- `opencli doctor` 主要检查浏览器桥接是否正常
- `opencli list` 用于查看当前所有已注册命令
- `opencli list -f json` 更适合 Agent 读取和筛选

不要把文档里的站点列表当成最终真相，真正可用的能力以本机 `opencli list -f json` 为准。

## 如何选择下一步

如果用户的目标是以下类型，按这个规则分流：

| 用户目标 | 建议路径 |
|---|---|
| 想知道某网站有没有现成命令 | 先 `opencli list -f json`，必要时查 `opencli <site> --help` |
| 想临时操作一个网页 | 切到 `opencli-browser` |
| 想把某网站做成可复用命令 | 切到 `opencli-adapter-author` |
| 某个现有命令坏了 | 切到 `opencli-autofix` |
| 想在现有能力里做搜索或路由 | 可切到 `smart-search` |

## 常用发现命令

```bash
opencli list
opencli list -f json
opencli <site> --help
opencli <site> <command> --help
```

指导原则：

- 先列出能力，再决定实现方式
- 优先用已有 adapter，不要一上来就自己抓页面
- 对 Agent 来说，`-f json` 往往比表格更可靠

## 输出格式

很多命令支持统一格式参数：

```bash
opencli <site> <command> -f json
```

常见格式：

- `json`：最适合 Agent
- `table`：适合人类终端查看
- `plain`：适合只取核心文本
- `yaml`、`md`、`csv`：用于特定场景

如果任务依赖结构化消费结果，优先显式传 `-f json`。

## 浏览器相关前提

当命令依赖浏览器时，通常需要：

- 已安装 OpenCLI 浏览器扩展
- Chrome 或 Chromium 正在运行
- 目标网站已经登录

如果浏览器类命令失败，先运行：

```bash
opencli doctor
```

然后再决定是否进入 `opencli-browser` 或 `opencli-autofix` 流程。

## 外部 CLI 透传

如果目标不是网站，而是本地工具，也可以走 OpenCLI：

```bash
opencli external install gh
opencli external register my-tool --binary my-tool
opencli external list
```

这让 Agent 可以通过统一入口调用本地命令，而不必记住每个工具单独的安装和调用方式。

## 何时不要用本 skill

以下情况不要停留在本 skill：

- 用户已经明确要操作一个真实网页
- 用户已经明确要新建 adapter
- 用户已经明确要修复某个 adapter
- 用户已经给出了具体的 `opencli browser` 操作目标

这时应立即切到更专门的 skill，而不是继续做概念介绍。

## 推荐工作流

```bash
opencli doctor
opencli list -f json
opencli <site> --help
opencli <site> <command> --help
```

然后根据结果选择：

- 直接执行已有命令
- 切到 `opencli-browser`
- 切到 `opencli-adapter-author`
- 切到 `opencli-autofix`

## 注意事项

- 不要假设所有命令都需要浏览器
- 不要硬编码站点列表，优先信任本机注册表
- 不要在已有 adapter 可用时退回到手写抓取逻辑
- 当输出要被后续步骤消费时，优先使用 `json`
