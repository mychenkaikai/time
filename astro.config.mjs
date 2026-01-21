import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 根据环境变量决定部署平台
// 使用方法：
//   GitHub: npm run build
//   Gitee:  DEPLOY_PLATFORM=gitee npm run build
const DEPLOY_PLATFORM = process.env.DEPLOY_PLATFORM || 'github';
const REPO_NAME = 'the-past';

// 配置映射
const configs = {
  github: {
    site: `https://mychenkaikai.github.io`,
    base: `/${REPO_NAME}`,
  },
  gitee: {
    site: `https://chenkk.gitee.io`,
    base: `/${REPO_NAME}`,
  },
};

const config = configs[DEPLOY_PLATFORM];

console.log(`🚀 构建目标平台: ${DEPLOY_PLATFORM}`);
console.log(`📍 网站地址: ${config.site}${config.base}`);

// https://astro.build/config
export default defineConfig({
  site: config.site,
  base: config.base,
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'never', // 保持 CSS 文件独立，便于主题切换
  },
});

