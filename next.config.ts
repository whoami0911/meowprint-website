import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/meowprint-website',
  assetPrefix: '/meowprint-website',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
