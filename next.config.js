/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['as1.ftcdn.net', 'as2.ftcdn.net'],
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
