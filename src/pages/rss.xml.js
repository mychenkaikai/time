import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';
import { getPostPath } from '../lib/routes';

export async function GET(context) {
  const posts = await getPublishedPosts();
  
  return rss({
    title: '怀旧数字博物馆',
    description: '为高敏人群打造的精神角落',
    site: context.site || 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: getPostPath(post.slug),
    })),
    customData: `<language>zh-cn</language>`,
  });
}
