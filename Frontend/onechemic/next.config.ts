import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7037",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5224",
        pathname: "/**",
      },
    ],
    // Allow images from localhost (private IPs) in development
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
