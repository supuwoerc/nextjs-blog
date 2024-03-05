import { allPages } from "contentlayer/generated";
import { generateSeoInfo, getPageFromParams } from "@/utils/posts";
import { notFound } from "next/navigation";
import { useMDXComponent } from "next-contentlayer/hooks";

const PageLayout = ({ params }: { params: { slug: string[] } }) => {
  const page = getPageFromParams(allPages, params);
  if (!page) {
    notFound();
  }
  const seoInfo = generateSeoInfo(page);
  const MDXContent = useMDXComponent(page.body.code);
  return (
    <>
      <section>
        {/* SEO信息 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seoInfo }}
        />
      </section>
      <div className="w-full h-full relative overflow-y-auto blur-text">
        <div className="mx-auto max-w-xl">
          <div className="relative mx-auto">
            <article className="py-4 prose mx-auto dark:prose-invert text-black dark:text-white">
              <MDXContent />
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
