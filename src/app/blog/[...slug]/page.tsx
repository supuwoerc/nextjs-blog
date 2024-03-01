import { allPosts } from "contentlayer/generated";
import { generateSeoInfo, getPostFromParams } from "@/utils/posts";
import { notFound } from "next/navigation";
import Navigate from "@/app/components/navigate";
import { useMDXComponent } from "next-contentlayer/hooks";

const PostLayout = ({ params }: { params: { slug: string[] } }) => {
  const post = getPostFromParams(allPosts, params);
  if (!post) {
    notFound();
  }
  const seoInfo = generateSeoInfo(post);
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <section>
        {/* SEO信息 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seoInfo }}
        />
      </section>
      <div className="px-[8px] w-full h-full relative overflow-y-auto">
        <div className="mx-auto max-w-xl">
          <div className="bg-white dark:bg-black">
            <Navigate post={post}/>
          </div>
          <div className="content">
            <div className="relative mx-auto">
              <article className="py-4 prose mx-auto dark:prose-invert text-black dark:text-white blur-text">
                <MDXContent />
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLayout;
