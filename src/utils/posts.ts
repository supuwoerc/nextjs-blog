import { siteConfig } from '@/config';
import { Page, Post } from 'contentlayer/generated';

// 根据参数获取文章
export function getPostFromParams(
  allPosts: Post[],
  params: Record<string, any>
) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => {
    return post.encodeURIComponentRet === slug;
  });
  if (!post) {
    null;
  }
  return post;
}

// 根据参数获取page
export function getPageFromParams(
  allPages: Page[],
  params: Record<string, any>
) {
  const slug = params?.slug?.join('/');
  const page = allPages.find((post) => post.encodeURIComponentRet === slug);
  if (!page) {
    null;
  }
  return page;
}

// SEO信息
export function generateSeoInfo(post: Post | Page) {
  const { title, date, updatedDate, cover } = post;
  const image = [`/og?title=${post.title}`];
  if (cover) {
    image.unshift(cover);
  }
  const info = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    datePublished: date,
    dateModified: updatedDate,
    headline: title,
    image,
    description: post.desc,
    author: [
      {
        '@type': 'Person',
        name: `${siteConfig.author.name}`,
        url: `${siteConfig.author.url}`,
      },
    ],
  };
  return JSON.stringify(info);
}
