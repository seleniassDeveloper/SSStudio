import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../"),
  ...(process.env.RENDER === "true" ? { output: "standalone" as const } : {}),
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
