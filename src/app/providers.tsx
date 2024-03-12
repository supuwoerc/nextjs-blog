'use client';
import { ThemeProvider } from 'next-themes';
import React from 'react';

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
