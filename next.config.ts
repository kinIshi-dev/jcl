import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/jcl',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
