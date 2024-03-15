import { siteConfig } from '@/config';
import classNames from 'classnames';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import Navigate from './components/navigate';
import './globals.css';
import { ThemeModeProvider } from './providers';

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

const fonts = localFont({
  src: [
    {
      path: '../../public/fonts/IowanOldStyle/IowanOldStyleBTBold.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../public/fonts/IowanOldStyle/IowanOldStyleBTItalic.woff2',
      style: 'italic',
      weight: '400',
    },
    {
      path: '../../public/fonts/IowanOldStyle/IowanOldStyleBTRoman.woff2',
      style: 'roman',
      weight: '400',
    },
  ],
  variable: '--en-font',
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning={true}
      className="h-full w-full overflow-hidden"
    >
      <body
        className={classNames(
          'common-font',
          fonts.variable,
          'w-full',
          'h-full',
          'overflow-hidden',
          'relative',
          'bg-white dark:bg-black'
        )}
        suppressHydrationWarning={true}
      >
        <ThemeModeProvider>
          <div className="blur-text relative h-full w-full overflow-y-auto px-[8px]">
            <div className="mx-auto max-w-3xl">
              <div className="sticky top-0 z-10 bg-white py-8 pb-4 dark:bg-black">
                <Navigate />
              </div>
              <main>{children}</main>
            </div>
          </div>
        </ThemeModeProvider>
        <ToastContainer />
        <svg
          xmlns="//www.w3.org/2000/svg"
          version="1.1"
          className="svg-filters"
          style={{ display: 'none' }}
        >
          <defs>
            <filter id="marker-shape">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0 0.15"
                numOctaves="1"
                result="warp"
              />
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp"
              />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
