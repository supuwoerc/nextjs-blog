import type { Config } from 'tailwindcss';

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
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
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
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
              '@apply protrude': {},
            },
          },
        },
        invert: {
          css: {},
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    addVariablesForColors,
  ],
};
export default config;
