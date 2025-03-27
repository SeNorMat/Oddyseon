import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['via.placeholder.com', 'placeholder.com'],
  },
};

export default nextConfig;
