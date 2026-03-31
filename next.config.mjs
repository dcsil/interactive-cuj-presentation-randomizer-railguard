/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  assetPrefix: "/interactive-cuj-presentation-randomizer-railguard/",
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
