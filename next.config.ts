import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        // path: false,
        // net: false,
        // tls: false,
        child_process: false,
      };
    }
    return config;
  },
  images: {
    // domains: ['drive.google.com'],
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'drive.google.com',
    //     pathname: "**",
    //   },
    // ],
    loader: 'custom',
    loaderFile: './imageLoader.js'
  },
};

export default nextConfig;
