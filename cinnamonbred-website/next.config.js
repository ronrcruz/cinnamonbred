/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // This is true by default in Next.js 14 with the app router, consider removing if not needed explicitly or for older versions
  },
  images: {
    domains: [
      // 'cdn.sanity.io', // Removed as Sanity is not being used
      'res.cloudinary.com',
      'cdn.shopify.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    // Ignore build errors during development - set to true if preferred during dev
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig 