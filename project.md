# 项目：怀旧数字博物馆 (Retro Digital Museum)

## 1. 项目愿景
为高敏人群（HSP）打造的个人精神角落，通过 PC 端优先的网页设计，复刻 80/90 年代互联网的仪式感。
- **核心逻辑**：内容与样式高度分离，支持主题一键切换。
- **用户体验**：PC 端优先体验，强调窗口化、像素感和沉浸式背景音。
- **响应式策略**：移动端显示优雅的提示页或简化版布局，保持内容可访问性。

## 2. 技术栈

### 2.1 核心框架
- **框架**: Astro 4.x (静态站点生成，极致性能和 SEO)
- **内容管理**: Content Collections (类型安全的 Markdown 管理)
- **状态管理**: localStorage (主题偏好、音量设置)
- **托管方案**: GitHub Pages + Cloudflare (CDN 加速)
- **CI/CD**: GitHub Actions (自动构建部署)

### 2.2 样式系统（复用现成库，避免重复造轮子）
- **98.css**: Windows 98 风格 CSS 框架
  - 🔗 https://github.com/jdan/98.css
  - 用途：直接引入或参考其变量和组件样式
  - 优势：完整实现了 Win98 的所有 UI 组件（按钮、窗口、输入框等）
  
- **XP.css**: Windows XP 风格 CSS 框架（可选）
  - 🔗 https://github.com/botoxparty/XP.css
  - 用途：用于 WinXP 主题切换
  
- **自定义 CSS Variables**: 在 98.css 基础上扩展
  - 支持主题切换
  - 添加自定义动画和效果

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
│   │   ├── ThemeSelector.astro # 主题切换器
│   │   ├── VideoBox.astro      # 带窗口外壳的视频组件
│   │   ├── MusicPlayer.astro   # 像素风音乐播放器（手动启动）
│   │   ├── CRTOverlay.astro    # CRT 扫描线滤镜（可开关）
│   │   ├── WindowFrame.astro   # 可复用的窗口框架组件
│   │   └── MobileWarning.astro # 移动端提示组件
│   ├── pages/
│   │   ├── index.astro         # 首页（文章列表）
│   │   └── posts/
│   │       └── [...slug].astro # 动态路由（文章详情页）
│   └── styles/
│       ├── variables.css       # CSS 变量定义（多主题）
│       ├── themes/
│       │   ├── win98.css       # Windows 98 主题
│       │   ├── winxp.css       # Windows XP 主题（预留）
│       │   └── macos9.css      # Mac OS 9 主题（预留）
│       ├── global.css          # 全局基础样式
│       └── scrollbar.css       # 自定义滚动条样式
├── public/
│   ├── audio/                  # 背景音乐文件
│   ├── images/                 # 图片资源
│   ├── icons/                  # 网站图标
│   └── fonts/                  # 像素字体（如需要）
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
title: "文章标题"
description: "文章简介（用于 SEO 和列表页）"
date: "2024-01-01"
updated: "2024-01-15"          # 可选：更新日期
theme: "win98"                 # 主题：win98 | winxp | macos9
tags: ["回忆", "童年", "游戏"]  # 标签数组
mood: "怀念"                   # 情绪标签
draft: false                   # 是否为草稿

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
  backgroundColor: "#c0c0c0"
  accentColor: "#000080"
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
    theme: z.enum(['win98', 'winxp', 'macos9']).default('win98'),
    tags: z.array(z.string()).default([]),
    mood: z.string().optional(),
    draft: z.boolean().default(false),
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
- **PC 端**：容器最大宽度 1024px，居中显示，模拟 4:3 显示器比例
- **平板端**：容器宽度 90%，保持核心功能
- **移动端**：显示简化版或提示页（"请使用 PC 访问以获得最佳体验"）

### 6.2 样式规范
1. **变量系统**：
   - 所有颜色、间距、字体必须使用 CSS Variables
   - 通过 `[data-theme="win98"]` 切换主题
   - 禁止使用 Tailwind 或内联样式

2. **窗口效果**：
   - 边框：1-2px solid，使用 inset/outset 产生 3D 效果
   - 阴影：`box-shadow: inset -1px -1px 0 rgba(0,0,0,0.25), inset 1px 1px 0 rgba(255,255,255,0.75)`
   - 标题栏：渐变背景，左对齐文字，右侧关闭按钮

3. **交互细节**：
   - 链接 hover：背景色变化 + 下划线
   - 按钮 active：`transform: translate(1px, 1px)` + 阴影反转
   - 滚动条：自定义为灰色块状，带箭头按钮（纯 CSS）

### 6.3 性能优化
- 图片使用 Astro 的 `<Image>` 组件，自动优化
- 视频使用 `loading="lazy"` 懒加载
- 音频播放需要用户交互触发（符合浏览器策略）
- CRT 滤镜提供开关，默认关闭（避免性能问题）
- 字体使用 `font-display: swap` 避免阻塞渲染

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
- **win98**: Windows 98 经典灰色，蓝色标题栏
- **winxp**: Windows XP 蓝绿渐变，圆角窗口
- **macos9**: Mac OS 9 彩色条纹，Platinum 灰

## 8. 数据管理策略

### 8.1 文章列表
- 按日期倒序排列（最新在前）
- 过滤草稿（`draft: false`）
- 支持按标签筛选
- 支持按主题筛选

### 8.2 标签系统
- 自动提取所有文章的标签
- 标签页显示该标签下的所有文章
- 标签云展示（字体大小反映文章数量）

### 8.3 搜索功能（可选）
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
1. 创建 src/styles/variables.css，定义 Windows 98 主题的 CSS 变量：
   - 背景色：#c0c0c0
   - 窗口边框：#ffffff, #808080, #000000（3D 效果）
   - 标题栏：linear-gradient(to right, #000080, #1084d0)
   - 文字颜色：#000000
   - 链接颜色：#0000ff
   - 字体：system-ui, -apple-system, sans-serif

2. 创建 src/styles/global.css，包含：
   - CSS Reset
   - 基础排版样式
   - 响应式容器（max-width: 1024px）

3. 创建 src/styles/scrollbar.css，自定义滚动条为 Win98 风格

【第 4 步：布局和组件】
1. 创建 src/layouts/BaseLayout.astro：
   - 包含 HTML 骨架、meta 标签、SEO 优化
   - 引入全局样式
   - 支持 data-theme 属性

2. 创建 src/layouts/PostLayout.astro：
   - 继承 BaseLayout
   - 显示文章标题、日期、标签
   - 渲染 Markdown 内容
   - 集成 MusicPlayer 组件（如果有 bgm）

3. 创建 src/components/WindowFrame.astro：
   - 可复用的窗口框架组件
   - 带标题栏和关闭按钮（装饰性）
   - 3D 边框效果

4. 创建 src/components/MusicPlayer.astro：
   - 简单的音频播放器
   - 播放/暂停按钮
   - 音量控制
   - 记住用户音量偏好（localStorage）

【第 5 步：页面路由】
1. 创建 src/pages/index.astro：
   - 获取所有文章（过滤草稿）
   - 按日期倒序显示
   - 每篇文章显示标题、日期、描述、标签
   - 点击跳转到文章详情

2. 创建 src/pages/posts/[...slug].astro：
   - 动态路由，渲染文章内容
   - 使用 PostLayout

【第 6 步：测试内容】
创建 src/content/posts/hello-world.md：
---
title: "你好，旧时光"
description: "这是第一篇测试文章"
date: "2024-01-01"
theme: "win98"
tags: ["测试", "开始"]
mood: "期待"
draft: false
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

### Phase 2: 增强功能（集成现成库）
- [ ] 集成 98.css 作为基础样式
- [ ] 使用 Howler.js 实现音乐播放器
- [ ] 主题切换器组件（Win98 / WinXP / Mac OS 9）
- [ ] CRT 滤镜效果（纯 CSS）
- [ ] 视频嵌入组件（参考 lite-youtube-embed）
- [ ] 标签页面
- [ ] RSS 订阅

### Phase 3: 高级特性
- [ ] 集成 Pagefind 实现客户端搜索
- [ ] 评论系统（Giscus - 基于 GitHub Discussions）
- [ ] 阅读进度条
- [ ] 深色模式（保持怀旧风格）
- [ ] 音乐播放列表

### Phase 4: 优化和完善
- [ ] 性能优化（Lighthouse 评分 > 90）
- [ ] SEO 优化（结构化数据）
- [ ] 社交分享卡片（Open Graph）
- [ ] 站点地图（Astro 自动生成）
- [ ] 404 页面（怀旧风格 - 参考 Win98 蓝屏）

---

## 13. 为什么不是"重复造轮子"

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

**Q: 可以添加评论功能吗？**
A: 可以，推荐使用 Giscus（基于 GitHub Discussions），保持静态站点的优势。

**Q: 如何处理大量图片？**
A: 使用 Astro 的 Image 组件自动优化，或使用图床（如 Cloudinary）。

**Q: 移动端真的不重要吗？**
A: 重要，但不是优先级。建议提供简化版或优雅的提示页，不要完全忽略。

**Q: 音乐版权怎么办？**
A: 使用无版权音乐（如 Pixabay、FreePD）或自己创作，避免法律风险。

**Q: 这个方案是不是在重复造轮子？**
A: 不是！你在使用成熟框架（Astro）和现成库（98.css、Howler.js 等），只是组装和定制，而不是从零开发。

---

## 附录 B：推荐的现成资源

### 样式库
- **98.css**: https://github.com/jdan/98.css (Windows 98 UI)
- **XP.css**: https://github.com/botoxparty/XP.css (Windows XP UI)
- **7.css**: https://github.com/khang-nd/7.css (Windows 7 UI)
- **NES.css**: https://github.com/nostalgic-css/NES.css (8-bit 像素风格)

### 功能库
- **Howler.js**: https://howlerjs.com/ (音频播放)
- **Pagefind**: https://pagefind.app/ (静态搜索)
- **Giscus**: https://giscus.app/ (评论系统)
- **Astro Icon**: https://github.com/natemoo-re/astro-icon (图标组件)

### 字体资源
- **Press Start 2P**: Google Fonts (8-bit 像素字体)
- **VT323**: Google Fonts (终端风格字体)
- **Fixedsys Excelsior**: 经典 Windows 等宽字体

### 图标和素材
- **Windows 95/98 Icons**: https://win98icons.alexmeub.com/
- **Icon Archive**: https://iconarchive.com/ (搜索 "windows 98")
- **Archive.org**: 原版 Windows 资源

### 音乐资源（无版权）
- **Pixabay Music**: https://pixabay.com/music/
- **FreePD**: https://freepd.com/
- **Incompetech**: https://incompetech.com/music/
- **YouTube Audio Library**: 免费音乐库

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
