import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily : {
        sans: ['var(--font-maruburis)'],
        pretendard: ["Pretendard", "sans-serif"],
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // Set to `true` for SEO-friendly 301 redirect
      },
    ];
  }
};
export default config;
