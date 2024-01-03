import { allPosts } from "contentlayer/generated";
import { generateSeoInfo, getPostFromParams } from "@/utils/posts";
import { notFound } from "next/navigation";

const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const page = getPostFromParams(allPosts, params);
  if (!page) {
    notFound();
  }
  const seoInfo = generateSeoInfo(page);
  return (
    <>
      <div>[slug]</div>
    </>
  );
};

export default PostLayout;
