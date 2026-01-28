import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';  // 暂时禁用，存在兼容性问题

// 根据环境变量决定部署平台
// 使用方法：
//   开发: npm run dev (使用根路径)
//   GitHub 用户页面: npm run build (仓库名必须是 <username>.github.io)
//   GitHub 项目页面: DEPLOY_TYPE=project npm run build (仓库名任意，如 time)
//   Cloudflare Pages: DEPLOY_PLATFORM=cloudflare npm run build:cf
const DEPLOY_PLATFORM = process.env.DEPLOY_PLATFORM || 'github';
const DEPLOY_TYPE = process.env.DEPLOY_TYPE || 'user'; // 'user' 或 'project'
const REPO_NAME = 'time';
const isDev = import.meta.env.DEV;

// 配置映射
const configs = {
  github: {
    site: `https://mychenkaikai.github.io`,
    base: DEPLOY_TYPE === 'user' ? '/' : `/${REPO_NAME}`,
  },
  cloudflare: {
    site: `https://www.tinynote.cn`, // 您的自定义域名
    base: '/',
  },
};

const config = configs[DEPLOY_PLATFORM];

console.log(`🚀 构建目标平台: ${DEPLOY_PLATFORM}`);
console.log(`📍 网站地址: ${config.site}${config.base}`);
console.log(`🔧 开发模式: ${isDev ? '是' : '否'}`);

// https://astro.build/config
export default defineConfig({
  site: config.site,
  base: config.base,
  output: 'static',
  integrations: [
    mdx(),  // 启用 MDX 支持
    // sitemap 插件暂时禁用，存在兼容性问题
    // 如需 SEO，可以后续手动创建 sitemap.xml 或升级插件版本
  ],
  build: {
    inlineStylesheets: 'never', // 保持 CSS 文件独立，便于主题切换
  },
});

