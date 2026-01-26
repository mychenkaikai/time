import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap';  // 暂时禁用，存在兼容性问题

// 根据环境变量决定部署平台
// 使用方法：
//   开发: npm run dev (使用根路径)
//   GitHub: npm run build
//   Gitee:  DEPLOY_PLATFORM=gitee npm run build
const DEPLOY_PLATFORM = process.env.DEPLOY_PLATFORM || 'github';
const REPO_NAME = 'the-past';
const isDev = import.meta.env.DEV;

// 配置映射
const configs = {
  github: {
    site: `https://mychenkaikai.github.io`,
    base: '/',  // 用户页面使用根路径
  },
  gitee: {
    site: `https://chenkk.gitee.io`,
    base: isDev ? '/' : `/${REPO_NAME}`,  // 开发环境使用根路径
  },
};

const config = configs[DEPLOY_PLATFORM];

console.log(`🚀 构建目标平台: ${DEPLOY_PLATFORM}`);
console.log(`📍 网站地址: ${config.site}${config.base}`);
console.log(`🔧 开发模式: ${isDev ? '是' : '否'}`);

// https://astro.build/config
export default defineConfig({
  site: `${config.site}${config.base}`,  // 完整的网站 URL
  base: config.base,
  output: 'static',
  integrations: [
    // sitemap 插件暂时禁用，存在兼容性问题
    // 如需 SEO，可以后续手动创建 sitemap.xml 或升级插件版本
  ],
  build: {
    inlineStylesheets: 'never', // 保持 CSS 文件独立，便于主题切换
  },
});

