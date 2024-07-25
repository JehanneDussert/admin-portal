/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource"
    });
    return config;
  },
  reactStrictMode: false
};

module.exports = nextConfig;