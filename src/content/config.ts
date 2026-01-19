import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().transform(str => new Date(str)),
    updated: z.string().transform(str => new Date(str)).optional(),
    theme: z.enum(['win98', 'winxp', 'macos9']).default('win98'),
    // 新增：分类系统（两级导航）
    category: z.string(), // 一级分类，如 "童年回忆"、"技术怀旧"
    subcategory: z.string().optional(), // 二级分类，如 "游戏"、"动画"
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

