import type { Metadata } from "next";
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
};

export const fonts = localFont({
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
    <html lang="zh-CN" suppressHydrationWarning={true}>
      <body
        className={classNames("common-font",fonts.variable)}
        suppressHydrationWarning={true}
      >
        <ThemeModeProvider>{children}</ThemeModeProvider>
      </body>
    </html>
  );
}
