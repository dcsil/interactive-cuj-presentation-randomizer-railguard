/** @type {import('next').NextConfig} */

const repoName = "interactive-cuj-presentation-randomizer-railguard"; // dcsil repo name
const nextConfig = {
  output: "export",
  basePath: "/" + repoName,
  assetPrefix: "/" + repoName + "/",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig
