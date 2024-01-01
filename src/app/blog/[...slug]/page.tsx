import { format, parseISO } from "date-fns";
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
      <section>
        {/* SEO信息 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: seoInfo }}
        />
      </section>
      <div className="relative xl:grid xl:grid-cols-8 gap-8 mx-auto max-w-5xl">
        <article className="col-span-6 py-4 prose mx-auto dark:prose-invert max-w-2xl">
          <h1 className="mb-2 py-4 leading-relaxed">{page.title}111</h1>
          {/* {page.description && (
            <p className="mt-4 text-slate-700 dark:text-slate-200">
              {page.description}
            </p>
          )} */}
          <hr className="py-2 pt-2" />
          {/* <MDXComponent code={page.body.code} /> */}
          <hr />
          {/* <Comments /> */}
        </article>
        {/* <div className="col-span-2 mx-auto">
          <div className="sticky top-0 hidden xl:block pt-12">
            <h3 className="text-zinc-600 dark:text-zinc-300 py-4">
              On this page11111
            </h3>
            {page.headings.map((heading) => {
              return (
                <div key={heading.text}>
                  <TableofContent heading={heading} />
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
      {/* <ScrollTopAndComment /> */}
    </>
  );
};

export default PostLayout;
