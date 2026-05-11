import { getCollection, type CollectionEntry } from 'astro:content';

export type PublishedPost = CollectionEntry<'posts'>;

export interface CategoryTreeEntry {
  slug: string;
  title: string;
  date: Date;
}

export interface CategoryTree {
  [category: string]: {
    [subcategory: string]: CategoryTreeEntry[];
  };
}

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => data.draft !== true);

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function buildCategoryTree(posts: PublishedPost[]) {
  const categoryTree: CategoryTree = {};

  posts.forEach((post) => {
    const category = post.data.category;
    const subcategory = post.data.subcategory || '未分类';

    if (!categoryTree[category]) {
      categoryTree[category] = {};
    }

    if (!categoryTree[category][subcategory]) {
      categoryTree[category][subcategory] = [];
    }

    categoryTree[category][subcategory].push({
      slug: post.slug,
      title: post.data.title,
      date: post.data.date,
    });
  });

  Object.values(categoryTree).forEach((subcategories) => {
    Object.values(subcategories).forEach((entries) => {
      entries.sort((a, b) => b.date.getTime() - a.date.getTime());
    });
  });

  return categoryTree;
}

export async function getCategoryTree() {
  return buildCategoryTree(await getPublishedPosts());
}

export function getTags(posts: PublishedPost[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))];
}

export function getPostsByTag(posts: PublishedPost[], tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export async function getTagIndex() {
  const posts = await getPublishedPosts();

  return getTags(posts).map((tag) => ({
    tag,
    posts: getPostsByTag(posts, tag),
  }));
}
