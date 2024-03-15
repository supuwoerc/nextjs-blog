import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    colors: {
      success: '#57ab5a',
      // light-mode
      white: '#fff',
      black: '#000',
      catalogue: '#474747',
      'catalogue-line': '#444',
      'catalogue-hover': '#888',
      // dark-mode
      'd-catalogue-line': '#eee',
    },
    lineHeight: {
      catalogue: '30px',
    },
    extend: {
      // eslint-disable-next-line no-unused-vars
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            lineHeight: '2rem',
            maxWidth: 'unset',
            a: {
              fontSize: 16,
              padding: '0 2px',
              margin: '0 6px',
              'text-decoration': 'none',
              '@apply realistic-marker-highlight': {},
            },
          },
        },
        invert: {
          css: {},
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
};
export default config;
