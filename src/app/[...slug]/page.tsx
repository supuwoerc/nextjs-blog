import { siteConfig } from '@/config';
import { generateSeoInfo, getPageFromParams } from '@/utils/posts';
import { allPages } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';
import Navigate from '../components/navigate';
import Pre from '../components/pre';

export async function generateStaticParams() {
  const ret = allPages.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }));
  return ret;
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const page = getPageFromParams(allPages, params);

  if (!page) {
    return {};
  }
  return {
    title: `${page.title} - ${siteConfig.title}`,
    description: page.desc || siteConfig.description,
    openGraph: {
      title: `${page.title} from ${siteConfig.title}`,
      description: page.desc || siteConfig.description,
      url: '/' + page.slugAsParams,
      siteName: siteConfig.title,
      type: 'website',
      images: [
        {
          url: `/og?title=${page.title}`,
        },
      ],
    },
  };
}

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
      <div className="blur-text relative h-full w-full overflow-y-auto">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white dark:bg-black">
            <Navigate post={page} />
          </div>
          <div className="content">
            <div className="relative mx-auto">
              <article className="prose mx-auto py-4 pb-[150px] dark:prose-invert">
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

export default PageLayout;
