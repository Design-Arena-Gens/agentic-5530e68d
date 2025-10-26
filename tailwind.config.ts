import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef1f7',
          100: '#fee5f0',
          200: '#fecce3',
          300: '#ffa3ca',
          400: '#ff69a5',
          500: '#fb3a84',
          600: '#eb1760',
          700: '#cd0a46',
          800: '#a90c3b',
          900: '#8d0f35',
        },
      },
    },
  },
  plugins: [],
};
export default config;
