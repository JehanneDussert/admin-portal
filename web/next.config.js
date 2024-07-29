/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/',
        permanent: true, 
      },
    ];
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource"
    });
    return config;
  },
  reactStrictMode: false,
  serverRuntimeConfig: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '3000',
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'http://localhost:8000',
  },
};

module.exports = nextConfig;
