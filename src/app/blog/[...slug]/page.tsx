import Navigate from '@/app/components/navigate';
import Pre from '@/app/components/pre';
import { siteConfig } from '@/config';
import { generateSeoInfo, getPostFromParams } from '@/utils/posts';
import { allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const post = getPostFromParams(allPosts, params);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} - ${siteConfig.title}`,
    description: post.desc || siteConfig.description,
    openGraph: {
      title: `${post.title} from ${siteConfig.title}`,
      description: post.desc || siteConfig.description,
      url: '/' + post.slugAsParams,
      siteName: siteConfig.title,
      type: 'website',
      images: [
        {
          url: `/og?title=${post.title}`,
        },
      ],
    },
  };
}

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
      <div className="blur-text relative h-full w-full overflow-y-auto">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white dark:bg-black">
            <Navigate post={post} />
          </div>
          <div className="content">
            <div className="relative mx-auto">
              <article className="prose py-4 pb-[150px] text-black dark:prose-invert dark:text-white">
                <MDXContent
                  components={{
                    pre: Pre,
                  }}
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostLayout;
