# 项目：怀旧数字博物馆 (Retro Digital Museum)

## 1. 项目愿景
为高敏人群（HSP）打造的个人精神角落，通过 PC 端优先的网页设计，复刻 80/90 年代互联网的仪式感。
- **核心逻辑**：内容与样式高度分离，支持主题一键切换。
- **用户体验**：PC 端优先体验，**还原真实的早期网页风格**（而非操作系统界面），强调简洁布局和沉浸式背景音。
- **响应式策略**：移动端显示优雅的提示页或简化版布局，保持内容可访问性。
- **设计理念**：默认主题追求真实还原 90 年代网页的视觉风格，避免陌生感；可选主题（Win98/XP/Mac OS 9）仅作为趣味配色方案，点到为止。

## 2. 技术栈

### 2.1 核心框架
- **框架**: Astro 4.x (静态站点生成，极致性能和 SEO)
- **内容管理**: Content Collections (类型安全的 Markdown 管理)
- **状态管理**: localStorage (主题偏好、音量设置)
- **托管方案**: GitHub Pages + Cloudflare (CDN 加速)
- **CI/CD**: GitHub Actions (自动构建部署)

### 2.2 样式系统（还原真实网页风格）
- **默认主题（retro-web）**: 还原 90 年代真实网页风格
  - 简洁的表格布局或居中容器
  - 经典的 Times New Roman / Arial 字体组合
  - 朴素的链接样式（蓝色未访问，紫色已访问）
  - 简单的 HR 分隔线、基础表单元素
  - 避免过度设计，保持时代真实感
  
- **可选主题（仅作配色参考）**:
  - **98.css**: Windows 98 风格（可选）
    - 🔗 https://github.com/jdan/98.css
    - 用途：作为可选主题，提供怀旧配色方案
  - **XP.css**: Windows XP 风格（可选）
    - 🔗 https://github.com/botoxparty/XP.css
    - 用途：作为可选主题，Luna 蓝绿配色
  
- **自定义 CSS Variables**: 
  - 支持主题一键切换
  - 默认主题优先还原真实网页风格
  - 可选主题仅提供趣味性配色，不强求完整复刻操作系统界面

### 2.3 功能增强库
- **Howler.js**: 音频播放库（~20KB）
  - 用途：背景音乐播放器
  - 优势：比原生 Audio API 更强大，支持淡入淡出、音量记忆
  
- **Pagefind**: 静态站点搜索（Astro 官方推荐）
  - 用途：文章搜索功能
  - 优势：自动索引，零配置，完全客户端
  
- **lite-youtube-embed**: 轻量级视频嵌入
  - 用途：参考其思路实现 Bilibili 视频懒加载
  - 优势：只在点击时加载，性能极佳

### 2.4 资源库
- **Windows 95/98 图标包**: 从 Icon Archive 或 archive.org 获取
- **MS Sans Serif Web Font**: 复刻的 Windows 经典字体
- **像素字体**: Press Start 2P, VT323 等（Google Fonts）

## 3. 完整目录结构
```
/
├── src/
│   ├── content/
│   │   ├── config.ts           # ⭐ Content Collections 配置（定义 schema）
│   │   └── posts/              # 存放所有的 .md 文章
│   │       └── hello-world.md
│   ├── layouts/
│   │   ├── BaseLayout.astro    # 基础 HTML 骨架（SEO、meta 标签）
│   │   └── PostLayout.astro    # 文章页通用布局（支持主题切换）
│   ├── components/
│   │   ├── Navigation.astro    # 全局导航栏
│   │   ├── ThemeSelector.astro # 主题切换器
│   │   ├── VideoBox.astro      # 视频嵌入组件
│   │   ├── MusicPlayer.astro   # 音乐播放器（手动启动）
│   │   ├── CRTOverlay.astro    # CRT 扫描线滤镜（可开关）
│   │   └── MobileWarning.astro # 移动端提示组件
│   ├── pages/
│   │   ├── index.astro         # 首页（文章列表）
│   │   ├── archive.astro       # 归档页（按年份/月份）
│   │   ├── tags/
│   │   │   └── [tag].astro     # 标签详情页
│   │   └── posts/
│   │       └── [...slug].astro # 动态路由（文章详情页）
│   └── styles/
│       ├── variables.css       # CSS 变量定义（多主题）
│       ├── themes/
│       │   ├── retro-web.css   # 默认：90年代真实网页风格
│       │   ├── win98.css       # 可选：Windows 98 配色
│       │   ├── winxp.css       # 可选：Windows XP 配色
│       │   └── macos9.css      # 可选：Mac OS 9 配色
│       ├── global.css          # 全局基础样式
│       └── scrollbar.css       # 自定义滚动条样式
├── public/
│   ├── audio/                  # 背景音乐文件
│   ├── images/                 # 图片资源
│   ├── icons/                  # 网站图标
│   └── fonts/                  # 网页字体（如需要）
├── .github/
│   └── workflows/
│       └── deploy.yml          # 自动部署配置
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## 4. Markdown 写作规范 (Frontmatter Schema)
每篇文章开头必须定义以下元数据：

```yaml
---

## 13. 设计理念：还原真实 vs 操作系统界面

### 为什么选择"还原真实网页风格"？

**核心原则**：怀旧感来自**真实的记忆**，而非陌生的模仿。

#### 问题：完整复刻操作系统界面的弊端
1. **陌生感**：90 年代的网页并不是 Windows 98 界面风格
2. **过度设计**：窗口、标题栏、3D 边框等元素会分散内容注意力
3. **记忆错位**：用户记忆中的网页是简洁的 HTML 页面，不是桌面应用
4. **维护成本**：完整复刻需要大量 CSS 工作，且容易显得"刻意"

#### 解决方案：默认主题还原真实网页
- **视觉**：白色背景、黑色文字、蓝色链接、紫色已访问链接
- **排版**：Times New Roman 正文、Arial 标题、简单的 HR 分隔线
- **布局**：居中容器、简洁导航、基础表格（如需要）
- **交互**：经典的链接 hover 效果、简单的按钮样式

#### 可选主题的定位
- **win98/winxp/macos9**：仅作为**趣味性配色方案**
- **目的**：提供视觉变化，点到为止
- **实现**：改变颜色变量、字体、边框样式，不追求完整复刻
- **原则**：保持内容可读性，避免过度装饰

### 设计对比

| 维度 | 完整复刻 Win98 界面 | 还原真实网页风格（推荐） |
|------|-------------------|----------------------|
| 视觉风格 | 灰色背景、窗口框架、3D 边框 | 白色背景、简洁布局、经典链接 |
| 用户感受 | "这是个桌面应用" | "这是 90 年代的网页" |
| 记忆匹配 | 陌生（网页不是这样的） | 熟悉（确实是这样的） |
| 维护成本 | 高（大量 CSS） | 低（简洁样式） |
| 内容焦点 | 分散（装饰性元素多） | 集中（内容为主） |
| 可访问性 | 较差（复杂结构） | 好（语义化 HTML） |

---
title: "文章标题"
description: "文章简介（用于 SEO 和列表页）"
date: "2024-01-01"
updated: "2024-01-15"          # 可选：更新日期
theme: "retro-web"             # 主题：retro-web（默认）| win98 | winxp | macos9
tags: ["回忆", "童年", "游戏"]  # 标签数组
mood: "怀念"                   # 情绪标签
draft: false                   # 是否为草稿

# 新增：内容布局和系列
layout: "single"               # 布局类型：single（默认）| gallery（图片集）| timeline（时间线）
featured: false                # 是否为精选文章（首页置顶）
cover: "/images/cover.jpg"     # 可选：封面图
series: "童年游戏回忆录"        # 可选：系列文章名称
episode: 1                     # 可选：系列中的序号

# 媒体资源（可选）
media:
  bgm:
    src: "/audio/bgm.mp3"
    title: "背景音乐名称"
    autoplay: false            # 默认不自动播放
  video:
    platform: "bilibili"       # bilibili | youtube | local
    id: "BVxxx"
    title: "视频标题"
  
# 自定义样式（可选）
customStyles:
  backgroundColor: "#ffffff"
  accentColor: "#0000ff"
---
```

## 5. Content Collection Schema 定义
在 `src/content/config.ts` 中定义类型安全的 schema：

```typescript
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().transform(str => new Date(str)),
    updated: z.string().transform(str => new Date(str)).optional(),
    theme: z.enum(['retro-web', 'win98', 'winxp', 'macos9']).default('retro-web'),
    tags: z.array(z.string()).default([]),
    mood: z.string().optional(),
    draft: z.boolean().default(false),
    
    // 新增：内容布局和系列
    layout: z.enum(['single', 'gallery', 'timeline']).default('single'),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    series: z.string().optional(),
    episode: z.number().optional(),
    
    media: z.object({
      bgm: z.object({
        src: z.string(),
        title: z.string(),
        autoplay: z.boolean().default(false),
      }).optional(),
      video: z.object({
        platform: z.enum(['bilibili', 'youtube', 'local']),
        id: z.string(),
        title: z.string(),
      }).optional(),
    }).optional(),
    customStyles: z.object({
      backgroundColor: z.string().optional(),
      accentColor: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
```

## 6. 核心设计规范

### 6.1 布局规范

#### 6.1.1 导航结构
- **全局导航栏**（固定顶部或页面顶部）：
  ```
  [网站标题/Logo] | [首页] [归档] [标签] [关于] | [🔍搜索] [🎵音乐] [🎨主题]
  ```
  - 左侧：网站标题/Logo + 主导航链接
  - 右侧：功能性按钮（搜索、音乐播放器、主题切换）
  - 样式：简洁的文字链接，蓝色未访问/紫色已访问（经典网页风格）
  - 分隔符：使用 `|` 或简单的竖线分隔

#### 6.1.2 响应式布局
- **PC 端（>1024px）**：
  - 容器最大宽度 1024px，居中显示
  - 模拟 4:3 显示器比例的阅读体验
  - 完整功能（导航、搜索、音乐播放器、主题切换）
  
- **平板端（768px-1024px）**：
  - 容器宽度 90%，保持核心功能
  - 导航可能折叠为汉堡菜单
  - 保留音乐播放器和主题切换
  
- **手机端（<768px）**：
  - **方案 A（推荐）**：显示优雅的"系统不兼容"提示页
    - 模拟 90 年代"本站最佳分辨率 800x600"的提示
    - 提供"仍要继续访问"的链接
    - 点击后显示极简版（纯文字，保留核心内容）
  - **方案 B**：直接显示极简版
    - 移除所有装饰性元素
    - 保留文章标题、日期、正文
    - 简化导航为下拉菜单
  - **方案 C**：显示"请横屏查看"提示（适合强调 PC 体验）

### 6.2 样式规范

#### 6.2.1 变量系统
- 所有颜色、间距、字体必须使用 CSS Variables
- 通过 `[data-theme="retro-web"]` 切换主题
- 禁止使用 Tailwind 或内联样式

#### 6.2.2 默认主题（retro-web）- 还原 90 年代真实网页
```css
:root[data-theme="retro-web"] {
  /* 布局 */
  --max-width: 1024px;
  --content-padding: 20px;
  
  /* 颜色 */
  --bg-color: #ffffff;
  --text-color: #000000;
  --link-color: #0000ff;           /* 经典蓝色链接 */
  --link-visited: #800080;         /* 紫色已访问链接 */
  --link-hover-bg: #ffff00;        /* 黄色高亮背景（可选） */
  --border-color: #000000;
  --hr-color: #808080;
  
  /* 字体 */
  --font-serif: 'Times New Roman', Times, serif;
  --font-sans: Arial, Helvetica, sans-serif;
  --font-mono: 'Courier New', Courier, monospace;
  --font-body: var(--font-serif);
  --font-heading: var(--font-sans);
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* 动画 */
  --transition-speed: 0.15s;
  
  /* Z-index 层级 */
  --z-content: 1;
  --z-nav: 100;
  --z-player: 200;
  --z-modal: 1000;
}
```

#### 6.2.3 可选主题（仅提供配色方案）
- **win98**: 灰色背景 (#c0c0c0)，蓝色标题栏，3D 边框效果
- **winxp**: 白色背景，Luna 蓝绿配色，圆角元素
- **macos9**: 浅灰背景，Platinum 配色，彩色强调

#### 6.2.4 交互细节（还原经典网页体验）
1. **链接样式**：
   - 默认：蓝色 (#0000ff)，带下划线
   - 已访问：紫色 (#800080)，带下划线
   - Hover：可选黄色背景高亮或简单的颜色变化
   - Active：红色或深蓝色

2. **按钮样式**：
   - 简单的边框按钮（1px solid）
   - Hover：背景色变化
   - Active：轻微的位移效果（可选）

3. **分隔线**：
   - 使用 `<hr>` 标签，灰色实线
   - 或使用 ASCII 字符分隔（如 `---` 或 `***`）

4. **滚动条**：
   - 保持浏览器默认样式，或
   - 自定义为简单的灰色块状（不过度设计）

### 6.3 性能优化

#### 6.3.1 资源加载优化
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="/fonts/times-new-roman.woff2" as="font" crossorigin>
<link rel="prefetch" href="/audio/bgm.mp3">

<!-- 图片懒加载 -->
<img src="/images/photo.jpg" loading="lazy" decoding="async" alt="描述">

<!-- 音频预加载策略（仅预加载元数据） -->
<audio preload="metadata" src="/audio/bgm.mp3"></audio>
```

#### 6.3.2 具体优化措施
- **图片优化**：
  - 使用 Astro 的 `<Image>` 组件，自动优化和生成多种尺寸
  - 懒加载：`loading="lazy"`
  - 异步解码：`decoding="async"`
  
- **视频优化**：
  - 使用懒加载策略（参考 lite-youtube-embed）
  - 仅在用户点击时加载实际视频
  - 显示预览图和播放按钮
  
- **音频优化**：
  - 音频播放需要用户交互触发（符合浏览器策略）
  - 使用 `preload="metadata"` 仅预加载元数据
  - 记住用户音量偏好（localStorage）
  
- **CSS 优化**：
  - CRT 滤镜提供开关，默认关闭（避免性能问题）
  - 避免复杂的 CSS 动画和滤镜
  - 使用 CSS Variables 减少重复代码
  
- **字体优化**：
  - 优先使用系统字体（Times New Roman, Arial）
  - 如需自定义字体，使用 `font-display: swap` 避免阻塞渲染
  - 仅加载必要的字体权重和字符集

#### 6.3.3 性能目标
- Lighthouse 评分 > 90（所有指标）
- 首次内容绘制（FCP）< 1.5s
- 最大内容绘制（LCP）< 2.5s
- 累积布局偏移（CLS）< 0.1

### 6.4 可访问性
- 所有交互元素支持键盘导航（Tab、Enter、Space）
- 图片必须有 alt 属性
- 颜色对比度至少达到 WCAG AA 标准（4.5:1）
- 提供"跳过导航"链接
- 音频/视频提供字幕或文字说明

## 7. 主题切换实现方案

### 7.1 技术实现
```javascript
// 1. 读取用户偏好（localStorage 或系统偏好）
const savedTheme = localStorage.getItem('theme') || 'win98';

// 2. 应用主题
document.documentElement.setAttribute('data-theme', savedTheme);

// 3. 保存用户选择
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}
```

### 7.2 预设主题
- **retro-web**（默认）: 90 年代真实网页风格
  - 白色背景，黑色文字
  - Times New Roman 正文，Arial 标题
  - 蓝色链接，紫色已访问链接
  - 简洁的 HR 分隔线
  
- **win98**（可选）: Windows 98 配色方案
  - 灰色背景 (#c0c0c0)
  - 蓝色标题栏渐变
  - 3D 边框效果（点到为止，不完整复刻）
  
- **winxp**（可选）: Windows XP 配色方案
  - 白色/浅蓝背景
  - Luna 蓝绿配色
  - 圆角元素
  
- **macos9**（可选）: Mac OS 9 配色方案
  - Platinum 灰色
  - 彩色强调元素
  - 经典 Mac 字体风格

## 8. 数据管理策略

### 8.1 文章列表
- 按日期倒序排列（最新在前）
- 过滤草稿（`draft: false`）
- 支持按标签筛选
- 支持按主题筛选
- **精选文章**（`featured: true`）置顶显示
- **系列文章**按 `series` 和 `episode` 分组显示

### 8.2 标签系统
- 自动提取所有文章的标签
- 标签页显示该标签下的所有文章
- 标签云展示（字体大小反映文章数量）
- 标签页路由：`/tags/[tag]`

### 8.3 归档系统
- 按年份/月份归档文章
- 归档页路由：`/archive`
- 显示每年/每月的文章数量
- 时间线式布局（可选）

### 8.4 搜索功能（可选）
- 使用 Pagefind 或 Fuse.js 实现客户端搜索
- 搜索标题、描述、标签、正文内容

## 9. 部署配置

### 9.1 GitHub Actions 自动部署
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### 9.2 Astro 配置
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repo-name', // 如果不是根域名
  output: 'static',
  build: {
    inlineStylesheets: 'never', // 保持 CSS 文件独立，便于主题切换
  },
});
```

### 9.3 Cloudflare 配置
- 添加 CNAME 记录指向 GitHub Pages
- 启用 Auto Minify（HTML、CSS、JS）
- 配置缓存规则（静态资源缓存 1 年）
- 启用 Brotli 压缩

## 10. 开发规范

### 10.1 Git Commit 规范
```
feat: 添加新功能
fix: 修复 bug
style: 样式调整
docs: 文档更新
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建/工具链相关
```

### 10.2 组件命名规范
- 组件文件：PascalCase（如 `MusicPlayer.astro`）
- 样式类名：kebab-case（如 `.music-player`）
- CSS 变量：kebab-case with prefix（如 `--win98-bg-color`）

### 10.3 代码注释要求
- 每个组件顶部说明用途和 props
- 复杂逻辑添加行内注释
- CSS 变量分组并注释用途

## 11. 第一阶段：项目初始化指令

### 给 Cursor 的完整指令：
```
你好，Cursor。我要启动一个怀旧风格的个人博客项目。请严格按照以下步骤操作：

【第 1 步：初始化项目】
1. 创建 Astro 项目：npm create astro@latest -- --template minimal --no-install
2. 安装依赖：npm install

【第 2 步：配置 Content Collections】
1. 创建 src/content/config.ts，定义 posts collection 的 schema（参考项目文档第 5 节）
2. 创建 src/content/posts/ 目录

【第 3 步：样式系统】
1. 创建 src/styles/variables.css，定义默认主题（retro-web）的 CSS 变量：
   - 背景色：#ffffff（白色）
   - 文字颜色：#000000（黑色）
   - 链接颜色：#0000ff（蓝色）
   - 已访问链接：#800080（紫色）
   - 边框颜色：#000000
   - 字体：Times New Roman（正文），Arial（标题）

2. 创建 src/styles/themes/ 目录，包含：
   - retro-web.css（默认主题，90年代真实网页风格）
   - win98.css（可选主题，Windows 98 配色）
   - winxp.css（可选主题，Windows XP 配色）
   - macos9.css（可选主题，Mac OS 9 配色）

3. 创建 src/styles/global.css，包含：
   - CSS Reset
   - 基础排版样式（还原经典网页风格）
   - 响应式容器（max-width: 1024px）
   - 经典链接样式（蓝色/紫色，带下划线）

4. 创建 src/styles/scrollbar.css，自定义滚动条样式（可选，保持简洁）

【第 4 步：布局和组件】
1. 创建 src/layouts/BaseLayout.astro：
   - 包含 HTML 骨架、meta 标签、SEO 优化
   - 引入全局样式
   - 支持 data-theme 属性
   - 包含全局导航栏

2. 创建 src/layouts/PostLayout.astro：
   - 继承 BaseLayout
   - 显示文章标题、日期、标签
   - 渲染 Markdown 内容
   - 集成 MusicPlayer 组件（如果有 bgm）
   - 支持不同布局类型（single/gallery/timeline）

3. 创建 src/components/Navigation.astro：
   - 全局导航栏组件
   - 左侧：网站标题 + 主导航（首页、归档、标签、关于）
   - 右侧：功能按钮（搜索、音乐、主题切换）
   - 响应式设计（移动端折叠）

4. 创建 src/components/MusicPlayer.astro：
   - 简单的音频播放器
   - 播放/暂停按钮
   - 音量控制
   - 记住用户音量偏好（localStorage）

5. 创建 src/components/ThemeSelector.astro：
   - 主题切换下拉菜单或按钮组
   - 支持：retro-web（默认）、win98、winxp、macos9
   - 记住用户选择（localStorage）

【第 5 步：页面路由】
1. 创建 src/pages/index.astro：
   - 获取所有文章（过滤草稿）
   - 精选文章（featured: true）置顶显示
   - 按日期倒序显示
   - 每篇文章显示标题、日期、描述、标签、封面图（如有）
   - 点击跳转到文章详情

2. 创建 src/pages/posts/[...slug].astro：
   - 动态路由，渲染文章内容
   - 使用 PostLayout
   - 根据 layout 字段渲染不同布局

3. 创建 src/pages/archive.astro：
   - 归档页面，按年份/月份分组显示文章
   - 时间线式布局

4. 创建 src/pages/tags/[tag].astro：
   - 标签详情页，显示该标签下的所有文章

【第 6 步：测试内容】
创建 src/content/posts/hello-world.md：
---
title: "你好，旧时光"
description: "这是第一篇测试文章"
date: "2024-01-01"
theme: "retro-web"
tags: ["测试", "开始"]
mood: "期待"
draft: false
layout: "single"
featured: false
---

欢迎来到怀旧数字博物馆。这里是你的精神角落。

【第 7 步：配置文件】
1. 更新 astro.config.mjs（参考项目文档第 9.2 节）
2. 确保 tsconfig.json 包含正确的路径别名

【代码要求】
- 代码必须干净、模块化
- 所有样式使用 CSS Variables
- 组件要有清晰的注释
- 遵循项目文档中的命名规范

完成后，运行 npm run dev 并告诉我结果。
```

## 12. 后续开发路线图

### Phase 2: 增强功能
- [ ] 完善默认主题（retro-web）的样式细节
- [ ] 实现可选主题（win98/winxp/macos9）作为配色方案
- [ ] 使用 Howler.js 实现音乐播放器
- [ ] 完善导航栏和页面结构
- [ ] CRT 滤镜效果（纯 CSS，可选）
- [ ] 视频嵌入组件（参考 lite-youtube-embed）
- [ ] 标签页面和归档页面
- [ ] RSS 订阅

### Phase 3: 高级特性
- [ ] 集成 Pagefind 实现客户端搜索
- [ ] 评论系统（Giscus - 基于 GitHub Discussions）
- [ ] 阅读进度条
- [ ] 系列文章导航（上一篇/下一篇）
- [ ] 音乐播放列表
- [ ] 移动端优雅降级（"系统不兼容"提示页）

### Phase 4: 优化和完善
- [ ] 性能优化（Lighthouse 评分 > 90）
- [ ] SEO 优化（结构化数据）
- [ ] 社交分享卡片（Open Graph）
- [ ] 站点地图（Astro 自动生成）
- [ ] 404 页面（怀旧风格）
- [ ] 图片懒加载和优化
- [ ] 字体加载优化

---

## 14. 为什么不是"重复造轮子"

### ✅ 你的方案是正确的
1. **Astro 是成熟框架**：不是从零写静态站点生成器
2. **复用现成 CSS 库**：98.css、XP.css 已经实现了复古 UI
3. **集成专业工具**：Howler.js、Pagefind 都是业界标准
4. **只定制独特部分**：内容结构、主题切换逻辑、个性化组件

### 🎯 你在做的是"组装"而非"造轮子"
```
Astro (框架)
  ├── 98.css (Win98 样式)
  ├── XP.css (WinXP 样式)
  ├── Howler.js (音频)
  ├── Pagefind (搜索)
  └── 你的自定义逻辑
      ├── 主题切换系统
      ├── Content Collections Schema
      ├── 文章布局
      └── 个性化组件
```

### 🚫 如果是"造轮子"会是这样
- ❌ 自己写静态站点生成器（而不是用 Astro）
- ❌ 自己实现 Markdown 解析器（而不是用 Astro 内置）
- ❌ 自己写音频播放引擎（而不是用 Howler.js）
- ❌ 自己实现全文搜索算法（而不是用 Pagefind）

### 💡 类比
你的项目就像：
- **造轮子**：自己制造汽车的每个零件
- **你在做的**：选择合适的引擎（Astro）、轮胎（98.css）、音响（Howler.js），然后组装成一辆独特的车

---

## 附录 A：常见问题

**Q: 为什么不用 Next.js 或 Nuxt？**
A: Astro 专为内容站点优化，默认零 JS，性能更好，学习曲线更平缓。

**Q: 为什么默认主题不用 Windows 98 风格？**
A: 90 年代的网页并不是 Windows 界面风格。真实的怀旧感应该来自当时的网页设计（白色背景、蓝色链接、Times New Roman 字体），而不是操作系统界面。完整复刻 Win98 界面会产生陌生感，且分散内容注意力。

**Q: 那 win98/winxp 主题有什么用？**
A: 作为可选的趣味性配色方案，提供视觉变化。但仅改变颜色和字体，不追求完整复刻操作系统界面。

**Q: 可以添加评论功能吗？**
A: 可以，推荐使用 Giscus（基于 GitHub Discussions），保持静态站点的优势。

**Q: 如何处理大量图片？**
A: 使用 Astro 的 Image 组件自动优化，或使用图床（如 Cloudinary）。

**Q: 移动端真的不重要吗？**
A: 重要，但不是优先级。建议提供"系统不兼容"提示页（模拟 90 年代"本站最佳分辨率 800x600"的提示），用户可选择继续访问极简版。

**Q: 音乐版权怎么办？**
A: 使用无版权音乐（如 Pixabay、FreePD）或自己创作，避免法律风险。

**Q: 这个方案是不是在重复造轮子？**
A: 不是！你在使用成熟框架（Astro）和现成库（Howler.js、Pagefind 等），只是组装和定制，而不是从零开发。

**Q: 导航栏应该放在哪里？**
A: 推荐放在页面顶部（非固定），使用简单的文字链接，用 `|` 分隔。左侧是主导航（首页、归档、标签、关于），右侧是功能按钮（搜索、音乐、主题）。

---

## 附录 B：推荐的现成资源

### 样式参考（可选使用）
- **98.css**: https://github.com/jdan/98.css (Windows 98 UI - 作为可选主题参考)
- **XP.css**: https://github.com/botoxparty/XP.css (Windows XP UI - 作为可选主题参考)
- **7.css**: https://github.com/khang-nd/7.css (Windows 7 UI)
- **NES.css**: https://github.com/nostalgic-css/NES.css (8-bit 像素风格)

### 功能库
- **Howler.js**: https://howlerjs.com/ (音频播放)
- **Pagefind**: https://pagefind.app/ (静态搜索)
- **Giscus**: https://giscus.app/ (评论系统)
- **Astro Icon**: https://github.com/natemoo-re/astro-icon (图标组件)

### 字体资源
- **Times New Roman**: 系统自带（优先使用）
- **Arial**: 系统自带（优先使用）
- **Courier New**: 系统自带（代码块）
- **Press Start 2P**: Google Fonts (8-bit 像素字体 - 可选)
- **VT323**: Google Fonts (终端风格字体 - 可选)

### 图标和素材（可选主题使用）
- **Windows 95/98 Icons**: https://win98icons.alexmeub.com/
- **Icon Archive**: https://iconarchive.com/ (搜索 "windows 98")
- **Archive.org**: 原版 Windows 资源

### 音乐资源（无版权）
- **Pixabay Music**: https://pixabay.com/music/
- **FreePD**: https://freepd.com/
- **Incompetech**: https://incompetech.com/music/
- **YouTube Audio Library**: 免费音乐库

### 90 年代网页设计参考
- **Web Design Museum**: https://www.webdesignmuseum.org/ (真实的 90 年代网页截图)
- **Internet Archive Wayback Machine**: https://web.archive.org/ (查看历史网页)
- **Old Web Today**: https://oldweb.today/ (在老浏览器中浏览历史网页)

---

## 附录 C：快速开始检查清单

### 第一天：环境搭建
- [ ] 安装 Node.js 20+
- [ ] 初始化 Astro 项目
- [ ] 安装 98.css: `npm install 98.css`
- [ ] 配置 Git 仓库

### 第一周：核心功能
- [ ] 配置 Content Collections
- [ ] 创建基础布局（BaseLayout、PostLayout）
- [ ] 集成 98.css 样式
- [ ] 实现文章列表页
- [ ] 实现文章详情页
- [ ] 写第一篇测试文章

### 第二周：增强体验
- [ ] 集成 Howler.js 音乐播放器
- [ ] 实现主题切换器
- [ ] 添加标签系统
- [ ] 优化移动端显示
- [ ] 部署到 GitHub Pages

### 第三周：完善细节
- [ ] 添加 CRT 滤镜效果
- [ ] 集成 Pagefind 搜索
- [ ] 添加 RSS 订阅
- [ ] SEO 优化
- [ ] 性能优化

### 持续迭代
- [ ] 写更多文章
- [ ] 收集用户反馈
- [ ] 添加新主题（WinXP、Mac OS 9）
- [ ] 探索更多怀旧元素
