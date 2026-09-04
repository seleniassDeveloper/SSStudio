import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/consultoria-ia",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/agentes-de-ia",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/software-a-medida",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
