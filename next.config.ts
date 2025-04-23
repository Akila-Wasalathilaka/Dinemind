import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
