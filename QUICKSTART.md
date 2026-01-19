# 🚀 快速启动指南

## 第一步：修复 npm 权限并安装依赖

在终端中执行以下命令：

```bash
# 进入项目目录
cd /Users/chenyaokai/work/the_past

# 修复 npm 权限（需要输入密码）
sudo chown -R $(whoami) /usr/local/lib/node_modules
sudo chown -R $(whoami) /usr/local/bin
sudo chown -R $(whoami) ~/.npm

# 安装依赖
npm install
```

## 第二步：启动开发服务器

```bash
npm run dev
```

## 第三步：访问网站

打开浏览器访问：**http://localhost:4321**

---

## 如果遇到问题

### 问题 1: npm 权限仍然有问题

**解决方案：使用 nvm**

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重启终端或执行
source ~/.zshrc

# 安装 Node.js
nvm install 20
nvm use 20

# 重新安装依赖
cd /Users/chenyaokai/work/the_past
npm install
```

### 问题 2: 端口被占用

```bash
# 使用其他端口
npm run dev -- --port 3000
```

### 问题 3: 样式没有加载

检查浏览器控制台是否有错误，可能需要清除缓存。

---

## 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 类型检查
npm run astro check
```

---

## 下一步

1. ✅ 查看首页的文章列表
2. ✅ 点击文章查看详情页
3. ✅ 体验 Windows 98 复古风格
4. 📝 开始创作你的第一篇文章

---

**祝您使用愉快！** 🖥️✨

