import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import { ThemeModeProvider } from "./providers";
import { siteConfig } from "@/config";
import classNames from "classnames";
import "./globals.css";

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
        <ThemeModeProvider>{children}</ThemeModeProvider>
      </body>
    </html>
  );
}
