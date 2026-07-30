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
        ink: 'var(--ink, #0B1E38)',
        field: 'var(--field, #FAF8F5)',
        road: 'var(--road, #15803D)',
        marigold: 'var(--marigold, #D4AF37)',
        clay: 'var(--clay, #EA580C)',
        purple: 'var(--purple, #7E22CE)',
        mist: 'var(--mist, #EAEFE9)',
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
