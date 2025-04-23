import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // If you're using API routes or server components, don't include 'output: export'
  // If you're building a static site without API routes, uncomment this line:
  // output: 'export',
  
  images: {
    domains: ["images.unsplash.com"],
    // For static exports, you need this (only if using output: 'export'):
    // unoptimized: true,
  },
  
  // Essential for Netlify deployment success
  trailingSlash: true,
  
  // Optional: Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;