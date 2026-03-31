/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: false,
  },
};

export default nextConfig
