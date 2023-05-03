/** @type {import('next').NextConfig} */
const url = new URL(process.env.STRAPI_URL);

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = {
  nextConfig,
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
  },
};
