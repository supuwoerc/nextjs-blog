import { siteConfig } from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: siteConfig.author,
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.author.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.author.url,
    siteName: siteConfig.title,
  },
};

export default function Home() {
  return (
    <div className="blur-text border-red relative h-full w-full overflow-y-auto">
      <div className="mx-auto max-w-3xl">
        <div className="relative mx-auto">
          <article className="prose relative mx-auto py-4 text-black dark:prose-invert dark:text-white">
            <h1>怎么个事？</h1>
          </article>
        </div>
      </div>
    </div>
  );
}
