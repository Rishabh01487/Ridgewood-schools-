import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Compress responses with gzip
  compress: true,
  // Disable the Next.js dev indicator floating element in production
  devIndicators: false,
  // Disable the new Next.js 16 DevTools in production (saves ~800KB of JS)
  experimental: {
    devTools: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
