/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_API: process.env.GOOGLE_API,
  },
}

module.exports = nextConfig
