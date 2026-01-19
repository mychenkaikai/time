import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourusername.github.io',
  // base: '/repo-name', // 如果不是根域名，取消注释并修改
  output: 'static',
  build: {
    inlineStylesheets: 'never', // 保持 CSS 文件独立，便于主题切换
  },
});

