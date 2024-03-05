import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import { ThemeModeProvider } from "./providers";
import { siteConfig } from "@/config";
import classNames from "classnames";
import "./globals.css";
import Navigate from "./components/navigate";

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
      path: "../../public/fonts/IowanOldStyle/IowanOldStyleBTBold.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/IowanOldStyle/IowanOldStyleBTItalic.woff2",
      style: "italic",
      weight: "400",
    },
    {
      path: "../../public/fonts/IowanOldStyle/IowanOldStyleBTRoman.woff2",
      style: "roman",
      weight: "400",
    },
  ],
  variable: "--en-font",
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
      className="w-full h-full overflow-hidden"
    >
      <body
        className={classNames(
          "common-font",
          fonts.variable,
          "w-full",
          "h-full",
          "overflow-hidden",
          "relative",
          "bg-white dark:bg-black"
        )}
        suppressHydrationWarning={true}
      >
        <ThemeModeProvider>
          <div className="px-[8px] w-full h-full relative overflow-y-auto blur-text">
            <div className="mx-auto max-w-xl">
              <div className="sticky top-0 py-8 pb-4 z-10 bg-white dark:bg-black">
                <Navigate />
              </div>
              <main>{children}</main>
            </div>
          </div>
        </ThemeModeProvider>
        <svg
          xmlns="//www.w3.org/2000/svg"
          version="1.1"
          className="svg-filters"
          style={{ display: "none" }}
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
