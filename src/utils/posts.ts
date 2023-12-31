import { siteConfig } from "@/config";
import { Post } from "contentlayer/generated";

// 根据参数获取文章
export function getPostFromParams(
  allPosts: Post[],
  params: Record<string, any>
) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }
  return post;
}

// 映射slug
export function generateStaticParams(allPosts: Post[]) {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

// SEO信息
export function generateSeoInfo(post: Post) {
  const { title, date, updatedDate, cover } = post;
  const image = [`/og?title=${post.title}`];
  if (cover) {
    image.unshift(cover);
  }
  const info = {
    "@context": "https://schema.org",
    "@type": "Article",
    datePublished: date,
    dateModified: updatedDate,
    headline: title,
    image,
    description: post.desc,
    author: [
      {
        "@type": "Person",
        name: `${siteConfig.author}`,
        url: `/about`,
      },
    ],
  };
  return JSON.stringify(info);
}
