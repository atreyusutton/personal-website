import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(0 0% 100%)',
          dark: 'hsl(222 47% 7%)',
        },
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(0,0,0,0.2)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
} satisfies Config;

