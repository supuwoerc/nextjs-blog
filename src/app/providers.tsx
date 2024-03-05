"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
