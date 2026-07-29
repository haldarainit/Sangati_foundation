/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink, #10231C)',
        field: 'var(--field, #F7F4EC)',
        road: 'var(--road, #1F6F5C)',
        marigold: 'var(--marigold, #E8A33D)',
        clay: 'var(--clay, #C25436)',
        mist: 'var(--mist, #DCE5E0)',
      },
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        body: ['var(--font-source-serif)', 'serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
