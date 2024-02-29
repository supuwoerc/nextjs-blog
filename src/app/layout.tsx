import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeModeProvider } from "./providers";
import "./globals.css";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  authors: siteConfig.author,
  keywords: siteConfig.keywords,
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
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning={true}>
      <body className={fonts.className} suppressHydrationWarning={true}>
        <ThemeModeProvider>{children}</ThemeModeProvider>
      </body>
    </html>
  );
}
