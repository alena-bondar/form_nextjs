import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'gray-400': '#f6f6f6',
        'gray-100': '#fcfcff',
        'gray-900': '#101828',
        'blue-gray-200': '#D0D5DD',
        'blue-gray-600': '#667085',
        'blue-gray-700': '#475467',
        'blue-gray-800': '#344054',
        'primary-color': '#6941C6',
        'secondary': '#D6BBFB',
        'background': '#F9FAFB',
        'border': '#EAECF0',
      },
    },
  },
  plugins: [],
} satisfies Config;
