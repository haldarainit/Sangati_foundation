/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: this site used to build with `output: 'export'` (a folder of plain
  // HTML files). That had to change for the admin panel: the Studio needs a
  // running Next.js server, and content edits need to appear without a rebuild.
  // Deploy to Vercel (or any Node host) instead of copying `out/` to a server.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        // YouTube thumbnails, used as the poster for un-played videos.
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
    ],
  },
};

export default nextConfig;
