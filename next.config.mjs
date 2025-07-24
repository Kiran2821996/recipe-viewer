/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  sassOptions: {
    includePaths: ['src/styles'],
  },
  images: {
    domains: ['www.themealdb.com'],
  },
};

export default nextConfig;
