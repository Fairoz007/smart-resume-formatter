/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  cacheComponents: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
