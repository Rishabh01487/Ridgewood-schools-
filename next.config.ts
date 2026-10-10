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
  // Redirect /admissions → homepage with #admissions hash (so QR codes work)
  // The domain redirect (ridgewoodschools.com → www.ridgewoodschools.com) strips
  // hash fragments, so we use a path redirect instead which preserves the hash.
  async redirects() {
    return [
      {
        source: "/admissions",
        destination: "/#admissions",
        permanent: false,
      },
      {
        source: "/enquiry",
        destination: "/#enquiry-form",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
