"use client";

import { ThemeProvider } from "next-themes";

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
