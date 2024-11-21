import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'dark-900': '#121212',
        'light-100': '#ffffff',
        'light-200': '#d4d4d4',
        'light-400': '#a1a1a1',
        'primary-500': '#E50914',
        'primary-400': '#F6121D',
      },
    },
  },
  plugins: [],
} satisfies Config;
